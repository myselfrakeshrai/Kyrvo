import { deleteCookie, setCookie } from 'hono/cookie';
import * as authModel from '../auth/model';
import { generateResponse } from 'helpers/responseHelper';
import {
  COULDNT_ADD_DATA,
  COULDNT_LOGIN,
  NO_RECORDS_FOUND,
  LOGGED_OUT,
  COULDNT_SIGNUP,
} from 'utils/messages';
import { adminFeature, userSpecificPlusAdmin } from 'utils/permission';
import { sendInvitationEmail, sendPassworReset } from 'utils/userEmail';
import baseRoute from 'shared/baseRoute';
import { User, userModel, UserSchema } from './model';
import { ROLES } from 'shared/const';
import { getRequestUserId } from 'utils/jwt';
import { UserProfileSchema } from './userProfile';
import { generateRoutes } from 'shared/helpers/openaApiRoute';
const group = 'Users';
const routes = baseRoute<User>(userModel);
const userRoute = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all users',
    summary: 'Retrieve all user',
    schema: UserSchema,
    group: group,
    handler: (c) => adminFeature(c, routes.getAll),
  },
  {
    method: 'get',
    path: '/current',
    description: 'Get a role by Id',
    summary: 'Retrive role by log Id',
    schema: UserSchema,
    group: group,
    handler: async (c) => {
      const Id = await getRequestUserId(c);
      const dataObj = await userModel.getById(c.env.ae_d1, Id);
      return generateResponse(c, dataObj, 422, NO_RECORDS_FOUND);
    },
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a role by Id',
    summary: 'Retrive role by log Id',
    schema: UserSchema,
    group: group,
    params: UserSchema.pick({ Id: true }),
    handler: (c) => userSpecificPlusAdmin(c, routes.get),
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Update a user by Id',
    summary: 'Update user by Id',
    schema: UserSchema,
    group: group,
    body: UserSchema.pick({
      Email: true,
      FirstName: true,
      LastName: true,
      PhoneNumber: true,
      RoleId: true,
    }),
    params: UserSchema.pick({ Id: true }),
    handler: (c) => userSpecificPlusAdmin(c, routes.put),
  },
]);

const stripPwd = (users: User[] | User | undefined) => {
  if (users === undefined) {
    return;
  }
  if (Array.isArray(users)) {
    users?.map((x: User) => {
      x.Pwd = '';
      return x;
    });
  } else {
    users.Pwd = '';
  }
  return users;
};

userRoute.post('/login', async (c) => {
  const param = await c.req.json();
  const auth = await authModel.login(c.env.ae_d1, param as authModel.Param);
  if (auth && auth.User?.IsVerified === '1') {
    setCookie(c, 'ae_cookie', auth.Token, {
      path: '/',
      secure: true,
      httpOnly: true,
      maxAge: 40000,
      sameSite: (c.env.DOMAIN === 'localhost' || c.env.DOMAIN.indexOf("pages.dev")> -1) ? 'None' : 'Strict',
    });
    auth.User = stripPwd(auth.User) as User;
    return generateResponse(
      c,
      { User: auth?.User, Permissions: auth?.Permissions },
      422,
      COULDNT_LOGIN,
    );
  }
  if (auth && auth.User?.IsVerified === '0') {
    return generateResponse(c, null, 422, 'Unverified email.');
  }
  return generateResponse(c, null, 422, COULDNT_LOGIN);
});

userRoute.post('/signup', async (c) => {
  const param = (await c.req.json()) as User;
  const existingUser = await userModel.getBy(c.env.ae_d1, 'Email', param.Email);
  if (existingUser.length === 0) {
    param.RoleId = ROLES.USER;
    const user = (await authModel.register(c.env.ae_d1, param)) as User;
    if (user) {
      await sendInvitationEmail(c.env.APP_URL, user, c.env.SENDGRID_API_KEY);
    }
    return generateResponse(c, stripPwd(user), 422, COULDNT_ADD_DATA);
  } else {
    return generateResponse(c, null, 422, COULDNT_SIGNUP);
  }
});

userRoute.post('/requestReset', async (c) => {
  const param = (await c.req.json()) as User;
  const users = await userModel.getBy(c.env.ae_d1, 'Email', param.Email);
  if (users.length > 0) {
    const user = await authModel.requestReset(c.env.ae_d1, param);
    if (user) {
      await sendPassworReset(c.env.APP_URL, user, c.env.SENDGRID_API_KEY);

      return generateResponse(c, stripPwd(user), 422, NO_RECORDS_FOUND);
    }
  }

  return generateResponse(c, {}, 422, '');
});

userRoute.post('/resetPassword/:token', async (c) => {
  const { token } = await c.req.param();
  const param = (await c.req.json()) as User;
  const users = await userModel.getBy(c.env.ae_d1, 'VerificationToken', token);
  if (users.length > 0) {
    const user = await authModel.resetPassword(c.env.ae_d1, param, token);
    if (user) {
      return generateResponse(c, stripPwd(user), 422, NO_RECORDS_FOUND);
    }
  }
  return generateResponse(c, null, 422, 'Invalid password reset link.');
});
userRoute.get('/verification/:token', async (c) => {
  const { token } = await c.req.param();
  const user = await userModel.getUserForRegistration(c.env.ae_d1, token);
  return generateResponse(c, stripPwd(user), 422, NO_RECORDS_FOUND);
});

userRoute.post('/logout', async (c) => {
  await deleteCookie(c, 'ae_cookie', {
    path: '/',
    secure: true,
    httpOnly: true,
    maxAge: 40000,
    sameSite: c.env.DOMAIN === 'localhost' ? 'None' : 'Strict',
  });
  return generateResponse(c, { ok: true }, 422, LOGGED_OUT);
});

userRoute.post('/register', async (c) => {
  const param = (await c.req.json()) as User;
  const user = await authModel.register(c.env.ae_d1, param);
  await sendInvitationEmail(
    c.env.APP_URL,
    user as User,
    c.env.SENDGRID_API_KEY
  );
  return generateResponse(c, stripPwd(user), 422, COULDNT_ADD_DATA);
});

userRoute.post('/register-complete', async (c) => {
  const param = (await c.req.json()) as User;
  const user = await authModel.registerComplete(c.env.ae_d1, param);
  return generateResponse(c, stripPwd(user), 422, COULDNT_ADD_DATA);
});
userRoute.get('user-profile/:Id', async (c) => {
  try {
    const { Id } = await c.req.param();
    const user = await userModel.getBy(c.env.ae_d1, 'Id', Id);
    if (user.length > 0) {
      const userProfile = UserProfileSchema.parse(user[0]);
      return generateResponse(c, userProfile, 200, 'User found');
    } else {
      return generateResponse(c, null, 404, 'User not found');
    }
  } catch (error) {
    return generateResponse(c, null, 500, 'Internal Server Error');
  }
});
export default {
  route: userRoute,
  path: '/users',
};

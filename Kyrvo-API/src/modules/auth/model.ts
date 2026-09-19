import { ROLES } from '../shared/const';
import { generateToken } from '../shared/utils/jwt';
import * as baseModel from '../shared/baseModel';
import { Permission, permissionModel } from '../permissions/model';
import { User } from '../users/model';
const SALT = 'p-ewcR$h8]R:xB*Va}Sw(nTqqa+aRDNu]PEoFto,Rgxa+m}cT:j@U;H0Zn,{gYJ';

const TABLE = 'User';

export type Param = {
  Email: string;
  Pwd: string;
};

export type Auth = {
  User: User;
  Token: string;
  Permissions: Permission[];
};

export const login = async (
  d1: D1Database,
  param: Param,
): Promise<Auth | undefined> => {
  const user = await baseModel.get(d1, TABLE, {
    conditions: 'Email=?1 and Pwd =?2',
    params: [param.Email, await hashPassword(param.Pwd)],
  });
  if (user) {
    const permissions = await permissionModel.getBy(d1, 'RoleId', user.RoleId);
    const auth: Auth = {
      User: user,
      Token: await generateToken(user),
      Permissions: permissions,
    };
    return auth;
  }
  return undefined;
};

export const register = async (
  d1: D1Database,
  param: User,
): Promise<User | undefined> => {
  if (param.Pwd) {
    param.Pwd = await hashPassword(param.Pwd);
  }
  param.Id = crypto.randomUUID();
  param.IsNew = 1;
  param.RoleId = ROLES.USER;
  param.IsVerified = '0';
  param.VerificationToken = crypto.randomUUID();
  return baseModel.create(d1, TABLE, param);
};

export const requestReset = async (
  d1: D1Database,
  param: User,
): Promise<User | undefined> => {
  if (param.Pwd) {
    param.Pwd = await hashPassword(param.Pwd);
  }
  const VerificationToken = crypto.randomUUID();
  const user = { Email: param.Email, VerificationToken };
  return baseModel.patch(d1, TABLE, user, {
    conditions: 'Email = ?1',
    params: [user.Email],
  });
};

export const registerComplete = async (
  d1: D1Database,
  param: User,
): Promise<User | undefined> => {
  param.IsNew = 0;
  param.IsVerified = '1';
  param.RoleId = ROLES.USER;
  return baseModel.patch(d1, TABLE, param, {
    conditions: 'VerificationToken = ?1',
    params: [param.VerificationToken],
  });
};
export const resetPassword = async (
  d1: D1Database,
  param: User,
  token: string,
): Promise<User | undefined> => {
  const user = {
    Pwd: await hashPassword(param.Pwd),
    VerificationToken: crypto.randomUUID(),
  } as User;
  return baseModel.patch(d1, TABLE, user, {
    conditions: 'VerificationToken = ?1',
    params: [token],
  });
};

async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

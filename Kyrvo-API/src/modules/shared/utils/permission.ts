import { getCookie } from 'hono/cookie';
import { ROLES } from '../const';
import { verifyToken } from './jwt';
import { safelyPraseInt } from './misc';
import { permissionModel } from 'modules/permissions/model';

export const verifyRole = async (roleIds: string[], token: string) => {
  if (token) {
    const payload = await verifyToken(token);
    if (roleIds.indexOf(payload.RoleId) > -1) {
      return true;
    }
  }
  return false;
};
export const verifyUser = async (userId: number, token: string) => {
  if (token) {
    const payload = await verifyToken(token);
    return payload.Id === userId;
  }
  return false;
};

export const adminFeature = async (c: any, next: any) => {
  const cookie = await getCookie(c, 'ae_cookie');
  console.log(cookie);
  const { Id } = await verifyToken(cookie as string);
  c.set('userId', Id);
  if (cookie) {
    if (await verifyRole([ROLES.ADMIN, ROLES.SUPER], cookie)) {
      return await next(c);
    }
  }
  return c.json(
    {
      error: 'Unauthorized! Please login with appropriate permissions.',
      ok: false,
      c: cookie,
    },
    401,
  );
};

export const requiredPermission = async (
  c: any,
  next: any,
  feature: string,
  level: number,
) => {
  const cookie = await getCookie(c, 'ae_cookie');
  const payload = await verifyToken(cookie as string);
  c.set('userId', payload.Id);
  const roleId = payload.RoleId;
  const permissions = await permissionModel.getBy(
    c.env.ae_d1,
    'RoleId',
    roleId,
  );

  if (cookie) {
    if (
      permissions?.find(
        (x) => x.FeatureId === feature && x.PermissionLevel >= level,
      )
    ) {
      return await next(c);
    }
  }
  return c.json(
    {
      error: 'Unauthorized! Please login with appropriate permissions.',
      ok: false,
      c: cookie,
    },
    401,
  );
};

export const publicFeature = async (c: any, callback: any) => {
  return await callback();
};

export const restrictByRoles = async (
  c: any,
  roles: string[],
  callback: any,
) => {
  const cookie = (await getCookie(c, 'ae_cookie')) || '';
  if (await verifyRole(roles, cookie)) {
    return await callback();
  }
  return c.json({ error: 'Unauthorized', ok: false });
};

export const restrictByRole = async (c: any, role: string, callback: any) => {
  const cookie = (await getCookie(c, 'ae_cookie')) || '';
  if (await verifyRole([role], cookie)) {
    return await callback();
  }
  return c.json({ error: 'Unauthorized', ok: false });
};

export const userSpecificPlusAdmin = async (c: any, next: any) => {
  const params = await c.req.param();
  if (params) {
    const { Id } = params;
    const cookie = (await getCookie(c, 'ae_cookie')) || '';
    if (await verifyRole([ROLES.ADMIN, ROLES.SUPER], cookie)) {
      return await next(c);
    }
    if (await verifyUser(safelyPraseInt(Id), cookie)) {
      return await next(c);
    }
    return c.json({ error: 'Unauthorized', ok: cookie });
  }
};

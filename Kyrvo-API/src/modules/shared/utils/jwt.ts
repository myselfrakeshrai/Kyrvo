import { sign, verify, jwt } from 'hono/jwt';
import { TOKEN } from '../const';
import { getCookie } from 'hono/cookie';

export const generateToken = async (payload: any) => {
  return await sign(payload, TOKEN);
};

export const verifyToken = async (token: string) => {
  if (!token) {
    return false;
  }
  return await verify(token, TOKEN);
};

export const requireAuth = jwt({ secret: TOKEN, cookie: 'auth_cookie' });

export const verifyRole = async (
  roleIds: number[],
  authorizationHeader: string,
) => {
  if (authorizationHeader) {
    const [prefix, token] = authorizationHeader.split(' ');
    if (prefix !== 'Bearer') {
      return false;
    }
    const payload = await verifyToken(token);
    if (roleIds.indexOf(payload.role) > -1) {
      return true;
    }
  }
  return false;
};

export const getRequestUserId = async (c: any) => {
  const cookie = await getCookie(c, 'ae_cookie');
  if (cookie) {
    const payload = await verifyToken(cookie);
    return payload.Id;
  }
  return null;
};

import type { FastifyRequest } from '@mrx/server';
import { defineMiddleware, getServerLocator } from '@mrx/server';
import { getLogger, parseCookie } from '@mrx/utils';
import type { AuthServerService } from '../services/auth.service';

const isAuthenticated = (req: FastifyRequest) => {
  const service = getServerLocator<AuthServerService>('auth');
  if (req.headers.cookie) {
    const access_token = parseCookie(req.headers.cookie, 'access_token');
    if (access_token) {
      req.auth = service.GetUserByToken(access_token);
      req.token = access_token;
    }
  }
};

export const useMiddleware = async (req: any, _: any, next: any) => {
  isAuthenticated(req);
  next();
};

export default defineMiddleware(async (req, _) => {
  getLogger().debug(`Guard: Is Authenticated`);
  isAuthenticated(req);
});

import type { IAuth } from '@mrx/plugin-admin/types';

declare module 'fastify' {
  interface FastifyRequest {
    auth?: IAuth;
    token?: string;
  }
}

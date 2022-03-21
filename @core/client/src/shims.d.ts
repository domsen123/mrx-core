import type { FastifyReply, FastifyRequest } from '@mrx/types';

declare module 'vite-ssr/vue' {
  export interface Context {
    request: FastifyRequest;
    response: FastifyReply;
  }
}

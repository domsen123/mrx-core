import { defineEndpoint } from '@mrx/server';
import { AUTH_ENDPOINT } from '@mrx/types';

export default defineEndpoint({
  url: AUTH_ENDPOINT.SIGN_OUT,
  method: 'GET',
  handler: async (_, reply) => {
    reply
      .headers({
        'set-cookie': [
          `access_token=_; Max-Age=-1; Path=/; HttpOnly`,
          `refresh_token=_; Max-Age=-1; Path=/; HttpOnly`,
        ],
      })
      .send();
  },
});

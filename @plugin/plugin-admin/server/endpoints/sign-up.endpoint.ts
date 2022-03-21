import { defineEndpoint, getServerLocator } from '@mrx/server';
import type { SignUpRequest } from '@mrx/types';
import { AUTH_ENDPOINT } from '@mrx/types';
import type { AuthServerService } from '../services';

export default defineEndpoint({
  url: AUTH_ENDPOINT.SIGN_UP,
  method: 'POST',
  handler: async (req, reply) => {
    const { signUpDto, additional } = req.body as SignUpRequest;
    const service = getServerLocator<AuthServerService>('auth');
    const result = await service.SignUp(signUpDto);
    const {
      session: { access_token, refresh_token, max_age },
    } = result;

    reply
      .headers({
        'set-cookie': [
          `access_token=${access_token}; Max-Age=${max_age}; Path=/; HttpOnly`,
          `refresh_token=${refresh_token}; Max-Age=${
            max_age * 2
          }; Path=/; HttpOnly`,
        ],
      })
      .send(result);
  },
});

import { defineEndpoint, getLocator } from '@mrx/server';
import type { SignInRequest } from '@mrx/types/contracts';
import type { AuthServerService } from '../services/auth.service';

export default defineEndpoint({
  url: '/auth/sign-in',
  method: 'POST',
  handler: async (req, reply) => {
    const { signInDto, additional } = req.body as SignInRequest;
    const service = getLocator<AuthServerService>('auth');
    const result = await service.SignIn(signInDto);
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

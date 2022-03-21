import type { IAuth } from '@mrx/types';
import { AUTH_ENDPOINT } from '@mrx/types';
import type {
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
} from '@mrx/types/contracts';
import { toSignInRequest, toSignUpRequest } from '@mrx/types/contracts';
import { doRequest, useStore } from '@mrx/utils';

export const useAuth = () => {
  const store = useStore();
  const SignIn = async (dto: SignInDto, additional?: any) => {
    const {
      auth,
      session: { access_token },
    } = await doRequest<SignInResponse>({
      method: 'POST',
      url: AUTH_ENDPOINT.SIGN_IN,
      data: toSignInRequest(dto, additional),
    });
    store.setItem('currentAuth', auth);
    store.setItem('currentToken', access_token);
  };

  const SignUp = async (dto: SignUpDto, additional?: any) => {
    const {
      auth,
      session: { access_token },
    } = await doRequest<SignUpResponse>({
      method: 'POST',
      url: AUTH_ENDPOINT.SIGN_UP,
      data: toSignUpRequest(dto, additional),
    });
    store.setItem('currentAuth', auth);
    store.setItem('currentToken', access_token);
  };

  const SignOut = async () => {
    const store = useStore();
    await doRequest({
      method: 'GET',
      url: AUTH_ENDPOINT.SIGN_OUT,
    });
    store.setItem('currentAuth', undefined);
  };

  const isAuthenticated = (): boolean => !!store.getItem<IAuth>('currentAuth');

  return {
    SignIn,
    SignUp,
    SignOut,
    isAuthenticated,
  };
};

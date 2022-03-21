import type { IAuth, IToken } from '../interfaces';

export interface SignInDto {
  username: string;
  password: string;
}

export interface SignInRequest {
  signInDto: SignInDto;
  additional?: any;
}

export interface SignInResponse {
  auth: IAuth;
  session: IToken;
}

export const toSignInRequest = (
  dto: SignInDto,
  additional?: any,
): SignInRequest => {
  return { signInDto: dto, additional };
};

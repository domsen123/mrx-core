import type { IAuth, IToken } from '../interfaces';

export interface SignUpDto {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export interface SignUpRequest {
  signUpDto: SignUpDto;
  additional?: any;
}

export interface SignUpResponse {
  auth: IAuth;
  session: IToken;
}

export const toSignUpRequest = (
  dto: SignUpDto,
  additional?: any,
): SignUpRequest => {
  return { signUpDto: dto, additional };
};

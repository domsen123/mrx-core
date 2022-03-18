import { getDatabase } from '@mrx/server';

export class AuthServerService {
  constructor(
    private secret_string: string,
    private maxAge: number = 3600,
    private db = getDatabase(),
  ) {}

  public SignIn = async () => {};
  public SignUp = async () => {};
  public SignOut = async () => {};
}

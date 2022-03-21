import {
  createClientToken,
  getDatabase,
  omit,
  uuidv4,
  verifyPassword,
} from '@mrx/server';
import type { IAuth, IPermission, IRole, IToken, IUser } from '@mrx/types';
import { DB_TABLES } from '@mrx/types';
import type { SignInDto } from '@mrx/types/contracts';

export class AuthServerService {
  constructor(
    private secret_string: string = 'INSECURE',
    private maxAge: number = 3600,
    private db = getDatabase(),
  ) {}

  public SignIn = async (
    dto: SignInDto,
  ): Promise<{ auth: IAuth; session: IToken }> => {
    const { username, password } = dto;
    const user = await this.db<IUser>(DB_TABLES.USERS)
      .where({ username })
      .first();
    if (!user) throw { statusCode: 404, message: 'User does not exists!' };

    const match = await verifyPassword(password, user.password);
    if (!match) throw { statusCode: 400, message: 'Password does not match!' };

    const roles = (
      await this.db(DB_TABLES.USERS_ROLES)
        .join(
          DB_TABLES.ROLES,
          `${DB_TABLES.USERS_ROLES}.role_uuid`,
          `${DB_TABLES.ROLES}.uuid`,
        )
        .select(`${DB_TABLES.ROLES}.slug`)
        .where(`${DB_TABLES.USERS_ROLES}.user_uuid`, user.uuid)
    ).map((role: IRole) => role.slug);

    const permissions = (
      await this.db(DB_TABLES.USERS_PERMISSIONS)
        .join(
          DB_TABLES.PERMISSIONS,
          `${DB_TABLES.USERS_PERMISSIONS}.permission_uuid`,
          `${DB_TABLES.PERMISSIONS}.uuid`,
        )
        .select(`${DB_TABLES.PERMISSIONS}.slug`)
        .where(`${DB_TABLES.USERS_PERMISSIONS}.user_uuid`, user.uuid)
    ).map((permission: IPermission) => permission.slug);

    const auth: IAuth = {
      ...omit('password', user),
      roles,
      permissions,
    };

    const session: IToken = {
      access_token: createClientToken(auth, this.secret_string, this.maxAge),
      refresh_token: uuidv4(),
      max_age: this.maxAge,
    };
    return { auth, session };
  };

  public SignUp = async () => {};
  public SignOut = async () => {};
}

import {
  createClientToken,
  decodeClientToken,
  getDatabase,
  hashPassword,
  omit,
  toCreateItem,
  uuidv4,
  verifyPassword,
} from '@mrx/server';
import type {
  IAuth,
  IPermission,
  IRole,
  IToken,
  IUser,
  IUserUnsaved,
  IUsersRolesUnsaved,
} from '@mrx/types';
import { BASE_ROLE, DB_TABLES } from '@mrx/types';
import type { SignInDto, SignUpDto } from '@mrx/types/contracts';

export class AuthServerService {
  constructor(
    private secret_string: string = 'INSECURE',
    private maxAge: number = 3600,
    private db = getDatabase(),
  ) {}

  public GetRoleBySlug = async (slug: string): Promise<IRole | undefined> => {
    return await this.db<IRole>(DB_TABLES.ROLES).where({ slug }).first();
  };

  public GetPermissionBySlug = async (
    slug: string,
  ): Promise<IPermission | undefined> => {
    return await this.db<IPermission>(DB_TABLES.PERMISSIONS)
      .where({ slug })
      .first();
  };

  public GetRolesAndPermissions = async (
    user_uuid: string,
  ): Promise<{ roles: string[]; permissions: string[] }> => {
    const roles = (
      await this.db(DB_TABLES.USERS_ROLES)
        .join(
          DB_TABLES.ROLES,
          `${DB_TABLES.USERS_ROLES}.role_uuid`,
          `${DB_TABLES.ROLES}.uuid`,
        )
        .select(`${DB_TABLES.ROLES}.slug`)
        .where(`${DB_TABLES.USERS_ROLES}.user_uuid`, user_uuid)
    ).map((role: IRole) => role.slug);

    const permissions = (
      await this.db(DB_TABLES.USERS_PERMISSIONS)
        .join(
          DB_TABLES.PERMISSIONS,
          `${DB_TABLES.USERS_PERMISSIONS}.permission_uuid`,
          `${DB_TABLES.PERMISSIONS}.uuid`,
        )
        .select(`${DB_TABLES.PERMISSIONS}.slug`)
        .where(`${DB_TABLES.USERS_PERMISSIONS}.user_uuid`, user_uuid)
    ).map((permission: IPermission) => permission.slug);

    return { roles, permissions };
  };

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

    const { roles, permissions } = await this.GetRolesAndPermissions(user.uuid);

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

  public SignUp = async (
    dto: SignUpDto,
  ): Promise<{ auth: IAuth; session: IToken }> => {
    const { firstname, lastname, username, password } = dto;
    const user = await this.db<IUser>(DB_TABLES.USERS)
      .where({ username })
      .first();
    if (user) throw { statusCode: 400, message: 'User already exists!' };

    const dbUser = toCreateItem<IUserUnsaved>(
      {
        username,
        password: await hashPassword(password),
      },
      true,
    );
    const dbProfile = toCreateItem<any>(
      {
        uuid: dbUser.uuid,
        firstname,
        lastname,
      },
      dbUser.uuid,
    );
    const role = await this.GetRoleBySlug(BASE_ROLE.VISITOR);

    const dbUsersRoles = toCreateItem<IUsersRolesUnsaved>(
      {
        role_uuid: role!.uuid,
        user_uuid: dbUser.uuid,
      },
      dbUser.uuid,
    );

    await Promise.all([
      this.db(DB_TABLES.USERS).insert(dbUser),
      this.db(DB_TABLES.PROFILES).insert(dbProfile),
      this.db(DB_TABLES.USERS_ROLES).insert(dbUsersRoles),
    ]);

    const { roles, permissions } = await this.GetRolesAndPermissions(
      dbUser.uuid,
    );

    const auth: IAuth = {
      ...omit('password', dbUser),
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

  public SignOut = async () => {};

  public GetUserByToken = (access_token: string): IAuth => {
    const {
      iat: _,
      exp: __,
      maxAge: ___,
      ...user
    } = decodeClientToken(access_token, this.secret_string);
    return user as IAuth;
  };
}

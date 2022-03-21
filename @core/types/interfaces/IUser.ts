import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { BaseSchema } from './IBase';

export const UserSchemaUnsaved = Type.Object({
  username: Type.String({ title: 'Username' }),
  password: Type.String({ title: 'Password', hidden: true }),
});
export const UserSchema = Type.Intersect([UserSchemaUnsaved, BaseSchema]);

export const UsersRolesSchemaUnsaved = Type.Object({
  user_uuid: Type.String({ title: 'User', format: 'uuid' }),
  role_uuid: Type.String({ title: 'Role', format: 'uuid' }),
});

export const UsersRolesSchema = Type.Intersect([
  UsersRolesSchemaUnsaved,
  BaseSchema,
]);

export const UsersPermissionsSchemaUnsaved = Type.Object({
  user_uuid: Type.String({ title: 'User', format: 'uuid' }),
  permission_uuid: Type.String({ title: 'Permission', format: 'uuid' }),
});
export const UsersPermissionsSchema = Type.Intersect([
  UsersPermissionsSchemaUnsaved,
  BaseSchema,
]);

export type IUserUnsaved = Static<typeof UserSchemaUnsaved>;
export type IUser = Static<typeof UserSchema>;

export type IUsersRolesUnsaved = Static<typeof UsersRolesSchemaUnsaved>;
export type IUsersRoles = Static<typeof UsersRolesSchema>;

export type IUsersPermissionsUnsaved = Static<
  typeof UsersPermissionsSchemaUnsaved
>;
export type IUsersPermissions = Static<typeof UsersPermissionsSchema>;

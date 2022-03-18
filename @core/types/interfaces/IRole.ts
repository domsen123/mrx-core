import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { BaseSchema } from './IBase';

export const RoleSchemaUnsaved = Type.Object({
  slug: Type.String({ title: 'Slug' }),
  name: Type.String({ title: 'Name' }),
  description: Type.String({ title: 'Description' }),
});
export const RoleSchema = Type.Intersect([RoleSchemaUnsaved, BaseSchema]);

export const RolesPermissionsSchemaUnsaved = Type.Object({
  role_uuid: Type.String({ title: 'Role', format: 'uuid' }),
  permission_uuid: Type.String({ title: 'Role', format: 'uuid' }),
});

export const RolesPermissionsSchema = Type.Intersect([
  RolesPermissionsSchemaUnsaved,
  BaseSchema,
]);

export type IRoleUnsaved = Static<typeof RoleSchemaUnsaved>;
export type IRole = Static<typeof RoleSchema>;

export type IRolesPermissionsUnsaved = Static<
  typeof RolesPermissionsSchemaUnsaved
>;
export type IRolesPermissions = Static<typeof RolesPermissionsSchema>;

import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { BaseSchema } from './IBase';
import { UserSchemaUnsaved } from './IUser';

export const AuthSchema = Type.Intersect([
  Type.Omit(UserSchemaUnsaved, ['password']),
  Type.Object({
    roles: Type.Array(Type.String({ title: 'role_slug' })),
    permissions: Type.Array(Type.String({ title: 'permission_slug' })),
  }),
  BaseSchema,
]);

export type IAuth = Static<typeof AuthSchema>;

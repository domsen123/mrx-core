import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { BaseSchema } from './IBase';

export const PermissionSchemaUnsaved = Type.Object({
  slug: Type.String({ title: 'Slug' }),
  name: Type.String({ title: 'Name' }),
  description: Type.String({ title: 'Description' }),
});
export const PermissionSchema = Type.Intersect([
  PermissionSchemaUnsaved,
  BaseSchema,
]);
export type IPermissionUnsaved = Static<typeof PermissionSchemaUnsaved>;
export type IPermission = Static<typeof PermissionSchema>;

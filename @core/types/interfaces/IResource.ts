import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { BaseSchema } from './IBase';

export const ResourceSchemaUnsaved = Type.Object({
  name: Type.String({ title: 'Name' }),
});
export const ResourceSchema = Type.Intersect([
  ResourceSchemaUnsaved,
  BaseSchema,
]);
export type IResourceUnsaved = Static<typeof ResourceSchemaUnsaved>;
export type IResource = Static<typeof ResourceSchema>;

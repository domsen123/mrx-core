import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { BaseSchema } from './IBase';

export const ProfileSchemaUnsaved = Type.Object({
  firstname: Type.String({ title: 'Firstname' }),
  lastname: Type.String({ title: 'Lastname' }),
});
export const ProfileSchema = Type.Intersect([ProfileSchemaUnsaved, BaseSchema]);
export type IProfileUnsaved = Static<typeof ProfileSchemaUnsaved>;
export type IProfile = Static<typeof ProfileSchema>;

import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { BaseSchema } from './IBase';
import { ComponentResolvedSchema } from './IComponent';

export const LayoutSchemaUnsaved = Type.Object({
  name: Type.String({ title: 'name' }),
});
export const LayoutSchema = Type.Intersect([LayoutSchemaUnsaved, BaseSchema]);

export const LayoutResolved = Type.Intersect([
  LayoutSchema,
  Type.Object({
    components: Type.Array(ComponentResolvedSchema),
  }),
]);
export type ILayoutUnsaved = Static<typeof LayoutSchemaUnsaved>;
export type ILayout = Static<typeof LayoutSchema>;
export type ILayoutResolved = Static<typeof LayoutResolved>;

import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { BaseSchema } from './IBase';

export const ComponentSchemaUnsaved = Type.Object({
  component: Type.String({ title: 'Html Component' }),
  innerText: Type.Optional(Type.String({ title: 'InnerText' })),
  innerHtml: Type.Optional(Type.String({ title: 'InnerText' })),
  parent: Type.Optional(
    Type.String({ title: 'Parent', format: 'uuid', index: true }),
  ),
  slot: Type.Optional(Type.String({ title: 'Slot', default: 'default' })),
  bindings: Type.Optional(Type.Any({ format: 'object' })),
});
export const ComponentSchema = Type.Intersect([
  ComponentSchemaUnsaved,
  BaseSchema,
]);
export const ComponentResolvedSchema = Type.Intersect([
  ComponentSchema,
  Type.Object({
    components: Type.Array(ComponentSchema),
  }),
]);
export type IComponentUnsaved = Static<typeof ComponentSchemaUnsaved>;
export type IComponent = Static<typeof ComponentSchema>;
export type IComponentResolved = Static<typeof ComponentResolvedSchema>;

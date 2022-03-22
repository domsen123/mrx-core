import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { BaseSchema } from './IBase';
import { ComponentResolvedSchema } from './IComponent';
import { LayoutResolved } from './ILayout';

export const RouteSchemaUnsaved = Type.Object({
  name: Type.String({ title: 'name' }),
  path: Type.String({ title: 'Path' }),
  // slot: Type.Optional(Type.String({ title: 'Slot', default: 'default' })),
  layout: Type.Optional(Type.String({ title: 'Layout', format: 'uuid' })),
  needsAuth: Type.Optional(Type.Boolean({ title: 'Needs Authentication' })),
});
export const RouteSchema = Type.Intersect([RouteSchemaUnsaved, BaseSchema]);

export const RouteResolved = Type.Intersect([
  RouteSchema,
  Type.Object({
    components: Type.Array(ComponentResolvedSchema),
    layout: Type.Optional(LayoutResolved),
  }),
]);
export type IRouteUnsaved = Static<typeof RouteSchemaUnsaved>;
export type IRoute = Static<typeof RouteSchema>;
export type IRouteResolved = Static<typeof RouteResolved>;

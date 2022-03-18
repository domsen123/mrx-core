import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

export const BaseSchema = Type.Object({
  uuid: Type.String({ format: 'uuid', title: 'Uuid' }),
  created_at: Type.String({ format: 'date-time', title: 'Created at' }),
  updated_at: Type.String({ format: 'date-time', title: 'Updated at' }),
  created_by: Type.String({ format: 'uuid', title: 'Created by' }),
  updated_by: Type.String({ format: 'uuid', title: 'Updated by' }),
});

export type IBase = Static<typeof BaseSchema>;

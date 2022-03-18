import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

export const TokenSchema = Type.Object({
  access_token: Type.String(),
  refresh_token: Type.String(),
  max_age: Type.Number({ default: 3600 }),
});

export type IToken = Static<typeof TokenSchema>;

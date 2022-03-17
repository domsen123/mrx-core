import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import type { Context } from '@mrx/client/types';

export const install = ({ app }: Context) => {
  app.use(
    createVuetify({
      components,
      directives,
    }),
  );
};

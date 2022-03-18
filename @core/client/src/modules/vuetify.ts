import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import type { Context } from '@mrx/client/types';
import { useClientSettings } from '@mrx/utils';

export const install = ({ app }: Context) => {
  const theme = useClientSettings().getSetting('theme');
  app.use(
    createVuetify({
      components,
      directives,
      theme,
    }),
  );
};

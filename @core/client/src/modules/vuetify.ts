import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
export const install = ({ app }: any) => {
  app.use(
    createVuetify({
      components,
      directives,
    }),
  );
};

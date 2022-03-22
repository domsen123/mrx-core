import { DB_TABLES } from '@mrx/types';
import type {
  IComponent,
  IComponentResolved,
  ILayout,
  ILayoutResolved,
  IRoute,
  IRouteResolved,
} from '@mrx/types';
import { getDatabase } from './serverDatabase';

const getChildComponents = async (component: IComponentResolved) => {
  const db = getDatabase();
  if (!db) return;
  const components = await db<IComponentResolved>(DB_TABLES.COMPONENTS).where({
    parent: component.uuid,
  });

  component.components = components;
  for (const c of components) {
    await getChildComponents(c);
  }
};

export const getRouteInformation = async ({
  url,
}: {
  url: string;
}): Promise<IRoute | undefined> => {
  const db = getDatabase();
  if (!db) return;
  const routeTableExists = await db.schema.hasTable(DB_TABLES.ROUTES);
  if (routeTableExists) {
    const { pathname: path } = new URL(url);
    // prettier-ignore
    const route = await db<IRoute>(DB_TABLES.ROUTES).where({path}).first()
    if (route) {
      let __layout: ILayoutResolved | undefined;
      if (route.layout) {
        // prettier-ignore
        __layout = await db<ILayoutResolved>(DB_TABLES.LAYOUTS).where({ uuid: route.layout }).first();
        if (__layout) {
          // prettier-ignore
          const layoutComponents = await db<IComponentResolved>(DB_TABLES.COMPONENTS).where({ parent: __layout.uuid });
          for (const component of layoutComponents) {
            await getChildComponents(component);
          }
          __layout.components = layoutComponents ?? [];
        }
      }
      const components = await db<IComponentResolved>(
        DB_TABLES.COMPONENTS,
      ).where({
        parent: route.uuid,
      });
      for (const component of components) {
        await getChildComponents(component);
      }
      const t: IRouteResolved = {
        ...route,
        components,
        layout: __layout,
      };
      return t;
    }

    // const pageInfo = await db<IRoute>(DB_TABLES.ROUTES)
    //   .where({
    //     path: pathname,
    //   })
    //   .first();
    // if (pageInfo) {
    //   const components = await db<IComponent>(DB_TABLES.COMPONENTS).where({
    //     parent: pageInfo.uuid,
    //   });
    //   for (const component of components) {
    //     await getChildComponents(component);
    //   }
    //   // @ts-expect-error ...
    //   pageInfo.components = components;
    // }
    // return pageInfo;
  }
};

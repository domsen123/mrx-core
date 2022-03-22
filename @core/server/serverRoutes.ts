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

const replaceWithSlot = (
  layout: IComponentResolved[],
  slotContent: IComponentResolved[],
  slotName: string,
) => {
  for (const _l of layout) {
    if (_l.component === 'slot') {
      return slotContent;
    } else {
      // @ts-expect-error ...
      const _t = replaceWithSlot(_l.components, slotContent, slotName);
      if (_t) _l.components = _t;
    }
  }
};

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
    const route = await db<IRoute>(DB_TABLES.ROUTES).where({path}).first<IRouteResolved>()
    if (route) {
      // Check if Route has a layout
      let __layout: ILayoutResolved | undefined;
      if (route.layout) {
        __layout = await db<ILayoutResolved>(DB_TABLES.LAYOUTS)
          .where({ uuid: route.layout })
          .first();
        if (__layout) {
          // Root Layout Components
          const layoutComponents = await db<IComponentResolved>(
            DB_TABLES.COMPONENTS,
          ).where({ parent: __layout.uuid });
          for (const layoutComponent of layoutComponents) {
            // Fetch recursive
            await getChildComponents(layoutComponent);
          }
          route.components = layoutComponents;
        }
      }
      // prettier-ignore
      const pageComponents = await db<IComponentResolved>(DB_TABLES.COMPONENTS).where({parent: route.uuid});
      const slots: Record<string, IComponentResolved[]> = {};
      for (const pageComponent of pageComponents) {
        const appendToSlot = pageComponent.slot ?? 'default';
        if (!slots[appendToSlot]) slots[appendToSlot] = [];
        await getChildComponents(pageComponent);
        slots[appendToSlot].push(pageComponent);
      }
      if (__layout) {
        Object.keys(slots).forEach((slotName) => {
          const _t = replaceWithSlot(
            route.components,
            slots[slotName],
            slotName,
          );
          if (_t) route.components = _t;
        });
      }

      return route;
      // let __layout: ILayoutResolved | undefined;
      // if (route.layout) {
      //   // prettier-ignore
      //   __layout = await db<ILayoutResolved>(DB_TABLES.LAYOUTS).where({ uuid: route.layout }).first();
      //   if (__layout) {
      //     // prettier-ignore
      //     const layoutComponents = await db<IComponentResolved>(DB_TABLES.COMPONENTS).where({ parent: __layout.uuid });
      //     for (const component of layoutComponents) {
      //       await getChildComponents(component);
      //     }
      //     __layout.components = layoutComponents ?? [];
      //   }
      // }
      // const components = await db<IComponentResolved>(
      //   DB_TABLES.COMPONENTS,
      // ).where({
      //   parent: route.uuid,
      // });
      // for (const component of components) {
      //   await getChildComponents(component);
      // }
      // const t: IRouteResolved = {
      //   ...route,
      //   components,
      //   layout: __layout,
      // };
      // return route;
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

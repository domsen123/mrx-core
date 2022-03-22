import type { Knex } from '@mrx/server';
import { hashPassword, toCreateItem } from '@mrx/server';
import { BASE_PERMISSION, BASE_ROLE, DB_TABLES, ILayout } from '@mrx/types';
import type {
  IComponent,
  IComponentUnsaved,
  ILayoutUnsaved,
  IPermission,
  IPermissionUnsaved,
  IProfileUnsaved,
  IResourceUnsaved,
  IRole,
  IRoleUnsaved,
  IRolesPermissionsUnsaved,
  IRouteUnsaved,
  IUser,
  IUserUnsaved,
  IUsersRolesUnsaved,
} from '@mrx/types';
import resources from '../../resources';

export async function seed(knex: Knex): Promise<void> {
  const findRoleUuidBySlug = async (
    slug: BASE_ROLE,
  ): Promise<string | undefined> => {
    const item = await knex<IRole>(DB_TABLES.ROLES)
      .where({ slug })
      .select('uuid')
      .first();
    return item?.uuid;
  };

  const findPermissionUuidBySlug = async (
    slug: BASE_PERMISSION,
  ): Promise<string | undefined> => {
    const item = await knex<IPermission>(DB_TABLES.PERMISSIONS)
      .where({ slug })
      .select('uuid')
      .first();
    return item?.uuid;
  };

  // Create Admin User
  const [{ uuid: adminUuid }] = await knex<IUserUnsaved>(DB_TABLES.USERS)
    .insert(
      toCreateItem<IUserUnsaved>(
        {
          username: 'admin',
          password: await hashPassword('pass4word'),
        },
        true,
      ),
    )
    .returning<IUser[]>('uuid');
  // Create Admin Profile
  await knex<IProfileUnsaved>(DB_TABLES.PROFILES).insert(
    toCreateItem<any>(
      {
        uuid: adminUuid,
        firstname: 'Portal',
        lastname: 'Admin',
      },
      adminUuid,
    ),
  );

  // Create Permissions
  // prettier-ignore
  await knex<IPermissionUnsaved>(DB_TABLES.PERMISSIONS).insert([
    toCreateItem<IPermissionUnsaved>(
      { slug: BASE_PERMISSION.FULL_MASK, name: 'Full Mask', description: 'Can do anything.' }, adminUuid,
    ),
    toCreateItem<IPermissionUnsaved>(
      { slug: BASE_PERMISSION.VIEW_ITEM, name: 'View Item', description: 'Can view item.', }, adminUuid,
    ),
    toCreateItem<IPermissionUnsaved>(
      { slug: BASE_PERMISSION.UPDATE_ITEM, name: 'Update Item', description: 'Can update an item.' }, adminUuid,
    ),
    toCreateItem<IPermissionUnsaved>(
      { slug: BASE_PERMISSION.DELETE_ITEM, name: 'Delete Item', description: 'Can delete an item.' },
      adminUuid,
    ),
    toCreateItem<IPermissionUnsaved>(
      { slug: BASE_PERMISSION.CREATE_ITEM, name: 'Create Item', description: 'Can create an item.' },
      adminUuid,
    ),
    toCreateItem<IPermissionUnsaved>(
      { slug: BASE_PERMISSION.APPROVE_ITEM, name: 'Approve Item', description: 'Can approve an item.' },
      adminUuid,
    ),
    toCreateItem<IPermissionUnsaved>(
      { slug: BASE_PERMISSION.VIEW_VERSION, name: 'View Versions', description: 'Can view versions of an item.' },
      adminUuid,
    ),
    toCreateItem<IPermissionUnsaved>(
      { slug: BASE_PERMISSION.DELETE_VERSION, name: 'Delete Versions', description: 'Can delete versions of an item.' },
      adminUuid,
    ),
  ]);

  // Create Roles
  // prettier-ignore
  await knex<IRoleUnsaved>(DB_TABLES.ROLES).insert([
    toCreateItem<IRoleUnsaved>(
      { slug: BASE_ROLE.FULL_CONTROL, name: 'Full Controll', description: 'Has full controll to a resource.' },
      adminUuid
    ),
    toCreateItem<IRoleUnsaved>(
      { slug: BASE_ROLE.DESIGN, name: 'Design', description: 'Can view, add, update, delete, approve items and manage versions.' },
      adminUuid
    ),
    toCreateItem<IRoleUnsaved>(
      { slug: BASE_ROLE.CONTRIBUTE, name: 'Contribute', description: 'Can view, add, update and delete items.' },
      adminUuid
    ),
    toCreateItem<IRoleUnsaved>(
      { slug: BASE_ROLE.CREATE, name: 'Create', description: 'Can view, add, update items.' },
      adminUuid
    ),
    toCreateItem<IRoleUnsaved>(
      { slug: BASE_ROLE.READ, name: 'Read', description: 'Can view items.' },
      adminUuid
    ),
    toCreateItem<IRoleUnsaved>(
      { slug: BASE_ROLE.VISITOR, name: 'visitor', description: 'No Permissions.' },
      adminUuid
    ),
  ]);

  // Create Role Permission Bindings
  await knex<IRolesPermissionsUnsaved>(DB_TABLES.ROLES_PERMISSIONS).insert([
    // Permissions for Role "Full Controll"
    toCreateItem<IRolesPermissionsUnsaved>(
      {
        role_uuid: (await findRoleUuidBySlug(BASE_ROLE.FULL_CONTROL)) as string,
        permission_uuid: (await findPermissionUuidBySlug(
          BASE_PERMISSION.FULL_MASK,
        )) as string,
      },
      adminUuid,
    ),
    // Permissions for Role "Design",
    ...(await Promise.all(
      [
        BASE_PERMISSION.VIEW_ITEM,
        BASE_PERMISSION.UPDATE_ITEM,
        BASE_PERMISSION.DELETE_ITEM,
        BASE_PERMISSION.CREATE_ITEM,
        BASE_PERMISSION.APPROVE_ITEM,
        BASE_PERMISSION.VIEW_VERSION,
        BASE_PERMISSION.DELETE_VERSION,
      ].map(async (permission_slug) =>
        // prettier-ignore
        toCreateItem<IRolesPermissionsUnsaved>(
          {
            role_uuid: (await findRoleUuidBySlug(BASE_ROLE.DESIGN)) as string,
            permission_uuid: (await findPermissionUuidBySlug(permission_slug)) as string,
          },
          adminUuid,
        ),
      ),
    )),

    // Permissions for Role "Contribute",
    ...(await Promise.all(
      [
        BASE_PERMISSION.VIEW_ITEM,
        BASE_PERMISSION.UPDATE_ITEM,
        BASE_PERMISSION.DELETE_ITEM,
        BASE_PERMISSION.CREATE_ITEM,
      ].map(async (permission_slug) =>
        // prettier-ignore
        toCreateItem<IRolesPermissionsUnsaved>(
          {
            role_uuid: (await findRoleUuidBySlug(BASE_ROLE.CONTRIBUTE)) as string,
            permission_uuid: (await findPermissionUuidBySlug(permission_slug)) as string,
          },
          adminUuid,
        ),
      ),
    )),

    // Permissions for Role "Create",
    ...(await Promise.all(
      [
        BASE_PERMISSION.VIEW_ITEM,
        BASE_PERMISSION.UPDATE_ITEM,
        BASE_PERMISSION.CREATE_ITEM,
      ].map(async (permission_slug) =>
        // prettier-ignore
        toCreateItem<IRolesPermissionsUnsaved>(
          {
            role_uuid: (await findRoleUuidBySlug(BASE_ROLE.CREATE)) as string,
            permission_uuid: (await findPermissionUuidBySlug(permission_slug)) as string,
          },
          adminUuid,
        ),
      ),
    )),

    // Permissions for Role "View",
    ...(await Promise.all(
      [BASE_PERMISSION.VIEW_ITEM].map(async (permission_slug) =>
        // prettier-ignore
        toCreateItem<IRolesPermissionsUnsaved>(
          {
            role_uuid: (await findRoleUuidBySlug(BASE_ROLE.READ)) as string,
            permission_uuid: (await findPermissionUuidBySlug(permission_slug)) as string,
          },
          adminUuid,
        ),
      ),
    )),
  ]);

  // Crate User Role Bindings
  await knex<IUsersRolesUnsaved>(DB_TABLES.USERS_ROLES).insert([
    toCreateItem<IUsersRolesUnsaved>(
      {
        user_uuid: adminUuid,
        role_uuid: (await findRoleUuidBySlug(BASE_ROLE.FULL_CONTROL)) as string,
      },
      adminUuid,
    ),
  ]);

  // Create AdminLayout
  // prettier-ignore
  const adminLayout = toCreateItem<ILayoutUnsaved>(
    { name: 'AdminLayout' }, adminUuid,
  );

  // prettier-ignore
  const adminLayoutVApp = toCreateItem<IComponentUnsaved>(
    { component: 'v-app', parent: adminLayout.uuid }, adminUuid,
  );
  // prettier-ignore
  const adminLayoutVDefaultProvider = toCreateItem<IComponentUnsaved>(
    { component: 'v-defaults-provider', parent: adminLayoutVApp.uuid, bindings: JSON.stringify({}) }, adminUuid,
  );
  // prettier-ignore
  const adminLayoutVNavigationDrawer = toCreateItem<IComponentUnsaved>(
    { component: 'v-navigation-drawer', parent: adminLayoutVDefaultProvider.uuid }, adminUuid,
  );
  // prettier-ignore
  const adminLayoutVAppBar = toCreateItem<IComponentUnsaved>(
    { component: 'v-app-bar', parent: adminLayoutVDefaultProvider.uuid }, adminUuid,
  );
  // prettier-ignore
  const adminLayoutVMain = toCreateItem<IComponentUnsaved>(
    { component: 'v-main', parent: adminLayoutVDefaultProvider.uuid }, adminUuid,
  );
  // prettier-ignore
  const adminLayoutVDefaultSlot = toCreateItem<IComponentUnsaved>(
    { component: 'slot', parent: adminLayoutVMain.uuid, bindings: JSON.stringify({ name: 'default' }) }, adminUuid,
  );

  await knex<ILayoutUnsaved>(DB_TABLES.LAYOUTS).insert(adminLayout);
  await knex<IComponentUnsaved>(DB_TABLES.COMPONENTS).insert([
    adminLayoutVApp,
    adminLayoutVDefaultProvider,
    adminLayoutVNavigationDrawer,
    adminLayoutVAppBar,
    adminLayoutVMain,
    adminLayoutVDefaultSlot,
  ]);

  // Create AdminPage
  // prettier-ignore
  const adminPage = toCreateItem<IRouteUnsaved>(
    { name: 'Admin', path: '/_test', layout: adminLayout.uuid }, adminUuid
  );

  // Create AdminPage Components
  // prettier-ignore
  const adminPageHeadline = toCreateItem<IComponentUnsaved>(
    { component: 'h1', innerText: 'AdminPage', parent: adminPage.uuid }, adminUuid
  )

  const adminPageHeadline2 = toCreateItem<IComponentUnsaved>(
    { component: 'h2', innerText: 'SubHeader', parent: adminPage.uuid },
    adminUuid,
  );

  await knex<IRouteUnsaved>(DB_TABLES.ROUTES).insert(adminPage);
  await knex<IComponentUnsaved>(DB_TABLES.COMPONENTS).insert([
    adminPageHeadline,
    adminPageHeadline2,
  ]);

  // // Create Test Page
  // const testPage = toCreateItem<IRouteUnsaved>(
  //   {
  //     name: 'Test Page',
  //     path: '/_test',
  //     layout: 'AdminDashboard',
  //     needsAuth: false,
  //   },
  //   adminUuid,
  // );
  // await knex<IRouteUnsaved>(DB_TABLES.ROUTES).insert(testPage);

  // const testComponent = toCreateItem<IComponentUnsaved>(
  //   {
  //     parent: testPage.uuid,
  //     component: 'h1',
  //     innerText: 'Das ist eine Überschrift',
  //   },
  //   adminUuid,
  // );
  // const nestedComponent = toCreateItem<IComponentUnsaved>(
  //   {
  //     parent: testPage.uuid,
  //     component: 'v-container',
  //   },
  //   adminUuid,
  // );
  // const insideComp = toCreateItem<IComponentUnsaved>(
  //   {
  //     component: 'h2',
  //     innerText: 'Das ist genested',
  //     parent: nestedComponent.uuid,
  //   },
  //   adminUuid,
  // );
  // await knex<IComponentUnsaved>(DB_TABLES.COMPONENTS).insert([
  //   testComponent,
  //   nestedComponent,
  //   insideComp,
  // ]);
}

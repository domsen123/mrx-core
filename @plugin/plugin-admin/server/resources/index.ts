import { DB_TABLES } from '@mrx/types';
import {
  ComponentSchemaUnsaved,
  LayoutSchemaUnsaved,
  PermissionSchemaUnsaved,
  ProfileSchemaUnsaved,
  ResourceSchemaUnsaved,
  RoleSchemaUnsaved,
  RolesPermissionsSchemaUnsaved,
  RouteSchemaUnsaved,
  UserSchemaUnsaved,
  UsersPermissionsSchemaUnsaved,
  UsersRolesSchemaUnsaved,
} from '@mrx/types/interfaces';

export default [
  // RESOURCES HAVE TO BE FIRST!
  {
    name: DB_TABLES.RESOURCES,
    schema: ResourceSchemaUnsaved,
  },
  {
    name: DB_TABLES.ROUTES,
    schema: RouteSchemaUnsaved,
  },
  {
    name: DB_TABLES.LAYOUTS,
    schema: LayoutSchemaUnsaved,
  },
  {
    name: DB_TABLES.COMPONENTS,
    schema: ComponentSchemaUnsaved,
  },
  {
    name: DB_TABLES.USERS,
    schema: UserSchemaUnsaved,
  },
  {
    name: DB_TABLES.PROFILES,
    schema: ProfileSchemaUnsaved,
  },
  {
    name: DB_TABLES.ROLES,
    schema: RoleSchemaUnsaved,
  },
  {
    name: DB_TABLES.PERMISSIONS,
    schema: PermissionSchemaUnsaved,
  },
  {
    name: DB_TABLES.USERS_PERMISSIONS,
    schema: UsersPermissionsSchemaUnsaved,
  },
  {
    name: DB_TABLES.USERS_ROLES,
    schema: UsersRolesSchemaUnsaved,
  },
  {
    name: DB_TABLES.ROLES_PERMISSIONS,
    schema: RolesPermissionsSchemaUnsaved,
  },
];

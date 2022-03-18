import { DB_TABLES } from '@mrx/types';
import {
  PermissionSchemaUnsaved,
  ProfileSchemaUnsaved,
  RoleSchemaUnsaved,
  RolesPermissionsSchemaUnsaved,
  UserSchemaUnsaved,
  UsersPermissionsSchemaUnsaved,
  UsersRolesSchemaUnsaved,
} from '@mrx/types/interfaces';

export default [
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

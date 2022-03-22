export enum DB_TABLES {
  USERS = 'users',
  PROFILES = 'profiles',
  ROLES = 'roles',
  PERMISSIONS = 'permissions',
  USERS_ROLES = 'users_roles',
  USERS_PERMISSIONS = 'users_permissions',
  ROLES_PERMISSIONS = 'roles_permissions',
  RESOURCES = 'resources',
  ROUTES = 'page_routes',
  LAYOUTS = 'page_layouts',
  COMPONENTS = 'page_components',
}

export enum BASE_PERMISSION {
  FULL_MASK = 'full_mask',
  VIEW_ITEM = 'view_item',
  UPDATE_ITEM = 'update_item',
  DELETE_ITEM = 'delete_item',
  CREATE_ITEM = 'create_item',
  APPROVE_ITEM = 'approve_item',
  VIEW_VERSION = 'view_version',
  DELETE_VERSION = 'delete_version',
}

export enum BASE_ROLE {
  FULL_CONTROL = 'full_control',
  DESIGN = 'design',
  CONTRIBUTE = 'contribute',
  CREATE = 'create',
  READ = 'read',
  VISITOR = 'visitor',
}

export enum AUTH_ENDPOINT {
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
  SIGN_OUT = '/auth/sign-out',
}

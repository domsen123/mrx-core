import type { Component } from '@mrx/types';

export interface AdminNavItem {
  to?: string;
  text: string;
  icon?: Component;
  childs?: AdminNavItem[];
}

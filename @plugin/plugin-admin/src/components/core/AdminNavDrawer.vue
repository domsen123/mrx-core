<template lang="pug">
v-navigation-drawer
  v-toolbar(height="64")

  v-list( density="compact")
    AdminNavListItem(v-for="item in getAdminNavigation()" :item="item")
  
</template>

<script lang="ts" setup>
import { useAdminNav } from '../../composables';
import { AdminNavListItem } from './index';
defineComponent({ name: 'AdminNavDrawer' });
const { getAdminNavigation } = useAdminNav();
</script>

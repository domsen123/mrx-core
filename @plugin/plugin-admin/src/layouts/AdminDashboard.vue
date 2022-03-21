<template lang="pug">
v-app
  v-defaults-provider(:defaults="defaults")
    v-navigation-drawer
    v-app-bar.border-b
      v-spacer
      v-btn(@click="onSignOut") Sign Out
    v-main
      router-view
</template>

<script lang="ts" setup>
import { redirect } from '@mrx/utils';
import defaults from '../vuetifyDefaults';
import { useAuth } from '../services';

const router = useRouter();
const onSignOut = async () => {
  await useAuth().SignOut();
  await redirect('/', router);
};
</script>

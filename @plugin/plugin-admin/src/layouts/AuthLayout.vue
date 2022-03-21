<template lang="pug">
v-app
  v-defaults-provider(:defaults="defaults")
    v-main.auth-layout
      v-layout.d-flex.flex-grow-1(:style="styles")
        v-spacer
        v-col.d-flex.flex-column.elevation-5.pa-0.bg-background(cols="3")
          v-toolbar.bg-transparent
            v-btn(v-if="source" icon @click="$router.back()")
              i-ph-arrow-left
          v-container.d-flex.flex-grow-1.flex-column.justify-center(fuid)
              router-view
</template>

<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router';
import defaults from '../vuetifyDefaults';
import BackgroundImage from '../assets/img/bg.jpg';
const source = useRouteQuery('source', '');

const styles = {
  backgroundImage: `url(${BackgroundImage})`,
};
</script>

<style lang="scss">
.auth-layout {
  position: fixed !important;
  inset: 0;
  .v-main__wrap {
    display: flex;
    position: relative;
    display: flex;
  }
}
</style>

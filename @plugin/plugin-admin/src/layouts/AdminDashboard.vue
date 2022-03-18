<template lang="pug">
v-defaults-provider(:defaults="defaults")
  v-navigation-drawer
  v-app-bar.border-b
  v-main
    router-view
</template>

<script lang="ts" setup>
import defaults from '../vuetifyDefaults';
</script>

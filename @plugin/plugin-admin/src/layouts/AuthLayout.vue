<template lang="pug">
v-main.auth-layout
  v-layout.d-flex.flex-grow-1
    v-spacer
    v-col.elevation-5.pa-0(cols="3")
      v-toolbar.bg-transparent
        v-btn(icon="mdi-heart")
      v-container(fuid)
        router-view
</template>

<script lang="ts" setup></script>

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

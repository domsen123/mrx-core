<template lang="pug">
page-builder-component(v-if="layout" v-for="component in layout" :component="component")
  page-builder-component(v-for="component in components" :component="component")
</template>

<script lang="ts" setup>
import type { IRoute, IRouteResolved } from '@mrx/types';
import { useHead } from '@vueuse/head';
import type { Component, PropType } from 'vue';
import PageBuilderComponent from '../components/PageBuilderComponent.vue';

defineComponent({
  name: 'PageBuilder',
});
const props = defineProps({
  pageInfo: {
    type: Object as PropType<IRouteResolved>,
    required: false,
  },
});

const layout = computed(() => {
  if (props.pageInfo?.layout) {
    return props.pageInfo.layout.components;
  }
  return [];
});
const components = computed(() => {
  if (props.pageInfo?.components) {
    return props.pageInfo.components;
  }
  return [];
});
</script>

<template lang="pug">
component(v-if="component" :is="component.component" v-bind="JSON.parse(component.bindings ?? '{}')" :data-tag="component.component")
  template(v-if="component.innerHtml || component.innerText")
    template(v-if="component.innerText") {{ component.innerText}}
    template(v-if="component.innerHtml") #[div(v-html="component.innerHtml")]
  template(v-else-if="component.components.length > 0")
    template(v-for="child in component.components")
      //- slot(v-if="child.component === 'slot'")
      page-builder-component(:component="child")
  slot
</template>

<script lang="ts" setup>
import type { IComponentResolved } from '@mrx/types';
import type { PropType } from 'vue';

defineComponent({
  name: 'PageBuilderComponent',
});
defineProps({
  component: {
    type: Object as PropType<IComponentResolved>,
    required: true,
  },
});
</script>

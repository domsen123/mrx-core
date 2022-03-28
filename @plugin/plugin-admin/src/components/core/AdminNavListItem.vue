<template lang="pug">
v-list-item(v-if="!item.childs" :to="item.to")
  v-list-item-avatar(v-if="item.icon" left) #[component.d-flex.align-center.justify-center(:is="item.icon")]
  v-list-item-title(v-text="item.text")
v-list-group(v-else)
  template(#activator="{ props }")
    v-list-item(:to="item.to" v-bind="props")
      v-list-item-avatar(v-if="item.icon" left) #[component.d-flex.align-center.justify-center(:is="item.icon")]
      v-list-item-title.d-flex.flex-grow-1(v-text="item.text")
      template(#append)
        v-list-item-avatar(right) #[component.d-flex.align-center.justify-center.text-caption(:is="IconCaretDown")]
  admin-nav-list-item(v-for="child in item.childs" :item="child")
    
</template>

<script lang="ts" setup>
import type { AdminNavItem } from '@mrx/plugin-admin/types';
import type { PropType } from '@mrx/types';
import IconCaretDown from '~icons/ph/caret-down';
import IconCaretLeft from '~icons/ph/caret-left';
defineComponent({ name: 'AdminNavListItem' });
defineProps({
  item: {
    type: Object as PropType<AdminNavItem>,
    required: true,
  },
});

// const isOpen = ref<boolean>(false);
</script>

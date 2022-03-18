<template lang="pug">
v-form(@submit.prevent="onPasswordReset" v-model="valid")
  v-text-field(
    label="E-Mail" 
    v-model="form.mail"
    :rules="[v => !!v || 'E-Mail is required']"
    required
  )
    template(#appendInner) #[i-ph-user]

  v-btn(color="primary" size="large" block type="submit") Reset my password
</template>

<script lang="ts" setup>
const form = reactive({
  mail: '',
});
const valid = ref<boolean>(false);

// Methods
const onPasswordReset = async () => console.warn(`onPasswordReset`, form);
</script>

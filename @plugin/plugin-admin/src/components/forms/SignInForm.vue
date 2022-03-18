<template lang="pug">
v-form(@submit.prevent="onSignIn" v-model="valid")
  v-text-field(
    label="E-Mail"
    v-model="form.username"
     :rules="[v => !!v || 'E-Mail is required']"
    required
  )
    template(#appendInner) #[i-ph-user]
  v-text-field(
    label="Password" 
    v-model="form.password" 
    :type="showPassword ? 'text' : 'password'"
    :rules="[v => !!v || 'Password is required']"
    required
  )
    template(#appendInner)
      .d-flex(@click="showPassword = !showPassword")
        i-ph-eye(v-if="showPassword")
        i-ph-eye-closed(V-else)
  
  v-btn(color="primary" size="large" block type="submit") Sign In
</template>

<script lang="ts" setup>
const valid = ref<boolean>(false);
const onSignIn = async () => {};

const showPassword = ref<boolean>(false);
const form = reactive<any>({
  username: 'admin',
  password: 'pass4word',
});
</script>

<template lang="pug">
v-form(@submit.prevent="onSignUp" v-model="valid")
  v-row(dense)
    v-col(cols="6")
      v-text-field(
        label="Firstname" 
        v-model="form.firstname"
        :rules="[v => !!v || 'Firstname is required']"
        required
      )
    v-col(cols="6")
      v-text-field(
        label="Lastname" 
        v-model="form.lastname"
        :rules="[v => !!v || 'Lastname is required']"
        required
      )

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
  
  v-slide-y-transition
    v-text-field(
      v-if="!showPassword"
      label="Confirm Password" 
      v-model="form.confirm" 
      type="password"
      :rules="[v => !showPassword ? !!v || 'Confirm is requird' : true, v => !showPassword ? v === form.password || 'Passwords does not match' : true ]"
    )  

  v-btn(color="primary" size="large" block type="submit") Sign Up
</template>

<script lang="ts" setup>
const showPassword = ref<boolean>(false);
const form = reactive<any>({
  firstname: 'Dominic',
  lastname: 'Marx',
  username: 'dmarx@marxulm.de',
  password: 'lala4712',
  confirm: 'lala4712',
});
const valid = ref<boolean>(false);

// Methods
const onSignUp = async () => {};
</script>

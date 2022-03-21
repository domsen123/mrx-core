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
import type { SignInDto } from '@mrx/types/contracts';
import { getLogger, redirect } from '@mrx/utils';
import { useAuth } from '../../services';

const router = useRouter();
const valid = ref<boolean>(false);

const showPassword = ref<boolean>(false);
const form = reactive<SignInDto>({
  username: 'admin',
  password: 'pass4word',
});

const onSignIn = async () => {
  try {
    await useAuth().SignIn(form);
    await redirect('/', router);
  } catch (e: any) {
    getLogger().error(`Error: SignIn: %s`, e.message ?? 'UNKNOWN');
  }
};
</script>

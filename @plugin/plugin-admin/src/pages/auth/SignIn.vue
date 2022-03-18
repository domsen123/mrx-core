<template lang="pug">
.d-block
  h1.text-h3.mb-8 Sign In
  sign-in-form.mb-8
  p.text-center.text-body-1.mb-4 I don't have an account yet! Let me #[router-link(to="/auth/sign-up") create one]!
  p.text-center.text-body-1 #[router-link(to="/auth/reset-password") I forgot my password]!
</template>

<script lang="ts" setup>
import { SignInForm } from '../../components/forms';
</script>

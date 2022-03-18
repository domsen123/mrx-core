<template lang="pug">
.d-block
  h1.text-h3.mb-8 Reset Password
  reset-password-form.mb-8
  p.text-center.text-body-1.mb-4 Oh I do remember! Let me #[router-link(to="/auth") sign in]!
</template>

<script lang="ts" setup>
import { ResetPasswordForm } from '../../components/forms';
</script>

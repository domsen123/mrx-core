<template lang="pug">
.d-block
  h1.text-h3.mb-8 Sign Up
  sign-up-form.mb-8
  p.text-center.text-body-1.mb-4 I already have an account! Let me #[router-link(to="/auth") sign in]!
</template>

<script lang="ts" setup>
import { SignUpForm } from '../../components/forms';
</script>

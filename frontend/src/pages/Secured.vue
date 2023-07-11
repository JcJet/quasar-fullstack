<template>
  <h1>Protected route</h1>
  <h3>Your email: {{ getUser.email }}</h3>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Index',
  computed: {
    ...mapGetters('auth', ['getUser']),
  },
};
</script>

<style scoped></style>

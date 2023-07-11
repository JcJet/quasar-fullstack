<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'App',
  beforeCreate() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.$store.dispatch('auth/init');
    const token = this.$store.getters.getToken;
    if (token) {
      api.defaults.headers.common.Authorization = 'JWT ' + String(token.access);
    } else {
      api.defaults.headers.common.Authorization = '';
    }
  },
  created() {
    this.$q.dark.set(true);
  },
});
</script>

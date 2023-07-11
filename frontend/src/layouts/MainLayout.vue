<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Auth</q-item-label>
        <q-item to="/login" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section> Login </q-item-section>
        </q-item>
        <q-item @click="logout" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section> Logout </q-item-section>
        </q-item>

        <q-item-label header>Users CRUD</q-item-label>
        <q-item to="/form-user" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="add_circle" />
          </q-item-section>
          <q-item-section> Registration </q-item-section>
        </q-item>
        <q-item to="/users" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section> Users database </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  methods: {
    logout() {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.$store.dispatch('auth/logout');
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.$router.push('/');
    },
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

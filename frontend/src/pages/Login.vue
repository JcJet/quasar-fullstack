<template>
  <div class="row" style="height: 90vh">
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
      >
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h3 text-uppercase q-my-none text-weight-regular">
                Login
              </h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm">
            <q-input label="Email" v-model="loginData.email"> </q-input>
            <q-input
              label="Password"
              type="password"
              v-model="loginData.password"
            >
            </q-input>
            <div>
              <q-btn
                class="full-width"
                color="primary"
                label="Login"
                type="submit"
                rounded
              ></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-white" to="/login"
                  >Create an account</router-link
                >
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { mapActions } from 'vuex';

let $q;

export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        email: 'admin@admin.com',
        password: 'admin',
      },
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submitForm() {
      if (!this.loginData.email || !this.loginData.password) {
        $q.notify({
          type: 'negative',
          message: 'Both fields are required',
        });
      } else if (this.loginData.password.length < 5) {
        $q.notify({
          type: 'negative',
          message: 'Password: min 5 characters',
        });
      } else {
        try {
          await this.login(this.loginData);
          const toPath = this.$route.query.to || '/secured';
          this.$router.push(toPath);
        } catch (err) {
          console.log(response);
          if (err.response.data.detail) {
            $q.notify({
              type: 'negative',
              message: err.response.data.detail,
            });
          }
        }
      }
    },
  },
  mounted() {
    $q = useQuasar();
  },
};
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>

<template>
  <img src="~assets/wave.png" class="wave" alt="login-wave" />
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/login.svg" class="responsive" alt="login-image" />
    </div>
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
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/avatar.svg" alt="avatar" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">
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
                  >Esqueceu a senha?</router-link
                >
                <router-link class="text-white" to="/login"
                  >Criar conta</router-link
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
          message: 'Os dados informados são inválidos.',
        });
      } else if (this.loginData.password.length < 5) {
        $q.notify({
          type: 'negative',
          message: 'A senha deve ter 5 ou mais caracteres.',
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

<!-- <template>
  <div class="fixed fixed-center bg-grey-1 text-white">
    <form v-on:submit.prevent="onSubmit()">
      <q-card
        square
        class="flex-center text-center"
        style="width: 400px; padding: 50px"
      >
        <img
          src="/statics/quasar-logo.png"
          style="max-width: 300px; padding-top: 30px; padding-bottom: 50px"
        />
        <q-card-separator />
        <div class="text-left">
          <q-input
            id="username"
            type="text"
            v-model.trim="form.username"
            float-label="User Name"
            required
            autofocus
          />
          <q-input
            id="password"
            type="password"
            v-model="form.password"
            float-label="Password"
            required
          /><br />
        </div>
        <q-card-actions>
          <q-btn type="submit" class="fit" color="primary">Login</q-btn>
        </q-card-actions>
      </q-card>
    </form>
  </div>
</template>

<style></style>

<script>
export default {
  data() {
    return {
      drawerState: true,
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions('user', ['login']),
    onSubmit() {
      this.$store
        .dispatch('user/login', {
          email: this.form.email,
          password: this.form.password,
        })
        .then(
          (response) => {},
          (res) => {
            console.log('Res: ', res);
          }
        );
    },
  },
};
</script> -->

<!-- <template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
            <div class="text-grey-8">Sign in below to access your account</div>
          </q-card-section>
          <q-card-section>
            <q-input
              dense
              outlined
              v-model="email"
              label="Email Address"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="password"
              type="password"
              label="Password"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="dark"
              rounded
              size="md"
              label="Sign in"
              no-caps
              class="full-width"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Don't have an account yet?
              <a
                href="#"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Sign up.</a
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template> -->

<!-- <template>
  <q-page padding class="">
    <q-card>
      <q-card-title> Login </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-field
          icon="mail"
          label="Email"
          label-width="3"
          @blur="$v.form.email.$touch"
          :error="$v.form.email.$error"
          helper="Enter your registered email address to Log in"
          error-label="Please type a valid email address"
        >
          <q-input type="email" v-model="form.email" />
        </q-field>
        <q-field
          icon="vpn_key"
          label="Password"
          label-width="3"
          helper="Enter your password"
          :error="$v.form.email.$error"
          error-label="Please type a valid password"
        >
          <q-input type="password" v-model="form.password" />
        </q-field>
      </q-card-main>
      <q-card-separator />
      <q-card-actions align="center">
        <q-btn color="primary" align="center" label="Log In" @click="submit" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
//import { required, email } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  // validations: {
  //   form: {
  //     email: { required, email },
  //     password: { required },
  //   },
  // },
  methods: {
    submit() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify('Please review fields again.');
      }
      this.$store
        .dispatch('user/login', {
          email: this.form.email,
          password: this.form.password,
          strategy: 'local',
        })
        .then(() => {
          this.$router.push('/secured');
        });
    },
  },
};
</script>

<style></style> -->

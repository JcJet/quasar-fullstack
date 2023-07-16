<!-- eslint-disable max-len -->
<template>
  <q-page padding>
    <q-form @submit="handleSubmit()" class="row q-col-gutter-sm">
      <q-input
        filled
        v-model="form.firstName"
        label="Your Name *"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Please type min 1 and max 191 characters',
        ]"
        class="col-lg-6 col-xs-12"
        type="text"
      />
      <q-input
        filled
        v-model="form.lastName"
        label="Your Last Name *"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Please type min 1 and max 191 characters',
        ]"
        class="col-lg-6 col-xs-12"
        type="text"
      />
      <q-input
        filled
        v-model="form.phone"
        label="Your Phone"
        lazy-rules
        :rules="[
          (val) =>
            (val && (val.length >= 10 || val.length <= 12)) ||
            'Phone must be between 10 and 12 characters',
        ]"
        class="col-lg-6 col-xs-12"
        type="text"
      />
      <q-input
        filled
        v-model="form.email"
        label="Your email *"
        lazy-rules
        class="col-lg-6 col-xs-12"
        type="email"
        :rules="[
          (val, rules) =>
            rules.email(val) || 'Please enter a valid email address',
        ]"
      />
      <q-input
        filled
        v-model="form.password"
        label="Your Password"
        class="col-lg-6 col-xs-12"
        type="password"
      />
      <q-input
        filled
        v-model="form.bio"
        label="About"
        class="col-lg-6 col-xs-12"
        type="text"
      />
      <q-select
        v-model="form.id"
        class="col-lg-6 col-xs-12"
        style="display: none"
      />

      <div class="col-12 q-gutter-sm">
        <q-btn
          label="Save"
          type="submit"
          color="primary"
          class="float-right"
          icon="save"
          @submit="handleSubmit()"
        />
        <q-btn
          label="Cancel"
          color="white"
          class="float-right"
          text-color="primary"
          :to="{ name: 'users' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'FormUser',
  setup() {
    const form = ref({
      firstName: '',
      lastName: '',
      id: '',
      email: '',
    });
    const route = useRoute();
    const getUsersById = async (id) => {
      try {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const { data } = await api.get(`profile/${id}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data;
      } catch (error) {
        $q.notify({
          message: 'Error get users',
          icon: 'times',
          color: 'negative',
        });
        void router.push({ name: 'login' });
      }
    };
    onMounted(async () => {
      if (route.params.id) {
        const response = await getUsersById(route.params.id);
        form.value = response;
      }
    });
    const $q = useQuasar();
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const post = async (form) => {
      try {
        const { data } = await api.post('registration', form.value);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return 201;
      } catch (error) {
        return Number(error.response.status);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const update = async (form) => {
      try {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const { data } = await api.put(
          `profile/${route.params.id[0]}`,
          form.value
        );
        $q.notify({
          message: 'User updated',
          icon: 'check',
          color: 'positive',
        });
        void router.push({ name: 'users' });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data;
      } catch (error) {
        throw new Error(error);
      }
    };

    const handleSubmit = async () => {
      if (route.params.id) {
        try {
          await update(form);
        } catch (error) {
          $q.notify({
            message: 'Error User not updated',
            icon: 'times',
            color: 'negative',
          });
        }
      } else {
        const statusCode = await post(form);
        switch (statusCode) {
          case 201: {
            $q.notify({
              message: 'User created',
              icon: 'check',
              color: 'positive',
            });
            void router.push({ name: 'login' });
            break;
          }
          case 409: {
            $q.notify({
              message: 'Email already exists',
              icon: 'times',
              color: 'negative',
            });
            break;
          }
          default: {
            $q.notify({
              message: `Status code: ${statusCode}`,
              icon: 'times',
              color: 'negative',
            });
            break;
          }
        }
      }
    };

    return {
      form,
      handleSubmit,
    };
  },
});
</script>

<style></style>

<!-- eslint-disable max-len -->
<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table title="Users" :rows="users" :columns="columns" row-key="name">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn
              icon="edit"
              color="info"
              dense
              size="sm"
              @click="handleEditUser(props.row.id)"
            />
            <q-btn
              icon="delete"
              color="negative"
              dense
              size="sm"
              @click="handleDeleteUser(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
      <div class="col-12 padding q-gutter-sm">
        <q-space />
        <q-btn
          label="Back"
          color="white"
          class="float-right"
          text-color="primary"
          :to="{ name: 'home' }"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const users = ref([]);
    const columns = [
      {
        name: 'id',
        field: 'id',
        label: 'Id',
        sortable: true,
        align: 'left',
      },
      {
        name: 'firstName',
        field: 'firstName',
        label: 'FirstName',
        sortable: true,
        align: 'left',
      },
      {
        name: 'lastName',
        field: 'lastName',
        label: 'LastName',
        sortable: true,
        align: 'left',
      },
      {
        name: 'phone',
        field: 'phone',
        label: 'Phone',
        sortable: true,
        align: 'left',
      },
      {
        name: 'email',
        field: 'email',
        label: 'E-mail',
        sortable: true,
        align: 'left',
      },
      {
        name: 'bio',
        field: 'bio',
        label: 'Bio',
        sortable: true,
        align: 'left',
      },
      {
        name: 'actions',
        field: 'actions',
        label: 'Actions',
        align: 'right',
      },
    ];
    const $router = useRouter();
    const $route = useRoute();
    const $q = useQuasar();

    // eslint-disable-next-line @typescript-eslint/require-await
    const handleEditUser = async (id) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      $router.push({ name: 'formUser', params: { id } });
    };
    const getUsers = async () => {
      try {
        const { model, query } = $route.query;
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const { data } = await api.get(`profile/?${model}=${query}`);
        console.log(data);
        users.value = data;
      } catch (error) {
        $q.notify({
          message: 'Error User not found',
          icon: 'times',
          color: 'negative',
        });
      }
    };

    // eslint-disable-next-line consistent-return
    const remove = async (id) => {
      try {
        const data = await api.delete(`profile/${String(id)}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data;
      } catch (error) {
        throw new Error(error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/require-await
    const handleDeleteUser = async (id) => {
      try {
        $q.dialog({
          dark: true,
          title: 'Confirm',
          message: 'Would you like to delete user?',
          cancel: true,
          persistent: true,
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
        }).onOk(async () => {
          await remove(id);
          $q.notify({
            message: 'User deleted',
            icon: 'check',
            color: 'positive',
          });
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          $router.push({ name: 'home' });
        });
      } catch (error) {
        $q.notify({
          message: 'Error User delete',
          icon: 'times',
          color: 'negative',
        });
      }
    };

    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getUsers();
    });

    return {
      columns,
      users,
      handleEditUser,
      handleDeleteUser,
    };
  },
});
</script>

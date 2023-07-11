import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
      {
        path: '/users',
        name: 'users',
        component: () => import('pages/Users.vue'),
        meta: { requireLogin: true },
      },
      {
        path: 'form-user/:id?',
        name: 'formUser',
        component: () => import('pages/FormUser.vue'),
      },
      {
        path: 'form-filter',
        name: 'formFilter',
        component: () => import('pages/FilterRow.vue'),
      },
      {
        path: '/secured',
        component: () => import('pages/Secured.vue'),
        meta: { requireLogin: true },
      },
      {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: () => import('pages/Error401.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;

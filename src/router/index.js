import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import Catalog from '@/views/Catalog.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import CartView from '@/views/CartView.vue';
import Orders from '@/views/Orders.vue';

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    return next();
  }
  return next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    return next();
  }
  return next('/login');
};

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: Catalog
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: ifAuthenticated
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
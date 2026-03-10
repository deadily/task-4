import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createStore } from 'vuex';
import { loginRequest } from '@/utils/api.js';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export default createStore({
  state: {
    token: localStorage.getItem('myActivationToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myActivationToken', token);
            resolve();
          })
          .catch(() => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myActivationToken');
            reject();
          });
      });
    },
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    },
  },
});

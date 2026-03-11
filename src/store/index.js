<<<<<<< HEAD
import { createStore } from 'vuex';
import { api } from '@/utils/api';

export default createStore({
  state: {
    token: localStorage.getItem('user_token') || null,
    products: [],
    cart: [],
    orders: []
  },

  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    
    getProducts(state) {
      return state.products;
    },
    
    getCart(state) {
      return state.cart;
    },
    
    getOrders(state) {
      return state.orders;
    },
    
    cartTotal(state) {
      return state.cart.reduce((sum, item) => sum + item.price, 0);
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('user_token', token);
      } else {
        localStorage.removeItem('user_token');
      }
    },

    SET_PRODUCTS(state, products) {
      state.products = products;
    },

    SET_CART(state, cart) {
      state.cart = cart;
    },

    SET_ORDERS(state, orders) {
      state.orders = orders;
    },

    REMOVE_FROM_CART(state, itemId) {
      state.cart = state.cart.filter(item => item.id !== itemId);
    },

    CLEAR_CART(state) {
      state.cart = [];
    }
  },

  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await api.login(email, password);
        commit('SET_TOKEN', response.data.user_token);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async register({ commit }, { fio, email, password }) {
      try {
        const response = await api.register(fio, email, password);
        commit('SET_TOKEN', response.data.user_token);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async logout({ commit }) {
      try {
        await api.logout();
      } finally {
        commit('SET_TOKEN', null);
      }
    },

    async fetchProducts({ commit }) {
      try {
        const response = await api.getProducts();
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      }
    },

    async addToCart({ commit, dispatch }, productId) {
      try {
        await api.addToCart(productId);
        await dispatch('fetchCart');
      } catch (error) {
        console.error('Ошибка добавления в корзину:', error);
      }
    },

    async fetchCart({ commit }) {
      try {
        const response = await api.getCart();
        commit('SET_CART', response.data);
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
      }
    },

    async removeFromCart({ commit, dispatch }, itemId) {
      try {
        await api.removeFromCart(itemId);
        commit('REMOVE_FROM_CART', itemId);
        await dispatch('fetchCart');
      } catch (error) {
        console.error('Ошибка удаления:', error);
      }
    },

    async createOrder({ commit, dispatch }) {
      try {
        await api.createOrder();
        commit('CLEAR_CART');
        await dispatch('fetchOrders');
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async fetchOrders({ commit }) {
      try {
        const response = await api.getOrders();
        commit('SET_ORDERS', response.data);
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
      }
    }
  }
=======
import { createStore } from 'vuex';
import { api } from '@/utils/api';

export default createStore({
  state: {
    token: localStorage.getItem('user_token') || null,
    products: [],
    cart: [],
    orders: []
  },

  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    
    getProducts(state) {
      return state.products;
    },
    
    getCart(state) {
      return state.cart;
    },
    
    getOrders(state) {
      return state.orders;
    },
    
    cartTotal(state) {
      return state.cart.reduce((sum, item) => sum + item.price, 0);
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('user_token', token);
      } else {
        localStorage.removeItem('user_token');
      }
    },

    SET_PRODUCTS(state, products) {
      state.products = products;
    },

    SET_CART(state, cart) {
      state.cart = cart;
    },

    SET_ORDERS(state, orders) {
      state.orders = orders;
    },

    REMOVE_FROM_CART(state, itemId) {
      state.cart = state.cart.filter(item => item.id !== itemId);
    },

    CLEAR_CART(state) {
      state.cart = [];
    }
  },

  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await api.login(email, password);
        commit('SET_TOKEN', response.data.user_token);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async register({ commit }, { fio, email, password }) {
      try {
        const response = await api.register(fio, email, password);
        commit('SET_TOKEN', response.data.user_token);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async logout({ commit }) {
      try {
        await api.logout();
      } finally {
        commit('SET_TOKEN', null);
      }
    },

    async fetchProducts({ commit }) {
      try {
        const response = await api.getProducts();
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        throw error;
      }
    },

    async addToCart({ commit, dispatch }, productId) {
      try {
        await api.addToCart(productId);
        await dispatch('fetchCart');
      } catch (error) {
        console.error('Ошибка добавления в корзину:', error);
        throw error;
      }
    },

    async fetchCart({ commit }) {
      try {
        const response = await api.getCart();
        commit('SET_CART', response.data);
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
        throw error;
      }
    },

    async removeFromCart({ commit, dispatch }, itemId) {
      try {
        await api.removeFromCart(itemId);
        commit('REMOVE_FROM_CART', itemId);
        await dispatch('fetchCart');
      } catch (error) {
        console.error('Ошибка удаления:', error);
        throw error;
      }
    },

    async createOrder({ commit, dispatch }) {
      try {
        await api.createOrder();
        commit('CLEAR_CART');
        await dispatch('fetchOrders');
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async fetchOrders({ commit }) {
      try {
        const response = await api.getOrders();
        commit('SET_ORDERS', response.data);
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
        throw error;
      }
    }
  }
>>>>>>> c31032b843f1248faf391c98763a54d46ecf6651
});
<template>
  <div class="orders-page">
    <h1>Мои заказы</h1>

    <div v-if="loading" class="loading">
      <p>Загрузка заказов...</p>
    </div>

    <div v-else-if="orders.length === 0" class="empty-orders">
      <p>У вас пока нет заказов</p>
      <router-link to="/" class="btn btn-primary">ПЕРЕЙТИ К ПОКУПКАМ</router-link>
    </div>

    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <h3>Заказ #{{ order.id }}</h3>
        <p>Товаров: {{ order.products.length }}</p>
        <p class="price">Сумма: {{ order.order_price }} ₽</p>
      </div>
    </div>

    <div class="back-link">
      <router-link to="/" class="btn btn-secondary">НАЗАД</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Orders',

  data() {
    return {
      loading: false
    };
  },

  computed: {
    ...mapGetters(['getOrders']),
    orders() {
      return this.getOrders;
    }
  },

  async created() {
    await this.loadOrders();
  },

  methods: {
    ...mapActions(['fetchOrders']),

    async loadOrders() {
      this.loading = true;
      await this.fetchOrders();
      this.loading = false;
    }
  }
};
</script>
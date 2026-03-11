<<<<<<< HEAD
<template>
  <div class="cart-page">
    <h1>Корзина</h1>

    <div v-if="loading" class="loading">
      <p>Загрузка корзины...</p>
    </div>

    <div v-else-if="cart.length === 0" class="empty-cart">
      <p>Корзина пуста</p>
      <router-link to="/" class="btn btn-primary">ПЕРЕЙТИ К ПОКУПКАМ</router-link>
    </div>

    <div v-else>

      <div class="cart-items">
        <div v-for="item in groupedCart" :key="item.productId" class="cart-item">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p class="price">{{ item.price }} ₽</p>
          </div>
          
          <div class="item-controls">
            <button @click="decreaseQuantity(item)" class="btn btn-small btn-secondary">−</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)" class="btn btn-small btn-primary">+</button>
            <button @click="removeItem(item)" class="btn btn-small btn-danger">УДАЛИТЬ</button>
          </div>
        </div>
      </div>

      <div class="cart-total">
        <h3>ИТОГО: {{ totalPrice }} ₽</h3>
        <div class="cart-actions">
          <button @click="checkout" class="btn btn-success btn-large" :disabled="processing">
            {{ processing ? 'ОФОРМЛЕНИЕ...' : 'ОФОРМИТЬ ЗАКАЗ' }}
          </button>
          <router-link to="/" class="btn btn-secondary">НАЗАД</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CartView',

  data() {
    return {
      loading: false,
      processing: false
    };
  },

  computed: {
    ...mapGetters(['getCart']),
    
    cart() {
      return this.getCart;
    },

    groupedCart() {
      const grouped = {};
      
      this.cart.forEach(item => {
        if (!grouped[item.product_id]) {
          grouped[item.product_id] = {
            ...item,
            quantity: 0,
            cartItems: []
          };
        }
        grouped[item.product_id].quantity++;
        grouped[item.product_id].cartItems.push(item);
      });
      
      return Object.values(grouped);
    },

    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    }
  },

  async created() {
    await this.loadCart();
  },

  methods: {
    ...mapActions(['fetchCart', 'addToCart', 'removeFromCart', 'createOrder']),

    async loadCart() {
      this.loading = true;
      await this.fetchCart();
      this.loading = false;
    },

    async increaseQuantity(item) {
      await this.addToCart(item.product_id);
    },

    async decreaseQuantity(item) {
      if (item.quantity > 1 && item.cartItems.length > 0) {
        await this.removeFromCart(item.cartItems[0].id);
      }
    },

    async removeItem(item) {
      if (item.cartItems.length > 0) {
        await this.removeFromCart(item.cartItems[0].id);
      }
    },

    async checkout() {
      this.processing = true;
      
      try {
        const result = await this.createOrder();
        
        if (result.success) {
          this.$router.push('/orders');
        }
      } catch (error) {
        console.error('Checkout error:', error);
      } finally {
        this.processing = false;
      }
    }
  }
};
=======
<template>
  <div class="cart-page">
    <h1>Корзина</h1>

    <div v-if="loading" class="loading">
      <p>Загрузка корзины...</p>
    </div>

    <div v-else-if="cart.length === 0" class="empty-cart">
      <p>Корзина пуста</p>
      <router-link to="/" class="btn btn-primary">ПЕРЕЙТИ К ПОКУПКАМ</router-link>
    </div>

    <div v-else>
      <div class="cart-items">
        <div v-for="item in groupedCart" :key="item.productId" class="cart-item">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p class="price">{{ item.price }} ₽</p>
          </div>
          
          <div class="item-controls">
            <button @click="decreaseQuantity(item)" class="btn btn-small btn-secondary">−</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)" class="btn btn-small btn-primary">+</button>
            <button @click="removeItem(item)" class="btn btn-small btn-danger">УДАЛИТЬ</button>
          </div>
        </div>
      </div>

      <div class="cart-total">
        <h3>ИТОГО: {{ totalPrice }} ₽</h3>
        <div class="cart-actions">
          <button @click="checkout" class="btn btn-success btn-large" :disabled="processing">
            {{ processing ? 'ОФОРМЛЕНИЕ...' : 'ОФОРМИТЬ ЗАКАЗ' }}
          </button>
          <router-link to="/" class="btn btn-secondary">НАЗАД</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CartView',

  data() {
    return {
      loading: false,
      processing: false
    };
  },

  computed: {
    ...mapGetters(['getCart']),
    
    cart() {
      return this.getCart;
    },

    groupedCart() {
      const grouped = {};
      
      this.cart.forEach(item => {
        if (!grouped[item.product_id]) {
          grouped[item.product_id] = {
            ...item,
            quantity: 0,
            cartItems: []
          };
        }
        grouped[item.product_id].quantity++;
        grouped[item.product_id].cartItems.push(item);
      });
      
      return Object.values(grouped);
    },

    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    }
  },

  async created() {
    await this.loadCart();
  },

  methods: {
    ...mapActions(['fetchCart', 'addToCart', 'removeFromCart', 'createOrder']),

    async loadCart() {
      this.loading = true;
      await this.fetchCart();
      this.loading = false;
    },

    async increaseQuantity(item) {
      await this.addToCart(item.product_id);
    },

    async decreaseQuantity(item) {
      if (item.quantity > 1 && item.cartItems.length > 0) {
        await this.removeFromCart(item.cartItems[0].id);
      }
    },

    async removeItem(item) {
      if (item.cartItems.length > 0) {
        await this.removeFromCart(item.cartItems[0].id);
      }
    },

    async checkout() {
      this.processing = true;
      
      try {
        const result = await this.createOrder();
        
        if (result.success) {
          alert('Заказ успешно оформлен!');
          this.$router.push('/orders');
        } else {
          alert('Ошибка: ' + result.error);
        }
      } catch (error) {
        alert('Произошла ошибка при оформлении заказа');
        console.error('Checkout error:', error);
      } finally {
        this.processing = false;
      }
    }
  }
};
>>>>>>> c31032b843f1248faf391c98763a54d46ecf6651
</script>
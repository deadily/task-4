<template>
  <div class="catalog">
    <header class="catalog-header">
      <h1>Каталог товаров</h1>
      <nav>
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn-primary">Войти</router-link>
          <router-link to="/register" class="btn btn-secondary">Регистрация</router-link>
        </template>
        <template v-else>
          <router-link to="/orders" class="btn btn-secondary">Мои заказы</router-link>
          <router-link to="/cart" class="btn btn-success">
            Корзина
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </router-link>
          <button @click="handleLogout" class="btn btn-danger">Выйти</button>
        </template>
      </nav>
    </header>

    <div v-if="loading" class="loading">
      <p>Загрузка товаров...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadProducts" class="btn btn-primary">Повторить</button>
    </div>

    <div v-else class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image-wrapper">
          <img 
            :src="productImage(product)" 
            :alt="product.name"
            class="product-image"
            @error="onImageError"
          >
        </div>
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }} ₽</p>
        <button 
          v-if="isAuthenticated" 
          @click="handleAddToCart(product.id)"
          class="btn btn-primary btn-add-to-cart"
        >
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Catalog',
  
  data() {
    return {
      loading: false,
      error: null,
    };
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'getProducts', 'getCart']),
    
    products() {
      return this.getProducts;
    },

    cartCount() {
      return this.getCart.length;
    }
  },

  async created() {
    await this.loadProducts();
  },

  methods: {
    ...mapActions(['fetchProducts', 'addToCart', 'logout']),

    productImage(product) {
      const imageUrl = import.meta.env.VITE_IMAGE_URL || 'http://lifestealer86.ru';
      
      if (product.image) {
        if (product.image.startsWith('http')) {
          return product.image;
        }
        return product.image.startsWith('/') 
          ? `${imageUrl}${product.image}`
          : `${imageUrl}/${product.image}`;
      }
      
      if (product.image_url) {
        if (product.image_url.startsWith('http')) {
          return product.image_url;
        }
        return product.image_url.startsWith('/')
          ? `${imageUrl}${product.image_url}`
          : `${imageUrl}/${product.image_url}`;
      }
      
      if (product.thumbnail) {
        if (product.thumbnail.startsWith('http')) {
          return product.thumbnail;
        }
        return product.thumbnail.startsWith('/')
          ? `${imageUrl}${product.thumbnail}`
          : `${imageUrl}/${product.thumbnail}`;
      }
      
      // Placeholder
      return 'https://placehold.co/300x200/000000/ffffff?text=No+Image';
    },

    onImageError(event) {
      event.target.src = 'https://placehold.co/300x200/000000/ffffff?text=No+Image';
    },

    async loadProducts() {
      this.loading = true;
      this.error = null;
      try {
        await this.fetchProducts();
      } catch (error) {
        this.error = 'Ошибка при загрузке товаров. Попробуйте позже.';
        console.error('Error loading products:', error);
      } finally {
        this.loading = false;
      }
    },

    async handleAddToCart(productId) {
      try {
        await this.addToCart(productId);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },

    async handleLogout() {
      await this.logout();
      this.showMessage('Вы вышли из системы', 'success');
      setTimeout(() => {
        this.$router.push('/');
      }, 1000);
    }
  }
};
</script>
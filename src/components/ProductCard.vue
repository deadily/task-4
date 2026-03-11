<template>
  <div class="product-card">
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-description">{{ product.description }}</p>
    <p class="product-price">{{ product.price }} ₽</p>
    <button 
      v-if="showAddToCart" 
      @click="$emit('add-to-cart', product)"
      class="btn btn-primary"
    >
      В корзину
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  
  props: {
    product: {
      type: Object,
      required: true
    },
    showAddToCart: {
      type: Boolean,
      default: true
    }
  }
};
</script>

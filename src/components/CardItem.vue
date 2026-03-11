<<<<<<< HEAD
<template>
  <div class="cart-item">
    <div class="item-info">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p class="price">{{ item.price }} ₽</p>
    </div>
    
    <div class="item-controls">
      <button @click="$emit('decrease', item)" class="btn btn-small btn-secondary">-</button>
      <span class="quantity">{{ item.quantity }}</span>
      <button @click="$emit('increase', item)" class="btn btn-small btn-primary">+</button>
      <button @click="$emit('remove', item)" class="btn btn-small btn-danger">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
=======
<template>
  <div class="cart-item">
    <div class="item-info">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p class="price">{{ item.price }} ₽</p>
    </div>
    
    <div class="item-controls">
      <button @click="$emit('decrease', item)" class="btn btn-small btn-secondary">-</button>
      <span class="quantity">{{ item.quantity }}</span>
      <button @click="$emit('increase', item)" class="btn btn-small btn-primary">+</button>
      <button @click="$emit('remove', item)" class="btn btn-small btn-danger">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
>>>>>>> c31032b843f1248faf391c98763a54d46ecf6651

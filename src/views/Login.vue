<template>
  <div class="auth-page">
    <div class="form-container">
      <h2>Вход в систему</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            :class="{ 'input-error': errors.email }"
            placeholder="Введите email"
            @input="clearError('email')"
          >
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Пароль:</label>
          <input 
            type="password" 
            id="password" 
            v-model="password"
            :class="{ 'input-error': errors.password }"
            placeholder="Введите пароль"
            @input="clearError('password')"
          >
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div v-if="errorMessage" class="alert alert-error">
          {{ errorMessage }}
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'ВХОД...' : 'ВОЙТИ' }}
          </button>
          <button type="button" class="btn btn-secondary" @click="goBack">
            НАЗАД
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      },
      errorMessage: '',
      loading: false
    };
  },

  methods: {
    ...mapActions(['login']),

    validateForm() {
      this.errors = {
        email: '',
        password: ''
      };

      let isValid = true;

      if (!this.email) {
        this.errors.email = 'Введите email';
        isValid = false;
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = 'Введите корректный email';
        isValid = false;
      }

      if (!this.password) {
        this.errors.password = 'Введите пароль';
        isValid = false;
      }

      return isValid;
    },

    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    clearError(field) {
      this.errors[field] = '';
      this.errorMessage = '';
    },

    async handleLogin() {
      this.errorMessage = '';

      if (!this.validateForm()) {
        return;
      }

      this.loading = true;

      try {
        const result = await this.login({
          email: this.email,
          password: this.password
        });

        if (result.success) {
          this.$router.push('/');
        } else {
          this.errorMessage = result.error || 'Ошибка авторизации';
        }
      } catch (error) {
        this.errorMessage = 'Произошла ошибка при входе. Попробуйте позже.';
        console.error('Login error:', error);
      } finally {
        this.loading = false;
      }
    },

    goBack() {
      this.$router.push('/');
    }
  }
};
</script>
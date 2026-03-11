<<<<<<< HEAD
<template>
  <div class="auth-page">
    <div class="form-container">
      <h2>Регистрация</h2>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="fio">ФИО:</label>
          <input 
            type="text" 
            id="fio" 
            v-model="fio" 
            :class="{ 'input-error': errors.fio }"
            placeholder="Введите ФИО"
            @input="clearError('fio')"
          >
          <span v-if="errors.fio" class="error-message">{{ errors.fio }}</span>
        </div>

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
            {{ loading ? 'РЕГИСТРАЦИЯ...' : 'ЗАРЕГИСТРИРОВАТЬСЯ' }}
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
  name: 'Register',
  
  data() {
    return {
      fio: '',
      email: '',
      password: '',
      errors: {
        fio: '',
        email: '',
        password: ''
      },
      errorMessage: '',
      loading: false
    };
  },

  methods: {
    ...mapActions(['register']),

    validateForm() {
      this.errors = {
        fio: '',
        email: '',
        password: ''
      };

      let isValid = true;

      if (!this.fio.trim()) {
        this.errors.fio = 'Введите ФИО';
        isValid = false;
      }

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
      } else if (this.password.length < 6) {
        this.errors.password = 'Пароль должен быть не менее 6 символов';
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

    async handleRegister() {
      this.errorMessage = '';

      if (!this.validateForm()) {
        return;
      }

      this.loading = true;

      try {
        const result = await this.register({
          fio: this.fio,
          email: this.email,
          password: this.password
        });

        if (result.success) {
          this.$router.push('/login');
        } else {
          this.errorMessage = result.error || 'Ошибка регистрации';
        }
      } catch (error) {
        this.errorMessage = 'Произошла ошибка при регистрации';
        console.error('Register error:', error);
      } finally {
        this.loading = false;
      }
    },

    goBack() {
      this.$router.push('/');
    }
  }
};
=======
<template>
  <div class="register-page">
    <div class="register-form">
      <h2>Регистрация</h2>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="fio">ФИО:</label>
          <input 
            type="text" 
            id="fio" 
            v-model="fio" 
            :class="{ 'input-error': errors.fio }"
            placeholder="Введите ФИО"
            @input="clearError('fio')"
          >
          <span v-if="errors.fio" class="error-message">{{ errors.fio }}</span>
        </div>

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
            {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
          <button type="button" class="btn btn-secondary" @click="goBack">
            Назад
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  
  data() {
    return {
      fio: '',
      email: '',
      password: '',
      errors: {
        fio: '',
        email: '',
        password: ''
      },
      errorMessage: '',
      loading: false
    };
  },

  methods: {
    ...mapActions(['register']),

    validateForm() {
      this.errors = {
        fio: '',
        email: '',
        password: ''
      };

      let isValid = true;

      if (!this.fio.trim()) {
        this.errors.fio = 'Введите ФИО';
        isValid = false;
      }

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
      } else if (this.password.length < 6) {
        this.errors.password = 'Пароль должен быть не менее 6 символов';
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

    async handleRegister() {
      this.errorMessage = '';

      if (!this.validateForm()) {
        return;
      }

      this.loading = true;

      try {
        const result = await this.register({
          fio: this.fio,
          email: this.email,
          password: this.password
        });

        if (result.success) {
          this.$router.push('/');
        } else {
          this.errorMessage = result.error || 'Ошибка регистрации';
        }
      } catch (error) {
        this.errorMessage = 'Произошла ошибка при регистрации. Попробуйте позже.';
        console.error('Register error:', error);
      } finally {
        this.loading = false;
      }
    },

    goBack() {
      this.$router.push('/');
    }
  }
};
>>>>>>> c31032b843f1248faf391c98763a54d46ecf6651
</script>
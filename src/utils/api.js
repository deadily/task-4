const API_URL = import.meta.env.VITE_API_URL || 'http://lifestealer86.ru/api-shop';

function getToken() {
  return localStorage.getItem('user_token');
}

function getHeaders() {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

async function request(url, options = {}) {
  const config = {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers
    }
  };

  const response = await fetch(`${API_URL}${url}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const errorMessage = error.error?.message || 'Ошибка запроса';
    throw { 
      message: errorMessage, 
      status: response.status 
    };
  }
  
  return response.json().catch(() => ({}));
}

export const api = {
  login(email, password) {
    return request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  register(fio, email, password) {
    return request('/signup', {
      method: 'POST',
      body: JSON.stringify({ fio, email, password })
    });
  },

  getProducts() {
    return request('/products');
  },

  addToCart(productId) {
    return request(`/cart/${productId}`, {
      method: 'POST'
    });
  },

  getCart() {
    return request('/cart');
  },

  removeFromCart(itemId) {
    return request(`/cart/${itemId}`, {
      method: 'DELETE'
    });
  },

  createOrder() {
    return request('/order', {
      method: 'POST'
    });
  },

  getOrders() {
    return request('/order');
  },

  logout() {
    return request('/logout');
  }
};
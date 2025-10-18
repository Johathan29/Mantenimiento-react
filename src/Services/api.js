// services/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: false,
});

// Add Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('backendToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle session expiration/unauth
api.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status;
    // 440 = custom session expired for inactivity (we used 440 in backend example)
    if (status === 440 || status === 401) {
      // clear token & redirect to login
      localStorage.removeItem('backendToken');
      // optional: also sign out from firebase
      // window.location.href = '/login';
      // We won't redirect here automatically in library; consumer can handle.
    }
    return Promise.reject(err);
  }
);

export default api;

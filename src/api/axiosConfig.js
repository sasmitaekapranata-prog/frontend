import axios from 'axios';

// 1. Buat instance konfigurasi dasar Axios
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Mengambil URL dari file .env tadi
  timeout: 10000, // Jika server tidak merespon dalam 10 detik, batalkan (mencegah loading selamanya)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// 2. Interceptor (Opsional tapi Sangat Penting untuk Otentikasi/Login)
// Fungsi ini otomatis menempelkan Token JWT di setiap request jika User sudah login
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Mengambil token yang disimpan saat login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Menempelkan token ke header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
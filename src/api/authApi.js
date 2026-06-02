import API from './axiosConfig';

// Fungsi untuk hit API Login
export const loginUser = async (phone, password) => {
  try {
    // Menembak endpoint POST ke: http://localhost:5000/api/auth/login
    const response = await API.post('/auth/login', {
      nomor_hp: phone, // nama key disesuaikan dengan keinginan backend
      password: password
    });
    return response.data; // Mengembalikan data sukses dari backend (misal: token dan data user)
  } catch (error) {
    // Menangkap error dari backend agar bisa ditampilkan di interface UI
    throw error.response?.data?.message || 'Terjadi kesalahan sistem saat login.';
  }
};

// Fungsi untuk hit API Daftar Akun
export const daftarUser = async (username, email, phone, password) => {
  try {
    const response = await API.post('/auth/register', {
      name: username,
      email: email,
      phone: phone,
      password: password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Gagal mendaftarkan akun.';
  }
};

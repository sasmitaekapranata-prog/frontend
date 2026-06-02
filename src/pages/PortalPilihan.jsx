import React from 'react';
import { useNavigate } from 'react-router-dom'; // 🟢 Ambil alat navigasi dari react-router-dom

export default function PortalPilihan() {
  const navigate = useNavigate(); // 🟢 Inisialisasi fungsi pindah halaman

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f7fa] font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">TrustPay.id</h1>
        <p className="text-gray-500 mb-8">Selamat datang! Silakan pilih gerbang masuk Anda</p>
        
        <div className="space-y-4">
          {/* 🟢 TOMBOL USER: Saat diklik, pindah ke rute /login-user */}
          <button 
            onClick={() => navigate('/login-user')} 
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Masuk sebagai Nasabah (User)
          </button>
          
          {/* 🔴 TOMBOL ADMIN: Saat diklik, pindah ke rute /login-admin */}
          <button 
            onClick={() => navigate('/login-admin')} 
            className="w-full py-4 bg-gray-800 text-white font-semibold rounded-xl shadow-md hover:bg-gray-900 transition"
          >
            Masuk sebagai Admin Sistem
          </button>
        </div>
      </div>
    </div>
  );
}
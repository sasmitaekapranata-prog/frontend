import React, { useState, useEffect } from 'react';

// 1. Impor Gerbang Portal Pilihan Utama (Tampilan Modern)
import PortalPilihan from '../User/Masuk.jsx'; 

// 2. Impor File App Induk Khusus User (Penampung Semua Fitur & Welcome Nasabah)
import AppUserInduk from '../User/App.jsx';

// 3. Impor Komponen Sisi Admin
import MasukAdmin from '../admin/MasukAdmin.jsx';
import DashboardAdmin from '../admin/Dashboard.jsx';

export default function AppRoutes() {
  // 🛡️ MENGUNCI default state ke 'portal' agar selalu masuk ke halaman pilihan pertama kali
  const [globalAuthMode, setGlobalAuthMode] = useState('portal');
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // 💡 TIPS PEMERIKSAAN: 
    // Jika kamu ingin aplikasi SELALU dimulai dari portal pilihan SETIAP KALI direfresh/di-run
    // (mengabaikan login sebelumnya), kamu bisa menghapus atau mengomentari isi useEffect ini.
    
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role');
    const adminName = localStorage.getItem('admin_name');

    if (token && role === 'user') {
      setGlobalAuthMode('user_space');
    } else if (token && role === 'admin') {
      setAdminUser({ username: adminName || 'Super Admin TrustPay' });
      setGlobalAuthMode('admin_dashboard');
    } else {
      setGlobalAuthMode('portal');
    }
  }, []);

  // 🚪 Handler Keluar/Kembali ke Portal untuk Semua Role
  const handleResetToPortal = () => {
    localStorage.clear(); // Bersihkan session agar tidak auto-login saat di-refresh
    setAdminUser(null);
    setGlobalAuthMode('portal'); // Tendang balik ke gerbang utama
  };

  // Rendering pembagian halaman berdasarkan pilihan gerbang masuk
  switch (globalAuthMode) {
    
    // ==========================================
    // GERBANG 1: Portal Utama Pilihan Masuk (Wajib Pertama)
    // ==========================================
    case 'portal':
      return (
        <PortalPilihan 
          onSelectUser={() => setGlobalAuthMode('user_space')} 
          onSelectAdmin={() => setGlobalAuthMode('admin_login')} 
        />
      );

    // ==========================================
    // GERBANG 2: SISI NASABAH / USER
    // ==========================================
    case 'user_space':
      // 🛠️ Ditambahkan prop onLogout agar komponen AppUserInduk bisa menyediakan tombol kembali ke portal
      return <AppUserInduk onLogout={handleResetToPortal} />;

    // ==========================================
    // GERBANG 3: SISI ADMIN (Login Terlebih Dahulu)
    // ==========================================
    case 'admin_login':
      return (
        <MasukAdmin 
          onBack={() => setGlobalAuthMode('portal')}
          onLoginSuccess={(adminData) => {
            localStorage.setItem('auth_token', 'admin_secure_token');
            localStorage.setItem('user_role', 'admin');
            localStorage.setItem('admin_name', adminData?.username || 'Admin Dandi');
            setAdminUser({ username: adminData?.username || 'Admin Dandi' });
            setGlobalAuthMode('admin_dashboard');
          }}
        />
      );

    case 'admin_dashboard':
      return adminUser ? (
        <div className="min-h-screen bg-[#f5f7fa]">
          <DashboardAdmin user={adminUser} onLogout={handleResetToPortal} />
        </div>
      ) : (
        <div style={{ padding: 20, textAlign: 'center', fontFamily: 'sans-serif', color: '#64748b' }}>
          Memuat Dashboard Admin...
        </div>
      );

    default:
      return (
        <PortalPilihan 
          onSelectUser={() => setGlobalAuthMode('user_space')} 
          // Ditambahkan fallback yang aman
          onSelectAdmin={() => setGlobalAuthMode('admin_login')} 
        />
      );
  }
}
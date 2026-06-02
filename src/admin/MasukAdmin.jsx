import { useState } from 'react'; 
import { ShieldCheck, CheckCircle2, Lock, User, ArrowLeft } from 'lucide-react';

export default function MasukAdmin({ onBack, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'trustpay2026') {
      if (onLoginSuccess) {
        onLoginSuccess({ username: 'Admin Dandi', role: 'Super Admin' });
      }
    } else {
      alert('Kredensial Admin Salah! Gunakan: admin / trustpay2026');
    }
  };

  // 🛡️ CSS VANILLA INLINE UNTUK MENJAMIN WARNA & LAYOUT MUNCUL TANPA TAILWIND
  const styles = {
    container: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9999,
      display: 'flex',
      fontFamily: 'sans-serif',
      backgroundColor: '#f1f5f9',
      width: '100vw',
      height: '100vh',
      margin: 0, padding: 0,
      boxSizing: 'border-box'
    },
    leftBanner: {
      width: '55%',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)',
      padding: '48px',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'between',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'left'
    },
    rightForm: {
      width: '45%',
      backgroundColor: '#ffffff',
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'left',
      boxSizing: 'border-box'
    },
    formWrapper: {
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      textAlign: 'left'
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    inputField: {
      width: '100%',
      padding: '14px 16px 14px 44px',
      backgroundColor: '#f8fafc',
      border: '1px solid #cbd5e1',
      borderRadius: '12px',
      fontSize: '14px',
      outline: 'none',
      color: '#1e293b',
      boxSizing: 'border-box'
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      color: '#94a3b8',
      display: 'flex',
      alignItems: 'center'
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 'bold',
      fontSize: '14px',
      cursor: 'pointer',
      boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2)',
      marginTop: '8px'
    },
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: 'rgba(255,255,255,0.15)',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: '#dbeafe'
    },
    infoBox: {
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '16px',
      textAlign: 'center',
      fontSize: '13px',
      color: '#64748b',
      lineHeight: '1.6'
    }
  };

  return (
    <div style={styles.container}>
      
      {/* SISI KIRI: Banner Visual FinTech Premium */}
      <div style={styles.leftBanner} className="hidden-mobile">
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            TrustPay<span style={{ color: '#93c5fd' }}>.id</span>
            <CheckCircle2 className="h-5 w-5" style={{ fill: '#ffffff', color: '#2563eb' }} />
          </span>

          <button 
            onClick={onBack} 
            type="button"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '6px', color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Kembali
          </button>
        </div>

        {/* Teks Tengah */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: 'auto 0', maxWidth: '480px' }}>
          <span style={styles.badge}>Sistem Kendali Pusat</span>
          <h1 style={{ fontSize: '40px', fontWeight: '800', lineHeight: '1.2', margin: 0 }}>
            Satu aplikasi untuk semua kebutuhan manajemen keuangan.
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(219,234,254,0.8)', lineHeight: '1.6', margin: 0 }}>
            Kelola transaksi nasabah, otoritas nilai tukar valuta asing, and respon keluhan pengguna dalam satu dashboard admin terpadu.
          </p>
        </div>

        {/* Footer */}
        <div style={{ fontSize: '12px', color: 'rgba(219,234,254,0.5)' }}>
          &copy; 2026 TrustPay.id Panel Administrasi Keamanan. All rights reserved.
        </div>
      </div>

      {/* SISI KANAN: Form Login Modern Minimalis */}
      <div style={styles.rightForm}>
        <div style={styles.formWrapper}>
          
          {/* Header Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', width: '48px', height: '48px', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '16px', border: '1px solid #bfdbfe' }}>
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0, tracking: '-0.025em' }}>Selamat Datang Kembali</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Silakan masuk untuk mengakses panel kendali utama</p>
            </div>
          </div>

          {/* Form Utama */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Input Username */}
            <div style={styles.inputGroup}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Username Admin</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}><User className="h-4 w-4" /></span>
                <input 
                  type="text" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  placeholder="Masukkan username" 
                  style={styles.inputField}
                  required 
                />
              </div>
            </div>

            {/* Input Password */}
            <div style={styles.inputGroup}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Password Otoritas</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}><Lock className="h-4 w-4" /></span>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  style={styles.inputField}
                  required 
                />
              </div>
            </div>

            <button type="submit" style={styles.button}>
              Masuk Sistem Admin
            </button>
          </form>

          {/* Petunjuk Akun Demo */}
          <div style={styles.infoBox}>
            Gunakan akun resmi untuk demonstrasi: <br />
            <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#1e293b', backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'inline-block', marginTop: '6px' }}>admin</span>
            <span style={{ margin: '0 8px', color: '#cbd5e1' }}>/</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#1e293b', backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'inline-block', marginTop: '6px' }}>trustpay2026</span>
          </div>

        </div>
      </div>

      {/* CSS Tambahan kecil untuk menyembunyikan sisi kiri jika dibuka dari handphone */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          div { width: 100% !important; }
        }
      `}</style>

    </div>
  );
}
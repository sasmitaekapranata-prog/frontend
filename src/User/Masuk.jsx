import React from 'react';

export default function Masuk({ onSelectUser, onSelectAdmin }) {
  return (
    <div style={styles.container}>
      {/* Mengambil Font Poppins Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Efek Animasi & Hover Efek */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { width: 100%; height: 100%; background-color: #f8fafc; }
        .portal-card:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(30, 64, 175, 0.1), 0 10px 10px -5px rgba(30, 64, 175, 0.04); border-color: #3b82f6 !important; }
        .portal-card:hover .icon-wrapper { background-color: #1e40af !important; color: #ffffff !important; }
        .portal-card:active { transform: translateY(-1px); }
      `}</style>

      <div style={styles.contentWrapper}>
        {/* Bagian Logo dan Atas */}
        <div style={styles.header}>
          <div style={styles.logoText}>TrustPay<span style={{ color: '#2563eb' }}>.id</span> 🛡️</div>
          <h1 style={styles.mainTitle}>Selamat Datang di Portal Utama</h1>
          <p style={styles.subtitle}>Silakan pilih gerbang masuk Anda untuk melanjutkan akses sistem.</p>
        </div>

        {/* Grid Pilihan Portal */}
        <div style={styles.gridContainer}>
          
          {/* KARTU 1: NASABAH (USER) */}
          <div onClick={onSelectUser} className="portal-card" style={styles.card}>
            <div className="icon-wrapper" style={styles.iconWrapper}>
              {/* SVG Icon User */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Masuk sebagai Nasabah</h3>
            <p style={styles.cardDesc}>Akses akun personal, kelola saldo wallet, konfirmasi pin, transaksi internasional, dan cek notifikasi keuangan Anda.</p>
            <div style={styles.badgeUser}>Portal User</div>
          </div>

          {/* KARTU 2: ADMIN SISTEM */}
          <div onClick={onSelectAdmin} className="portal-card" style={styles.card}>
            <div className="icon-wrapper" style={{ ...styles.iconWrapper, color: '#dc2626', backgroundColor: '#fee2e2' }}>
              {/* SVG Icon Shield/Admin */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Masuk sebagai Admin</h3>
            <p style={styles.cardDesc}>Kelola manajemen data pengguna, pantau lalu lintas mata uang (currency exchange), sistem helpdesk, dan konfigurasi keamanan.</p>
            <div style={styles.badgeAdmin}>Portal Admin</div>
          </div>

        </div>

        {/* Footer Hak Cipta */}
        <div style={styles.footer}>
          &copy; 2026 TrustPay Indonesia. All rights reserved. Keamanan akun Anda adalah prioritas kami.
        </div>
      </div>
    </div>
  );
}

// Desain Struktur Visual Gaya Elemen (Inline Styles)
const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: '20px',
    boxSizing: 'border-box'
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px'
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  logoText: {
    fontWeight: '800',
    fontSize: '36px',
    letterSpacing: '-0.03em',
    color: '#0f172a',
    marginBottom: '5px'
  },
  mainTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.01em'
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '400'
  },
  gridContainer: {
    display: 'flex',
    width: '100%',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  card: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '36px',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden'
  },
  iconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    backgroundColor: '#dbeafe',
    color: '#2563eb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.25s ease'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a'
  },
  cardDesc: {
    fontSize: '13px',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '10px'
  },
  badgeUser: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    padding: '4px 12px',
    borderRadius: '20px'
  },
  badgeAdmin: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    padding: '4px 12px',
    borderRadius: '20px'
  },
  footer: {
    fontSize: '12px',
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: '10px'
  }
};
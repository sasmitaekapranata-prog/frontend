import { useState } from 'react';
import InsightPemasukan from './insightpemasukan';
import InsightPengeluaran from './insightpengeluaran'; 

export default function Insight({ onNavigate, onLogout }) {
  const [subPage, setSubPage] = useState('menu');

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght=300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
        .btn-active:hover { opacity: 0.95; transform: translateY(-1px); }
        .user-greeting:hover { opacity: 0.8; }
        .insight-btn-action:hover { background: #1a56db !important; color: #ffffff !important; transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(26, 86, 219, 0.3); }
      `}</style>

      {/* SAMA DENGAN DASHBOARD: Menggunakan dashboardWrapper agar sejajar */}
      <div style={styles.dashboardWrapper}>
        <header style={styles.header}>
          <div style={styles.brandSection}>
            <div onClick={() => onNavigate && onNavigate('dashboard')} style={styles.logoContainer} title="Home">
              <span style={styles.logoTextBlue}>TrustPay</span>
              <span style={styles.logoTextLightBlue}>.id</span>
              <span style={{ marginLeft: '6px', fontSize: '28px', display: 'inline-block', verticalAlign: 'middle' }}>🛡️</span>
            </div>
          </div>

          <nav style={styles.navMenu}>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('dashboard')}>Home</span>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('notifikasi')}>Notifikasi</span>
            <span style={styles.navItem} onClick={onLogout}>Logout</span>
          </nav>
        </header>

        {/* SAMA DENGAN DASHBOARD: Sub Header untuk Tab Navigasi */}
        <div style={styles.subHeader}>
          <div style={styles.tabContainer}>
            <button type="button" style={styles.btnTabInactive} onClick={() => onNavigate && onNavigate('dashboard')}>Transaksi</button>
            <button type="button" style={styles.btnTabActive} onClick={() => setSubPage('menu')}>Insight</button>
          </div>
          <button type="button" style={styles.btnBantuan} onClick={() => onNavigate && onNavigate('pusatbantuan')}><span style={styles.questionMark}>?</span> Pusat Bantuan</button>
        </div>

        {/* BOX KONTEN UTAMA */}
        <main style={styles.mainContent}>
          <div style={styles.whiteCardContainer}>
            {subPage === 'menu' ? (
              /* TAMPILAN MENU UTAMA (DUA TOMBOL PILIHAN) */
              <div style={styles.buttonGrid}>
                <button className="insight-btn-action" style={styles.actionButton} onClick={() => setSubPage('pemasukan')}>
                  Pemasukan
                </button>
                <button className="insight-btn-action" style={styles.actionButton} onClick={() => setSubPage('pengeluaran')}>
                  Pengeluaran
                </button>
              </div>
            ) : subPage === 'pemasukan' ? (
              /* TAMPILAN GRAFIK DIAGRAM BATANG PEMASUKAN */
              <InsightPemasukan onBack={() => setSubPage('menu')} />
            ) : subPage === 'pengeluaran' ? (
              /* TAMPILAN GRAFIK DIAGRAM BATANG PENGELUARAN */
              <InsightPengeluaran onBack={() => setSubPage('menu')} />
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}

// STRUKTUR STYLES YANG DISESUAIKAN 100% DENGAN DASHBOARD.JSX
const styles = {
  container: { minHeight: '100vh', width: '100vw', background: '#f8fafc', boxSizing: 'border-box', margin: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  // 🟢 PERBAIKAN: Menghapus properti transform: 'translateX(-60px)' agar posisi simetris di tengah layar
  dashboardWrapper: { width: '100%', maxWidth: '1050px', padding: '40px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'transform 0.2s ease-in-out' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  brandSection: { display: 'flex', flexDirection: 'column', gap: '2px' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '32px', color: '#1a56db' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '32px', color: '#60a5fa' },
  navMenu: { display: 'flex', gap: '25px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#000000', fontWeight: '700', fontSize: '15px' },
  subHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tabContainer: { display: 'flex', gap: '10px' },
  btnTabActive: { background: '#ffffff', color: '#1a56db', border: '2px solid #1a56db', padding: '6px 24px', borderRadius: '15px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  btnTabInactive: { background: '#ffffff', color: '#94a3b8', border: '2px solid #e2e8f0', padding: '6px 24px', borderRadius: '15px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  btnBantuan: { background: '#0014b4', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '18px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' },
  questionMark: { color: '#ff3b30', fontWeight: '900' },
  mainContent: { width: '100%', margin: 0, padding: 0 },
  
  whiteCardContainer: { background: '#ffffff', borderRadius: '24px', padding: '50px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '400px', boxSizing: 'border-box', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)', border: '1px solid #e2e8f0' },
  buttonGrid: { display: 'flex', gap: '40px', width: '100%', justifyContent: 'center' },
  // 🟢 OPTIMASI: Menambahkan keluwesan transisi CSS agar efek hover tombol Pemasukan/Pengeluaran terasa lebih mulus
  actionButton: { background: '#e0ebff', color: '#1a56db', border: '2px solid #1a56db', padding: '20px 0', borderRadius: '18px', fontSize: '22px', fontWeight: '700', cursor: 'pointer', minWidth: '240px', textAlign: 'center', transition: 'all 0.2s ease-in-out' }
};
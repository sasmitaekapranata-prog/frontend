import { useState } from 'react';

// 🟢 PERBAIKAN: Menangkap props (onNavigate, userName, totalSaldo, onAddWallet, onSend) agar bisa digunakan di dalam komponen
export default function Dashboard({ onLogout, onNavigate, userName, totalSaldo, onAddWallet, onSend }) {
  const [showBalance, setShowBalance] = useState(true);

  // Helper formatting angka ke IDR Rupiah dinamis sesuai nominal dari database
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(angka);
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
        .btn-active:hover { opacity: 0.95; transform: translateY(-1px); }
        .user-greeting:hover { opacity: 0.8; }
        .action-card-hover:hover { background: rgba(255, 255, 255, 0.2) !important; transform: translateY(-2px); }
      `}</style>

      <div style={styles.dashboardWrapper}>
        <header style={styles.header}>
          <div style={styles.brandSection}>
            <div onClick={() => onNavigate && onNavigate('dashboard')} style={styles.logoContainer} title="Home">
              <span style={styles.logoTextBlue}>TrustPay</span>
              <span style={styles.logoTextLightBlue}>.id</span>
              <span style={{ marginLeft: '6px', fontSize: '28px', display: 'inline-block', verticalAlign: 'middle' }}>🛡️</span>
            </div>
            
            <div 
              className="user-greeting"
              onClick={() => onNavigate && onNavigate('profil')} 
              style={styles.userGreeting}
              title="Lihat Profil"
            >
              👤 Hi, {userName && userName.trim() !== "" ? userName : "Nasabah"}!
            </div>
          </div>

          <nav style={styles.navMenu}>
            <span style={styles.navItemActive} onClick={() => onNavigate && onNavigate('dashboard')}>Home</span>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('notifikasi')}>Notifikasi</span>
            <span style={styles.navItem} onClick={onLogout}>Logout</span>
          </nav>
        </header>

        <div style={styles.subHeader}>
          <div style={styles.tabContainer}>
            <button type="button" style={styles.btnTabActive} onClick={() => onNavigate && onNavigate('dashboard')}>Transaksi</button>
            <button type="button" style={styles.btnTabInactive} onClick={() => onNavigate && onNavigate('insight')}>Insight</button>
          </div>
          <button type="button" style={styles.btnBantuan} onClick={() => onNavigate && onNavigate('pusatbantuan')}><span style={styles.questionMark}>?</span> Pusat Bantuan</button>
        </div>

        <main style={styles.mainContent}>
          <div style={styles.blueContainer}>
            <div style={styles.balanceRow}>
              <div style={styles.balanceColumn}>
                <div style={styles.balanceLabel}>Total Saldo</div>
                <div style={styles.balanceAmount}>
                  {showBalance ? formatRupiah(totalSaldo || 10000000) : '••••••••••••'}
                </div>
              </div>
              <button type="button" style={styles.eyeButton} onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                )}
              </button>
            </div>
            
            <div style={styles.actionGrid}>
              {/* Tombol ADD WALLET */}
              <div className="action-card-hover" style={styles.actionCard} onClick={onAddWallet}>
                <div style={styles.iconCircle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
                <div style={styles.actionText}>ADD</div>
              </div>

              {/* Tombol SEND (Transfer Nasional / Internasional) */}
              <div className="action-card-hover" style={styles.actionCard} onClick={onSend}>
                <div style={styles.iconWrapper}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff"><polygon points="6 3 21 12 6 21 6 3"></polygon></svg>
                </div>
                <div style={styles.actionText}>SEND</div>
              </div>

              {/* Tombol EXCHANGE (Konversi Mata Uang) */}
              <div className="action-card-hover" style={styles.actionCard} onClick={() => onNavigate && onNavigate('exchange')}>
                <div style={styles.iconWrapper}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 7H4m16 0l-4-4m4 4l-4 4M4 17h16M4 17l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div style={styles.actionText}>EXCHANGE</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', minHeight: '100vh', background: '#f8fafc', boxSizing: 'border-box', margin: 0, overflow: 'hidden' },
  dashboardWrapper: { width: '100%', maxWidth: '1050px', padding: '40px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'transform 0.2s ease-in-out' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  brandSection: { display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '32px', color: '#1a56db' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '32px', color: '#60a5fa' },
  userGreeting: { fontSize: '13px', fontWeight: '700', color: '#1a56db', paddingLeft: '2px', cursor: 'pointer', userSelect: 'none', transition: 'opacity 0.15s ease', textAlign: 'left' },
  navMenu: { display: 'flex', gap: '25px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#000000', fontWeight: '700', fontSize: '15px' },
  navItemActive: { cursor: 'pointer', color: '#1a56db', fontWeight: '700', fontSize: '15px', borderBottom: '3px solid #1a56db', paddingBottom: '2px' },
  subHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tabContainer: { display: 'flex', gap: '10px' },
  btnTabActive: { background: '#ffffff', color: '#1a56db', border: '2px solid #1a56db', padding: '6px 24px', borderRadius: '15px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  btnTabInactive: { background: '#ffffff', color: '#94a3b8', border: '2px solid #e2e8f0', padding: '6px 24px', borderRadius: '15px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  btnBantuan: { background: '#0014b4', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '18px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' },
  questionMark: { color: '#ff3b30', fontWeight: '900' },
  mainContent: { width: '100%', margin: 0, padding: 0 },
  blueContainer: { background: '#4d82f3', borderRadius: '24px', padding: '50px 40px', display: 'flex', flexDirection: 'column', gap: '35px', width: '100%', boxSizing: 'border-box', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' },
  balanceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  balanceColumn: { display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' },
  balanceLabel: { color: '#ffffff', opacity: 0.85, fontSize: '14px', fontWeight: '600', textAlign: 'left' },
  balanceAmount: { color: '#ffffff', fontSize: '36px', fontWeight: '800', textAlign: 'left' },
  eyeButton: { background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, opacity: 0.9 },
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', width: '100%' },
  actionCard: { background: 'rgba(255, 255, 255, 0.1)', padding: '50px 10px', borderRadius: '18px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: 'all 0.2s ease-in-out' },
  iconWrapper: { height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  iconCircle: { border: '2px solid #ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  actionText: { color: '#ffffff', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }
};
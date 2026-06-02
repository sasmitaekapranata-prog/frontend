import { useState } from 'react'; // 🛡️ FIX: Menggunakan React core murni untuk stabilitas modul root

const Icons = {
  Shield: (
    <svg width="24" height="28" viewBox="0 0 24 24" fill="#60a5fa" style={{ marginLeft: '10px', display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  ),
  PaperPlane: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  )
};

const Send = ({ onBack, onLogout, onSelectNasional, onSelectInternasional }) => {
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* 1. HEADER UTAMA - INTEGRASI DESIGN SYSTEM TRUSTPAY */}
      <header style={styles.header}>
        <div style={styles.logoContainer} onClick={onBack}>
          <span style={styles.logoTextBlue}>TrustPay</span>
          <span style={styles.logoTextLightBlue}>.id</span>
          {Icons.Shield}
        </div>

        <nav style={styles.navMenu}>
          <div style={styles.navItemContainerActive}>
            <span onClick={onBack} style={styles.navItemActive}>Home</span>
          </div>
          <div style={styles.navItemContainer}>
            <span onClick={() => alert('Belum ada notifikasi baru.')} style={styles.navItem}>Notifikasi</span>
          </div>
          <div style={styles.navItemContainer}>
            <span onClick={onLogout} style={styles.navItemLogout}>Logout</span>
          </div>
        </nav>
      </header>

      {/* 2. MAIN CONTAINER CARD */}
      <main style={styles.mainContent}>
        <div style={styles.whiteCard}>
          
          {/* Tombol Indikator Halaman SEND */}
          <div style={styles.backButtonContainer}>
            <button 
              type="button"
              onClick={onBack} 
              style={{
                ...styles.btnSendIndicator,
                backgroundColor: hoveredBtn === 'sendIndicator' ? '#f1f5f9' : '#ffffff'
              }}
              onMouseEnter={() => setHoveredBtn('sendIndicator')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              {Icons.PaperPlane}
              <span>SEND</span>
            </button>
          </div>

          {/* Judul Utama Konten */}
          <h2 style={styles.cardTitle}>Pilih Metode Transfer Dana</h2>

          {/* Grup Pilihan Tombol Opsi (Nasional & Internasional) */}
          <div style={styles.buttonGroup}>
            
            {/* Tombol Opsi Utama: Nasional */}
            <button 
              type="button"
              onClick={onSelectNasional} 
              style={{
                ...styles.btnOptionActive,
                transform: hoveredBtn === 'nasional' ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hoveredBtn === 'nasional' ? '0 12px 20px -5px rgba(26, 86, 219, 0.15)' : 'none'
              }}
              onMouseEnter={() => setHoveredBtn('nasional')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              Transfer Nasional
              <span style={styles.btnSubtitle}>Kirim ke Bank Domestik & Virtual Account</span>
            </button>

            {/* Tombol Opsi Sekunder: Internasional */}
            <button 
              type="button"
              onClick={onSelectInternasional} 
              style={{
                ...styles.btnOptionInactive,
                borderColor: hoveredBtn === 'internasional' ? '#1a56db' : '#e2e8f0',
                backgroundColor: hoveredBtn === 'internasional' ? '#f8fafc' : '#ffffff',
                transform: hoveredBtn === 'internasional' ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hoveredBtn === 'internasional' ? '0 12px 20px -5px rgba(0, 0, 0, 0.05)' : 'none'
              }}
              onMouseEnter={() => setHoveredBtn('internasional')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              Transfer Internasional
              <span style={styles.btnSubtitleInactive}>Kirim Dana ke Luar Negeri Kontan</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

// DESIGN SYSTEM STYLES PATTERN
const styles = {
  container: { minHeight: '100vh', width: '100vw', backgroundColor: '#ffffff', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', padding: '40px 100px 60px 100px', fontFamily: "'Poppins', sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '50px', boxSizing: 'border-box' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '42px', color: '#1a56db', letterSpacing: '-0.02em' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '42px', color: '#60a5fa', letterSpacing: '-0.02em' },
  navMenu: { display: 'flex', gap: '30px', alignItems: 'center' },
  navItemContainer: { paddingBottom: '4px', borderBottom: '4px solid transparent' },
  navItemContainerActive: { paddingBottom: '4px', borderBottom: '3px solid #1a56db' },
  navItem: { cursor: 'pointer', color: '#475569', fontWeight: '700', fontSize: '16px' },
  navItemActive: { cursor: 'pointer', color: '#1a56db', fontWeight: '700', fontSize: '16px' },
  navItemLogout: { cursor: 'pointer', color: '#ef4444', fontWeight: '700', fontSize: '16px' },
  
  mainContent: { width: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  whiteCard: { border: '1px solid #e2e8f0', borderRadius: '24px', padding: '45px 50px', backgroundColor: '#ffffff', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' },
  backButtonContainer: { display: 'flex', justifyContent: 'flex-start', width: '100%' },
  btnSendIndicator: { backgroundColor: '#ffffff', border: '2px solid #1a56db', color: '#1a56db', padding: '8px 24px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '25px', alignSelf: 'flex-start', transition: 'all 0.15s ease' },
  cardTitle: { fontSize: '26px', fontWeight: '800', color: '#0f172a', textAlign: 'center', mt: '10px', marginBottom: '40px', letterSpacing: '-0.02em' },
  
  buttonGroup: { display: 'flex', justifyContent: 'center', gap: '24px', width: '100%', boxSizing: 'border-box' },
  btnOptionActive: { flex: '1', maxWidth: '320px', backgroundColor: '#eff6ff', color: '#1a56db', border: '2px solid #1a56db', padding: '24px 20px', borderRadius: '18px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', justifyContet: 'center', transition: 'all 0.2s ease-in-out' },
  btnOptionInactive: { flex: '1', maxWidth: '320px', backgroundColor: '#ffffff', color: '#334155', border: '2px solid #e2e8f0', padding: '24px 20px', borderRadius: '18px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', justifyContet: 'center', transition: 'all 0.2s ease-in-out' },
  btnSubtitle: { fontSize: '11px', fontWeight: '500', color: '#60a5fa', textAlign: 'center', marginTop: '2px' },
  btnSubtitleInactive: { fontSize: '11px', fontWeight: '500', color: '#64748b', textAlign: 'center', marginTop: '2px' }
};

export default Send;
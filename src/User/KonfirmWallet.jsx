import { useState } from 'react';
import KonfirmPin from './KonfirmPin';

export default function KonfirmWallet({ selectedWallet, phoneNumber, nominalTopUp, onBack, onLogout, onPaymentSuccess }) {
  const [showPin, setShowPin] = useState(false);

  // Ambil nama e-wallet secara aman baik berupa objek map atau string murni
  const walletName = selectedWallet?.selectedWallet || selectedWallet || 'Shoopeepay';

  const namaPenerima = 'Angeliqia V G Pardosi'; 
  const nomorTelepon = phoneNumber || selectedWallet?.phoneNumber || '081362267690'; 
  const nominalValue = Number(nominalTopUp || selectedWallet?.nominalTopUp || 100000);       
  
  const biayaAdmin = 1000;
  const totalPembayaran = nominalValue + biayaAdmin;

  const formatRupiah = (angka) => {
    return 'Rp' + (angka || 0).toLocaleString('id-ID');
  };

  const renderMiniLogo = () => {
    switch (walletName) {
      case 'Gopay':
        return (
          <div style={styles.walletBadge}>
            <div style={styles.gopayDot}></div>
            <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '16px' }}>Gopay</span>
          </div>
        );
      case 'Danatopup':
        return (
          <div style={styles.walletBadge}>
            <span style={styles.danaDot}>D</span>
            <span style={{ color: '#0081c9', fontWeight: '700', fontSize: '16px' }}>Danatopup</span>
          </div>
        );
      case 'Shoopeepay':
      default:
        return (
          <div style={styles.walletBadge}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '16px', fontWeight: '800', color: '#ff4500' }}>
              <span style={styles.shopeeIcon}>S</span>
              <span style={{ fontStyle: 'italic', fontWeight: '900' }}>Pay</span>
            </div>
            <span style={{ color: '#ff4500', fontWeight: '700', fontSize: '16px' }}>Shoopeepay</span>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
        .btn-active:hover { opacity: 0.95; transform: translateY(-1px); }
        .btn-pay:active { transform: scale(0.97); }
      `}</style>

      {/* WRAPPER UTAMA: Berada tepat di tengah layar tanpa deviasi transform */}
      <div style={styles.dashboardWrapper}>
        
        {/* 1. NAVBAR UTAMA */}
        <header style={styles.header}>
          <div style={styles.brandSection}>
            <div onClick={onBack} style={styles.logoContainer} title="Home">
              <span style={styles.logoTextBlue}>TrustPay</span>
              <span style={styles.logoTextLightBlue}>.id</span>
              <span style={{ marginLeft: '6px', fontSize: '28px', display: 'inline-block', verticalAlign: 'middle' }}>🛡️</span>
            </div>
          </div>
            
          <nav style={styles.navMenu}>
            <span onClick={onBack} style={styles.navItemActive}>Home</span>
            <span onClick={() => alert('Tidak ada notifikasi baru.')} style={styles.navItem}>Notifikasi</span>
            <span onClick={onLogout} style={styles.navItemLogout}>Logout</span>
          </nav>
        </header>

        {/* 2. CARD RINGKASAN PEMBAYARAN */}
        <main style={styles.contentCard}>
          <div style={styles.topBarRow}>
            <button type="button" onClick={onBack} style={styles.btnBackMini}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              BACK
            </button>
          </div>

          {/* Info Wallet & Nomor */}
          <div style={styles.walletSection}>
            {renderMiniLogo()}
            <span style={styles.phoneSubtitle}>{nomorTelepon}</span>
          </div>

          {/* Area Detail Data */}
          <div style={styles.detailsContainer}>
            <div style={styles.rowDetail}>
              <span style={styles.labelLeft}>Penerima</span>
              <span style={styles.valueRight}>{namaPenerima}</span>
            </div>

            <div style={styles.rowDetail}>
              <span style={styles.labelLeft}>Nominal</span>
              <span style={styles.valueRight}>{formatRupiah(nominalValue)}</span>
            </div>

            <div style={styles.rowDetail}>
              <span style={styles.labelLeft}>Biaya Admin</span>
              <span style={styles.valueRight}>{formatRupiah(biayaAdmin)}</span>
            </div>

            <hr style={styles.dividerLine} />

            <div style={styles.rowTotal}>
              <span style={styles.labelTotal}>Total</span>
              <span style={styles.valueTotal}>{formatRupiah(totalPembayaran)}</span>
            </div>
          </div>

          {/* Tombol Eksekusi */}
          <button onClick={() => setShowPin(true)} className="btn-pay" style={styles.btnBayar}>
            Bayar
          </button>
        </main>
      </div>

      {/* Pop-up Modal Input PIN */}
      <KonfirmPin 
        isOpen={showPin} 
        onClose={() => setShowPin(false)} 
        onSuccess={() => {
          setShowPin(false);
          if (onPaymentSuccess) {
            onPaymentSuccess();
          }
        }}
      />
    </div>
  );
}

const styles = {
  container: { 
    backgroundColor: '#f8fafc', 
    minHeight: '100vh', 
    width: '100vw', 
    overflow: 'hidden',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box', 
    padding: '40px 24px'
  },
  dashboardWrapper: {
    width: '100%',
    maxWidth: '1050px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    marginBottom: '20px', 
    boxSizing: 'border-box' 
  },
  brandSection: { display: 'flex', alignItems: 'center' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '32px', color: '#1a56db' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '32px', color: '#60a5fa' },
  navMenu: { display: 'flex', gap: '25px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#0f172a', fontWeight: '700', fontSize: '15px' },
  navItemActive: { cursor: 'pointer', color: '#1a56db', fontWeight: '700', fontSize: '15px', borderBottom: '3px solid #1a56db', paddingBottom: '2px' },
  navItemLogout: { cursor: 'pointer', color: '#ef4444', fontWeight: '700', fontSize: '15px' },
  
  contentCard: { 
    border: '1px solid #e2e8f0', 
    borderRadius: '24px', 
    padding: '40px', 
    backgroundColor: '#ffffff', 
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)', 
    display: 'flex', 
    flexDirection: 'column', 
    width: '100%', 
    boxSizing: 'border-box' 
  },
  topBarRow: { display: 'flex', justifycontent: 'flex-start', width: '100%', marginBottom: '20px' },
  btnBackMini: { backgroundColor: '#ffffff', border: '2px solid #1a56db', color: '#1a56db', padding: '6px 20px', borderRadius: '15px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' },
  walletSection: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' },
  walletBadge: { display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1.5px solid #bfdbfe', borderRadius: '12px', padding: '8px 20px', backgroundColor: '#ffffff' },
  shopeeIcon: { backgroundColor: '#FF4500', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: '800', fontSize: '12px' },
  gopayDot: { width: '16px', height: '16px', backgroundColor: '#00AED6', borderRadius: '50%' },
  danaDot: { width: '18px', height: '18px', backgroundColor: '#0081C9', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 'bold' },
  phoneSubtitle: { fontSize: '20px', color: '#0f172a', fontWeight: '700' },
  
  detailsContainer: { display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' },
  rowDetail: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  labelLeft: { fontSize: '15px', fontWeight: '600', color: '#94a3b8' },
  valueRight: { fontSize: '15px', fontWeight: '700', color: '#0f172a', textAlign: 'right' },
  
  dividerLine: { border: 'none', borderTop: '1px dashed #e2e8f0', margin: '10px 0' },
  rowTotal: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', width: '100%' },
  labelTotal: { fontSize: '15px', fontWeight: '700', color: '#0f172a' },
  valueTotal: { fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' },
  
  btnBayar: { 
    backgroundColor: '#1a56db', 
    border: 'none', 
    color: '#ffffff', 
    padding: '12px 0', 
    width: '200px', 
    borderRadius: '9999px', 
    fontWeight: '700', 
    fontSize: '14px', 
    cursor: 'pointer', 
    alignSelf: 'center', 
    marginTop: '10px', 
    boxShadow: '0 4px 6px -1px rgba(26, 86, 219, 0.2)',
    textAlign: 'center',
    transition: 'all 0.15s ease'
  }
};
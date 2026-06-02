import { useState } from 'react'; // 🛡️ FIX: Menggunakan React murni, bukan Preact

export default function ProsesWallet({ selectedWallet, onBack, onLogout, onPaymentSuccess }) {
  // Ambil nama e-wallet murni dari state objek atau string langsung
  const walletName = selectedWallet?.selectedWallet || selectedWallet || 'Shoopeepay';

  const [phoneNumber, setPhoneNumber] = useState('');
  const [nominal, setNominal] = useState(''); // Menyimpan string terformat (Contoh: "50.000")

  // Helper untuk mengubah angka mentah menjadi format ribuan titik Indonesia
  const formatRibuan = (value) => {
    if (!value) return '';
    const nomorMentah = value.replace(/[^0-9]/g, '');
    return new Intl.NumberFormat('id-ID').format(nomorMentah);
  };

  // Handler input nominal dengan pembatasan hanya angka & format otomatis
  const handleNominalInput = (e) => {
    const inputval = e.target.value;
    const angkaMentah = inputval.replace(/[^0-9]/g, '');
    setNominal(formatRibuan(angkaMentah));
  };

  // Handler input nomor telepon khusus angka
  const handlePhoneInput = (e) => {
    const inputval = e.target.value;
    setPhoneNumber(inputval.replace(/[^0-9]/g, ''));
  };

  // Fungsi untuk membersihkan nilai input field (tombol X)
  const clearField = (field) => {
    if (field === 'phone') setPhoneNumber('');
    if (field === 'nominal') setNominal('');
  };

  // Fungsi penanganan saat tombol Konfirmasi Pembayaran ditekan
  const handlePaymentSubmit = () => {
    if (!phoneNumber.trim() || !nominal.trim()) {
      alert('Harap isi nomor telepon dan nominal top up terlebih dahulu!');
      return;
    }

    // Menghilangkan karakter non-angka untuk mendapatkan nilai integer murni
    const numericNominal = parseInt(nominal.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numericNominal) || numericNominal < 20000) {
      alert('Minimal top up adalah Rp 20.000');
      return;
    }

    // Lempar data objek lengkap ke App.jsx untuk dialihkan ke case 'konfirmwallet'
    if (onPaymentSuccess) {
      onPaymentSuccess({
        selectedWallet: walletName,
        phoneNumber: phoneNumber,
        nominalTopUp: numericNominal
      });
    }
  };

  // Tampilan Logo E-Wallet Dinamis Sesuai State yang Dipilih Sebelumnya
  const renderSelectedWalletLogo = () => {
    switch (walletName) {
      case 'Gopay':
        return (
          <div style={styles.walletBadge}>
            <div style={styles.gopayIcon}>
              <div style={styles.gopayInnerCircle}></div>
            </div>
            <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '16px', letterSpacing: '-0.5px' }}>Gopay</span>
          </div>
        );
      case 'Danatopup':
        return (
          <div style={styles.walletBadge}>
            <div style={styles.danaLogoText}>
              <span style={styles.danaIconCircle}>D</span>
              <span>DANA</span>
            </div>
            <span style={{ color: '#0081c9', fontWeight: '800', fontSize: '16px' }}>Danatopup</span>
          </div>
        );
      case 'Shoopeepay':
      default:
        return (
          <div style={styles.walletBadge}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '18px', fontWeight: '700', color: '#ff4500' }}>
              <span style={styles.shopeeLogoBold}>S</span>
              <span style={{ fontStyle: 'italic', fontWeight: '800' }}>Pay</span>
            </div>
            <span style={{ color: '#ff4500', fontWeight: '800', fontSize: '16px' }}>Shoopeepay</span>
          </div>
        );
    }
  };

  return (
    <div style={styles.mainContainer}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #ffffff; }
        .btn-add-back:hover { background-color: #f1f5f9 !important; transform: translateY(-1px); }
        .btn-submit-wallet:hover { background-color: #1e429f !important; box-shadow: 0 10px 20px rgba(26, 86, 219, 0.2) !important; }
        .btn-submit-wallet:active { transform: scale(0.99); }
        .input-wallet-box:focus { background-color: #ffffff !important; border: 2px solid #1a56db !important; }
      `}</style>

      <header style={styles.header}>
        <div style={styles.logoContainer} onClick={onBack} title="Kembali ke Home">
          <span style={styles.logoTextBlue}>TrustPay</span>
          <span style={styles.logoTextLightBlue}>.id</span>
          <span style={{ marginLeft: '6px', fontSize: '28px', display: 'inline-block', verticalAlign: 'middle' }}>🛡️</span>
        </div>

        <nav style={styles.navMenu}>
          <span onClick={onBack} style={styles.navItemActive}>Home</span>
          <span onClick={() => alert('Belum ada notifikasi baru.')} style={styles.navItem}>Notifikasi</span>
          <span onClick={onLogout} style={styles.navItemLogout}>Logout</span>
        </nav>
      </header>

      {/* Main Form Content Card */}
      <main style={styles.contentCard}>
        <div style={styles.topBarRow}>
          <button type="button" onClick={onBack} className="btn-add-back" style={styles.btnAddHeader}>
            <span style={styles.plusIcon}>+</span> ADD
          </button>
        </div>

        {/* Badge Jenis E-Wallet Aktif */}
        {renderSelectedWalletLogo()}

        {/* Input No. Telepon */}
        <div style={styles.formGroup}>
          <span style={styles.floatingLabel}>No. Telepon / Akun</span>
          <input 
            type="text" 
            inputMode="numeric"
            placeholder="Contoh: 081234567890"
            value={phoneNumber} 
            onInput={handlePhoneInput}
            className="input-wallet-box"
            style={styles.inputBox} 
          />
          {phoneNumber && (
            <button type="button" onClick={() => clearField('phone')} style={styles.clearButton} title="Hapus teks">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" fill="#cbd5e1" stroke="none"></circle>
                <path d="M15 9l-6 6M9 9l6 6"></path>
              </svg>
            </button>
          )}
        </div>

        {/* Input Nominal Otomatis Rupiah */}
        <div style={styles.formGroup}>
          <span style={styles.floatingLabel}>Nominal Isi Saldo (IDR)</span>
          <div style={{ position: 'relative', width: '100%' }}>
            {nominal && <span style={styles.currencyPrefix}>Rp</span>}
            <input 
              type="text" 
              inputMode="numeric"
              placeholder="Masukkan nominal saldo"
              value={nominal} 
              onInput={handleNominalInput}
              className="input-wallet-box"
              style={{
                ...styles.inputBox,
                paddingLeft: nominal ? '54px' : '24px' // Geser teks jika prefiks "Rp" muncul
              }} 
            />
          </div>
          {nominal && (
            <button type="button" onClick={() => clearField('nominal')} style={styles.clearButton} title="Hapus teks">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" fill="#cbd5e1" stroke="none"></circle>
                <path d="M15 9l-6 6M9 9l6 6"></path>
              </svg>
            </button>
          )}
          <span style={styles.labelHint}>*Minimal pengisian e-wallet adalah Rp 20.000</span>
        </div>

        {/* Tombol Pembayaran Akun */}
        <button 
          type="button" 
          onClick={handlePaymentSubmit} 
          className="btn-submit-wallet"
          style={styles.btnPembayaran}
        >
          Konfirmasi Pembayaran
        </button>
      </main>
    </div>
  );
}

// STRUKTUR MODUL DESIGN SYSTEM TRUSTPAY.ID
const styles = {
  mainContainer: { backgroundColor: '#ffffff', minHeight: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', padding: '40px 100px 60px 100px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '50px', boxSizing: 'border-box' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '42px', color: '#1a56db', letterSpacing: '-0.02em' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '42px', color: '#60a5fa', letterSpacing: '-0.02em' },
  navMenu: { display: 'flex', gap: '30px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#475569', fontWeight: '700', fontSize: '16px' }, 
  navItemActive: { cursor: 'pointer', color: '#1a56db', fontWeight: '700', fontSize: '16px', borderBottom: '3px solid #1a56db', paddingBottom: '2px' },
  navItemLogout: { cursor: 'pointer', color: '#ef4444', fontWeight: '700', fontSize: '16px' },
  
  contentCard: { border: '1px solid #e2e8f0', borderRadius: '24px', padding: '45px 50px', backgroundColor: '#ffffff', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' },
  topBarRow: { display: 'flex', justifyContent: 'flex-start', width: '100%' },
  btnAddHeader: { backgroundColor: '#ffffff', border: '2px solid #1a56db', color: '#1a56db', padding: '8px 24px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '25px', alignSelf: 'flex-start', transition: 'all 0.15s ease' }, 
  plusIcon: { fontSize: '14px', fontWeight: '800', border: '2px solid #1a56db', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  walletBadge: { display: 'inline-flex', alignItems: 'center', gap: '12px', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '10px 20px', alignSelf: 'flex-start', marginBottom: '25px', backgroundColor: '#f8fafc' },
  shopeeLogoBold: { backgroundColor: '#ff4500', color: '#ffffff', padding: '2px 7px', borderRadius: '4px', fontWeight: '800', fontSize: '14px' },
  gopayIcon: { width: '20px', height: '20px', backgroundColor: '#00AED6', borderRadius: '50%', position: 'relative' },
  gopayInnerCircle: { position: 'absolute', width: '8px', height: '8px', backgroundColor: '#ffffff', borderRadius: '50%', top: '6px', left: '6px' },
  danaLogoText: { color: '#0081c9', fontStyle: 'italic', letterSpacing: '0.5px', fontSize: '16px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' },
  danaIconCircle: { width: '18px', height: '18px', backgroundColor: '#0081c9', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontStyle: 'normal', fontWeight: 'bold' },
  
  formGroup: { position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '22px' },
  labelHint: { fontSize: '11px', color: '#64748b', fontWeight: '600', marginTop: '6px', paddingLeft: '4px', alignSelf: 'flex-start' },
  inputBox: { width: '100%', padding: '36px 60px 14px 24px', border: '2px solid transparent', borderRadius: '14px', fontSize: '18px', fontWeight: '700', color: '#0f172a', outline: 'none', backgroundColor: '#eff6ff', boxSizing: 'border-box', transition: 'all 0.15s ease' }, 
  floatingLabel: { position: 'absolute', left: '24px', top: '12px', fontSize: '12px', color: '#64748b', fontWeight: '700', zIndex: 5 },
  currencyPrefix: { position: 'absolute', left: '24px', bottom: '14px', fontSize: '18px', fontWeight: '700', color: '#0f172a', zIndex: 5 },
  clearButton: { position: 'absolute', right: '24px', bottom: '15px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', zIndex: 10 }, 
  btnPembayaran: { backgroundColor: '#1a56db', border: 'none', color: '#ffffff', padding: '16px 0', width: '300px', borderRadius: '24px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', alignSelf: 'center', marginTop: '20px', boxShadow: '0 4px 12px rgba(26, 86, 219, 0.15)', transition: 'all 0.15s ease' }
};
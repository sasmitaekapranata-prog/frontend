import { useState } from 'react'; // 🛡️ FIX: Menggunakan React murni, bukan Preact

export default function Pin({ onBack, onFinish, pinSource }) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const isTransaksi = pinSource === 'transaksi';
  const isPinValid = /^\d{6}$/.test(pin);
  const isMatch = pin === confirmPin;
  const isFormValid = isTransaksi ? isPinValid : (isPinValid && isMatch);

  const handleNumpadInput = (digit) => {
    if (pin.length < 6) setPin(prev => prev + digit);
  };

  const handleDigits = (val, setter) => {
    setter(val.replace(/\D/g, '').slice(0, 6));
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleSubmitSetup = () => {
    if (isFormValid && onFinish) {
      onFinish(pin);
    }
  };

  // 🟢 KONDISI A: Tampilan Modal Pop-up (Untuk Validasi Transaksi / Kirim Uang)
  if (isTransaksi) {
    return (
      <div style={styles.fixedWrapper}>
        <div style={styles.overlay} onClick={onBack} />
        <div style={styles.modalContainer}>
          <div style={styles.headerPop}>
            <h2 style={styles.titlePop}>Masukkan PIN Anda</h2>
            <p style={styles.subtitlePop}>Keamanan transaksi TrustPay.id 6-digit.</p>
          </div>

          {/* Indikator Titik PIN */}
          <div style={styles.dotsContainer}>
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                style={{
                  ...styles.dot,
                  backgroundColor: index < pin.length ? '#1a56db' : '#ffffff',
                  borderColor: index < pin.length ? '#1a56db' : '#cbd5e1',
                }}
              />
            ))}
          </div>

          {/* Grid Papan Angka (Numpad) */}
          <div style={styles.numpadGrid}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button 
                key={num} 
                type="button"
                onClick={() => handleNumpadInput(num)} 
                className="numpad-btn"
                style={styles.numpadBtn}
              >
                {num}
              </button>
            ))}
          </div>

          <div style={styles.bottomRow}>
            <button type="button" onClick={handleDelete} style={styles.numpadBtnSpecial} className="btn-action">
              <FiDelete size={22} color="#64748b" />
            </button>
            <button 
              type="button" 
              onClick={() => handleNumpadInput('0')} 
              className="numpad-btn"
              style={styles.numpadBtn}
            >
              0
            </button>
            <button 
              type="button"
              onClick={() => isPinValid && onFinish && onFinish(pin)} 
              disabled={!isPinValid}
              className="btn-action"
              style={{
                ...styles.numpadBtnSpecial,
                fontWeight: '700',
                color: isPinValid ? '#1a56db' : '#94a3b8',
                cursor: isPinValid ? 'pointer' : 'not-allowed',
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🔵 KONDISI B: Tampilan Halaman Penuh (Untuk Setup Pembuatan Akun Baru)
  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #ffffff; }
        .numpad-btn:hover { background-color: #e2e8f0 !important; color: #0f172a !important; }
        .numpad-btn:active { transform: scale(0.96); }
        .btn-action:hover { opacity: 0.8; }
        .btn-submit-pin:hover { opacity: 0.95; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(26, 86, 219, 0.2); }
        .input-pin-box:focus { background-color: #ffffff !important; border: 2px solid #1a56db !important; }
      `}</style>

      {/* KIRI: Banner Informasi Terpadu TrustPay */}
      <div style={styles.leftBanner}>
        <div onClick={onBack} style={styles.logoContainer} title="Kembali">
          <div style={styles.logoText}>TrustPay<span style={{ color: '#93c5fd' }}>.id</span> 🛡️</div>
        </div>
        <div style={styles.hero}>
          <h3 style={styles.heroH3}>Halo, selamat datang!</h3>
          <h1 style={styles.heroH1}>Satu aplikasi untuk semua kebutuhan kamu.</h1>
          <p style={styles.heroP}>Kelola semua pembayaran Anda dalam satu akun aman.</p>
        </div>
      </div>

      {/* KANAN: Formulir Pembuatan & Konfirmasi PIN */}
      <div style={styles.rightForm}>
        <div style={styles.cardWrapper}>
          
          <div style={styles.formHeader}>
            <h2 style={styles.titleSetup}>Buat Keamanan Akun</h2>
            <p style={styles.subtitleSetup}>Atur 6-digit PIN unik Anda untuk mengamankan proses dompet digital.</p>
          </div>

          <div style={styles.formCard}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Buat PIN Baru</label>
              <input 
                type="password" 
                pattern="\d*"
                maxLength={6}
                placeholder="••••••" 
                value={pin}
                onInput={(e) => handleDigits(e.target.value, setPin)}
                className="input-pin-box"
                style={styles.input} 
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Konfirmasi PIN Baru</label>
              <input 
                type="password" 
                pattern="\d*"
                maxLength={6}
                placeholder="••••••" 
                value={confirmPin}
                onInput={(e) => handleDigits(e.target.value, setConfirmPin)}
                className="input-pin-box"
                style={styles.input} 
              />
              {!isMatch && confirmPin.length === 6 && (
                <span style={styles.errorText}>⚠️ Konfirmasi PIN tidak cocok.</span>
              )}
            </div>

            <button 
              type="button"
              onClick={handleSubmitSetup} 
              disabled={!isFormValid} 
              className={isFormValid ? "btn-submit-pin" : ""}
              style={{ 
                ...styles.btnSubmit, 
                backgroundColor: isFormValid ? '#1a56db' : '#93c5fd',
                cursor: isFormValid ? 'pointer' : 'not-allowed'
              }}
            >
              Konfirmasi & Masuk Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ARSITEKTUR STRUKTUR GAYA VISUAL PIN RE-DESIGNED
const styles = {
  fixedWrapper: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999 },
  overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' },
  modalContainer: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '360px', backgroundColor: '#ffffff', borderRadius: '24px', padding: '35px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' },
  headerPop: { textAlign: 'center', marginBottom: '25px' },
  titlePop: { fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.01em' },
  subtitlePop: { fontSize: '13px', color: '#64748b', fontWeight: '400', lineHeight: '1.4' },
  dotsContainer: { display: 'flex', gap: '16px', marginBottom: '35px' },
  dot: { width: '14px', height: '14px', borderRadius: '50%', border: '2px solid', transition: 'all 0.15s ease' },
  numpadGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px 20px', width: '100%', marginBottom: '16px' },
  numpadBtn: { width: '64px', height: '64px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyAxalign: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '50%', fontSize: '22px', fontWeight: '700', color: '#0f172a', cursor: 'pointer', transition: 'all 0.1s ease-in-out' },
  bottomRow: { display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px' },
  numpadBtnSpecial: { width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', fontSize: '16px', fontWeight: '700', color: '#64748b', cursor: 'pointer' },
  
  container: { display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#ffffff' },
  leftBanner: { 
    width: '50vw', 
    background: 'linear-gradient(135deg, #1e40af 0%, #1a56db 50%, #1e429f 100%)', 
    padding: '60px 80px', 
    color: '#ffffff', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    boxSizing: 'border-box'
  },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoText: { fontWeight: '800', fontSize: '32px', letterSpacing: '-0.03em', color: '#ffffff' },
  hero: { maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px', textAlign: 'left' },
  heroH3: { fontSize: '20px', fontWeight: '400', opacity: 0.9, color: '#93c5fd', textAlign: 'left' },
  heroH1: { fontSize: '44px', fontWeight: '800', lineHeight: '1.25', color: '#ffffff', letterSpacing: '-0.02em', textAlign: 'left' },
  heroP: { fontSize: '15px', fontWeight: '400', opacity: 0.8, lineHeight: '1.6', textAlign: 'left' },
  
  rightForm: { width: '50vw', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px', boxSizing: 'border-box' },
  cardWrapper: {
    width: '100%',
    maxWidth: '440px',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    boxSizing: 'border-box'
  },
  formHeader: { display: 'flex', flexDirection: 'column', gap: '6px' },
  titleSetup: { fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.01em' },
  subtitleSetup: { fontSize: '13px', color: '#64748b', lineHeight: '1.5' },
  
  formCard: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontWeight: '600', fontSize: '13px', color: '#334155' },
  input: { 
    width: '100%', 
    padding: '14px 20px', 
    borderRadius: '12px', 
    border: '2px solid transparent', 
    backgroundColor: '#f1f5f9', 
    color: '#0f172a', 
    fontWeight: '700', 
    letterSpacing: '16px', 
    fontSize: '24px', 
    textAlign: 'center', 
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'all 0.15s ease'
  },
  btnSubmit: { width: '100%', padding: '14px', borderRadius: '12px', color: 'white', border: 'none', fontWeight: '700', fontSize: '15px', marginTop: '10px', transition: 'all 0.2s ease' },
  errorText: { fontSize: '11px', color: '#ef4444', fontWeight: '600', marginTop: '4px' }
};
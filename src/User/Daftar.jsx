import { useState } from 'react'; // 🛡️ SINKRON: Menggunakan Preact agar tidak crash dengan App.jsx

export default function Daftar({ onBack, onNext }) {
  const [username, setUsername] = useState('');
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = false || useState(false);

  // Aturan validasi kekuatan password
  const rules = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    symbol: /[@/#/$]/.test(password),
    number: /[0-9]/.test(password),
  };

  const isPasswordValid = Object.values(rules).every(Boolean);
  const isFormValid = username.trim() !== '' && emailPhone.trim() !== '' && isPasswordValid;

  const handleDaftarSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && onNext) {
      // 🟢 SINKRONISASI PARAMETER: Mengirimkan name, phone, email, password ke App.jsx
      onNext(username, emailPhone, emailPhone, password); 
    }
  };

  // Blokir input non-angka secara real-time pada nomor HP
  const handlePhoneInput = (e) => {
    const originalValue = e.target.value;
    const cleanValue = originalValue.replace(/\D/g, '');
    
    // Paksa nilai elemen DOM sinkron dengan state
    e.target.value = cleanValue;
    setEmailPhone(cleanValue);
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
        input::placeholder { color: #a5b1ca; opacity: 1; }
        .btn-active:hover { opacity: 0.95; transform: translateY(-1px); }
      `}</style>

      {/* SISI KIRI: BANNER */}
      <div style={styles.leftBanner}>
        <div onClick={onBack} style={{...styles.logoContainer, cursor: 'pointer'}} title="Kembali ke halaman utama">
          <div style={styles.logoText}>TrustPay.id 🛡️</div>
        </div>
        <div style={styles.hero}>
          <h3 style={styles.heroH3}>Halo, selamat datang!</h3>
          <h1 style={styles.heroH1}>Satu aplikasi untuk semua kebutuhan kamu.</h1>
          <p style={styles.heroP}>Kelola semua pembayaran Anda dalam satu akun.</p>
        </div>
      </div>

      {/* SISI KANAN: FORM REGISTRASI */}
      <div style={styles.rightForm}>
        <form onSubmit={handleDaftarSubmit} style={styles.formCard}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nama Pengguna</label>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onInput={(e) => setUsername(e.target.value)} // 🛡️ SINKRON: Menggunakan onInput khas Preact
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>No.hp</label>
            <input 
              type="text" 
              inputMode="numeric" 
              aria-label="Nomor telepon" 
              placeholder="Nomor telepon" 
              value={emailPhone} 
              onInput={handlePhoneInput} // 🛡️ SINKRON: Menggunakan onInput khas Preact
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="........" 
                value={password} 
                onInput={(e) => setPassword(e.target.value)} // 🛡️ SINKRON: Menggunakan onInput khas Preact
                style={{...styles.inputPassword, letterSpacing: showPassword ? '0px' : '3px'}} 
              />
              <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={showPassword ? "#3b66df" : "#a5b1ca"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </span>
            </div>
          </div>

          {/* GRID VALIDASI */}
          <div style={styles.validationGrid}>
            {Object.entries(rules).map(([key, isMet]) => {
              const labels = { length: 'Minimal 8 karakter', lowercase: 'Huruf Kecil', uppercase: 'Huruf Kapital', symbol: 'Simbol (@/#/$)', number: 'Angka (0-9)' };
              const themeColor = isMet ? '#2ecc71' : '#655b5a';
              return (
                <div key={key} style={{...styles.validationItem, color: themeColor}}>
                  <span style={{...styles.bullet, backgroundColor: themeColor}}>{isMet ? '✓' : '✕'}</span> {labels[key]}
                </div>
              );
            })}
          </div>

          {/* 🛠️ PERBAIKAN TEKS TOMBOL: Menjadi 'Daftar' agar relevan dengan alur registrasi */}
          <button 
            type="submit"
            disabled={!isFormValid} 
            className={isFormValid ? "btn-active" : ""} 
            style={{
              ...styles.btnSubmit, 
              backgroundColor: isFormValid ? '#3b66df' : '#8fa8f4', 
              cursor: isFormValid ? 'pointer' : 'not-allowed', 
              boxShadow: isFormValid ? '0 4px 14px rgba(59, 102, 223, 0.3)' : 'none'
            }}
          >
            Daftar Akun
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', top: 0, left: 0, zIndex: 999, backgroundColor: '#ffffff' },
  leftBanner: { flex: 1, background: 'linear-gradient(135deg, #7da7f9 0%, #4a7ff6 40%, #3562df 100%)', padding: '8% 8% 8% 10%', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' },
  logoContainer: { position: 'absolute', top: '8%', left: '10%', display: 'flex', alignItems: 'center', gap: '12px' },
  logoText: { fontWeight: 700, fontSize: '38px', letterSpacing: '-0.5px', textAlign: 'left' },
  hero: { maxWidth: '520px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '40px' },
  heroH3: { fontSize: '24px', fontWeight: 300, color: '#ffffff', opacity: 0.9, textAlign: 'left', margin: '0 0 16px 0' },
  heroH1: { fontSize: '50px', fontWeight: 700, lineHeight: 1.2, color: '#ffffff', letterSpacing: '-0.5px', textAlign: 'left', margin: '0 0 24px 0' },
  heroP: { fontSize: '18px', fontWeight: 300, opacity: 0.85, textAlign: 'left', margin: 0 },
  rightForm: { flex: 1, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  formCard: { width: '100%', maxWidth: '460px', padding: '0 30px', display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontWeight: '600', fontSize: '14px', color: '#333333', textAlign: 'left' },
  input: { width: '100%', padding: '16px 20px', borderRadius: '12px', border: 'none', backgroundColor: '#eff3fe', fontSize: '15px', color: '#333', outline: 'none' },
  passwordWrapper: { position: 'relative', width: '100%' },
  inputPassword: { width: '100%', padding: '16px 50px 16px 20px', borderRadius: '12px', border: 'none', backgroundColor: '#eff3fe', fontSize: '15px', outline: 'none', color: '#333' },
  eyeIcon: { position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  validationGrid: { display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', rowGap: '4px', columnGap: '4px', marginTop: '4px' },
  validationItem: { fontSize: '10.5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '400', transition: 'color 0.2s ease' },
  bullet: { display: 'inline-flex', width: '15px', height: '15px', color: 'white', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold' },
  btnSubmit: { width: '100%', padding: '16px', borderRadius: '14px', color: 'white', border: 'none', fontWeight: '600', fontSize: '16px', marginTop: '15px', transition: 'all 0.2s ease-in-out' }
};
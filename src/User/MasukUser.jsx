import { useState } from 'react';
// import API from '../api'; // Dimatikan sementara karena file api belum dibuat

export default function MasukUser({ onBack, onLoginSuccess }) {
  const [phone, setPhone] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const isFormValid = phone.trim() !== '' && password.trim() !== '' && !isLoading;

  const handleLogin = async (e) => {
    e.preventDefault(); 
    if (!isFormValid) return;

    setIsLoading(true);

    try {
      // --- SIMULASI LOGIN SEMENTARA (Sambil Menunggu API Backend Siap) ---
      console.log("Mencoba login dengan:", { nomor_hp: phone, password: password });
      
      // Simulasi jeda loading selama 1 detik
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      
      const fakeToken = "dummy-token-trustpay-12345";
      alert('Login Berhasil! (Mode Simulasi Tanpa Backend)');
      
      if (onLoginSuccess) {
        onLoginSuccess(fakeToken);
      }
      // ------------------------------------------------------------------

      /* // Kode Asli API ini bisa diaktifkan kembali nanti jika file src/api.js sudah ada:
      const response = await API.post('/login', {
        nomor_hp: phone, 
        password: password
      });

      const token = response.data?.token;

      if (token) {
        alert('Login Berhasil!');
        if (onLoginSuccess) {
          onLoginSuccess(token);
        }
      } else {
        alert('Gagal mendapatkan token autentikasi dari server.');
      }
      */

    } catch (err) {
      console.error("Gagal Login API:", err);
      alert(err.response?.data?.message || 'Login Gagal! Nomor HP atau Password salah.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #ffffff; }
        .btn-active:hover { opacity: 0.95; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(26, 86, 219, 0.2); }
        .btn-active:active { transform: translateY(1px); }
        .input-field:focus { background-color: #ffffff !important; border: 2px solid #1a56db !important; }
      `}</style>

      {/* SISI KIRI: BANNER GRADASI Symmetrical 50vw Layout */}
      <div style={styles.leftBanner}>
        <div onClick={onBack} style={styles.logoContainer} title="Kembali ke halaman utama">
          <div style={styles.logoText}>TrustPay<span style={{ color: '#bfdbfe' }}>.id</span> 🛡️</div>
        </div>
        <div style={styles.hero}>
          <h3 style={styles.heroH3}>Halo, selamat datang!</h3>
          <h1 style={styles.heroH1}>Satu aplikasi untuk semua kebutuhan kamu.</h1>
          <p style={styles.heroP}>Kelola semua pembayaran Anda dalam satu akun aman.</p>
        </div>
      </div>

      {/* SISI KANAN: FORM LOGIN */}
      <div style={styles.rightForm}>
        <div style={styles.cardWrapper}>
          
          {/* Header Judul Form Masuk */}
          <div style={styles.formHeader}>
            <h2 style={styles.title}>Masuk Akun User</h2>
            <p style={styles.subtitle}>Masukkan nomor handphone dan kata sandi Anda yang terdaftar.</p>
          </div>

          <form onSubmit={handleLogin} style={styles.formCard} autoComplete="off">
            {/* Kolom Nomor HP */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nomor Handphone</label>
              <input 
                type="tel" 
                placeholder="Contoh: 081362267690" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                className="input-field"
                style={styles.input} 
                autoComplete="off" 
              />
            </div>

            {/* Kolom Password */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Masukkan Password Anda" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="input-field"
                  style={styles.inputPassword} 
                  autoComplete="new-password" 
                />
                <span onClick={() => !isLoading && setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={showPassword ? "#1a56db" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Tombol Eksekusi Submit */}
            <button 
              type="submit"
              disabled={!isFormValid} 
              className={isFormValid ? "btn-active" : ""} 
              style={{
                ...styles.btnSubmit, 
                backgroundColor: isFormValid ? '#1a56db' : '#93c5fd', 
                cursor: isFormValid ? 'pointer' : 'not-allowed'
              }}
            >
              {isLoading ? 'Memproses Masuk...' : 'Masuk Akun'}
            </button>
            
            {/* Tombol Batalkan / Kembali */}
            <span onClick={onBack} style={styles.cancelLink}>Kembali</span>
          </form>

        </div>
      </div>
    </div>
  );
}

// ARSITEKTUR STRUKTUR GAYA VISUAL FORM LOGIN 
const styles = {
  container: { 
    display: 'flex', 
    width: '100vw', 
    height: '100vh', 
    overflow: 'hidden', 
    backgroundColor: '#ffffff' 
  },
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
  logoText: { fontWeight: '800', fontSize: '32px', letterSpacing: '-0.03em' },
  hero: { maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' },
  heroH3: { fontSize: '20px', fontWeight: '400', opacity: 0.9, color: '#93c5fd' },
  heroH1: { fontSize: '44px', fontWeight: '800', lineHeight: '1.25', color: '#ffffff', letterSpacing: '-0.02em' },
  heroP: { fontSize: '15px', fontWeight: '400', opacity: 0.8, lineHeight: '1.6' },
  
  rightForm: { 
    width: '50vw', 
    backgroundColor: '#f8fafc', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    boxSizing: 'border-box'
  },
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
  title: { fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.01em' },
  subtitle: { fontSize: '13px', color: '#64748b', lineHeight: '1.5' },
  
  formCard: { display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' },
  label: { fontWeight: '600', fontSize: '13px', color: '#334155' },
  input: { 
    width: '100%', 
    padding: '14px 18px', 
    borderRadius: '12px', 
    border: '2px solid transparent', 
    backgroundColor: '#f1f5f9', 
    fontSize: '14px', 
    color: '#0f172a', 
    outline: 'none',
    transition: 'all 0.15s ease'
  },
  passwordWrapper: { position: 'relative', width: '100%' },
  inputPassword: { 
    width: '100%', 
    padding: '14px 50px 14px 18px', 
    borderRadius: '12px', 
    border: '2px solid transparent', 
    backgroundColor: '#f1f5f9', 
    fontSize: '14px', 
    outline: 'none', 
    color: '#0f172a',
    transition: 'all 0.15s ease'
  },
  eyeIcon: { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  btnSubmit: { 
    width: '100%', 
    padding: '14px', 
    borderRadius: '12px', 
    color: '#ffffff', 
    border: 'none', 
    fontWeight: '700', 
    fontSize: '15px', 
    marginTop: '10px', 
    transition: 'all 0.2s ease-in-out',
    textAlign: 'center'
  },
  cancelLink: {
    alignSelf: 'center',
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer',
    marginTop: '4px',
    transition: 'color 0.15s ease',
    textDecoration: 'underline'
  }
};
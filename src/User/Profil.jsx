import { useState } from 'react'; // 🛡️ FIX: Menggunakan React murni, bukan Preact

export default function Profil({ userName, onChangeName, userPhone, totalSaldo, onBack, onNavigate, onLogout }) {
  const [userMetadata] = useState({
    tipeAkun: 'Premium Member 🛡️',
  });

  // Helper formatting angka ke IDR Rupiah otomatis yang bersih
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(angka || 0);
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
        .btn-back-profile:hover { background: #1e429f !important; transform: translateY(-1px); }
        .btn-logout-profile:hover { background: #fee2e2 !important; color: #dc2626 !important; }
        .input-name-profile:focus { border-bottom: 2px solid #1a56db !important; }
      `}</style>

      <div style={styles.dashboardWrapper}>
        <header style={styles.header}>
          <div style={styles.brandSection}>
            <div onClick={onBack} style={styles.logoContainer} title="Kembali ke Home">
              <span style={styles.logoTextBlue}>TrustPay</span>
              <span style={styles.logoTextLightBlue}>.id</span>
              <span style={{ marginLeft: '6px', fontSize: '28px', display: 'inline-block', verticalAlign: 'middle' }}>🛡️</span>
            </div>
            <div style={styles.subTitle}>Halaman Profil Pengguna</div>
          </div>

          <nav style={styles.navMenu}>
            <span style={styles.navItem} onClick={onBack}>Home</span>
            <span style={styles.navItem} onClick={() => onNavigate('notifikasi')}>Notifikasi</span>
            <span style={styles.navItemLogout} onClick={onLogout}>Logout</span>
          </nav>
        </header>

        <main style={styles.mainContent}>
          <div style={styles.whiteContainer}>
            
            <div style={styles.profileHeader}>
              <div style={styles.avatarCircle}>
                <span style={styles.avatarText}>{userName ? userName.charAt(0).toUpperCase() : '?'}</span>
              </div>
              <div style={styles.identityGroup}>
                <input 
                  type="text" 
                  className="input-name-profile"
                  value={userName} 
                  placeholder="Ketik nama anda di sini..."
                  onChange={(e) => onChangeName && onChangeName(e.target.value)}
                  style={styles.nameInputStyle}
                />
                <span style={styles.badgePremium}>{userMetadata.tipeAkun}</span>
              </div>
            </div>

            <hr style={styles.divider} />

            <div style={styles.infoGrid}>
              {/* KOLOM SALDO UTAMA */}
              <div style={{...styles.infoRow, background: '#eff6ff', borderColor: '#bfdbfe'}}>
                <span style={{...styles.infoLabel, color: '#1a56db'}}>Total Saldo Akun (IDR)</span>
                <span style={{...styles.infoValue, color: '#1a56db', fontSize: '18px', fontWeight: '800'}}>{formatRupiah(totalSaldo)}</span>
              </div>

              {/* KOLOM NOMOR TELEPONG HASIL STRUKTUR DATA REGISTRASI */}
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Nomor Telepon</span>
                <span style={styles.infoValue}>{userPhone || 'Tidak Terikat'}</span>
              </div>
              
              {/* STATUS LOCKING VERIFIKASI SECURE */}
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Status Keamanan PIN</span>
                <span style={{...styles.infoValue, color: '#10b981', fontWeight: '700'}}>Aktif & Terlindungi Securitax 🔐</span>
              </div>
            </div>

            <div style={styles.actionArea}>
              <button type="button" className="btn-back-profile" style={styles.btnKembali} onClick={onBack}>← Kembali ke Transaksi</button>
              <button type="button" className="btn-logout-profile" style={styles.btnKeluar} onClick={onLogout}>Keluar dari Akun</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// STRUKTUR DATA GAYA VISUAL UNTUK HALAMAN PROFIL
const styles = {
  container: { minHeight: '100vh', width: '100vw', background: '#f8fafc', boxSizing: 'border-box', margin: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  dashboardWrapper: { width: '100%', maxWidth: '1050px', padding: '40px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '25px', transform: 'none', transition: 'all 0.2s ease-in-out' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  brandSection: { display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '32px', color: '#1a56db' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '32px', color: '#60a5fa' },
  subTitle: { fontSize: '13px', fontWeight: '700', color: '#64748b', paddingLeft: '2px' },
  navMenu: { display: 'flex', gap: '25px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#0f172a', fontWeight: '700', fontSize: '15px' },
  navItemLogout: { cursor: 'pointer', color: '#ef4444', fontWeight: '700', fontSize: '15px' },
  mainContent: { width: '100%', margin: 0, padding: 0 },
  whiteContainer: { background: '#ffffff', borderRadius: '24px', padding: '45px 40px', display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' },
  profileHeader: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' },
  avatarCircle: { width: '75px', height: '75px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a56db 0%, #1e429f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(26, 86, 219, 0.3)' },
  avatarText: { color: '#ffffff', fontSize: '32px', fontWeight: '800', width: '100%', textAlign: 'center' },
  identityGroup: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, alignItems: 'flex-start' },
  nameInputStyle: { fontSize: '26px', fontWeight: '800', color: '#0f172a', border: 'none', borderBottom: '2px solid transparent', outline: 'none', background: 'transparent', padding: '2px 0', width: '100%', fontFamily: "'Poppins', sans-serif" },
  badgePremium: { alignSelf: 'flex-start', background: '#eff6ff', color: '#1a56db', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', border: '1px solid #bfdbfe' },
  divider: { border: '0', height: '1px', background: '#e2e8f0', margin: '25px 0' },
  infoGrid: { display: 'flex', flexDirection: 'column', gap: '16px' },
  infoRow: { display: 'flex', padding: '16px 20px', background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', justifyContent: 'space-between', alignItems: 'center' },
  infoLabel: { color: '#64748b', fontSize: '14px', fontWeight: '600' },
  infoValue: { color: '#0f172a', fontSize: '14px', fontWeight: '700' },
  actionArea: { display: 'flex', marginTop: '35px', justifyContent: 'space-between', alignItems: 'center' },
  btnKembali: { background: '#1a56db', color: '#ffffff', border: 'none', padding: '12px 26px', borderRadius: '14px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s ease' },
  btnKeluar: { background: '#fff5f5', color: '#dc2626', border: 'none', padding: '12px 26px', borderRadius: '14px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s ease' }
};
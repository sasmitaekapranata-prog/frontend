import { useState } from 'react'; // 🛡️ FIX: Menggunakan React murni, bukan Preact

export default function Profil({ userData, userName, onChangeName, userPhone, totalSaldo, onBack, onNavigate, onLogout }) {
  const [userMetadata] = useState({
    tipeAkun: 'Premium Member 🛡️',
  });

  // 🔄 SINKRONISASI DATA: Ambil dari objek userData (App.jsx) atau dari props individual
  const namaTampil = userData?.username || userName || 'Clara Angelica';
  const nomorHpTampil = userData?.nomorHp || userPhone || '081362267690';
  const saldoTampil = userData?.saldo !== undefined ? userData.saldo : (totalSaldo || 0);

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
      `}</style>

      <div style={styles.dashboardWrapper}>
        {/* SIDEBAR NAVIGATION PANEL */}
        <aside style={styles.sidebarPanel}>
          <div style={styles.brandTitleGroup}>
            <span style={styles.brandNameText}>TrustPay</span>
            <span style={styles.brandDomainText}>.id</span>
          </div>

          <nav style={styles.navButtonGroup}>
            <button onClick={() => onNavigate('dashboard')} style={styles.btnNavInactive}>Beranda</button>
            <button onClick={() => onNavigate('insight')} style={styles.btnNavInactive}>Insight</button>
            <button onClick={() => onNavigate('exchange')} style={styles.btnNavInactive}>Exchange</button>
            <button onClick={() => onNavigate('notifikasi')} style={styles.btnNavInactive}>Notifikasi</button>
            <button onClick={() => onNavigate('profil')} style={styles.btnNavActive}>Profil</button>
          </nav>

          <button onClick={onLogout} style={styles.btnSidebarLogout}>Log Out</button>
        </aside>

        {/* MAIN BODY AREA */}
        <main style={styles.mainContentBody}>
          <header style={styles.mainContentHeader}>
            <button onClick={onBack} className="btn-back-profile" style={styles.btnBackHeader}>
              Kembali
            </button>
          </header>

          <div style={styles.profileContentCard}>
            {/* AREA FOTO & NAMA */}
            <div style={styles.avatarNameSection}>
              <div style={styles.avatarCircleFrame}>
                {namaTampil.charAt(0)}
              </div>
              <div style={styles.nameBadgeGroup}>
                <input 
                  type="text" 
                  value={namaTampil} 
                  readOnly 
                  style={styles.nameInputStyle} 
                />
                <span style={styles.badgePremium}>{userMetadata.tipeAkun}</span>
              </div>
            </div>

            <hr style={styles.divider} />

            {/* GRID DETAIL INFORMASI NASABAH */}
            <div style={styles.infoGrid}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Nomor Handphone</span>
                <span style={styles.infoValue}>{nomorHpTampil}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Total Saldo Utama</span>
                <span style={styles.infoValue} style={{...styles.infoValue, color: '#16a34a'}}>{formatRupiah(saldoTampil)}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Status Keamanan Akun</span>
                <span style={styles.infoValue} style={{...styles.infoValue, color: '#2563eb'}}>Terverifikasi PIN (6 Digit)</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#f8fafc', height: '100vh', width: '100vw', overflow: 'hidden', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column' },
  dashboardWrapper: { display: 'flex', width: '100%', height: '100%', flex: 1, position: 'relative' },
  sidebarPanel: { width: '280px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '40px 24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  brandTitleGroup: { display: 'flex', alignItems: 'baseline', marginBottom: '45px', paddingLeft: '8px' },
  brandNameText: { fontSize: '26px', fontWeight: '800', color: '#0026e6', letterSpacing: '-0.5px' },
  brandDomainText: { fontSize: '15px', fontWeight: '700', color: '#64748b' },
  navButtonGroup: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
  btnNavActive: { width: '100%', padding: '15px 20px', borderRadius: '16px', border: 'none', backgroundColor: '#eff6ff', color: '#1a56db', fontSize: '14px', fontWeight: '700', textAlign: 'left', cursor: 'pointer' },
  btnNavInactive: { width: '100%', padding: '15px 20px', borderRadius: '16px', border: 'none', backgroundColor: 'transparent', color: '#64748b', fontSize: '14px', fontWeight: '600', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' },
  btnSidebarLogout: { width: '100%', padding: '15px 20px', borderRadius: '16px', border: 'none', backgroundColor: '#fff1f2', color: '#e11d48', fontSize: '14px', fontWeight: '700', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' },
  mainContentBody: { flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 50px', boxSizing: 'border-box', overflowY: 'auto' },
  mainContentHeader: { display: 'flex', justifyContent: 'flex-start', marginBottom: '25px' },
  btnBackHeader: { backgroundColor: '#1a56db', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '14px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
  profileContentCard: { width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px', boxSizing: 'border-box', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)' },
  avatarNameSection: { display: 'flex', alignItems: 'center', gap: '25px' },
  avatarCircleFrame: { width: '80px', height: '80px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: '800', color: '#1a56db', border: '3px solid #bfdbfe' },
  nameBadgeGroup: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, alignItems: 'flex-start' },
  nameInputStyle: { fontSize: '26px', fontWeight: '800', color: '#0f172a', border: 'none', borderBottom: '2px solid transparent', outline: 'none', background: 'transparent', padding: '2px 0', width: '100%', fontFamily: "'Poppins', sans-serif" },
  badgePremium: { alignSelf: 'flex-start', background: '#eff6ff', color: '#1a56db', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', border: '1px solid #bfdbfe' },
  divider: { border: '0', height: '1px', background: '#e2e8f0', margin: '25px 0' },
  infoGrid: { display: 'flex', flexDirection: 'column', gap: '16px' },
  infoRow: { display: 'flex', padding: '16px 20px', background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', justifyContent: 'space-between', alignItems: 'center' },
  infoLabel: { color: '#64748b', fontSize: '14px', fontWeight: '600' },
  infoValue: { color: '#0f172a', fontSize: '14px', fontWeight: '700' },
};
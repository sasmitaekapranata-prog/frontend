import { useState, useEffect } from 'react'; // 🛡️ FIX: Menggunakan React murni, bukan Preact

// ========================================================
// 🛡️ FIX: Mencegah Blank Screen Akibat API Belum Di-import
// Silakan ganti instance di bawah ini dengan import API asli Anda jika ada,
// contoh: import API from '../api/axiosConfig';
// ========================================================
const API = {
  defaults: { baseURL: 'TrustPay Server' },
  get: async (url) => {
    // Simulasi data jika API utama belum terhubung
    return { data: [] };
  }
};

const Icons = {
  Shield: (
    <svg width="26" height="30" viewBox="0 0 24 24" fill="#60a5fa" style={{ marginLeft: '12px', display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  ),
  ListPlus: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  ListSend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
  ListExchange: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7H4m16 0l-4-4m4 4l-4 4M4 17h16M4 17l4 4m-4-4l4-4" />
    </svg>
  )
};

export default function Notifikasi({ onNavigate, onLogout, onOpenReceipt }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBackendNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API.get('/notifikasi'); 
      
      // Memastikan data yang masuk berupa array sebelum disimpan ke state
      if (Array.isArray(response?.data)) {
        setNotifications(response.data);
      } else if (response?.data?.data && Array.isArray(response.data.data)) {
        setNotifications(response.data.data);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error("Gagal memuat API Notifikasi:", err);
      setError(err.response?.data?.message || 'Gagal terhubung ke database server TrustPay.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBackendNotifications();
  }, []);

  // 🟢 PERBAIKAN FORMATTER: Aman dari crash jika value berisi teks rusak/kosong
  const formatRupiah = (value, type) => {
    if (value === undefined || value === null || value === '') return 'Rp0';
    
    // Jika data berupa string berformat, pastikan replace tidak error dengan mengubahnya ke string dulu
    const stringValue = String(value).replace(/[^0-9]/g, '');
    const numericValue = stringValue ? Number(stringValue) : 0;
    const formatted = numericValue.toLocaleString('id-ID');
    
    // Memberikan tanda penjelas operasi tambah/kurang dana
    return (type === 'plus' ? '+ Rp' : '- Rp') + formatted;
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
        .btn-action:hover { opacity: 0.95; transform: translateY(-1px); }
        .notification-item:hover { background-color: #f1f5f9 !important; border-color: #cbd5e1 !important; transform: translateX(4px); }
      `}</style>

      <div style={styles.dashboardWrapper}>
        <header style={styles.header}>
          <div style={styles.brandSection}>
            <div onClick={() => onNavigate('dashboard')} style={styles.logoContainer} title="Home">
              <span style={styles.logoTextBlue}>TrustPay</span>
              <span style={styles.logoTextLightBlue}>.id</span>
              {Icons.Shield}
            </div>
          </div>

          <nav style={styles.navMenu}>
            <span style={styles.navItem} onClick={() => onNavigate('dashboard')}>Home</span>
            <span style={styles.navItemActive}>Notifikasi</span>
            <span style={styles.navItemLogout} onClick={onLogout}>Logout</span>
          </nav>
        </header>

        <div style={styles.subHeader}>
          <div style={styles.tabContainer}>
            <button type="button" style={styles.btnTabActive} onClick={() => onNavigate('dashboard')}>Transaksi</button>
            <button type="button" style={styles.btnTabInactive} onClick={() => onNavigate('insight')}>Insight</button>
          </div>
          <button type="button" style={styles.btnBantuan} className="btn-action" onClick={() => onNavigate('pusatbantuan')}>
            <span style={styles.questionMark}>?</span> Pusat Bantuan
          </button>
        </div>

        <div style={styles.pageTitleContainer}>
          <h2 style={styles.pageTitle}>Riwayat Notifikasi</h2>
        </div>

        <main style={styles.mainContent}>
          <div style={styles.whiteCard}>
            <div style={styles.listContainer}>
              
              {loading ? (
                <div style={styles.stateMessage}>
                  Menghubungkan ke server backend ({API.defaults?.baseURL || 'TrustPay Server'})...
                </div>
              ) : error ? (
                <div style={{ ...styles.stateMessage, color: '#ef4444', fontWeight: '600' }}>
                  ⚠️ {error}
                </div>
              ) : notifications.length === 0 ? (
                <div style={styles.stateMessage}>
                  Belum ada riwayat transaksi saat ini di database.
                </div>
              ) : (
                [...notifications].reverse().map((item, index) => {
                  const currentType = item.type || 'exchange';
                  return (
                    <div 
                      key={item.id || item._id || index} 
                      className="notification-item"
                      style={styles.notificationRow}
                      onClick={() => onOpenReceipt && onOpenReceipt(item)}
                    >
                      <div style={styles.leftSection}>
                        <div style={{
                          ...styles.iconCircle, 
                          borderColor: currentType === 'plus' ? '#2ecc71' : currentType === 'send' ? '#e74c3c' : '#1a56db'
                        }}>
                          {currentType === 'plus' ? Icons.ListPlus : currentType === 'send' ? Icons.ListSend : Icons.ListExchange}
                        </div>
                        <div style={styles.textGroup}>
                          <div style={styles.itemTitle}>{item.title || item.judul_notif || 'Transaksi'}</div>
                          <div style={styles.itemSubtitle}>{item.user || item.penerima || 'Sistem'}</div>
                        </div>
                      </div>
                      <div style={styles.rightSection}>
                        <span style={{
                          ...styles.amountText,
                          color: currentType === 'plus' ? '#2ecc71' : currentType === 'send' ? '#e74c3c' : '#1a56db'
                        }}>
                          {formatRupiah(item.amount || item.nominal, currentType)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ARSITEKTUR STRUKTUR GAYA VISUAL NOTIFIKASI
const styles = {
  container: { minHeight: '100vh', width: '100vw', background: '#f8fafc', boxSizing: 'border-box', margin: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  dashboardWrapper: { width: '100%', maxWidth: '1050px', padding: '40px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  brandSection: { display: 'flex', alignItems: 'center' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '32px', color: '#1a56db' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '32px', color: '#60a5fa' },
  navMenu: { display: 'flex', gap: '25px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#0f172a', fontWeight: '700', fontSize: '15px' },
  navItemActive: { cursor: 'pointer', color: '#1a56db', fontWeight: '700', fontSize: '15px', borderBottom: '3px solid #1a56db', paddingBottom: '2px' },
  navItemLogout: { cursor: 'pointer', color: '#ef4444', fontWeight: '700', fontSize: '15px' },
  subHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tabContainer: { display: 'flex', gap: '10px' },
  btnTabActive: { background: '#ffffff', color: '#1a56db', border: '2px solid #1a56db', padding: '6px 24px', borderRadius: '15px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  btnTabInactive: { background: '#ffffff', color: '#94a3b8', border: '2px solid #e2e8f0', padding: '6px 24px', borderRadius: '15px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  btnBantuan: { background: '#1a56db', color: '#ffffff', border: 'none', padding: '10px 22px', borderRadius: '14px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s ease' },
  questionMark: { color: '#ffffff', backgroundColor: '#ef4444', width: '18px', height: '18px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' },
  pageTitleContainer: { width: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: '5px' },
  pageTitle: { fontSize: '20px', fontWeight: '800', color: '#0f172a' },
  mainContent: { width: '100%', margin: 0, padding: 0 },
  whiteCard: { width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px', boxSizing: 'border-box', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  notificationRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s ease-in-out' },
  leftSection: { display: 'flex', alignItems: 'center', gap: '16px' },
  iconCircle: { border: '2px solid transparent', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' },
  textGroup: { display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' },
  itemTitle: { fontSize: '15px', fontWeight: '700', color: '#0f172a' },
  itemSubtitle: { fontSize: '12px', fontWeight: '500', color: '#64748b' },
  rightSection: { display: 'flex', alignItems: 'center' },
  amountText: { fontSize: '15px', fontWeight: '700', letterSpacing: '-0.01em' },
  stateMessage: { textAlign: 'center', color: '#94a3b8', padding: '30px 0', fontWeight: '500', fontSize: '13px' }
};
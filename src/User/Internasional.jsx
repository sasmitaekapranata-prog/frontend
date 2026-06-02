import React, { useState, useEffect } from 'react';

// ========================================================
// 1. IMPOR KOMPONEN SISI USER (Lokal di folder User)
// ========================================================
import PortalPilihan from './Masuk.jsx';       
import MasukUser from "./MasukUser.jsx";       
import Daftar from './Daftar.jsx'; 
import Pin from './Pin.jsx';
import DashboardUser from './Dashboard.jsx'; 
import AddWallet from './AddWallet.jsx'; 
import ProsesWallet from './ProsesWallet.jsx';
import KonfirmWallet from './KonfirmWallet.jsx'; 
import Send from './Send.jsx'; 
import Nasional from './Nasional.jsx';
import Internasional from './Internasional.jsx';
import Notifikasi from './Notifikasi.jsx'; 
import KonfirmasiNasional from './KonfirmasiNasional.jsx'; 
import KonfirmasiInternasional from "./KonfirmasiInternasional.jsx";
import ProsesInternasional from './ProsesInternasional.jsx';
import Exchange from './Exchange.jsx';
import Insight from './Insight.jsx';
import Profil from './Profil.jsx'; 
import LogoutPopup from './logOutPopUp.jsx'; 
import BuktiTransaksi from './BuktiTransaksi.jsx'; 

// ========================================================
// 2. IMPOR KOMPONEN SISI ADMIN (Keluar satu folder dulu)
// ========================================================
import MasukAdmin from '../admin/MasukAdmin'; 
import DashboardAdmin from '../admin/Dashboard.jsx';

// Dummy API instance agar tidak crash jika API eksternal belum di-import
const API = {
  get: async () => ({ data: {} }),
  post: async () => ({ data: {} })
};

// SVG Icons Pack
const Icons = {
  ArrowDown: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  Send: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  )
};

export default function App() { 
  const [page, setPageState] = useState('welcome');
  
  // STATE UTAMA USER
  const [userName, setUserName] = useState('Memuat...'); 
  const [userPhone, setUserPhone] = useState('...'); 
  
  // Saldo awal 10 Juta untuk masa testing UI
  const [totalSaldo, setTotalSaldo] = useState(10000000); 
  
  const [notifications, setNotifications] = useState([]); 
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // STATE UTAMA ADMIN
  const [adminUser, setAdminUser] = useState(null);

  // State Penampung Data Form Transaksi
  const [transferNasionalData, setTransferNasionalData] = useState({ bank: '', rekening: '', nominal: 0 });
  const [transferInternasionalData, setTransferInternasionalData] = useState({
    mataUang: 'USD', metodeTransfer: 'ACH Transfer (Amerika)', rekeningTujuan: '', nominalValas: 0, hasilKonversi: 0, totalBiayaAdmin: 50000, totalBayarIdr: 0
  });
  const [selectedWalletData, setSelectedWalletData] = useState({ selectedWallet: 'Shoopeepay', phoneNumber: '', nominalTopUp: 0 });

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false); 
  const [showPinModal, setShowPinModal] = useState(false);

  // State Internal Pusat Bantuan Mockup
  const [activeFaq, setActiveFaq] = useState(null);
  const [pesanBantuan, setPesanBantuan] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role'); 
    
    if (token && role === 'user') {
      fetchUserProfile();
      fetchNotifications(); 
      setPageState('dashboard'); 
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await API.get('/profile');
      const data = response.data;
      setUserName(data.name || data.nama || 'Nasabah');
      setUserPhone(data.phone || data.no_hp || '+62...');
      
      // Menonaktifkan reset saldo ke-0 dari Dummy API sementara waktu
      // setTotalSaldo(Number(data.saldo || data.amount || 0));
    } catch (err) {
      console.error("Gagal mengambil profil database:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await API.get('/notifications'); 
      setNotifications(Array.isArray(response.data) ? response.data : response.data.notifications || []);
    } catch (err) {
      console.error("Gagal memuat notifikasi:", err);
    }
  };

  const setPage = (targetPage) => {
    if (targetPage === 'pusatbantuan') {
      setShowHelpModal(true);
      return;
    } 

    if (targetPage === 'welcome' || targetPage === 'masuk') {
      localStorage.clear();
      window.location.reload();
    } else {
      setPageState(targetPage);
    }
  };

  const handleOpenLogout = () => {
    setIsLogoutOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await API.post('/logout'); 
    } catch (err) {
      console.log("Sesi backend sudah berakhir.");
    } finally {
      localStorage.clear(); 
      setIsLogoutOpen(false);
      window.location.reload(); 
    }
  };

  const handleCloseReceipt = () => {
    setSelectedReceipt(null); 
    fetchUserProfile(); 
    fetchNotifications(); 
    setPageState('dashboard');    
  };

  const handleKirimKeluhan = () => {
    if (!pesanBantuan.trim()) return;
    alert(`Pertanyaan Anda berhasil dikirim:\n"${pesanBantuan}"\n\nTim Support TrustPay akan membalas via email.`);
    setPesanBantuan('');
  };

  const faqData = [
    { title: "Tentang TrustPay.Id", content: "TrustPay.Id adalah platform aman untuk mengelola semua kebutuhan pembayaran, transfer nasional, maupun internasional dalam satu akun terintegrasi." },
    { title: "Pemberitahuan Privasi", content: "Kami menjaga data pribadi Anda dengan standar keamanan enkripsi tingkat tinggi. Data Anda tidak akan dibagikan kepada pihak ketiga tanpa persetujuan." },
    { title: "Syarat dan Ketentuan", content: "Penggunaan layanan tunduk pada hukum yang berlaku. Pengguna wajib memastikan kevalidan data rekening tujuan sebelum melakukan eksekusi transfer." },
    { title: "Penutupan akun TrustPay.Id", content: "Untuk menutup akun, pastikan seluruh saldo Anda telah ditarik. Silakan kirim permohonan penutupan melalui kotak pesan di bawah ini." }
  ];

  const renderPageContent = () => {
    switch (page) {
      case 'welcome':
        return (
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', 
            height: '100vh', width: '100vw', background: 'linear-gradient(135deg, #b4cffa 0%, #689bf6 45%, #2563eb 100%)', 
            fontFamily: "'Poppins', sans-serif", padding: '0 10%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden'
          }}>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            <div style={{ position: 'absolute', top: '60px', left: '10%', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontWeight: '800', fontSize: '34px', color: '#003bfb', letterSpacing: '-0.5px' }}>TrustPay</span>
              <span style={{ fontWeight: '800', fontSize: '34px', color: '#ffffff', letterSpacing: '-0.5px' }}>.id</span>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#003bfb" style={{ marginLeft: '6px' }}>
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                <path d="M10 15l-3.5-3.5 1.42-1.42L10 12.17l5.08-5.08 1.42 1.42z" fill="#ffffff"/>
              </svg>
            </div>
            <div style={{ maxWidth: '800px', textAlign: 'left', marginTop: '20px' }}>
              <h4 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: '500', marginBottom: '15px', opacity: 0.95 }}>
                Halo , selamat datang!
              </h4>
              <h1 style={{ color: '#ffffff', fontSize: '4.2rem', fontWeight: '700', marginBottom: '14px', lineHeight: '1.2', letterSpacing: '-0.5px' }}>
                Satu aplikasi untuk semua<br />kebutuhan kamu.
              </h1>
              <p style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '400', marginBottom: '40px', opacity: 0.90 }}>
                Kelola semua pembayaran Anda dalam satu akun.
              </p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <button 
                  onClick={() => setPageState('daftar')}
                  style={{
                    padding: '12px 55px', background: '#001bd4', color: '#ffffff', border: 'none',
                    borderRadius: '16px', fontWeight: '600', fontSize: '1.05rem', cursor: 'pointer'
                  }}
                >
                  Daftar
                </button>
                <button 
                  onClick={() => setPageState('masukuser')}
                  style={{
                    padding: '12px 55px', background: 'transparent', color: '#001bd4', border: '2px solid #001bd4', 
                    borderRadius: '16px', fontWeight: '600', fontSize: '1.05rem', cursor: 'pointer'
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        );

      case 'masukuser':
        return <MasukUser onBack={() => setPageState('welcome')} onLoginSuccess={(tkn) => { if (tkn) { localStorage.setItem('auth_token', tkn); localStorage.setItem('user_role', 'user'); fetchUserProfile(); fetchNotifications(); setPageState('dashboard'); } }} />;
      case 'dashboard':
        return <DashboardUser userName={userName} totalSaldo={totalSaldo} onLogout={handleOpenLogout} onAddWallet={() => setPage('AddWallet')} onSend={() => setPage('send')} onNavigate={(t) => setPage(t)} />;
      case 'daftar':
        return <Daftar onBack={() => setPageState('welcome')} onNext={async (n, p, e, pwd) => { try { const res = await API.post('/register', { name: n, phone: p, email: e || p, password: pwd }); if (res.data.token) { localStorage.setItem('auth_token', res.data.token); localStorage.setItem('user_role', 'user'); } if (n) setUserName(n); if (p) setUserPhone(p); setPageState('pin'); } catch (err) { alert(err.response?.data?.message || 'Gagal mendaftar!'); } }} />;
      case 'pin': 
        return <Pin key="pin-daftar" pinSource="daftar" onBack={() => setPage('daftar')} onFinish={() => { fetchUserProfile(); fetchNotifications(); setPageState('dashboard'); }} />;
      case 'notifikasi': 
        return <Notifikasi notificationData={notifications} onNavigate={(t) => setPage(t)} onLogout={handleOpenLogout} onOpenReceipt={(item) => setSelectedReceipt({ ...item, standardClose: true })} />;
      case 'insight':
        return <Insight onBack={() => setPage('dashboard')} onNavigate={(t) => setPage(t)} onLogout={handleOpenLogout} />;
      case 'profil':
        return <Profil userName={userName} onChangeName={setUserName} userPhone={userPhone} totalSaldo={totalSaldo} onBack={() => setPage('dashboard')} onNavigate={(t) => setPage(t)} onLogout={handleOpenLogout} />;
      
      case 'AddWallet':
        return <AddWallet onBack={() => setPage('dashboard')} onLogout={handleOpenLogout} onNavigate={(t) => setPage(t)} onConfirmNext={(w) => { setSelectedWalletData({ selectedWallet: w, phoneNumber: '', nominalTopUp: 0 }); setPageState('proseswallet'); }} />;
      case 'proseswallet':
        return <ProsesWallet selectedWallet={selectedWalletData?.selectedWallet || 'Shoopeepay'} onBack={() => setPage('AddWallet')} onLogout={handleOpenLogout} onPaymentSuccess={(payload) => { setSelectedWalletData(payload); setPageState('konfirmwallet'); }} />;
      
      case 'konfirmwallet': 
        return <KonfirmWallet 
          selectedWallet={selectedWalletData?.selectedWallet || 'Shoopeepay'} 
          phoneNumber={selectedWalletData?.phoneNumber || ''} 
          nominalTopUp={selectedWalletData?.nominalTopUp || 0} 
          onBack={() => setPage('proseswallet')} 
          onLogout={handleOpenLogout} 
          onPaymentSuccess={async () => { 
            const nom = Number(selectedWalletData?.nominalTopUp || 0); 
            try { 
              await API.post('/ewallet/topup', { 
                wallet_name: selectedWalletData?.selectedWallet, 
                phone_number: selectedWalletData?.phoneNumber, 
                amount: nom 
              }); 
              setTotalSaldo(prev => prev - nom); 
              setSelectedReceipt({ 
                id: Date.now(), 
                type: 'minus', 
                title: `${selectedWalletData?.selectedWallet || 'E-Wallet'} - ${selectedWalletData?.phoneNumber}`, 
                user: userName, 
                amount: nom, 
                standardClose: false 
              }); 
            } catch (err) { 
              alert(err.response?.data?.message || 'Transaksi gagal!'); 
            } 
          }} 
        />;
      
      case 'send':
        return <Send onBack={() => setPage('dashboard')} onLogout={handleOpenLogout} onSelectNasional={() => setPage('nasional')} onSelectInternasional={() => setPage('internasional')} />;
      
      case 'nasional':
        return <Nasional 
          onBack={() => setPage('send')} 
          onLogout={handleOpenLogout} 
          onSwitchToInternational={() => setPage('internasional')} 
          onNavigate={(t) => setPage(t)} 
          // 👇 PERBAIKAN: Menangkap format data apa pun yang dikirim oleh Nasional.jsx
          onNextToConfirm={(arg1, arg2, arg3) => { 
            let payload = {};
            if (typeof arg1 === 'object' && arg1 !== null) {
               // Jika Nasional.jsx mengirim 1 objek utuh
               payload = { 
                 ...arg1,
                 bank: arg1.bank || arg1.bankName || '',
                 rekening: arg1.rekening || arg1.accountNumber || '',
                 nominal: Number(arg1.nominal || arg1.amount || 0),
                 amount: Number(arg1.amount || arg1.nominal || 0)
               };
            } else {
               // Jika Nasional.jsx mengirim 3 parameter terpisah: (bank, rekening, nominal)
               payload = {
                 bank: arg1 || '',
                 rekening: arg2 || '',
                 nominal: Number(arg3 || 0),
                 amount: Number(arg3 || 0)
               };
            }
            setTransferNasionalData(payload); 
            setPageState('konfirmasinasional'); 
          }} 
        />; 
      
      case 'konfirmasinasional':
        return <KonfirmasiNasional 
          data={transferNasionalData} 
          onBack={() => setPage('nasional')} 
          onNavigate={(t) => setPage(t)} 
          onLogout={handleOpenLogout} 
          onNextToPin={async () => { 
            // Pastikan mengambil nilai nominal dengan benar
            const nom = Number(transferNasionalData.nominal || transferNasionalData.amount || 0); 
            try { 
              await API.post('/transfer/nasional', { 
                bank_name: transferNasionalData.bank, 
                account_number: transferNasionalData.rekening, 
                amount: nom 
              }); 
              
              setTotalSaldo(prev => prev - nom); 
              
              setSelectedReceipt({ 
                id: Date.now(), 
                type: 'minus', 
                title: `Bank ${transferNasionalData.bank || ''} - ${transferNasionalData.rekening || ''}`, 
                user: userName, 
                amount: nom, 
                standardClose: false 
              }); 
            } catch (err) { 
              alert(err.response?.data?.message || 'Gagal memproses Transfer Nasional.'); 
            } 
          }} 
        />;
      
      case 'internasional':
        return <Internasional onBack={() => setPage('send')} onNavigate={(t) => setPage(t)} onLogout={handleOpenLogout} onSwitchToNasional={() => setPage('nasional')} onNext={(curr) => { setTransferInternasionalData(prev => ({ ...prev, mataUang: curr.id.toUpperCase(), rekeningTujuan: '' })); setPageState('konfirmasiinternasional'); }} />;
      case 'konfirmasiinternasional':
        return <KonfirmasiInternasional initialData={transferInternasionalData} onBack={() => setPage('internasional')} onNavigate={(t) => setPage(t)} onLogout={handleOpenLogout} onConfirm={(f) => { setTransferInternasionalData(f); setPageState('prosesinternasional'); }} />;
      
      case 'prosesinternasional':
        return (
          <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
            <ProsesInternasional 
              initialData={transferInternasionalData} 
              onBack={() => setPage('konfirmasiinternasional')} 
              onNavigate={(t) => setPage(t)} 
              onLogout={handleOpenLogout} 
              onPaymentSuccess={() => setShowPinModal(true)} 
            />
            {showPinModal && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99999 }}>
                <Pin 
                  key="modal-transaksi-internasional-secure" 
                  pinSource="transaksi" 
                  onBack={() => setShowPinModal(false)} 
                  onFinish={async () => { 
                    setShowPinModal(false); 
                    const totalIdr = Number(transferInternasionalData.totalBayarIdr || 0); 
                    try { 
                      await API.post('/transfer/internasional', { 
                        currency: transferInternasionalData.mataUang, 
                        method: transferInternasionalData.metodeTransfer, 
                        target_account: transferInternasionalData.rekeningTujuan, 
                        amount_valas: Number(transferInternasionalData.nominalValas), 
                        total_pay_idr: totalIdr 
                      }); 
                      
                      setTotalSaldo(prev => prev - totalIdr); 
                      
                      setSelectedReceipt({ 
                        id: Date.now(), 
                        type: 'minus', 
                        title: `Transfer ${transferInternasionalData.mataUang} - ${transferInternasionalData.rekeningTujuan}`, 
                        user: userName, 
                        amount: totalIdr, 
                        standardClose: false 
                      }); 
                    } catch (err) { 
                      alert(err.response?.data?.message || 'Gagal memproses Transfer Internasional.'); 
                    } 
                  }} 
                />
              </div>
            )}
          </div>
        );
      case 'exchange':
        return <Exchange onBack={() => setPage('dashboard')} onNavigate={(t) => setPage(t)} onLogout={handleOpenLogout} onFinishExchange={() => { fetchUserProfile(); fetchNotifications(); setPageState('dashboard'); }} />;
      default:
        return <MasukUser onBack={() => { localStorage.clear(); window.location.reload(); }} onLoginSuccess={() => setPageState('dashboard')} />;
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {renderPageContent()}
      {selectedReceipt && <BuktiTransaksi data={selectedReceipt} onClose={selectedReceipt.standardClose ? () => setSelectedReceipt(null) : handleCloseReceipt} />}
      
      <LogoutPopup isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} onConfirm={handleConfirmLogout} />
      
      {showHelpModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 999999, fontFamily: 'Arial, sans-serif', padding: '20px', boxSizing: 'border-box'
        }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0 }} onClick={() => setShowHelpModal(false)} />

          <div style={{
            position: 'relative', backgroundColor: '#ffffff', width: '100%', maxWidth: '650px',
            borderRadius: '8px', padding: '25px 25px', boxSizing: 'border-box',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '700', color: '#000000', textAlign: 'center' }}>
              Ada yang bisa kami bantu?
            </h3>

            <div style={{
              width: '100%', backgroundColor: '#ebf3ff', border: '1px solid #b3d1ff',
              borderRadius: '20px', padding: '10px 20px', boxSizing: 'border-box',
              textAlign: 'center', marginBottom: '22px'
            }}>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#000000', fontWeight: '500' }}>
                Temukan jawaban untuk pertanyaanmu di FAQ atau langsung hubungi kami.
              </p>
            </div>

            <div style={{
              width: '100%', border: '1px solid #dcdcdc', borderRadius: '12px',
              padding: '15px 20px', boxSizing: 'border-box', marginBottom: '18px', backgroundColor: '#ffffff'
            }}>
              <h2 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: '800', color: '#000000', textAlign: 'center', letterSpacing: '0.5px' }}>
                FAQ
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {faqData.map((item, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '15px' }}>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%',
                        border: '1px solid #a5bbf1', backgroundColor: '#ebf1fe', flexShrink: 0
                      }} />

                      <button
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                        style={{
                          flex: 1, backgroundColor: '#ebf3ff', border: '1px solid #b3d1ff',
                          borderRadius: '20px', padding: '8px 16px', display: 'flex',
                          justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                          textAlign: 'left', color: '#000000', fontSize: '13.5px', fontWeight: '500'
                        }}
                      >
                        <span>{item.title}</span>
                        <div style={{ color: '#000000', transform: activeFaq === index ? 'rotate(180deg)' : 'none', display: 'flex', alignItems: 'center' }}>
                          {Icons.ArrowDown}
                        </div>
                      </button>
                    </div>

                    {activeFaq === index && (
                      <div style={{
                        marginLeft: '35px', marginTop: '6px', padding: '10px 15px',
                        backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #2563eb',
                        fontSize: '12.5px', color: '#475569', lineHeight: '1.4'
                      }}>
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: '#000000', textDecoration: 'underline', marginBottom: '8px' }}>
                Pertanyaan / Keluhan anda dapat anda sampaikan melalui kotak ini
              </label>

              <div style={{
                width: '100%', display: 'flex', alignItems: 'center', border: '1px solid #b3d1ff',
                borderRadius: '4px', padding: '2px 8px', boxSizing: 'border-box', backgroundColor: '#ffffff'
              }}>
                <input
                  type="text"
                  value={pesanBantuan}
                  onChange={(e) => setPesanBantuan(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleKirimKeluhan()}
                  style={{
                    flex: 1, border: 'none', outline: 'none', padding: '8px 4px',
                    fontSize: '13px', color: '#000000'
                  }}
                />
                <button
                  type="button"
                  onClick={handleKirimKeluhan}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: pesanBantuan.trim() ? '#0026e6' : '#cccccc', display: 'flex',
                    alignItems: 'center', padding: '4px'
                  }}
                >
                  {Icons.Send}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
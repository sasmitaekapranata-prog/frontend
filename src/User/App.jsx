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

// SVG Icons Pack Premium (Sudah ditambahkan Shield Premium)
const Icons = {
  ArrowDown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  Send: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
  Shield: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="#93c5fd" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '6px' }}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  )
};

export default function App() { 
  const [page, setPageState] = useState('welcome');
  
  // STATE UTAMA USER
  const [userName, setUserName] = useState('Angeliqia V G Pardosi'); 
  const [userPhone, setUserPhone] = useState('+62 812-6226-7690'); 
  
  // Saldo awal 10 Juta rupiah
  const [totalSaldo, setTotalSaldo] = useState(10000000); 
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Selamat Datang di TrustPay.id",
      message: "Akun Anda telah berhasil dibuat. Nikmati kemudahan transfer nasional dan internasional dengan aman.",
      date: new Date().toLocaleString('id-ID'),
      type: 'plus',
      amount: 0,
      user: 'TrustPay System'
    }
  ]); 
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // STATE UTAMA ADMIN
  const [adminUser, setAdminUser] = useState(null);

  // State Penampung Data Form Transaksi Nasional
  const [transferNasionalData, setTransferNasionalData] = useState({ bank: '', rekening: '', nominal: 0 });
  
  // Data awal transfer internasional
  const [transferInternasionalData, setTransferInternasionalData] = useState({
    mataUang: 'USD',
    metodeTransfer: 'ACH Transfer (Amerika Serikat)',
    rekeningTujuan: '109982736451',
    namaPenerima: 'Michael Vance',
    nominalValas: 500,
    hasilKonversi: 7500000,
    totalBiayaAdmin: 50000,
    totalBayarIdr: 7550000
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
      if (data.name || data.nama) setUserName(data.name || data.nama);
      if (data.phone || data.no_hp) setUserPhone(data.phone || data.no_hp);
    } catch (err) {
      console.error("Gagal mengambil profil database:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await API.get('/notifications'); 
      if (response.data && Array.isArray(response.data)) {
        setNotifications(response.data);
      }
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
    setPageState('dashboard');    
  };

  const handleKirimKeluhan = () => {
    if (!pesanBantuan.trim()) return;
    alert(`Pertanyaan Anda berhasil dikirim:\n"${pesanBantuan}"\n\nTim Support TrustPay akan membalas via email.`);
    setPesanBantuan('');
  };

  const faqData = [
    { title: "Tentang TrustPay.id", content: "TrustPay.id adalah platform finansial modern terenkripsi tinggi untuk mengelola semua kebutuhan pembayaran, top up e-wallet, transfer nasional, maupun antar negara dalam satu dashboard terintegrasi." },
    { title: "Pemberitahuan Sistem Keamanan & Privasi", content: "Kami menjaga dana dan informasi pribadi Anda menggunakan standar enkripsi bank ganda (AES-256). Data pribadi Anda terlindungi sepenuhnya dan aman dari pihak ketiga." },
    { title: "Berapa Lama Proses Transfer Internasional?", content: "Menggunakan jaringan sirkuit modern terintegrasi, transaksi internasional diproses instan hingga maksimal 1x24 jam tergantung bank koresponden negara tujuan." },
    { title: "Bagaimana cara menutup akun TrustPay.id?", content: "Pastikan seluruh sisa saldo Anda sudah ditarik atau ditransfer hingga Rp 0. Kemudian silakan hubungi customer helpdesk kami lewat kotak pesan bantuan di bawah ini." }
  ];

  const renderPageContent = () => {
    switch (page) {
      case 'welcome':
        return (
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', 
            height: '100vh', width: '100vw', background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)', 
            fontFamily: "'Poppins', sans-serif", padding: '0 10%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden'
          }}>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            
            {/* Background glowing decorations */}
            <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: '-100px', right: '-100px', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', bottom: '-50px', left: '-50px', filter: 'blur(50px)' }} />

            {/* 👇 PERBAIKAN LOGO & HURUF BRAND (Sinkron dengan halaman Internasional) */}
            <div style={{ position: 'absolute', top: '60px', left: '10%', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontWeight: '800', fontSize: '32px', color: '#ffffff', letterSpacing: '-0.8px' }}>TrustPay</span>
              <span style={{ fontWeight: '800', fontSize: '32px', color: '#60a5fa', letterSpacing: '-0.8px' }}>.id</span>
              {Icons.Shield}
            </div>

            <div style={{ maxWidth: '820px', textAlign: 'left', zIndex: 10 }}>
              <h4 style={{ color: '#bfdbfe', fontSize: '1.2rem', fontWeight: '500', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Halo, Selamat Datang!
              </h4>
              <h1 style={{ color: '#ffffff', fontSize: '4.5rem', fontWeight: '800', marginBottom: '20px', lineHeight: '1.15', letterSpacing: '-1px' }}>
                Satu aplikasi untuk semua<br />kebutuhan transaksi Anda.
              </h1>
              <p style={{ color: '#e0f2fe', fontSize: '1.2rem', fontWeight: '400', marginBottom: '44px', opacity: 0.9, maxWidth: '600px' }}>
                Nikmati platform transaksi masa kini. Kelola kirim uang nasional, internasional & e-wallet aman dalam genggaman.
              </p>
              <div style={{ display: 'flex', gap: '24px' }}>
                <button 
                  onClick={() => setPageState('daftar')}
                  style={{
                    padding: '16px 56px', background: '#ffffff', color: '#1d4ed8', border: 'none',
                    borderRadius: '30px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)', transition: 'all 0.2s'
                  }}
                >
                  Daftar Akun
                </button>
                <button 
                  onClick={() => setPageState('masukuser')}
                  style={{
                    padding: '16px 56px', background: 'transparent', color: '#ffffff', border: '2px solid #ffffff', 
                    borderRadius: '30px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Masuk Sesi
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
              
              const newNotif = {
                id: Date.now(),
                title: `Top Up ${selectedWalletData?.selectedWallet} Sukses`,
                message: `Pembayaran isi ulang saldo e-wallet ke nomor ${selectedWalletData?.phoneNumber} sebesar Rp ${nom.toLocaleString('id-ID')} berhasil didebet dari tabungan Anda.`,
                date: new Date().toLocaleString('id-ID'),
                type: 'minus',
                amount: nom,
                user: userName
              };
              setNotifications(prev => [newNotif, ...prev]);

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
        return (
          <Send 
            onBack={() => setPage('dashboard')} 
            onLogout={handleOpenLogout} 
            onSelectNasional={() => setPage('nasional')} 
            onNasional={() => setPage('nasional')}
            onSelectInternasional={() => setPageState('konfirmasiinternasional')} 
            onSelectInternational={() => setPageState('konfirmasiinternasional')} 
            onInternasional={() => setPageState('konfirmasiinternasional')}
            onInternational={() => setPageState('konfirmasiinternasional')}
          />
        );
      
      case 'nasional':
        return <Nasional 
          onBack={() => setPage('send')} 
          onLogout={handleOpenLogout} 
          onSwitchToInternational={() => setPageState('konfirmasiinternasional')} 
          onSwitchToInternasional={() => setPageState('konfirmasiinternasional')} 
          onNavigate={(t) => setPage(t)} 
          onNextToConfirm={(arg1, arg2, arg3) => { 
            let payload = {};
            if (typeof arg1 === 'object' && arg1 !== null) {
               payload = { 
                 ...arg1,
                 bank: arg1.bank || arg1.bankName || '',
                 rekening: arg1.rekening || arg1.accountNumber || '',
                 nominal: Number(arg1.nominal || arg1.amount || 0),
                 amount: Number(arg1.amount || arg1.nominal || 0)
               };
            } else {
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
            const nom = Number(transferNasionalData.nominal || transferNasionalData.amount || 0); 
            try { 
              await API.post('/transfer/nasional', { 
                bank_name: transferNasionalData.bank, 
                account_number: transferNasionalData.rekening, 
                amount: nom 
              }); 
              setTotalSaldo(prev => prev - nom); 
              
              const newNotif = {
                id: Date.now(),
                title: 'Transfer Nasional Berhasil',
                message: `Transfer dana elektronik ke Bank ${transferNasionalData.bank} dengan nomor rekening ${transferNasionalData.rekening} sebesar Rp ${nom.toLocaleString('id-ID')} telah sukses terkirim.`,
                date: new Date().toLocaleString('id-ID'),
                type: 'minus',
                amount: nom,
                user: userName
              };
              setNotifications(prev => [newNotif, ...prev]);

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
        return <Internasional data={transferInternasionalData} initialData={transferInternasionalData} onBack={() => setPage('send')} onNavigate={(t) => setPage(t)} onLogout={handleOpenLogout} onSwitchToNasional={() => setPage('nasional')} onNext={() => setPageState('konfirmasiinternasional')} />;
      
      case 'konfirmasiinternasional':
        return (
          <KonfirmasiInternasional 
            data={transferInternasionalData}
            initialData={transferInternasionalData} 
            onBack={() => setPage('send')} 
            onNavigate={(t) => setPage(t)} 
            onLogout={handleOpenLogout} 
            onConfirm={(updatedFields) => { 
              setTransferInternasionalData(prev => ({ ...prev, ...updatedFields })); 
              setPageState('prosesinternasional'); 
            }} 
          />
        );
      
      {/* 👇 PERBAIKAN SYNTAX & LAYOUT MODAL PROSES INTERNASIONAL */}
      case 'prosesinternasional':
        return (
          <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
            <ProsesInternasional 
              data={transferInternasionalData}
              initialData={transferInternasionalData} 
              onBack={() => setPageState('konfirmasiinternasional')} 
              onNavigate={(t) => setPage(t)} 
              onLogout={handleOpenLogout} 
              onPaymentSuccess={() => setShowPinModal(true)} 
            />
            {showPinModal && (
              <div style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                zIndex: 99999,
                backgroundColor: 'rgba(15, 23, 42, 0.5)', // Efek gelap transparan
                backdropFilter: 'blur(5px)', // Efek blur premium layaknya Pusat Bantuan
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' // Membawa PIN pad tepat di tengah layar
              }}>
                <Pin 
                  key="modal-transaksi-internasional-secure" 
                  pinSource="transaksi" 
                  onBack={() => setShowPinModal(false)} 
                  onFinish={async () => { 
                    setShowPinModal(false); 
                    const totalIdr = Number(transferInternasionalData.totalBayarIdr || 7550000); 
                    try { 
                      await API.post('/transfer/internasional', { 
                        currency: transferInternasionalData.mataUang, 
                        method: transferInternasionalData.metodeTransfer, 
                        target_account: transferInternasionalData.rekeningTujuan, 
                        amount_valas: Number(transferInternasionalData.nominalValas), 
                        total_pay_idr: totalIdr 
                      }); 
                      
                      setTotalSaldo(prev => prev - totalIdr); 
                      
                      const newNotif = {
                        id: Date.now(),
                        title: 'Transfer Internasional Berhasil',
                        message: `Kirim dana valas sebesar ${transferInternasionalData.nominalValas} ${transferInternasionalData.mataUang} ke rekening ${transferInternasionalData.rekeningTujuan} (${transferInternasionalData.namaPenerima}) senilai Rp ${totalIdr.toLocaleString('id-ID')} sukses dieksekusi.`,
                        date: new Date().toLocaleString('id-ID'),
                        type: 'minus',
                        amount: totalIdr,
                        user: userName
                      };
                      setNotifications(prev => [newNotif, ...prev]);

                      setSelectedReceipt({ 
                        id: Date.now(), 
                        type: 'minus', 
                        title: `Transfer Outbound ${transferInternasionalData.mataUang} - ${transferInternasionalData.namaPenerima}`, 
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
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
      {renderPageContent()}
      {selectedReceipt && <BuktiTransaksi data={selectedReceipt} onClose={selectedReceipt.standardClose ? () => setSelectedReceipt(null) : handleCloseReceipt} />}
      
      <LogoutPopup isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} onConfirm={handleConfirmLogout} />
      
      <style>{`
        .faq-btn-item { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .faq-btn-item:hover { background-color: #dbeafe !important; border-color: #2563eb !important; transform: translateY(-1px); }
        .input-bantuan-glow:focus { border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important; }
      `}</style>

      {/* MODAL PUSAT BANTUAN */}
      {showHelpModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 999999, fontFamily: "'Poppins', sans-serif", padding: '20px', boxSizing: 'border-box', backdropFilter: 'blur(4px)'
        }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0 }} onClick={() => setShowHelpModal(false)} />

          <div style={{
            position: 'relative', backgroundColor: '#ffffff', width: '100%', maxWidth: '620px',
            borderRadius: '24px', padding: '32px', boxSizing: 'border-box',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>💬</span>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>
                  Pusat Bantuan TrustPay
                </h3>
              </div>
              <button 
                onClick={() => setShowHelpModal(false)}
                style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontWeight: '700', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            <div style={{
              width: '100%', background: 'linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%)', border: '1px solid #bfdbfe',
              borderRadius: '16px', padding: '14px 20px', boxSizing: 'border-box', marginBottom: '24px'
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#1e40af', fontWeight: '600', lineHeight: '1.4' }}>
                Ada kendala atau pertanyaan? Cari topik permasalahan Anda pada menu FAQ di bawah atau hubungi tim customer care kami.
              </p>
            </div>

            <div style={{
              width: '100%', border: '1px solid #e2e8f0', borderRadius: '18px',
              padding: '20px', boxSizing: 'border-box', marginBottom: '24px', backgroundColor: '#f8fafc'
            }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pertanyaan Populer (FAQ)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '220px', overflowY: 'auto', paddingRight: '4px' }}>
                {faqData.map((item, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px' }}>
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        backgroundColor: activeFaq === index ? '#2563eb' : '#cbd5e1', flexShrink: 0
                      }} />

                      <button
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                        className="faq-btn-item"
                        style={{
                          flex: 1, backgroundColor: '#ffffff', border: '1px solid #e2e8f0',
                          borderRadius: '12px', padding: '12px 18px', display: 'flex',
                          justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                          textAlign: 'left', color: '#1e293b', fontSize: '14px', fontWeight: '600',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                        }}
                      >
                        <span>{item.title}</span>
                        <div style={{ color: activeFaq === index ? '#2563eb' : '#64748b', transform: activeFaq === index ? 'rotate(180deg)' : 'none', display: 'flex', alignItems: 'center' }}>
                          {Icons.ArrowDown}
                        </div>
                      </button>
                    </div>

                    {activeFaq === index && (
                      <div style={{
                        marginLeft: '20px', marginTop: '8px', padding: '14px 18px',
                        backgroundColor: '#ffffff', borderRadius: '12px', borderLeft: '4px solid #2563eb',
                        fontSize: '13.5px', color: '#475569', lineHeight: '1.5', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                      }}>
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <label style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '10px' }}>
                Kirim Pesan Langsung ke Support Room
              </label>

              <div style={{
                width: '100%', display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1',
                borderRadius: '14px', padding: '4px 14px', boxSizing: 'border-box', backgroundColor: '#ffffff',
                transition: 'all 0.2s'
              }} className="input-bantuan-glow">
                <input
                  type="text"
                  placeholder="Tulis keluhan atau detail transaksi yang bermasalah disini..."
                  value={pesanBantuan}
                  onChange={(e) => setPesanBantuan(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleKirimKeluhan()}
                  style={{
                    flex: 1, border: 'none', outline: 'none', padding: '12px 4px',
                    fontSize: '14px', color: '#1e293b'
                  }}
                />
                <button
                  type="button"
                  onClick={handleKirimKeluhan}
                  style={{
                    background: pesanBantuan.trim() ? '#2563eb' : '#f1f5f9', border: 'none', cursor: 'pointer',
                    color: pesanBantuan.trim() ? '#ffffff' : '#94a3b8', display: 'flex',
                    alignItems: 'center', padding: '10px', borderRadius: '10px', transition: 'all 0.2s'
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
import React, { useState, useEffect } from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { FiDelete } from 'react-icons/fi';

// 👇 PERBAIKAN: Menangkap props `data` dari App.jsx sebagai prioritas utama
export default function KonfirmasiNasional({ data, initialData, onBack, onNavigate, onLogout, onNextToPin }) {
  const [isPinOpen, setIsPinOpen] = useState(false);
  const [animatePin, setAnimatePin] = useState(false);
  const [pin, setPin] = useState('');

  // 🔄 SINKRONISASI DATA UTAMA DARI COMPONENT NASIONAL
  // Menggabungkan sumber data (apakah dari props 'data' atau 'initialData')
  const payload = data || initialData || {};

  // 👇 PERBAIKAN: Deteksi otomatis key nominal, amount, atau nominalTransfer
  const nominalTransfer = Number(payload.nominal) || Number(payload.amount) || Number(payload.nominalTransfer) || 0;
  
  // Biaya admin menyesuaikan nominal
  const biayaAdmin = nominalTransfer > 0 ? 1000 : 0; 
  const totalBayar = nominalTransfer + biayaAdmin;

  // 👇 PERBAIKAN: Deteksi otomatis key bank dan rekening
  const namaPenerima = payload.namaPenerima || payload.nama || 'Angeliqia V G Pardosi';
  const bankTujuan = payload.bank || payload.bankTujuan || payload.bankName || 'Bank Mandiri';
  const rekeningTujuan = payload.rekening || payload.rekeningTujuan || payload.accountNumber || '123456789123456';

  useEffect(() => {
    if (isPinOpen) {
      setTimeout(() => setAnimatePin(true), 10);
    } else {
      setAnimatePin(false);
    }
  }, [isPinOpen]);

  const handleNumberClick = (num) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const closePinModal = () => {
    setAnimatePin(false);
    setTimeout(() => {
      setIsPinOpen(false);
      setPin('');
    }, 300);
  };

  const handleConfirmPin = () => {
    if (pin.length === 6) {
      closePinModal();
      if (onNextToPin) {
        onNextToPin({ ...payload, totalBayar }); 
      }
    }
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; min-height: 100%; overflow-y: auto !important; background: #ffffff; }
        .pin-btn:active { transform: scale(0.9) !important; }
        .pin-btn-action:active { color: #000000 !important; transform: scale(0.9) !important; }
        .pin-ok-active:hover { color: #1a56db !important; }
        .btn-pay-action:hover { background-color: #e0ebff !important; border-color: #1a56db !important; }
      `}</style>

      <div style={styles.dashboardWrapper}>
        {/* UPPER NAVBAR BRAND */}
        <header style={styles.header}>
          <div style={styles.brandSection}>
            <div onClick={onBack} style={styles.logoContainer}>
              <span style={styles.logoTextBlue}>TrustPay</span>
              <span style={styles.logoTextLightBlue}>.id</span>
              <span style={{ marginLeft: '4px', fontSize: '24px', display: 'inline-block', verticalAlign: 'middle' }}>🛡️</span>
            </div>
          </div>
          <nav style={styles.navMenu}>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('dashboard')}>Home</span>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('notifikasi')}>Notifikasi</span>
            <span style={styles.navItemLogout} onClick={onLogout}>Logout</span>
          </nav>
        </header>

        {/* SUBHEADER INTERFACE */}
        <div style={styles.subHeader}>
          <div style={styles.tabContainer}>
            <button type="button" style={styles.btnTabSend} onClick={onBack}>
              <IoPaperPlaneOutline style={{ transform: 'rotate(45deg)', strokeWidth: '3px', marginRight: '6px' }} /> SEND
            </button>
            <div style={styles.btnTabNasional}>Nasional</div>
          </div>
        </div>

        {/* MAIN STRUCTURAL CARD CONTAINER */}
        <main style={styles.mainContent}>
          <div style={styles.whiteCardContainer}>
            <h2 style={styles.sectionTitle}>Konfirmasi Pembayaran</h2>
            
            {/* Profiling Data Group */}
            <div style={styles.profileRow}>
              <div style={styles.avatarCircle}>
                <span style={styles.avatarText}>
                  {namaPenerima.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div style={styles.profileDetails}>
                <span style={styles.recipientName}>{namaPenerima}</span>
                <span style={styles.recipientAccount}>{bankTujuan} - {rekeningTujuan}</span>
              </div>
            </div>

            {/* Financial Auditing List */}
            <div style={styles.detailsList}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Nominal</span>
                <span style={styles.infoValue}>Rp {nominalTransfer.toLocaleString('id-ID')}</span>
              </div>
              
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Biaya Admin</span>
                <span style={styles.infoValue}>Rp {biayaAdmin.toLocaleString('id-ID')}</span>
              </div>

              {/* Source Vault Container */}
              <div style={styles.sourceAccountGroup}>
                <span style={styles.sourceLabel}>Tabungan asal</span>
                <div style={styles.sourceCardBox}>
                  <span style={styles.sourceTitle}>Tabungan TrustPay.id – 081262267690</span>
                  <span style={styles.sourceBalance}>Rp 100.000.000</span>
                </div>
              </div>
            </div>

            {/* Total Section Bottom alignment */}
            <div style={styles.totalRowContainer}>
              <span style={styles.totalLabel}>Total</span>
              <span style={styles.totalAmount}>Rp {totalBayar.toLocaleString('id-ID')}</span>
            </div>

            {/* Dynamic Confirmation Trigger */}
            <div style={styles.actionRow}>
              <button 
                type="button" 
                onClick={() => setIsPinOpen(true)} 
                style={styles.btnPaymentSubmit}
                className="btn-pay-action"
              >
                Bayar
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* POP-UP BOTTOM-SHEET KEYPAD MODAL */}
      {isPinOpen && (
        <div onClick={closePinModal} style={{ ...styles.modalOverlay, opacity: animatePin ? 1 : 0 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ ...styles.pinSheetContainer, transform: animatePin ? 'translateY(0)' : 'translateY(100%)' }}>
            <div onClick={closePinModal} style={styles.handleBarSlider} />
            <div style={styles.modalHeaderGroup}>
              <h3 style={styles.modalMainTitle}>Masukkan PIN</h3>
              <p style={styles.modalSubTitle}>Silakan masukkan 6 digit PIN Otorisasi Anda</p>
            </div>
            <div style={styles.dotsRowContainer}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ ...styles.dotIndicatorBase, ...(i < pin.length ? styles.dotIndicatorFilled : styles.dotIndicatorEmpty) }} />
              ))}
            </div>
            <div style={styles.keypadGridContainer}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button type="button" key={num} onClick={() => handleNumberClick(num.toString())} className="pin-btn" style={styles.keypadNumberButton}>{num}</button>
              ))}
              <button type="button" onClick={handleDelete} className="pin-btn-action" style={styles.keypadActionButton}><FiDelete size={20} /></button>
              <button type="button" onClick={() => handleNumberClick('0')} className="pin-btn" style={styles.keypadNumberButton}>0</button>
              <button type="button" onClick={handleConfirmPin} disabled={pin.length !== 6} className={pin.length === 6 ? "pin-ok-active" : ""} style={{ ...styles.keypadOkButton, ...(pin.length === 6 ? styles.keypadOkActive : styles.keypadOkDisabled) }}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { height: '100vh', width: '100%', background: '#ffffff', boxSizing: 'border-box', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto', paddingTop: '40px', paddingBottom: '80px' },
  dashboardWrapper: { width: '100%', maxWidth: '840px', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  brandSection: { display: 'flex', alignItems: 'center' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '24px', color: '#1a56db' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '24px', color: '#60a5fa' },
  navMenu: { display: 'flex', gap: '24px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#000000', fontWeight: '700', fontSize: '14px' },
  navItemLogout: { cursor: 'pointer', color: '#000000', fontWeight: '700', fontSize: '14px' },
  subHeader: { display: 'flex', width: '100%' },
  tabContainer: { display: 'flex', gap: '16px', alignItems: 'center' },
  btnTabSend: { background: '#ffffff', color: '#1a56db', border: '1px solid #1a56db', padding: '8px 24px', borderRadius: '20px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  btnTabNasional: { background: '#e0ebff', color: '#1a56db', border: 'none', padding: '8px 28px', borderRadius: '20px', fontWeight: '700', fontSize: '14px' },
  mainContent: { width: '100%' },
  
  whiteCardContainer: { background: '#ffffff', borderRadius: '12px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)', border: '1px solid #e2e8f0' },
  sectionTitle: { fontSize: '18px', fontWeight: '700', color: '#000000', textDecoration: 'underline', marginBottom: '8px' },
  profileRow: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' },
  avatarCircle: { width: '56px', height: '56px', borderRadius: '50%', border: '1px solid #1a56db', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#000000', fontWeight: '700', fontSize: '18px' },
  profileDetails: { display: 'flex', flexDirection: 'column', gap: '2px' },
  recipientName: { fontSize: '18px', fontWeight: '700', color: '#000000' },
  recipientAccount: { fontSize: '14px', color: '#475569', fontWeight: '500' },
  detailsList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#000000', fontWeight: '500' },
  infoLabel: { color: '#334155' },
  infoValue: { fontWeight: '600' },
  sourceAccountGroup: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' },
  sourceLabel: { color: '#334155', fontSize: '14px', fontWeight: '500' },
  sourceCardBox: { width: '100%', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '10px 14px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '2px' },
  sourceTitle: { color: '#000000', fontWeight: '700', fontSize: '13px' },
  sourceBalance: { color: '#475569', fontSize: '12px', fontWeight: '500' },
  
  totalRowContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' },
  totalLabel: { fontSize: '18px', fontWeight: '700', color: '#000000' },
  totalAmount: { fontSize: '24px', fontWeight: '800', color: '#000000' },
  
  actionRow: { display: 'flex', justifyContent: 'center', marginTop: '16px' },
  btnPaymentSubmit: { background: '#e0ebff', color: '#000000', border: '1px solid #1a56db', width: '220px', padding: '10px 0', borderRadius: '20px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline', transition: 'all 0.2s ease' },
  
  modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 9999, transition: 'opacity 0.3s ease' },
  pinSheetContainer: { width: '100%', maxWidth: '380px', background: '#ffffff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', boxShadow: '0 -10px 25px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease-out' },
  handleBarSlider: { width: '40px', height: '4px', background: '#cbd5e1', borderRadius: '9999px', margin: '0 auto 16px auto' },
  modalHeaderGroup: { textAlign: 'center', marginBottom: '18px' },
  modalMainTitle: { fontSize: '17px', fontWeight: '700', color: '#000000' },
  modalSubTitle: { fontSize: '12px', color: '#64748b', marginTop: '2px' },
  dotsRowContainer: { display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '24px' },
  dotIndicatorBase: { width: '10px', height: '10px', borderRadius: '50%', transition: 'all 0.15s ease' },
  dotIndicatorFilled: { backgroundColor: '#1a56db', border: '1px solid #1a56db' },
  dotIndicatorEmpty: { backgroundColor: 'transparent', border: '2px solid #cbd5e1' },
  keypadGridContainer: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: '14px', columnGap: '24px', maxWidth: '240px', margin: '0 auto', justifyItems: 'center' },
  keypadNumberButton: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f1f5f9', border: 'none', color: '#000000', fontWeight: '700', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  keypadActionButton: { width: '48px', height: '48px', borderRadius: '50%', background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  keypadOkButton: { width: '48px', height: '48px', borderRadius: '50%', border: 'none', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  keypadOkActive: { color: '#1a56db', cursor: 'pointer' },
  keypadOkDisabled: { color: '#cbd5e1', cursor: 'not-allowed' }
};
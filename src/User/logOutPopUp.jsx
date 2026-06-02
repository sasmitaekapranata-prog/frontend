import React, { useEffect, useState } from 'react'; // 🟢 PERBAIKAN: Diubah dari preact/hooks ke react standar

export default function LogoutPopup({ isOpen, onClose, onConfirm }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 🟢 PERBAIKAN UX: Animasi penutupan yang halus saat menekan overlay luar
  const handleCloseAnimation = () => {
    setAnimate(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div 
      onClick={handleCloseAnimation} 
      style={{
        ...styles.overlay,
        opacity: animate ? 1 : 0
      }}
    >
      <style>{`
        .logout-btn-yes:active { transform: scale(0.95); opacity: 0.9; }
        .logout-btn-no:active { transform: scale(0.95); background-color: #fecaca !important; }
      `}</style>

      {/* Konten Pop-up Utama - Turun dari Atas */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...styles.modalContainer,
          transform: animate ? 'translateY(0)' : 'translateY(-40px)',
        }}
      >
        {/* Teks Pertanyaan Utama */}
        <div style={styles.messageBox}>
          <h3 style={styles.messageText}>
            Apakah Anda yakin ingin keluar dari sistem TrustPay.id?
          </h3>
        </div>

        {/* Tombol Pilihan */}
        <div style={styles.actionButtonGroup}>
          {/* Tombol Ya */}
          <button
            type="button"
            onClick={onConfirm}
            className="logout-btn-yes"
            style={styles.btnYes}
          >
            Ya
          </button>

          {/* Tombol Tidak */}
          <button
            type="button"
            onClick={handleCloseAnimation}
            className="logout-btn-no"
            style={styles.btnNo}
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
}

// ARSITEKTUR STRUKTUR GAYA VISUAL MODAL DIALOG
const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 99999, // Tingkat kedalaman tertinggi di atas semua jenis modal PIN
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '80px',
    boxSizing: 'border-box',
    transition: 'opacity 300ms ease-out',
  },
  modalContainer: {
    width: '100%',
    maxWidth: '560px', // Dipersempit agar tampilan pesan konfirmasi lebih padat dan fokus
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    border: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    boxSizing: 'border-box',
    transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
  messageBox: {
    width: '100%',
    border: '2px solid #1a56db',
    textAlign: 'center',
    padding: '16px 24px',
    borderRadius: '16px',
    boxSizing: 'border-box',
    backgroundColor: '#f8fafc'
  },
  messageText: {
    color: '#1a56db',
    fontWeight: '800',
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0.01em',
    margin: 0,
  },
  actionButtonGroup: {
    display: 'flex',
    gap: '20px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnYes: {
    width: '130px',
    backgroundColor: '#1a56db',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '15px', 
    padding: '10px 0',
    borderRadius: '14px',
    border: 'none',
    boxShadow: '0 4px 12px rgba(26, 86, 219, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    textAlign: 'center',
  },
  btnNo: {
    width: '130px',
    backgroundColor: '#fff5f5',
    color: '#1a56db',
    border: '2px solid #1a56db',
    fontWeight: '700',
    fontSize: '15px',
    padding: '8px 0', 
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    textAlign: 'center',
  },
};
import { useEffect, useState } from 'react';

export default function KonfirmPin({ isOpen, onClose, onSuccess }) {
  const [animate, setAnimate] = useState(false);
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNumberClick = (num) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin('');
  };

  // 🟢 PERBAIKAN SIKLUS UX: Reset state PIN secara bersih saat animasi penutupan modal selesai
  const handleCloseAnimation = () => {
    setAnimate(false);
    setTimeout(() => {
      setPin(''); // Hapus jejak digit PIN lama dari memori state
      onClose();
    }, 300);
  };

  const handleConfirm = () => {
    if (pin.length === 6) {
      onSuccess(pin);
      setPin(''); // Bersihkan langsung setelah transaksi berhasil dieksekusi
    }
  };

  return (
    <div style={styles.overlay} onClick={handleCloseAnimation}>
      <style>{`
        .key-btn:active { background-color: rgba(219, 234, 254, 0.7) !important; transform: scale(0.92); }
        .action-btn:active { color: #000000 !important; }
        .ok-btn-active:hover { color: #1d4ed8 !important; }
      `}</style>

      <div
        style={{
          ...styles.modalContainer,
          transform: animate ? 'translateY(0)' : 'translateY(100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Garis kecil penanda handle di atas pop-up */}
        <div style={styles.handleBar} onClick={handleCloseAnimation} />

        {/* Teks Judul Singkat */}
        <div style={styles.textCenter}>
          <h2 style={styles.title}>Masukkan PIN</h2>
          <p style={styles.subtitle}>Silakan masukkan 6 digit PIN TrustPay.id Anda</p>
        </div>

        {/* Indikator Titik PIN */}
        <div style={styles.dotsRow}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                backgroundColor: i < pin.length ? '#1a56db' : 'transparent',
                borderColor: i < pin.length ? '#1a56db' : '#cbd5e1',
                transform: i < pin.length ? 'scale(1.15)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Grid Keypad Angka */}
        <div style={styles.keypadGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleNumberClick(num.toString())}
              className="key-btn"
              style={styles.keyButton}
            >
              {num}
            </button>
          ))}

          {/* Tombol Delete menggunakan SVG Murni */}
          <button
            type="button"
            onClick={handleDelete}
            onDoubleClick={handleClear}
            className="action-btn"
            style={styles.actionButton}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
              <line x1="18" y1="9" x2="12" y2="15"></line>
              <line x1="12" y1="9" x2="18" y2="15"></line>
            </svg>
          </button>

          {/* Angka 0 */}
          <button
            type="button"
            onClick={() => handleNumberClick('0')}
            className="key-btn"
            style={styles.keyButton}
          >
            0
          </button>

          {/* Tombol OK */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={pin.length !== 6}
            className={pin.length === 6 ? "ok-btn-active" : ""}
            style={{
              ...styles.okButton,
              color: pin.length === 6 ? '#1a56db' : '#cbd5e1',
              cursor: pin.length === 6 ? 'pointer' : 'not-allowed',
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    transition: 'opacity 300ms ease-out',
  },
  modalContainer: {
    width: '100%',
    maxWidth: '384px',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    padding: '24px 24px 32px 24px',
    boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
  handleBar: {
    width: '40px',
    height: '4px',
    backgroundColor: '#cbd5e1',
    borderRadius: '9999px',
    margin: '0 auto 16px auto',
    cursor: 'pointer',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: '18px',
  },
  title: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '0.02em',
    margin: 0,
  },
  subtitle: {
    fontSize: '11px',
    color: '#94a3b8',
    marginTop: '2px',
    fontWeight: '500'
  },
  dotsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '14px',
    marginBottom: '24px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: '2px solid',
    backgroundColor: 'transparent',
    transition: 'all 150ms ease-in-out',
  },
  keypadGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    rowGap: '14px',
    columnGap: '24px',
    justifyItems: 'center',
    maxWidth: '240px',
    margin: '0 auto 8px auto',
  },
  keyButton: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(241, 245, 249, 0.7)',
    color: '#0f172a',
    fontWeight: '700',
    fontSize: '18px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.15s, transform 0.1s',
  },
  actionButton: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    color: '#64748b',
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'color 0.15s, transform 0.1s',
  },
  okButton: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'transparent',
    fontWeight: '700',
    fontSize: '12px',
    display: 'flex',
                alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '0.05em',
    transition: 'all 0.15s',
  }
};
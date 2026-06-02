import { useState, useRef, useEffect } from 'react';
import { FiDelete, FiChevronDown } from 'react-icons/fi'; 
import { IoPaperPlaneOutline } from 'react-icons/io5';

const bankOptions = [
  { 
    value: 'MANDIRI', 
    label: 'MANDIRI', 
    logo: <span style={{ fontSize: '10px', fontWeight: '900', color: '#003d7c', fontStyle: 'italic', backgroundColor: '#ffc425', padding: '2px 6px', borderRadius: '4px' }}>mandırı</span>
  },
  { 
    value: 'BCA', 
    label: 'BCA', 
    logo: <span style={{ fontSize: '11px', fontWeight: '900', color: '#00569c', border: '1px solid #00569c', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#ffffff', letterSpacing: '0.05em' }}>BCA</span>
  },
  { 
    value: 'BRI', 
    label: 'BRI', 
    logo: <span style={{ fontSize: '11px', fontWeight: '900', color: '#00569c', letterSpacing: '-0.02em' }}>B<span style={{ color: '#f15a24' }}>RI</span></span>
  }
];

export default function Nasional({ onBack, onNavigate, onLogout, onNextToConfirm }) {
  const [selectedBank, setSelectedBank] = useState(bankOptions[0]); 
  const [rekening, setRekening] = useState('');
  const [nominal, setNominal] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🟢 PERBAIKAN LOGIKA: Otomatis memformat input ketikan ke format mata uang Rupiah
  const handleNominalChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setNominal('');
      return;
    }
    const formatted = Number(rawValue).toLocaleString('id-ID');
    setNominal('Rp' + formatted);
  };

  const executeConfirmation = () => {
    const numericNominal = Number(nominal.replace(/[^0-9]/g, ''));
    
    if (!rekening.trim() || !nominal.trim() || numericNominal < 20000) {
      alert('Mohon periksa kembali No. Rekening dan Nominal (Minimal Rp 20.000)');
      return;
    }

    if (onNextToConfirm) {
      onNextToConfirm({
        bank: selectedBank.label,
        rekening: rekening,
        nominal: numericNominal
      });
    }
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
        .input-row:focus-within { border-color: #1a56db !important; }
        .dropdown-item:hover { background-color: #f1f5f9; }
        .btn-action:hover { opacity: 0.95; transform: translateY(-1px); }
        .btn-confirm:hover { background-color: #1a56db !important; color: #ffffff !important; box-shadow: 0 10px 15px -3px rgba(26, 86, 219, 0.2) !important; }
      `}</style>

      <div style={styles.dashboardWrapper}>
        
        {/* 1. NAVBAR UTAMA */}
        <header style={styles.header}>
          <div style={styles.brandSection}>
            <div onClick={onBack} style={styles.logoContainer} title="Home">
              <span style={styles.logoTextBlue}>TrustPay</span>
              <span style={styles.logoTextLightBlue}>.id</span>
              <span style={{ marginLeft: '6px', fontSize: '28px', display: 'inline-block', verticalAlign: 'middle' }}>🛡️</span>
            </div>
          </div>
            
          <nav style={styles.navMenu}>
            <span onClick={() => onNavigate && onNavigate('dashboard')} style={styles.navItemActive}>Home</span>
            <span onClick={() => onNavigate && onNavigate('notifikasi')} style={styles.navItem}>Notifikasi</span>
            <span onClick={onLogout} style={styles.navItemLogout}>Logout</span>
          </nav>
        </header>

        {/* 2. AREA FORM TRANSAKSI */}
        <main style={styles.contentCard}>
          
          {/* Header Tabs Internal */}
          <div style={styles.tabRow}>
            <button type="button" onClick={onBack} style={styles.btnSendMini} className="btn-action">
              <IoPaperPlaneOutline style={{ transform: 'rotate(45deg)', strokeWidth: '3px', fontSize: '13px' }} /> 
              SEND
            </button>
            <div style={styles.badgeIndicator}>Nasional</div>
          </div>

          {/* Form Fields Container */}
          <div style={styles.fieldsStack}>
            
            {/* INPUT NAMA BANK */}
            <div ref={dropdownRef} className="input-row" style={styles.inputContainer}>
              <span style={styles.fieldLabel}>Nama Bank</span>
              <div onClick={() => setIsOpen(!isOpen)} style={styles.dropdownTrigger}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={styles.selectedLabelText}>{selectedBank.label}</span>
                  {selectedBank.logo}
                </div>
                <FiChevronDown style={{ color: '#64748b', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} size={16} />
              </div>

              {isOpen && (
                <ul style={styles.dropdownMenu}>
                  {bankOptions.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => {
                        setSelectedBank(option);
                        setIsOpen(false);
                      }}
                      className="dropdown-item"
                      style={styles.dropdownItem}
                    >
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{option.label}</span>
                      <div>{option.logo}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Input No Rekening */}
            <div className="input-row" style={styles.inputContainer}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <span style={styles.fieldLabel}>No. Rekening</span>
                <input 
                  type="text" 
                  placeholder="Masukkan nomor rekening"
                  value={rekening}
                  onChange={(e) => setRekening(e.target.value.replace(/[^0-9]/g, ''))}
                  style={styles.htmlInput}
                />
              </div>
              {rekening && (
                <button type="button" onClick={() => setRekening('')} style={styles.btnClear}>
                  <FiDelete size={16} />
                </button>
              )}
            </div>

            {/* Input Nominal */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="input-row" style={styles.inputContainer}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <span style={styles.fieldLabel}>Nominal</span>
                  <input 
                    type="text" 
                    placeholder="Masukkan nominal transfer"
                    value={nominal}
                    onChange={handleNominalChange}
                    style={styles.htmlInput}
                  />
                </div>
                {nominal && (
                  <button type="button" onClick={() => setNominal('')} style={styles.btnClear}>
                    <FiDelete size={16} />
                  </button>
                )}
              </div>
              <span style={styles.helperText}>*Minimal transfer Rp 20.000</span>
            </div>

          </div>

          {/* Button Konfirmasi */}
          <button 
            type="button" 
            onClick={executeConfirmation} 
            className="btn-confirm" 
            style={styles.btnSubmit}
          >
            Konfirmasi Pembayaran
          </button>

        </main>
      </div>
    </div>
  );
}

// ARSITEKTUR STRUKTUR GAYA VISUAL FORM NASIONAL
const styles = {
  container: { 
    backgroundColor: '#f8fafc', 
    minHeight: '100vh', 
    width: '100vw', 
    overflow: 'hidden',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box', 
    padding: '40px 24px' 
  },
  dashboardWrapper: {
    width: '100%',
    maxWidth: '1050px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    marginBottom: '20px', 
    boxSizing: 'border-box' 
  },
  brandSection: { display: 'flex', alignItems: 'center' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '32px', color: '#1a56db' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '32px', color: '#60a5fa' },
  navMenu: { display: 'flex', gap: '25px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#0f172a', fontWeight: '700', fontSize: '15px' },
  navItemActive: { cursor: 'pointer', color: '#1a56db', fontWeight: '700', fontSize: '15px', borderBottom: '3px solid #1a56db', paddingBottom: '2px' },
  navItemLogout: { cursor: 'pointer', color: '#ef4444', fontWeight: '700', fontSize: '15px' },
  
  contentCard: { 
    border: '1px solid #e2e8f0', 
    borderRadius: '24px', 
    padding: '40px', 
    backgroundColor: '#ffffff', 
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)', 
    display: 'flex', 
    flexDirection: 'column', 
    width: '100%', 
    boxSizing: 'border-box',
    gap: '24px'
  },
  tabRow: { display: 'flex', gap: '16px', width: '100%' },
  btnSendMini: { 
    backgroundColor: '#ffffff', 
    border: '2px solid #1a56db', 
    color: '#1a56db', 
    padding: '8px 24px', 
    borderRadius: '14px', 
    fontWeight: '700', 
    fontSize: '12px', 
    cursor: 'pointer', 
    display: 'inline-flex', 
    alignItems: 'center', 
    gap: '8px',
    transition: 'all 0.15s ease'
  },
  badgeIndicator: { 
    backgroundColor: '#eff6ff', 
    color: '#1a56db', 
    border: '1px solid #bfdbfe', 
    padding: '0 40px', 
    borderRadius: '14px', 
    fontWeight: '600', 
    fontSize: '12px', 
    display: 'inline-flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  fieldsStack: { display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' },
  inputContainer: { 
    position: 'relative',
    border: '1px solid #cbd5e1', 
    borderRadius: '14px', 
    padding: '10px 18px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#ffffff', 
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
    width: '100%'
  },
  fieldLabel: { color: '#94a3b8', fontSize: '11px', fontWeight: '600', trackingSpace: '0.05em', marginBottom: '4px', textTransform: 'uppercase', textAlign: 'left' },
  dropdownTrigger: { display: 'flex', justifyContent: 'space-between', itemsAlign: 'center', width: '100%', cursor: 'pointer' },
  selectedLabelText: { fontSize: '14px', fontWeight: '700', color: '#0f172a' },
  dropdownMenu: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: '105%', 
    backgroundColor: '#ffffff', 
    border: '1px solid #e2e8f0', 
    borderRadius: '14px', 
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', 
    zIndex: 999, 
    overflow: 'hidden', 
    margin: 0, 
    padding: 0, 
    listStyle: 'none' 
  },
  dropdownItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', cursor: 'pointer', transition: 'background-color 0.15s ease' },
  htmlInput: { width: '100%', fontSize: '14px', fontWeight: '700', color: '#0f172a', outline: 'none', border: 'none', backgroundColor: 'transparent', padding: 0 },
  btnClear: { border: 'none', backgroundColor: 'transparent', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', paddingLeft: '8px' },
  helperText: { fontSize: '11px', color: '#94a3b8', fontWeight: '500', marginTop: '6px', paddingLeft: '4px', textAlign: 'left' },
  
  btnSubmit: { 
    backgroundColor: '#ffffff', 
    border: '2px solid #1a56db', 
    color: '#1a56db', 
    padding: '12px 40px', 
    borderRadius: '9999px', 
    fontWeight: '700', 
    fontSize: '13px', 
    cursor: 'pointer', 
    alignSelf: 'center', 
    marginTop: '8px', 
    transition: 'all 0.2s ease-in-out',
    textAlign: 'center'
  }
};
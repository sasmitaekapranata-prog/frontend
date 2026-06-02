import { useState, useEffect } from 'react';
// PERBAIKAN: Menambahkan import icon yang digunakan di dalam JSX agar tidak menyebabkan screen blank
import { IoChevronDownOutline, IoArrowForwardOutline } from 'react-icons/io5';

// 1. DATA MASTER KURS (Nilai Tukar terhadap IDR sebagai basis kalkulator)
const EXCHANGE_RATES = {
  IDR: 1,
  USD: 16200,   
  MYR: 3450,    
  SGD: 12000    
};

const CURRENCY_LIST = [
  { id: 'IDR', code: 'id', country: 'Indonesia', label: 'IDR - Indonesia' },
  { id: 'USD', code: 'us', country: 'United States', label: 'USD - Amerika Serikat' },
  { id: 'MYR', code: 'my', country: 'Malaysia', label: 'MYR - Malaysia' },
  { id: 'SGD', code: 'sg', country: 'Singapura', label: 'SGD - Singapura' },
];

export default function KonfirmasiInternasional({ initialData, onNavigate, onLogout, onConfirm }) {
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  
  // Deteksi mata uang bawaan dari halaman sebelumnya secara aman (case-insensitive)
  const defaultTo = initialData?.mataUang?.toUpperCase() || 'USD';
  
  const [currencyFrom, setCurrencyFrom] = useState(CURRENCY_LIST[0]); // Default awal IDR
  const [currencyTo, setCurrencyTo] = useState(
    CURRENCY_LIST.find(c => c.id === defaultTo) || CURRENCY_LIST[1]
  );

  const [rekeningTujuan, setRekeningTujuan] = useState(initialData?.rekeningTujuan || '');
  const [nominalFrom, setNominalFrom] = useState(100); 

  // 🟢 PERBAIKAN LOGIKA: Sinkronisasi default biaya awal (25000 / 1 IDR = 25000) agar tidak jomplang saat di-render
  const [kalkulasi, setKalkulasi] = useState({
    kursTeks: '1 IDR = 1 IDR',
    hasilKonversi: 0,
    biayaTransaksi: 25000,
    totalBiaya: 0
  });

  useEffect(() => {
    if (!currencyFrom?.id || !currencyTo?.id) return;

    const fromId = currencyFrom.id.toUpperCase();
    const toId = currencyTo.id.toUpperCase();

    const rateFromInIdr = EXCHANGE_RATES[fromId] || 1;
    const rateToInIdr = EXCHANGE_RATES[toId] || 1;
    
    // Formula rumus hitung nilai tukar silang (Cross Exchange Rates)
    const finalRate = rateFromInIdr / rateToInIdr;

    const kursTeks = `1 ${fromId} = ${finalRate.toFixed(4)} ${toId}`;
    const hasilKonversi = (Number(nominalFrom) || 0) * finalRate;
    
    const biayaTransaksiIdr = 25000; 
    const biayaTransaksiValas = biayaTransaksiIdr / rateFromInIdr;
    const totalBiaya = (Number(nominalFrom) || 0) + biayaTransaksiValas;

    setKalkulasi({
      kursTeks,
      hasilKonversi,
      biayaTransaksi: biayaTransaksiValas,
      totalBiaya
    });
  }, [currencyFrom, currencyTo, nominalFrom]);

  const handleRekeningChange = (e) => {
    const val = e.target.value;
    const cleanValue = val.replace(/[^0-9]/g, '');
    setRekeningTujuan(cleanValue);
  };

  const handleNextSubmit = () => {
    if (!rekeningTujuan) {
      alert('Silakan isi Nomor Rekening Tujuan terlebih dahulu!');
      return;
    }
    if ((Number(nominalFrom) || 0) <= 0) {
      alert('Nominal transfer harus lebih besar dari 0');
      return;
    }

    const currentFromId = currencyFrom?.id?.toUpperCase() || 'IDR';
    const currentToId = currencyTo?.id?.toUpperCase() || 'USD';
    const totalBayarIdr = kalkulasi.totalBiaya * (EXCHANGE_RATES[currentFromId] || 1);

    if (onConfirm) {
      onConfirm({
        mataUang: currentToId,      
        mataUangAsal: currentFromId,  
        rekeningTujuan: rekeningTujuan,
        nominalValas: Number(nominalFrom) || 0,
        hasilKonversi: kalkulasi.hasilKonversi,
        totalBiayaAdmin: kalkulasi.biayaTransaksi * (EXCHANGE_RATES[currentFromId] || 1),
        totalBayarIdr: totalBayarIdr
      });
    }
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
        .dropdown-row:hover { background-color: #f1f5f9 !important; }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>

      {/* SAMA DENGAN DASHBOARD: Menggunakan dashboardWrapper agar sejajar */}
      <div style={styles.dashboardWrapper}>
        <header style={styles.header}>
          <div style={styles.brandSection}>
            <div style={styles.logoContainer}>
              <span style={styles.logoTextBlue}>TrustPay</span>
              <span style={styles.logoTextLightBlue}>.id</span>
              <span style={{ marginLeft: '6px', fontSize: '28px', display: 'inline-block', verticalAlign: 'middle' }}>🛡️</span>
            </div>
          </div>

          <nav style={styles.navMenu}>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('dashboard')}>Home</span>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('notifikasi')}>Notifikasi</span>
            <span style={styles.navItemLogout} onClick={onLogout}>Logout</span>
          </nav>
        </header>

        {/* BOX PANEL KONTEN UTAMA */}
        <main style={styles.mainContent}>
          <div style={styles.splitGridCard}>
            
            {/* SISI KIRI: INPUT FORM */}
            <div style={styles.formSideColumn}>
              <h2 style={styles.columnTitle}>Informasi Pengiriman</h2>
              
              {/* DROPDOWN 1: MATA UANG ASAL (FROM) */}
              <div style={styles.inputFormGroup}>
                <label style={styles.fieldLabel}>Mata Uang Asal</label>
                <div style={styles.anchorContainer}>
                  <button type="button" onClick={() => { setFromOpen(!fromOpen); setToOpen(false); }} style={styles.dropdownSelectorTrigger}>
                    <div style={styles.flagLabelGroup}>
                      {currencyFrom?.code && (
                        <img src={`https://flagcdn.com/w40/${currencyFrom.code}.png`} alt="" style={styles.circleFlagIcon} />
                      )}
                      <span>{currencyFrom?.label || 'Pilih Mata Uang'}</span>
                    </div>
                    <IoChevronDownOutline style={{ transition: 'transform 0.2s', transform: fromOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>
                  
                  {fromOpen && (
                    <div style={styles.dropdownMenuOverlay}>
                      {CURRENCY_LIST.map((c) => (
                        <div key={`from-${c.id}`} onClick={() => { setCurrencyFrom(c); setFromOpen(false); }} className="dropdown-row" style={styles.dropdownItemOption}>
                          <img src={`https://flagcdn.com/w40/${c.code}.png`} alt="" style={styles.circleFlagIconSmall} />
                          <span>{c.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* INPUT NOMINAL TRANSFER */}
              <div style={styles.inputFormGroup}>
                <label style={styles.fieldLabel}>Jumlah Dikirim</label>
                <div style={styles.suffixInputAnchor}>
                  <input
                    type="number"
                    value={nominalFrom}
                    onChange={(e) => setNominalFrom(e.target.value)}
                    style={styles.largeNumericInput}
                    placeholder="0"
                  />
                  <div style={styles.suffixCurrencyBadge}>
                    {currencyFrom?.id?.toUpperCase()}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', margin: '-4px 0', color: '#1a56db' }}>
                <IoArrowForwardOutline style={{ transform: 'rotate(90deg)', fontSize: '20px' }} />
              </div>

              {/* DROPDOWN 2: MATA UANG TUJUAN (TO) */}
              <div style={styles.inputFormGroup}>
                <label style={styles.fieldLabel}>Mata Uang Tujuan</label>
                <div style={styles.anchorContainer}>
                  <button type="button" onClick={() => { setToOpen(!toOpen); setFromOpen(false); }} style={styles.dropdownSelectorTrigger}>
                    <div style={styles.flagLabelGroup}>
                      {currencyTo?.code && (
                        <img src={`https://flagcdn.com/w40/${currencyTo.code}.png`} alt="" style={styles.circleFlagIcon} />
                      )}
                      <span>{currencyTo?.label || 'Pilih Mata Uang'}</span>
                    </div>
                    <IoChevronDownOutline style={{ transition: 'transform 0.2s', transform: toOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>
                  
                  {toOpen && (
                    <div style={styles.dropdownMenuOverlay}>
                      {CURRENCY_LIST.map((c) => (
                        <div key={`to-${c.id}`} onClick={() => { setCurrencyTo(c); setToOpen(false); }} className="dropdown-row" style={styles.dropdownItemOption}>
                          <img src={`https://flagcdn.com/w40/${c.code}.png`} alt="" style={styles.circleFlagIconSmall} />
                          <span>{c.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* INPUT NOMOR REKENING */}
              <div style={styles.inputFormGroup}>
                <label style={styles.fieldLabel}>No. Rekening Tujuan</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={rekeningTujuan}
                  onChange={handleRekeningChange}
                  style={styles.monospacedInput}
                  placeholder="Masukkan nomor rekening penerima (angka saja)..."
                />
              </div>
            </div>

            {/* SISI KANAN: LIVE CALCULATOR & RINGKASAN BIAYA */}
            <div style={styles.calculatorSideColumn}>
              <div>
                <h3 style={styles.calcSideTitle}>Ringkasan Konversi</h3>
                
                <div style={styles.calcRowsContainer}>
                  <div style={styles.summaryRow}>
                    <span>Kurs Terkini</span>
                    <span style={styles.boldTextDark}>{kalkulasi.kursTeks}</span>
                  </div>
                  
                  <div style={styles.summaryRow}>
                    <span>Hasil Bersih Konversi</span>
                    <span style={styles.boldTextEmerald}>
                      {(kalkulasi.hasilKonversi || 0).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencyTo?.id?.toUpperCase()}
                    </span>
                  </div>
                  
                  <div style={styles.summaryRow}>
                    <span>Biaya Administrasi</span>
                    <span style={styles.semiBoldTextDark}>
                      {(kalkulasi.biayaTransaksi || 0).toLocaleString('id-ID', { maximumFractionDigits: 2 })} {currencyFrom?.id?.toUpperCase()}
                    </span>
                  </div>
                  
                  <div style={styles.totalSummaryRow}>
                    <span>Total Biaya Potong Saldo</span>
                    <span style={styles.boldTextBlue}>
                      {(kalkulasi.totalBiaya || 0).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencyFrom?.id?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div style={{ marginTop: '32px' }}>
                <button type="button" onClick={handleNextSubmit} style={styles.btnSubmitConfirmation}>
                  Konfirmasi & Bayar
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// ARSITEKTUR KODE STYLES 100% SINKRON DENGAN FITUR LAIN
const styles = {
  container: { minHeight: '100vh', width: '100vw', background: '#f8fafc', boxSizing: 'border-box', margin: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  dashboardWrapper: { width: '100%', maxWidth: '1050px', padding: '40px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  brandSection: { display: 'flex', flexDirection: 'column', gap: '2px' },
  logoContainer: { display: 'flex', alignItems: 'center' },
  logoTextBlue: { fontWeight: '800', fontSize: '32px', color: '#1a56db' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '32px', color: '#60a5fa' },
  navMenu: { display: 'flex', gap: '25px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#000000', fontWeight: '700', fontSize: '15px' },
  navItemLogout: { cursor: 'pointer', color: '#ef4444', fontWeight: '700', fontSize: '15px' },
  mainContent: { width: '100%', margin: 0, padding: 0 },
  
  splitGridCard: { background: '#ffffff', borderRadius: '24px', padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', width: '100%', minHeight: '450px', boxSizing: 'border-box', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)', border: '1px solid #e2e8f0' },
  formSideColumn: { display: 'flex', flexDirection: 'column', gap: '18px' },
  columnTitle: { fontSize: '18px', fontWeight: '700', color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' },
  
  inputFormGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  fieldLabel: { fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', trackingWord: '0.05em' },
  anchorContainer: { position: 'relative', width: '100%' },
  dropdownSelectorTrigger: { width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: '600', color: '#1e293b', cursor: 'pointer' },
  
  flagLabelGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  circleFlagIcon: { width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' },
  circleFlagIconSmall: { width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' },
  
  dropdownMenuOverlay: { position: 'absolute', width: '100%', marginTop: '4px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', zIndex: 99, maxHeight: '180px', overflowY: 'auto', padding: '4px' },
  dropdownItemOption: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', cursor: 'pointer', borderRadius: '8px', fontSize: '13px', fontWeight: '500', color: '#334155', transition: 'background-color 0.15s' },
  
  suffixInputAnchor: { position: 'relative', display: 'flex', alignItems: 'center' },
  largeNumericInput: { width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 60px 10px 16px', fontSize: '18px', fontWeight: '700', color: '#1a56db', outline: 'none' },
  suffixCurrencyBadge: { position: 'absolute', right: '16px', fontWeight: '700', color: '#64748b', fontSize: '14px', pointerEvents: 'none' },
  
  monospacedInput: { width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', fontWeight: '500', outline: 'none', fontFamily: 'monospace', letterSpacing: '0.05em' },
  
  calculatorSideColumn: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  calcSideTitle: { fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' },
  calcRowsContainer: { display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', fontWeight: '500', color: '#64748b' },
  
  summaryRow: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' },
  totalSummaryRow: { display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '14px', fontWeight: '700', color: '#1e293b' },
  
  boldTextDark: { fontWeight: '700', color: '#0f172a' },
  semiBoldTextDark: { fontWeight: '600', color: '#1e293b' },
  boldTextEmerald: { fontWeight: '700', color: '#10b981', fontSize: '15px' },
  boldTextBlue: { fontWeight: '700', color: '#1a56db' },
  
  btnSubmitConfirmation: { width: '100%', background: '#1a56db', color: '#ffffff', py: '12px', padding: '12px 0', borderRadius: '12px', fontWeight: '700', fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(26, 86, 219, 0.2)', transition: 'transform 0.15s, background-color 0.15s' }
};
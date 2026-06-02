import { useState } from 'react';

// Ikon internal penyeimbang layout agar tidak ketergantungan library luar
const Icons = {
  ExchangeArrows: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7 21-4-4 4-4" /><path d="M3 17h18" /><path d="m17 3 4 4-4 4" /><path d="M21 7H3" />
    </svg>
  ),
  ChevronDown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  )
};

// Basis nilai tukar disesuaikan dengan IDR sebagai pembanding dasar (1 USD ≈ 16.000 IDR)
const KURS_BASIS = {
  IDR: 1,
  MYR: 3400,   // 1 MYR ≈ 3.400 IDR
  SGD: 11800,  // 1 SGD ≈ 11.800 IDR
  USD: 16000,  // 1 USD ≈ 16.000 IDR
};

// Data mata uang yang diperbarui: Indonesia, Malaysia, Singapura, Amerika
const DATA_MATA_UANG = {
  IDR: { nama: 'Rupiah', simbol: 'Rp', bendera: 'id' },
  MYR: { nama: 'Ringgit', simbol: 'RM', bendera: 'my' },
  SGD: { nama: 'Dollar SG', simbol: 'S$', bendera: 'sg' },
  USD: { nama: 'Dollar', simbol: '$', bendera: 'us' },
};

export default function Exchange({ onNavigate, onLogout, onFinishExchange }) {
  const [currencyAsal, setCurrencyAsal] = useState('IDR');
  const [currencyTujuan, setCurrencyTujuan] = useState('USD');
  const [nominalInput, setNominalInput] = useState('1000000'); 

  // Logika Perhitungan Real-Time
  const nominalAngka = parseFloat(nominalInput) || 0;
  const nilaiKeIDR = nominalAngka * KURS_BASIS[currencyAsal];
  const hasilKonversi = nilaiKeIDR / KURS_BASIS[currencyTujuan];
  
  // Perhitungan Kurs Efektif Terbalik
  const kursEfektif = KURS_BASIS[currencyTujuan] / KURS_BASIS[currencyAsal];

  const handleNominalChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setNominalInput(val);
    }
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
        .btn-selesai-exchange:hover { background: #e0ebff !important; transform: translateY(-1px); }
        .select-hidden:focus + .custom-dropdown { border-color: #1a56db !important; }
      `}</style>

      {/* SAMA DENGAN DASHBOARD: Menggunakan pembungkus dashboardWrapper agar posisi & ukuran presisi */}
      <div style={styles.dashboardWrapper}>
        <header style={styles.header}>
          <div style={styles.brandSection}>
            <div onClick={() => onNavigate && onNavigate('dashboard')} style={styles.logoContainer} title="Home">
              <span style={styles.logoTextBlue}>TrustPay</span>
              <span style={styles.logoTextLightBlue}>.id</span>
              <span style={{ marginLeft: '6px', fontSize: '28px', display: 'inline-block', verticalAlign: 'middle' }}>🛡️</span>
            </div>
          </div>

          <nav style={styles.navMenu}>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('dashboard')}>Home</span>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('notifikasi')}>Notifikasi</span>
            <span style={styles.navItem} onClick={onLogout}>Logout</span>
          </nav>
        </header>

        {/* SAMA DENGAN DASHBOARD: Sub Header untuk area navigasi tab penunjuk */}
        <div style={styles.subHeader}>
          <div style={styles.tabContainer}>
            <button type="button" style={styles.btnTabActive} onClick={() => onNavigate && onNavigate('dashboard')}>Transaksi</button>
            <button type="button" style={styles.btnTabInactive} onClick={() => onNavigate && onNavigate('insight')}>Insight</button>
          </div>
          <button type="button" style={styles.btnBantuan} onClick={() => onNavigate && onNavigate('pusatbantuan')}><span style={styles.questionMark}>?</span> Pusat Bantuan</button>
        </div>

        {/* WHITE CARD CONTAINER UTAMA (UKURAN SAMA DENGAN DASHBOARD) */}
        <main style={styles.mainContent}>
          <div style={styles.whiteCard}>
            
            {/* Header Menu Label (EXCHANGE) */}
            <div style={styles.labelMenuWrapper}>
              <div style={styles.btnExchangeLabel}>
                {Icons.ExchangeArrows} EXCHANGE
              </div>
            </div>

            {/* Split Grid Konten: Kiri Input, Kanan Visualisasi Bendera */}
            <div style={styles.gridSplitter}>
              
              {/* KOLOM KIRI: Pilihan Dropdown & Input */}
              <div style={styles.formColumn}>
                
                {/* Dropdown Mata Uang Asal */}
                <div style={styles.inputGroupRelative}>
                  <label style={styles.fieldLabel}>Mata uang Asal</label>
                  <select 
                    value={currencyAsal}
                    onChange={(e) => setCurrencyAsal(e.target.value)}
                    className="select-hidden"
                    style={styles.htmlSelectTransparent}
                  >
                    {Object.keys(DATA_MATA_UANG).map((code) => (
                      <option key={code} value={code}>{code} - {DATA_MATA_UANG[code].nama}</option>
                    ))}
                  </select>
                  <div className="custom-dropdown" style={styles.customDropdownWrapper}>
                    <span style={styles.dropdownValueText}>
                      {currencyAsal} <span style={styles.dropdownSubText}>({DATA_MATA_UANG[currencyAsal].nama})</span>
                    </span>
                    {Icons.ChevronDown}
                  </div>
                </div>

                {/* Dropdown Mata Uang Tujuan */}
                <div style={styles.inputGroupRelative}>
                  <label style={styles.fieldLabel}>Mata Uang Tujuan</label>
                  <select 
                    value={currencyTujuan}
                    onChange={(e) => setCurrencyTujuan(e.target.value)}
                    className="select-hidden"
                    style={styles.htmlSelectTransparent}
                  >
                    {Object.keys(DATA_MATA_UANG).map((code) => (
                      <option key={code} value={code}>{code} - {DATA_MATA_UANG[code].nama}</option>
                    ))}
                  </select>
                  <div className="custom-dropdown" style={styles.customDropdownWrapper}>
                    <span style={styles.dropdownValueText}>
                      {currencyTujuan} <span style={styles.dropdownSubText}>({DATA_MATA_UANG[currencyTujuan].nama})</span>
                    </span>
                    {Icons.ChevronDown}
                  </div>
                </div>

                {/* Input Nominal Bilangan */}
                <div style={styles.inputGroupRelative}>
                  <label style={styles.fieldLabel}>Nominal Tukar</label>
                  <div style={styles.customInputWrapper}>
                    <span style={styles.currencyPrefixSimbol}>{DATA_MATA_UANG[currencyAsal].simbol}</span>
                    <input 
                      type="text" 
                      inputMode="numeric"
                      value={nominalInput} 
                      onInput={handleNominalChange} // 🛡️ SINKRON: Menggunakan onInput khas Preact
                      placeholder="0"
                      style={styles.mainInputField}
                    />
                  </div>
                </div>

              </div>

              {/* KOLOM KANAN: Visualisasi Grafik Otomatis Nilai Tukar */}
              <div style={styles.visualColumn}>
                
                {/* Bendera Asal */}
                <div style={styles.flagBlock}>
                  <img 
                    src={`https://flagcdn.com/w80/${DATA_MATA_UANG[currencyAsal].bendera}.png`} 
                    alt={currencyAsal} 
                    style={styles.flagImageElement} 
                  />
                  <span style={styles.flagCodeLabel}>{currencyAsal}</span>
                </div>

                {/* Bulatan Ikon Pemisah Tengah */}
                <div style={styles.middleArrowCircle}>
                  {Icons.ExchangeArrows}
                </div>

                {/* Bendera Tujuan + Box Perhitungan Detail */}
                <div style={styles.flagBlockRelative}>
                  <img 
                    src={`https://flagcdn.com/w80/${DATA_MATA_UANG[currencyTujuan].bendera}.png`} 
                    alt={currencyTujuan} 
                    style={styles.flagImageElement} 
                  />
                  <span style={styles.flagCodeLabel}>{currencyTujuan}</span>

                  {/* Informasi Ringkasan Kalkulasi Akurat di Bawah Bendera */}
                  <div style={styles.summaryDisplayBox}>
                    <div style={styles.summaryLabelTitle}>Kurs Berjalan</div>
                    <div style={styles.summaryValueKurs}>
                      1 {currencyTujuan} = {DATA_MATA_UANG[currencyAsal].simbol} {kursEfektif.toLocaleString('id-ID', { maximumFractionDigits: 2 })}
                    </div>
                    
                    <div style={{...styles.summaryLabelTitle, marginTop: '12px'}}>Hasil Konversi</div>
                    <div style={styles.summaryValueHasil}>
                      {DATA_MATA_UANG[currencyTujuan].simbol} {hasilKonversi.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* ACTION FOOTER BUTTON */}
            <div style={styles.footerActionRow}>
              <button 
                type="button"
                className="btn-selesai-exchange"
                onClick={() => onFinishExchange && onFinishExchange({ currencyAsal, currencyTujuan, nominalInput, hasilKonversi })}
                style={styles.btnSelesaiExchangeSubmit}
              >
                Selesai
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', width: '100vw', background: '#f8fafc', boxSizing: 'border-box', margin: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  // 🟢 PERBAIKAN: Menghapus transform: 'translateX(-60px)' agar posisi halaman presisi di tengah layaknya Dashboard
  dashboardWrapper: { width: '100%', maxWidth: '1050px', padding: '40px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'transform 0.2s ease-in-out' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  brandSection: { display: 'flex', flexDirection: 'column', gap: '2px' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '32px', color: '#1a56db' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '32px', color: '#60a5fa' },
  navMenu: { display: 'flex', gap: '25px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#000000', fontWeight: '700', fontSize: '15px' },
  
  subHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tabContainer: { display: 'flex', gap: '10px' },
  btnTabActive: { background: '#ffffff', color: '#1a56db', border: '2px solid #1a56db', padding: '6px 24px', borderRadius: '15px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  btnTabInactive: { background: '#ffffff', color: '#94a3b8', border: '2px solid #e2e8f0', padding: '6px 24px', borderRadius: '15px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  btnBantuan: { background: '#0014b4', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '18px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' },
  questionMark: { color: '#ff3b30', fontWeight: '900' },

  mainContent: { width: '100%', margin: 0, padding: 0 },
  whiteCard: { 
    width: '100%', 
    background: '#ffffff', 
    border: '1px solid #e2e8f0', 
    borderRadius: '24px', 
    padding: '40px 45px',
    boxSizing: 'border-box',
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)'
  },
  
  labelMenuWrapper: { width: '100%', display: 'flex', marginBottom: '15px' },
  btnExchangeLabel: { display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #1a56db', color: '#1a56db', padding: '6px 20px', borderRadius: '14px', fontWeight: '800', fontSize: '12px', letterSpacing: '0.5px' },
  
  gridSplitter: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start', marginTop: '10px' },
  formColumn: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroupRelative: { display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative', width: '100%' },
  fieldLabel: { fontSize: '13px', fontWeight: '700', color: '#334155', marginLeft: '2px' },
  
  htmlSelectTransparent: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, zIndex: 5, cursor: 'pointer' },
  customDropdownWrapper: { width: '100%', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  dropdownValueText: { fontSize: '14px', fontWeight: '800', color: '#000000' },
  dropdownSubText: { fontWeight: '500', color: '#64748b', marginLeft: '4px' },
  
  customInputWrapper: { width: '100%', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '6px' },
  currencyPrefixSimbol: { fontSize: '14px', fontWeight: '800', color: '#000000' },
  mainInputField: { width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontWeight: '800', color: '#000000' },
  
  visualColumn: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 10px', minHeight: '230px' },
  flagBlock: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '80px' },
  flagBlockRelative: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '80px', position: 'relative' },
  flagImageElement: { width: '64px', height: '42px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' },
  flagCodeLabel: { fontSize: '16px', fontWeight: '800', color: '#000000', letterSpacing: '0.5px' },
  
  middleArrowCircle: { background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#000000', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.03)' },
  
  summaryDisplayBox: { position: 'absolute', top: '85px', width: '220px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  summaryLabelTitle: { fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.3px' },
  summaryValueKurs: { fontSize: '13px', fontWeight: '800', color: '#0f172a', marginTop: '2px' },
  summaryValueHasil: { fontSize: '16px', fontWeight: '800', color: '#1a56db', marginTop: '2px' },
  
  footerActionRow: { display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px' },
  btnSelesaiExchangeSubmit: { background: '#ffffff', color: '#000000', border: '1px solid #bfdbfe', padding: '10px 70px', borderRadius: '25px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', transition: 'all 0.2s' }
};
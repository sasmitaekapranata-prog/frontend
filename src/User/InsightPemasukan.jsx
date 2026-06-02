import { useState } from 'react';

export default function InsightPemasukan({ onBack }) {
  // Data Mockup Terstruktur
  const dataPemasukan = [
    { day: 'Mon', label: 'Senin', value: 150 },
    { day: 'Tue', label: 'Selasa', value: 200 },
    { day: 'Wed', label: 'Rabu', value: 130 },
    { day: 'Thu', label: 'Kamis', value: 75 },
    { day: 'Fri', label: 'Jumat', value: 140 },
    { day: 'Sat', label: 'Sabtu', value: 175 },
    { day: 'Sun', label: 'Minggu', value: 250 },
  ];

  const nilaiMaksimal = 250;

  return (
    <div style={styles.chartOuterCard}>
      {/* Label Sub-Kategori di Atas Grafik */}
      <div style={styles.subPageHeader}>
        <span style={styles.subPageTitle}>Pemasukan</span>
      </div>

      {/* Kontainer Utama Grafik */}
      <div style={styles.chartMainWrapper}>
        
        {/* AREA KANVAS GRAFIK */}
        <div style={styles.chartCanvasArea}>
          
          {/* Lapisan Garis Horizontal (Background Grid) */}
          <div style={styles.gridLinesBackground}>
            <div style={styles.gridRow}><span style={styles.yLabel}>250Rb</span><div style={styles.gridLine}></div></div>
            <div style={styles.gridRow}><span style={styles.yLabel}>200Rb</span><div style={styles.gridLine}></div></div>
            <div style={styles.gridRow}><span style={styles.yLabel}>150Rb</span><div style={styles.gridLine}></div></div>
            <div style={styles.gridRow}><span style={styles.yLabel}>100Rb</span><div style={styles.gridLine}></div></div>
            <div style={styles.gridRow}><span style={styles.yLabel}>50Rb</span><div style={styles.gridLine}></div></div>
            {/* Garis Dasar Paling Bawah (Sumbu X) */}
            <div style={styles.gridRowZero}><span style={styles.yLabelInvisible}>0</span><div style={styles.baseLineX}></div></div>
          </div>

          {/* Lapisan Batang Diagram */}
          <div style={styles.barsContainerLayer}>
            {dataPemasukan.map((item) => {
              const tinggiPersen = (item.value / nilaiMaksimal) * 100;
              return (
                <div key={item.day} style={styles.barGridColumn}>
                  <div style={styles.barWrapperFlexible}>
                    <div 
                      className="pemasukan-bar-item"
                      style={{ ...styles.barActiveElement, height: `${tinggiPersen}%` }}
                      title={`${item.label}: ${item.value}Rb`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* AREA LABEL SUMBU X */}
        <div style={styles.xAxisLabelRow}>
          {dataPemasukan.map((item) => (
            <div key={item.day} style={styles.xLabelItemBox}>
              <span style={styles.xLabelText}>{item.day}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Tombol Kembali */}
      <div style={styles.footerRow}>
        <button type="button" style={styles.btnKembali} onClick={onBack}>
          ← Kembali
        </button>
      </div>
    </div>
  );
}

const styles = {
  chartOuterCard: { background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '20px', padding: '20px 30px', width: '100%', maxWidth: '680px', boxSizing: 'border-box', margin: '10px auto' },
  subPageHeader: { width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '18px' },
  subPageTitle: { background: '#ffffff', color: '#000000', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '5px 45px', fontSize: '16px', fontWeight: '700', boxShadow: '0 2px 4px rgb(0 0 0 / 0.02)' },
  chartMainWrapper: { width: '100%', display: 'flex', flexDirection: 'column' },
  chartCanvasArea: { width: '100%', height: '180px', position: 'relative' },
  
  // Grid Background Styles
  gridLinesBackground: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 1 },
  gridRow: { display: 'flex', alignItems: 'center', width: '100%', height: '14px' },
  gridRowZero: { display: 'flex', alignItems: 'flex-end', width: '100%', height: '14px' },
  yLabel: { width: '50px', fontSize: '11px', fontWeight: '700', color: '#64748b', textAlign: 'left' },
  yLabelInvisible: { width: '50px', opacity: 0 },
  gridLine: { flexGrow: 1, height: '1px', backgroundColor: '#cbd5e1', opacity: 0.5 },
  baseLineX: { flexGrow: 1, height: '2px', backgroundColor: '#475569' }, 
  
  // 🟢 PERBAIKAN: Mengubah top dan bottom ke '0px' agar tinggi batang sejajar dengan garis nol (Sumbu X)
  barsContainerLayer: { position: 'absolute', top: '0px', bottom: '7px', left: '50px', right: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', zIndex: 2 },
  barGridColumn: { display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '40px' },
  barWrapperFlexible: { width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' },
  
  // 🟢 OPTIMASI: Transisi interaksi diperluas untuk efek transisi tinggi & hover warna latar
  barActiveElement: { width: '26px', backgroundColor: '#e0ebff', border: '2px solid #1a56db', borderRadius: '6px 6px 0 0', transition: 'all 0.25s ease-in-out', cursor: 'pointer' },
  
  xAxisLabelRow: { width: '100%', display: 'flex', paddingLeft: '50px', marginTop: '8px', boxSizing: 'border-box' },
  xLabelItemBox: { flex: 1, display: 'flex', justifyContent: 'center' },
  xLabelText: { fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' },
  
  footerRow: { width: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: '15px' },
  btnKembali: { background: '#ffffff', border: '1px solid #bfdbfe', padding: '6px 16px', borderRadius: '10px', color: '#1a56db', fontWeight: '700', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s' }
};
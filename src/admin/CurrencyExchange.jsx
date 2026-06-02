import React from 'react';
import { Coins, ArrowUpRight, ArrowDownLeft, RefreshCcw, Edit2 } from 'lucide-react';

export default function CurrencyExchange() {
  const currencyList = [
    { name: 'US Dollar', code: 'USD', buy: 'Rp 15.750', sell: 'Rp 15.890', spread: '0.8%', change: '+0.12%', status: 'Aktif' },
    { name: 'Singapore Dollar', code: 'SGD', buy: 'Rp 11.650', sell: 'Rp 11.790', spread: '0.9%', change: '+0.23%', status: 'Aktif' },
    { name: 'Malaysian Ringgit', code: 'MYR', buy: 'Rp 3.320', sell: 'Rp 3.380', spread: '1.8%', change: '+0.05%', status: 'Aktif' },
    { name: 'Indonesian Rupiah', code: 'IDR', buy: 'Rp 1.00', sell: 'Rp 1.00', spread: '0.0%', change: '+0.00%', status: 'Aktif' },
  ];

  // 🛡️ CSS MASTER UNTUK MENGUNCI LAYOUT MULTI-KOLOM VALAS AGAR PRESISI
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left'
    },
    topHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    },
    title: {
      fontSize: '22px',
      fontWeight: '800',
      color: '#1e293b',
      margin: 0,
      letterSpacing: '-0.025em'
    },
    subtitle: {
      fontSize: '13px',
      color: '#94a3b8',
      margin: '4px 0 0 0',
      fontWeight: '500'
    },
    syncButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      backgroundColor: '#eff6ff',
      color: '#2563eb',
      border: '1px solid #bfdbfe',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    mainGrid: {
      display: 'flex',
      gap: '24px',
      width: '100%',
      alignItems: 'flex-start',
      boxSizing: 'border-box'
    },
    leftTableCard: {
      flex: '0 0 65%',
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      boxSizing: 'border-box'
    },
    rightFormCard: {
      flex: '0 0 35%',
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      boxSizing: 'border-box'
    },
    cardTitle: {
      fontSize: '15px',
      fontWeight: '700',
      color: '#1e293b',
      margin: '0 0 16px 0'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left'
    },
    th: {
      padding: '12px 16px',
      color: '#94a3b8',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: '1px solid #e2e8f0'
    },
    td: {
      padding: '16px',
      fontSize: '14px',
      borderBottom: '1px solid #f1f5f9'
    },
    codeBadge: {
      padding: '4px 8px',
      backgroundColor: '#f1f5f9',
      color: '#334155',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '12px',
      borderRadius: '6px'
    },
    editButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      color: '#2563eb',
      fontWeight: '600',
      backgroundColor: '#eff6ff',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '8px',
      cursor: 'pointer'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    label: {
      fontSize: '11px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textColor: '#64748b',
      letterSpacing: '0.5px'
    },
    select: {
      padding: '10px 12px',
      border: '1px solid #cbd5e1',
      borderRadius: '12px',
      fontSize: '13px',
      color: '#334155',
      backgroundColor: '#ffffff',
      outline: 'none',
      cursor: 'pointer'
    },
    input: {
      padding: '10px 12px',
      border: '1px solid #cbd5e1',
      borderRadius: '12px',
      fontSize: '13px',
      color: '#1e293b',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box'
    },
    submitButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1)',
      marginTop: '8px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Bagian Atas: Header Informasi */}
      <div style={styles.topHeader}>
        <div>
          <h1 style={styles.title}>Currency Exchange</h1>
          <p style={styles.subtitle}>Atur nilai tukar mata uang, margin keuntungan spread, dan operasional valas harian</p>
        </div>
        <button style={styles.syncButton} type="button" className="sync-btn">
          <RefreshCcw className="h-4 w-4" /> Sinkronisasi Kurs BI
        </button>
      </div>

      {/* Bagian Utama: Layout Split 2 Kolom */}
      <div style={styles.mainGrid} className="exchange-grid">
        
        {/* KOLOM KIRI: Tabel Tarif Penukaran */}
        <div style={styles.leftTableCard}>
          <h2 style={styles.cardTitle}>Pengaturan Rate Multi-Valas</h2>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Valas</th>
                  <th style={styles.th}>Kurs Beli</th>
                  <th style={styles.th}>Kurs Jual</th>
                  <th style={styles.th}>Spread Margin</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currencyList.map((c, i) => (
                  <tr key={i} className="exchange-row">
                    <td style={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={styles.codeBadge}>{c.code}</span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ ...styles.td, fontWeight: 'bold', color: '#16a34a' }}>{c.buy}</td>
                    <td style={{ ...styles.td, fontWeight: 'bold', color: '#dc2626' }}>{c.sell}</td>
                    <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '13px', color: '#475569' }}>{c.spread}</td>
                    <td style={{ ...styles.td, textAlign: 'right' }}>
                      <button style={styles.editButton} type="button" className="edit-btn">
                        <Edit2 className="h-3 w-3" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* KOLOM KANAN: Panel Penyesuaian Cepat */}
        <div style={styles.rightFormCard}>
          <h2 style={{ ...styles.cardTitle, marginBottom: 0 }}>Penyesuaian Tarif Instan</h2>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Pilih Mata Uang</label>
            <select style={styles.select}>
              <option value="IDR">IDR - Indonesian Rupiah</option>
              <option value="MYR">MYR - Malaysian Ringgit</option>
              <option value="SGD">SGD - Singapore Dollar</option>
              <option value="USD">USD - US Dollar</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Harga Beli (IDR)</label>
              <input type="text" defaultValue="15750" style={styles.input} />
            </div>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Harga Jual (IDR)</label>
              <input type="text" defaultValue="15890" style={styles.input} />
            </div>
          </div>

          <button style={styles.submitButton} type="button" className="submit-btn">
            Perbarui Kurs Sekarang
          </button>
        </div>

      </div>

      {/* Ekstensi CSS Mikro untuk Responsivitas HP & Laptop Kecil */}
      <style>{`
        .exchange-row:hover { background-color: #f8fafc !important; }
        .sync-btn:hover { background-color: #dbeafe !important; }
        .edit-btn:hover { background-color: #dbeafe !important; }
        .submit-btn:hover { background-color: #1d4ed8 !important; }
        @media (max-width: 1024px) {
          .exchange-grid { flex-direction: column !important; }
          div { flex: 1 1 100% !important; width: 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
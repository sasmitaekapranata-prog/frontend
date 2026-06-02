import React from 'react';
import { Bell, Calendar } from 'lucide-react';

export default function Notifications() {
  const notificationLogs = [
    { user: 'Ahmad Syarif', message: 'Top Up saldo Rp 500.000 berhasil ditambahkan ke akun Anda.', status: 'Terkirim' },
    { user: 'Clara Angelica', message: 'Konfirmasi pertukaran mata uang sebesar $1.200 USD telah sukses dilakukan.', status: 'Terkirim' },
    { user: 'Hendra Putra', message: 'PERINGATAN: Transaksi gagal. Transaksi tidak dapat diproses karena saldo Anda tidak mencukupi untuk melakukan penarikan.', status: 'Gagal' },
  ];

  // 🛡️ INTERNAL STYLING UNTUK MENGUNCI LAYOUT AGAR RAPI DAN KEBAL CSS GLOBAL
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
    massButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1)',
      transition: 'background-color 0.2s'
    },
    tableCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      padding: '24px',
      boxSizing: 'border-box'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      gap: '12px'
    },
    cardTitle: {
      fontSize: '15px',
      fontWeight: '700',
      color: '#1e293b',
      margin: 0
    },
    filterDropdown: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      padding: '8px 14px',
      borderRadius: '10px',
      fontSize: '12px',
      fontWeight: '600',
      color: '#64748b',
      cursor: 'pointer'
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
    tdUser: {
      padding: '16px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#334155',
      borderBottom: '1px solid #f1f5f9',
      whiteSpace: 'nowrap'
    },
    tdMessage: {
      padding: '16px',
      fontSize: '13px',
      color: '#475569',
      borderBottom: '1px solid #f1f5f9',
      lineHeight: '1.5',
      maxWidth: '460px'
    },
    tdStatus: {
      padding: '16px',
      textAlign: 'right',
      borderBottom: '1px solid #f1f5f9'
    },
    statusBadge: (status) => ({
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      backgroundColor: status === 'Terkirim' ? '#f0fdf4' : '#fff1f2',
      color: status === 'Terkirim' ? '#16a34a' : '#e11d48',
      border: status === 'Terkirim' ? '1px solid #bbf7d0' : '1px solid #fecdd3'
    })
  };

  return (
    <div style={styles.container}>
      {/* Header Halaman Notifikasi */}
      <div style={styles.topHeader}>
        <div>
          <h1 style={styles.title}>Log & Manajemen Notifikasi</h1>
          <p style={styles.subtitle}>Pantau riwayat push notification, email blast, dan status pesan yang terkirim ke pengguna</p>
        </div>
        <button style={styles.massButton} type="button" className="mass-action-btn">
          <Bell className="h-4 w-4" /> Kirim Pemberitahuan Massal
        </button>
      </div>

      {/* Tabel Log Notifikasi Ringkas */}
      <div style={styles.tableCard}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Semua Riwayat Pesan Sistem</h2>
          <div style={styles.filterDropdown} className="filter-btn">
            <Calendar className="h-3.5 w-3.5" /> 7 Hari Terakhir
          </div>
        </div>

        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, width: '20%' }}>Penerima</th>
                <th style={{ ...styles.th, width: '65%' }}>Isi Pesan Notifikasi</th>
                <th style={{ ...styles.th, width: '15%', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {notificationLogs.map((ntf, idx) => (
                <tr key={idx} className="notif-row-item">
                  <td style={styles.tdUser}>{ntf.user}</td>
                  <td style={styles.tdMessage} title={ntf.message}>
                    {ntf.message}
                  </td>
                  <td style={styles.tdStatus}>
                    <span style={styles.statusBadge(ntf.status)}>
                      {ntf.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSS mikro pendukung interaksi efek hover */}
      <style>{`
        .notif-row-item:hover { background-color: #f8fafc !important; }
        .mass-action-btn:hover { background-color: #1d4ed8 !important; }
        .filter-btn:hover { background-color: #f1f5f9 !important; }
      `}</style>
    </div>
  );
}
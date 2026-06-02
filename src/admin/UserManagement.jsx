import React from 'react';
import { Users, Search, Plus } from 'lucide-react';

export default function UserManagement() {
  const users = [
    { id: 1, name: 'Ahmad Syarif', phone: '0812-3456-7890' },
    { id: 2, name: 'Clara Angelica', phone: '0819-8765-4321' },
    { id: 3, name: 'Budi Darmawan', phone: '0821-5555-1234' },
    { id: 4, name: 'Rian Hidayat', phone: '0857-1111-2223' },
  ];

  // 🛡️ CSS INLINE MASTER UNTUK MENJAMIN STRUKTUR DATA TIDAK BERANTAKAN KE TENGAH
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left' // Menepis paksaan text-center dari luar
    },
    headerArea: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      textAlign: 'left'
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
      margin: 0,
      fontWeight: '500'
    },
    statCard: {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      maxWidth: '340px',
      textAlign: 'left'
    },
    iconWrapper: {
      padding: '12px',
      backgroundColor: '#eff6ff',
      color: '#2563eb',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      overflow: 'hidden',
      width: '100%'
    },
    actionBar: {
      padding: '20px',
      borderBottom: '1px solid #f1f5f9',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      padding: '10px 14px',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '280px',
      boxSizing: 'border-box'
    },
    searchInput: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: '13px',
      width: '100%',
      color: '#334155'
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
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
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left'
    },
    th: {
      padding: '14px 20px',
      backgroundColor: '#f8fafc',
      color: '#94a3b8',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: '1px solid #e2e8f0'
    },
    tdName: {
      padding: '16px 20px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#1e293b',
      borderBottom: '1px solid #f1f5f9'
    },
    tdPhone: {
      padding: '16px 20px',
      fontSize: '13px',
      fontFamily: 'monospace',
      color: '#475569',
      borderBottom: '1px solid #f1f5f9'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Halaman */}
      <div style={styles.headerArea}>
        <h1 style={styles.title}>User Management</h1>
        <p style={styles.subtitle}>Kelola daftar dan data informasi nomor pengguna sistem</p>
      </div>

      {/* Kartu Ringkasan Statistik */}
      <div style={styles.statCard}>
        <div style={styles.iconWrapper}>
          <Users className="h-5 w-5" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>
            Total Pengguna Terdaftar
          </p>
          <p style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0, letterSpacing: '-0.025em' }}>
            1,245,890
          </p>
        </div>
      </div>

      {/* Kontrol & Tabel Data */}
      <div style={styles.tableContainer}>
        {/* Bilah Aksi Tambah & Cari */}
        <div style={styles.actionBar}>
          <div style={styles.searchBox}>
            <Search className="h-4 w-4 text-[#64748b]" />
            <input 
              type="text" 
              placeholder="Cari nama atau nomor telepon..." 
              style={styles.searchInput} 
            />
          </div>
          <div>
            <button style={styles.addButton} type="button" className="action-add-btn">
              <Plus className="h-4 w-4" /> Tambah User
            </button>
          </div>
        </div>

        {/* Tabel */}
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nama Lengkap</th>
                <th style={styles.th}>No. Telepon</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="table-row-item">
                  <td style={styles.tdName}>
                    {u.name}
                  </td>
                  <td style={styles.tdPhone}>
                    {u.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSS internal kecil untuk efek interaktif baris tabel saat disentuh mouse */}
      <style>{`
        .table-row-item:hover { background-color: #f8fafc !important; }
        .action-add-btn:hover { background-color: #1d4ed8 !important; }
        @media (max-width: 640px) {
          .action-bar { flexDirection: column !important; alignItems: flex-start !important; }
          .search-box { max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
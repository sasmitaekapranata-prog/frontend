import React, { useState } from 'react';
import { Headset, MessageSquare, AlertCircle, Clock, CheckCircle, Send, CornerDownRight } from 'lucide-react';

export default function HelpCenter() {
  // State data pengaduan tanpa properti priority (Fitur Asli Dipertahankan)
  const [tickets, setTickets] = useState([
    { id: 'ADU-9022', user: 'Clara Angelica', topic: 'Gagal Kirim Penukaran Mandiri', status: 'Baru', time: '10 mnt lalu', message: 'Saya mencoba melakukan penukaran poin ke Mandiri sejak pagi tadi, namun selalu muncul error "RTO". Saldo poin sudah terpotong tapi belum masuk rekening.' },
    { id: 'ADU-8910', user: 'Bambang U.', topic: 'Verifikasi KYC Tertunda (KTP Buram)', status: 'Diproses', time: '1 jam lalu', message: 'Halo admin, status verifikasi akun saya sudah gantung selama 2 hari. Apakah foto KTP saya kurang jelas? Mohon bantuannya.' },
    { id: 'ADU-8854', user: 'Rian Hidayat', topic: 'Top Up LinkAja Belum Masuk', status: 'Selesai', time: 'Yesterday', message: 'Top up senilai Rp 50.000 via LinkAja sukses di aplikasi e-wallet saya, namun di dashboard sistem ini statusnya masih pending.' },
  ]);

  const [activeTicketId, setActiveTicketId] = useState('ADU-9022');
  const [replyMessage, setReplyMessage] = useState('');

  const currentTicket = tickets.find(t => t.id === activeTicketId);

  const handleSendResponse = (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    setTickets(prevTickets => 
      prevTickets.map(t => 
        t.id === activeTicketId 
          ? { ...t, status: 'Selesai', time: 'Baru saja dijawab' } 
          : t
      )
    );
    
    alert(`Tanggapan untuk ${currentTicket.user} berhasil dikirim! Status pengaduan otomatis berubah menjadi 'Selesai'.`);
    setReplyMessage('');
  };

  const updateStatus = (id, newStatus) => {
    setTickets(prevTickets =>
      prevTickets.map(t => t.id === id ? { ...t, status: newStatus } : t)
    );
  };

  return (
    <div className="animate-fadeIn text-[#1e293b]" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 1. HEADER HALAMAN (RAPI RATA KIRI) */}
      <div style={{ textAlign: 'left' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
          Pusat Resolusi & Aduan Admin
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '6px 0 0 0', fontWeight: '500' }}>
          Selesaikan keluhan, balas pesan bantuan, dan perbarui status kendala pengguna TrustPay.
        </p>
      </div>

      {/* 2. RINGKASAN STATISTIK DENGAN STYLE KARTU DASHBOARD */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        {/* Butuh Respon */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Butuh Respon</p>
            <p style={{ fontSize: '20px', fontWeight: '800', color: '#e11d48', margin: '4px 0 0 0' }}>{tickets.filter(t => t.status === 'Baru').length} Pengaduan</p>
          </div>
          <div style={{ backgroundColor: '#fff1f2', padding: '10px', borderRadius: '12px', color: '#e11d48' }}>
            <AlertCircle style={{ width: '20px', height: '20px' }} />
          </div>
        </div>

        {/* Sedang Ditangani */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Sedang Ditangani</p>
            <p style={{ fontSize: '20px', fontWeight: '800', color: '#d97706', margin: '4px 0 0 0' }}>{tickets.filter(t => t.status === 'Diproses').length} Pengaduan</p>
          </div>
          <div style={{ backgroundColor: '#fef3c7', padding: '10px', borderRadius: '12px', color: '#d97706' }}>
            <Clock style={{ width: '20px', height: '20px' }} />
          </div>
        </div>

        {/* Diselesaikan */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Diselesaikan</p>
            <p style={{ fontSize: '20px', fontWeight: '800', color: '#16a34a', margin: '4px 0 0 0' }}>{tickets.filter(t => t.status === 'Selesai').length} Pengaduan</p>
          </div>
          <div style={{ backgroundColor: '#f0fdf4', padding: '10px', borderRadius: '12px', color: '#16a34a' }}>
            <CheckCircle style={{ width: '20px', height: '20px' }} />
          </div>
        </div>

        {/* Rerata Penyelesaian */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Rerata SLA</p>
            <p style={{ fontSize: '20px', fontWeight: '800', color: '#475569', margin: '4px 0 0 0' }}>14 Menit</p>
          </div>
          <div style={{ backgroundColor: '#f1f5f9', padding: '10px', borderRadius: '12px', color: '#475569' }}>
            <Headset style={{ width: '20px', height: '20px' }} />
          </div>
        </div>
      </div>

      {/* 3. WORKSPACE UTAMA (BELAH DUA PROPORSIONAL) */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '28px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI: Antrean Masuk */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', textAlign: 'left' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px', marginTop: 0 }}>Daftar Antrean Aduan</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }} className="custom-scroll">
            {tickets.map((t) => {
              const isActive = activeTicketId === t.id;
              return (
                <div 
                  key={t.id} 
                  onClick={() => setActiveTicketId(t.id)}
                  style={{ 
                    padding: '16px', 
                    borderRadius: '14px', 
                    border: isActive ? '1px solid #2563eb' : '1px solid #e2e8f0', 
                    backgroundColor: isActive ? '#eff6ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.05)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', fontFamily: 'monospace', backgroundColor: isActive ? '#bfdbfe' : '#f1f5f9', color: isActive ? '#1d4ed8' : '#64748b', padding: '2px 8px', borderRadius: '6px' }}>{t.id}</span>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      padding: '2px 10px', 
                      borderRadius: '30px',
                      backgroundColor: t.status === 'Baru' ? '#fff1f2' : t.status === 'Diproses' ? '#fef3c7' : '#f0fdf4',
                      color: t.status === 'Baru' ? '#e11d48' : t.status === 'Diproses' ? '#d97706' : '#16a34a'
                    }}>{t.status}</span>
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{t.topic}</h4>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Oleh: <span style={{ color: '#0f172a', fontWeight: '600' }}>{t.user}</span> • <span style={{ color: '#94a3b8' }}>{t.time}</span></p>
                </div>
              );
            })}
          </div>
        </div>

        {/* KOLOM KANAN: Ruang Eksekusi Balasan Admin */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', textAlign: 'left' }}>
          {currentTicket ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Info Header Pengaduan Aktif */}
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: '700', color: '#2563eb' }}>{currentTicket.id}</span>
                    <span style={{ color: '#cbd5e1' }}>•</span>
                    <span style={{ fontSize: '13px', textTransform: 'capitalize', color: '#64748b', fontWeight: '500' }}>Pelapor: <strong>{currentTicket.user}</strong></span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>{currentTicket.topic}</h3>
                </div>
                
                {/* Akses Tombol Aksi */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {currentTicket.status !== 'Diproses' && currentTicket.status !== 'Selesai' && (
                    <button 
                      onClick={() => updateStatus(currentTicket.id, 'Diproses')}
                      style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #fde68a', backgroundColor: '#fef3c7', color: '#b45309', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Proses Pengaduan
                    </button>
                  )}
                  {currentTicket.status !== 'Selesai' && (
                    <button 
                      onClick={() => updateStatus(currentTicket.id, 'Selesai')}
                      style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4', color: '#15803d', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Selesaikan
                    </button>
                  )}
                </div>
              </div>

              {/* Isi Aduan dari User */}
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  <MessageSquare style={{ width: '14px', height: '14px', color: '#64748b' }} />
                  Isi Aduan Pengguna
                </div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#334155', margin: 0, whiteSpace: 'pre-line' }}>{currentTicket.message}</p>
              </div>

              {/* Form Input Balasan/Solusi Admin */}
              {currentTicket.status === 'Selesai' ? (
                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontSize: '13px', padding: '16px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
                  <CheckCircle style={{ width: '18px', height: '18px', color: '#16a34a', flexShrink: 0 }} />
                  <span>Aduan ini telah ditandai sebagai <strong>Selesai</strong>. Riwayat percakapan resmi telah diarsipkan.</span>
                </div>
              ) : (
                <form onSubmit={handleSendResponse} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <CornerDownRight style={{ width: '14px', height: '14px', color: '#2563eb' }} />
                    Tulis Tanggapan Resmi Admin
                  </div>
                  <textarea
                    rows="4"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder={`Ketik jawaban solusi teknis atau instruksi resmi untuk ${currentTicket.user}...`}
                    style={{
                      width: '100%', fontSize: '13px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '14px', outline: 'none', transition: 'all 0.2s', resize: 'none', backgroundColor: '#ffffff', boxSizing: 'border-box', fontFamily: 'inherit', color: '#0f172a', lineHeight: '1.5'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>Notifikasi jawaban otomatis dikirim ke gawai user.</span>
                    <button 
                      type="submit" 
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'background-color 0.2s', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.15)'
                      }}
                    >
                      <Send style={{ width: '14px', height: '14px' }} /> Kirim Jawaban
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8', fontSize: '13px' }}>Pilih salah satu pengaduan di antrean sebelah kiri untuk mulai meninjau aduan.</div>
          )}
        </div>

      </div>
    </div>
  );
}
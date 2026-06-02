import React, { useState } from 'react';
import { 
  Users, 
  ArrowLeftRight, 
  Search, 
  ChevronDown, 
  PieChart, 
  Coins, 
  Headset, 
  Bell, 
  User
} from 'lucide-react';

import UserManagement from './UserManagement';
import CurrencyExchange from './CurrencyExchange';
import HelpCenter from './HelpCenter';
import Notifications from './Notifications'; 

export default function Dashboard({ onLogout, userName }) {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  // 🛡️ CSS VANILLA INLINE MASTER UNTUK MENJAMIN STRUKTUR DAN WARNA PREMIUM
  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f1f5f9',
      color: '#1e293b',
      fontFamily: 'sans-serif',
      width: '100vw',
      margin: 0, padding: 0,
      boxSizing: 'border-box',
      textAlign: 'left'
    },
    sidebar: {
      width: '260px',
      backgroundColor: '#0f172a',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      boxShadow: '4px 0 25px rgba(0,0,0,0.15)',
      zIndex: 20,
      boxSizing: 'border-box'
    },
    sidebarNav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    navButton: (isSelected) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '14px 18px',
      borderRadius: '12px',
      fontWeight: '500',
      fontSize: '14px',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s ease',
      backgroundColor: isSelected ? '#2563eb' : 'transparent',
      color: isSelected ? '#ffffff' : '#94a3b8',
      boxShadow: isSelected ? '0 10px 15px -3px rgba(37, 99, 235, 0.2)' : 'none',
    }),
    mainWrapper: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      height: '100vh',
      boxSizing: 'border-box'
    },
    header: {
      height: '76px',
      backgroundColor: '#ffffff',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'between',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
      boxSizing: 'border-box'
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: '#f8fafc',
      padding: '10px 16px',
      borderRadius: '12px',
      width: '320px',
      border: '1px solid #e2e8f0'
    },
    searchInput: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: '14px',
      width: '100%',
      color: '#334155'
    },
    contentBody: {
      padding: '32px',
      flexGrow: 1,
      overflowY: 'auto',
      boxSizing: 'border-box',
      textAlign: 'left'
    },
    welcomeBanner: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      borderLeft: '4px solid #2563eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      textAlign: 'left'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '24px'
    },
    metricCard: {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      textAlign: 'left'
    },
    iconContainer: {
      padding: '12px',
      backgroundColor: '#eff6ff',
      borderRadius: '12px',
      color: '#2563eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  const renderMainContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* CONTAINER BANNER JUDUL SAMBUTAN */}
            <div style={styles.welcomeBanner}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0, tracking: '-0.025em' }}>
                Selamat Datang di Portal Utama
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', margin: 0 }}>
                Pantau ringkasan operational instan TrustPay system hari ini.
              </p>
            </div>

            {/* GRID UTAMA - CARD METRIK */}
            <div style={styles.gridContainer}>
              
              {/* KARTU 1: TOTAL PENGGUNA */}
              <div style={styles.metricCard}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    Total Pengguna
                  </span>
                  <p style={{ fontSize: '30px', fontWeight: '800', color: '#1e293b', margin: '4px 0 0 0', tracking: '-0.025em' }}>
                    1,245,890
                  </p>
                  <span style={{ fontSize: '12px', fontWeight: '6px', color: '#16a34a', marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#f0fdf4', padding: '4px 8px', borderRadius: '6px', width: 'max-content' }}>
                    ▲ +12% <span style={{ color: '#94a3b8', fontWeight: 'normal' }}>Bulan ini</span>
                  </span>
                </div>
                <div style={styles.iconContainer}>
                  <Users className="h-6 w-6" />
                </div>
              </div>

              {/* KARTU 2: TRANSAKSI HARI INI */}
              <div style={styles.metricCard}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    Transaksi Hari Ini
                  </span>
                  <p style={{ fontSize: '30px', fontWeight: '800', color: '#1e293b', margin: '4px 0 0 0', tracking: '-0.025em' }}>
                    42,105
                  </p>
                  <span style={{ fontSize: '12px', fontWeight: '6px', color: '#16a34a', marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#f0fdf4', padding: '4px 8px', borderRadius: '6px', width: 'max-content' }}>
                    ▲ +5.4% <span style={{ color: '#94a3b8', fontWeight: 'normal' }}>Dari kemarin</span>
                  </span>
                </div>
                <div style={styles.iconContainer}>
                  <ArrowLeftRight className="h-6 w-6" />
                </div>
              </div>

            </div>
          </div>
        );
      
      case 'User Management':
        return <UserManagement />;
      case 'Currency Exchange':
        return <CurrencyExchange />;
      case 'Help Center':
        return <HelpCenter />;
      case 'Notifikasi': 
        return <Notifications />;
      default:
        return <div style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', padding: '16px' }}>Halaman tidak ditemukan.</div>;
    }
  };

  return (
    <div style={styles.layout}>
      
      {/* 1. SIDEBAR */}
      <aside style={styles.sidebar} className="dashboard-sidebar">
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', padding: '0 8px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', display: 'flex', alignItems: 'center' }}>
            TrustPay<span style={{ color: '#2563eb' }}>.id</span>
            <span style={{ marginLeft: '8px', fontSize: '20px', display: 'inline-flex', alignItems: 'center', transform: 'translateY(-1px)' }}>🛡️</span>
          </span>
        </div>
        
        {/* MENU UTAMA */}
        <nav style={styles.sidebarNav}>
          <button 
            onClick={() => setActiveMenu('Dashboard')}
            style={styles.navButton(activeMenu === 'Dashboard')}
          >
            <PieChart className="h-5 w-5" /> 
            <span>Dashboard</span>
          </button>

          {['User Management', 'Currency Exchange', 'Help Center', 'Notifikasi'].map((menu, i) => {
            const icons = [
              <Users className="h-5 w-5" />, 
              <Coins className="h-5 w-5" />, 
              <Headset className="h-5 w-5" />, 
              <Bell className="h-5 w-5" /> 
            ];
            return (
              <button 
                key={i} 
                onClick={() => setActiveMenu(menu)}
                style={styles.navButton(activeMenu === menu)}
              >
                {icons[i]} 
                <span>{menu}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div style={styles.mainWrapper}>
        
        {/* 2. HEADER BAR */}
        <header style={styles.header}>
          {/* SEARCH BOX */}
          <div style={styles.searchBox}>
            <Search className="h-4 w-4 text-[#64748b]" />
            <input 
              type="text" 
              placeholder="Cari data finansial..." 
              style={styles.searchInput} 
            />
          </div>
          
          {/* USER INFO & DROPDOWN AREA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '14px', fontWeight: '500', color: '#64748b' }}>
              <button onClick={() => setActiveMenu('Dashboard')} style={{ border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }} className="nav-home-btn">Home</button>
            </nav>
            
            <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }}></div>

            {/* Profile Menu Trigger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', position: 'relative' }} className="profile-group">
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #bfdbfe' }}>
                <User className="h-4 w-4" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.2', color: '#1e293b' }}>
                  Hi, {userName || 'Admin'}!
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Super Admin</span>
              </div>
              <ChevronDown className="h-4 w-4 text-[#64748b]" />

              {/* Dropdown Menu Box */}
              <div className="profile-dropdown" style={{ position: 'absolute', right: 0, top: '42px', width: '176px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '6px 0', border: '1px solid #e2e8f0' }}>
                <button 
                  onClick={() => { if (onLogout) onLogout(); }} 
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '12px', fontWeight: 'bold', color: '#dc2626', border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  Logout System
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 3. CONTENT BODY */}
        <main style={styles.contentBody}>
          {renderMainContent()}
        </main>
      </div>

      {/* CSS internal mikro untuk handling hover efek dan dropdown */}
      <style>{`
        .profile-dropdown { display: none; }
        .profile-group:hover .profile-dropdown { display: block !important; }
        .nav-home-btn:hover { color: #2563eb !important; }
        @media (max-width: 1024px) {
          .dashboard-sidebar { width: 80px !important; padding: 12px !important; }
          .dashboard-sidebar span { display: none !important; }
          .dashboard-sidebar button { justify-content: center !important; padding: 14px 0 !important; }
        }
      `}</style>

    </div>
  );
}
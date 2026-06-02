import { useState } from 'react';

const AddWallet = ({ onBack, onLogout, onConfirmNext, onNavigate }) => {
  // State untuk melacak e-wallet mana yang sedang dipilih oleh pengguna
  const [selectedWallet, setSelectedWallet] = useState('');
  
  // State untuk mencatat status interaksi hover pada pilihan wallet
  const [hoveredOption, setHoveredOption] = useState(null);

  // Fungsi untuk menangani aksi ketika tombol Konfirmasi ditekan
  const handleAddWalletSubmit = () => {
    if (!selectedWallet) {
      alert('Silakan pilih salah satu E-Wallet terlebih dahulu!');
      return;
    }
    
    // Alur diarahkan untuk mengeksekusi onConfirmNext dan mengirimkan nama wallet yang dipilih
    if (onConfirmNext) {
      // 💡 DISINKRONKAN: Mengirimkan string nama wallet standar agar backend temanmu tidak bingung
      const standardWalletName = selectedWallet === 'Danatopup' ? 'Dana' : selectedWallet;
      onConfirmNext(standardWalletName);
    }
  };

  // Objek Style CSS - Tetap dipertahankan sesuai layout Dashboard Anda
  const styles = {
    container: {
      backgroundColor: '#f8fafc',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      justify: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      padding: '40px 24px',
      fontFamily: "'Poppins', sans-serif"
    },
    dashboardWrapper: {
      width: '100%',
      maxWidth: '1050px',
      display: 'flex',
      flexDirection: 'column',
      transform: 'translateX(-60px)', 
      transition: 'transform 0.2s ease-in-out'
    },
    header: {
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: '20px',
      boxSizing: 'border-box'
    },
    brandSection: {
      display: 'flex',
      alignItems: 'center'
    },
    logoContainer: { 
      display: 'flex', 
      alignItems: 'center', 
      cursor: 'pointer' 
    },
    logoTextBlue: { 
      fontWeight: '800', 
      fontSize: '32px',
      color: '#1a56db'
    },
    logoTextLightBlue: { 
      fontWeight: '800', 
      fontSize: '32px', 
      color: '#60a5fa'
    },
    navMenu: { 
      display: 'flex', 
      gap: '25px', 
      alignItems: 'center' 
    },
    navItemContainer: { 
      paddingBottom: '2px', 
      borderBottom: '3px solid transparent' 
    },
    navItemContainerActive: { 
      paddingBottom: '2px', 
      borderBottom: '3px solid #1a56db' 
    },
    navItem: { 
      cursor: 'pointer', 
      color: '#000000', 
      fontWeight: '700', 
      fontSize: '15px', 
      fontFamily: "'Poppins', sans-serif" 
    },
    navItemActive: { 
      cursor: 'pointer', 
      color: '#1a56db', 
      fontWeight: '700', 
      fontSize: '15px', 
      fontFamily: "'Poppins', sans-serif" 
    },
    contentCard: {
      border: '1px solid #E2E8F0',
      borderRadius: '24px',
      padding: '50px 40px',
      backgroundColor: '#ffffff',
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box'
    },
    topBarRow: { 
      display: 'flex', 
      justify: 'flex-start', 
      width: '100%', 
      marginBottom: '10px' 
    },
    btnAdd: {
      backgroundColor: 'white',
      border: '2px solid #1a56db',
      color: '#1a56db',
      padding: '6px 24px',
      borderRadius: '15px',
      fontWeight: '700',
      fontSize: '13px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justify: 'center',
      gap: '6px',
      marginBottom: '25px',
      alignSelf: 'flex-start',
      fontFamily: "'Poppins', sans-serif"
    },
    plusIcon: {
      fontSize: '14px',
      fontWeight: '700',
      border: '2px solid #1a56db',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      display: 'inline-flex',
      alignItems: 'center',
      justify: 'center',
      marginRight: '2px',
    },
    inputContainer: {
      position: 'relative',
      width: '100%',
      marginBottom: '35px',
    },
    walletInput: {
      width: '100%',
      padding: '16px 16px 16px 55px',
      border: '2px solid #4d82f3',
      borderRadius: '14px',
      fontSize: '16px',
      color: '#4A5568',
      outline: 'none',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
      fontWeight: '600',
      fontFamily: "'Poppins', sans-serif"
    },
    walletIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#4A5568',
      display: 'flex',
      alignItems: 'center',
    },
    walletGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '25px',
      width: '100%',
      marginBottom: '40px', 
    },
    getWalletOptionStyle: (walletName) => {
      const isSelected = selectedWallet === walletName;
      const isHovered = hoveredOption === walletName;
      
      return {
        border: isSelected ? '2.5px solid #1a56db' : '1.5px solid #4d82f3',
        borderRadius: '18px',
        padding: '50px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        gap: '12px',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#eff6ff' : isHovered ? '#f8fafc' : '#ffffff',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 6px 15px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.2s ease-in-out',
      };
    },
    walletName: {
      fontWeight: '700',
      fontSize: '14px',
      fontFamily: "'Poppins', sans-serif"
    },
    shopeeColor: { color: '#ff4500' },
    gopayColor: { color: '#000000' },
    danaColor: { color: '#0081c9' },
    
    logoBold: {
      backgroundColor: '#FF4500',
      color: 'white',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: '800',
    },
    gopayIcon: {
      width: '24px',
      height: '24px',
      backgroundColor: '#00AED6',
      borderRadius: '50%',
      position: 'relative',
    },
    gopayInnerCircle: {
      position: 'absolute',
      width: '10px',
      height: '10px',
      backgroundColor: 'white',
      borderRadius: '50%',
      top: '7px',
      left: '7px',
    },
    danaLogoText: {
      color: '#0081C9',
      fontStyle: 'italic',
      letterSpacing: '0.5px',
      fontSize: '22px',
      fontWeight: '800',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    danaIconCircle: {
      width: '20px',
      height: '20px',
      backgroundColor: '#0081C9',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justify: 'center',
      color: 'white',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    btnKonfirmasi: {
      backgroundColor: '#1a56db',
      border: 'none',
      color: '#ffffff',
      padding: '12px 0',
      width: '200px',
      borderRadius: '20px',
      fontWeight: '700',
      fontSize: '14px',
      cursor: 'pointer',
      alignSelf: 'center',
      transition: 'all 0.2s ease-in-out',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    }
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #f8fafc; }
        .btn-active:hover { opacity: 0.95; transform: translateY(-1px); }
      `}</style>

      {/* WRAPPER UTAMA */}
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
            <div style={styles.navItemContainerActive}>
              <span onClick={onBack} style={styles.navItemActive}>Home</span>
            </div>
            <div style={styles.navItemContainer}>
              {/* 💡 SINKRONISASI NAVIGASI: Menggunakan prop navigasi dinamis sistem */}
              <span onClick={() => onNavigate && onNavigate('notifikasi')} style={styles.navItem}>Notifikasi</span>
            </div>
            <div style={styles.navItemContainer}>
              <span onClick={onLogout} style={styles.navItem}>Logout</span>
            </div>
          </nav>
        </header>

        {/* Card Konten Utama */}
        <main style={styles.contentCard}>
          <div style={styles.topBarRow}>
            <button type="button" onClick={onBack} style={styles.btnAdd}>
              <span style={styles.plusIcon}>+</span> ADD
            </button>
          </div>

          {/* Input Field */}
          <div style={styles.inputContainer}>
            <div style={styles.walletIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" height="16" width="20" y="4" rx="2"></rect>
                <path d="M12 11h4v2h-4z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Add E-Wallet" 
              value={selectedWallet === 'Danatopup' ? 'Dana' : selectedWallet} 
              style={styles.walletInput} 
              readOnly 
            />
          </div>

          {/* Grid Pilihan E-Wallet */}
          <div style={styles.walletGrid}>
            
            {/* Shopeepay */}
            <div 
              style={styles.getWalletOptionStyle('Shoopeepay')}
              onClick={() => setSelectedWallet('Shoopeepay')}
              onMouseEnter={() => setHoveredOption('Shoopeepay')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '20px', fontWeight: '700', color: '#ff4500' }}>
                <span style={styles.logoBold}>S</span>
                <span style={{ fontStyle: 'italic', fontWeight: '800', fontFamily: "'Poppins', sans-serif" }}>Pay</span>
              </div>
              <div style={{...styles.walletName, ...styles.shopeeColor}}>Shoopeepay</div>
            </div>

            {/* Gopay */}
            <div 
              style={styles.getWalletOptionStyle('Gopay')}
              onClick={() => setSelectedWallet('Gopay')}
              onMouseEnter={() => setHoveredOption('Gopay')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '22px', fontWeight: '800' }}>
                <div style={styles.gopayIcon}>
                  <div style={styles.gopayInnerCircle}></div>
                </div>
                <span style={{ letterSpacing: '-1px', fontFamily: "'Poppins', sans-serif" }}>gopay</span>
              </div>
              <div style={{...styles.walletName, ...styles.gopayColor}}>Gopay</div>
            </div>

            {/* Dana */}
            <div 
              style={styles.getWalletOptionStyle('Danatopup')}
              onClick={() => setSelectedWallet('Danatopup')}
              onMouseEnter={() => setHoveredOption('Danatopup')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div style={styles.danaLogoText}>
                <span style={styles.danaIconCircle}>D</span>
                <span style={{ fontFamily: "'Poppins', sans-serif" }}>DANA</span>
              </div>
              <div style={{...styles.walletName, ...styles.danaColor}}>Dana</div>
            </div>
          </div>

          {/* Tombol Konfirmasi */}
          <button onClick={handleAddWalletSubmit} style={styles.btnKonfirmasi}>
            Konfirmasi
          </button>
        </main>
      </div>
    </div>
  );
};

export default AddWallet;
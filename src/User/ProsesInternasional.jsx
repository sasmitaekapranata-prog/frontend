import { useState, useEffect } from 'react';
import { IoPaperPlaneOutline, IoChevronBack, IoWalletOutline, IoBusinessOutline, IoLocationOutline, IoLockClosedOutline } from 'react-icons/io5';

const Icons = {
  Shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#1e40af" className="inline-block align-middle ml-1.5">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  )
};

const COUNTRY_MAP = {
  IDR: { code: 'id', country: 'Indonesia' },
  USD: { code: 'us', country: 'United States' },
  MYR: { code: 'my', country: 'Malaysia' },
  SGD: { code: 'sg', country: 'Singapore' }
};

const ProsesInternasional = ({ initialData, onBack, onNavigate, onLogout, onPaymentSuccess }) => {
  const targetCurrency = initialData?.mataUang?.toUpperCase() || 'USD';
  const countryDetail = COUNTRY_MAP[targetCurrency] || { code: 'us', country: 'United States' };

  const [formData, setFormData] = useState({
    tipeNasabah: '',
    namaPenerima: '',
    jenisRekening: '',
    rekeningTujuan: initialData?.rekeningTujuan || '',
    emailPenerima: '',
    hubungan: '',
    negara: countryDetail.country,
    detailAlamat: '',
    kota: '',
    kodePos: ''
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      negara: countryDetail.country,
      rekeningTujuan: initialData?.rekeningTujuan || prev.rekeningTujuan
    }));
  }, [targetCurrency, initialData?.rekeningTujuan]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitPayment = () => {
    if (onPaymentSuccess) {
      onPaymentSuccess({
        ...initialData,
        ...formData,
        tanggalTransaksi: new Date().toISOString()
      });
    }
  };

  const isFormValid = formData.namaPenerima.trim() && formData.rekeningTujuan.trim() && formData.detailAlamat.trim();

  // Dummy penunjang nilai nominal untuk sisi kanan (Ringkasan) jika initialData belum lengkap
  const nominalTransfer = initialData?.nominal || 1000;
  const biayaAdmin = initialData?.biayaAdmin || 5;

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      
      {/* 1. NAVBAR UTAMA */}
      <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center font-extrabold text-2xl tracking-tight cursor-pointer" onClick={onBack}>
            <span className="text-blue-600">TrustPay</span>
            <span className="text-blue-400 font-semibold">.id</span>
            {Icons.Shield}
          </div>
          
          <nav className="flex gap-6 items-center text-sm font-semibold text-slate-600">
            <span className="cursor-pointer hover:text-blue-600 transition" onClick={() => onNavigate && onNavigate('dashboard')}>Home</span>
            <span className="cursor-pointer hover:text-blue-600 transition" onClick={() => onNavigate && onNavigate('notifikasi')}>Notifikasi</span>
            <button onClick={onLogout} className="text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition font-medium text-xs">
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* 2. KONTEN UTAMA */}
      <main className="max-w-[1200px] w-full mx-auto px-6 py-8 flex-1 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* KOLOM KIRI: FORMULIR UTAMA (70%) */}
        <div className="w-full lg:w-[68%] flex flex-col gap-6">
          
          {/* Navigasi & Judul */}
          <div className="flex flex-col gap-3">
            <button 
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-bold text-xs tracking-wider transition group w-fit"
            >
              <IoChevronBack className="text-sm group-hover:-translate-x-0.5 transition-transform" /> KEMBALI
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Lengkapi Detail Transfer ({targetCurrency})</h1>
              <p className="text-slate-500 text-sm mt-0.5">Harap isi informasi rekening dan domisili fisik penerima luar negeri dengan benar.</p>
            </div>
          </div>

          {/* SECTION 1: DATA REKENING & PENERIMA */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <IoWalletOutline className="text-blue-600 text-xl" />
              <h2 className="font-bold text-slate-800 text-base">Informasi Rekening Tujuan</h2>
            </div>

            {/* Negara Bank Tujuan (Badge Premium) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Negara Bank Tujuan</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-fit">
                <img 
                  src={`https://flagcdn.com/w40/${countryDetail.code}.png`} 
                  alt={`${countryDetail.country} Flag`} 
                  className="w-6 h-4 rounded shadow-sm object-cover" 
                />
                <span className="text-sm font-bold text-slate-700">{countryDetail.country} &bull; <span className="text-blue-600">{targetCurrency}</span></span>
              </div>
            </div>

            {/* Form Input Baris Kiri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">Tipe Nasabah</label>
                <select 
                  value={formData.tipeNasabah}
                  onChange={(e) => handleChange('tipeNasabah', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800"
                >
                  <option value="">Pilih Tipe Nasabah</option>
                  <option value="Perorangan">Perorangan (Individual)</option>
                  <option value="Perusahaan">Perusahaan (Corporate / Bisnis)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">Nama Lengkap Penerima <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Sesuai nama pada buku rekening" 
                  value={formData.namaPenerima}
                  onChange={(e) => handleChange('namaPenerima', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">Jenis Rekening</label>
                <select 
                  value={formData.jenisRekening}
                  onChange={(e) => handleChange('jenisRekening', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800"
                >
                  <option value="">Pilih Jenis Rekening</option>
                  <option value="Checking">Checking Account</option>
                  <option value="Savings">Savings Account</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">Nomor Rekening / IBAN <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Masukkan nomor akun atau kode IBAN" 
                  value={formData.rekeningTujuan}
                  onChange={(e) => handleChange('rekeningTujuan', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500">Email Penerima (Opsional)</label>
              <input 
                type="email" 
                placeholder="nama@email.com (Untuk notifikasi resi pengiriman)" 
                value={formData.emailPenerima}
                onChange={(e) => handleChange('emailPenerima', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" 
              />
            </div>
          </div>

          {/* SECTION 2: HUBUNGAN & ALAMAT FISIK */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <IoBusinessOutline className="text-blue-600 text-xl" />
              <h2 className="font-bold text-slate-800 text-base">Hubungan &amp; Domisili Alamat</h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500">Hubungan Bisnis / Sosial</label>
              <input 
                type="text" 
                placeholder="Misal: Keluarga, Mitra Bisnis, Vendor, Biaya Kuliah" 
                value={formData.hubungan}
                onChange={(e) => handleChange('hubungan', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Negara Penerima</label>
                <input 
                  type="text" 
                  value={formData.negara} 
                  disabled
                  className="w-full bg-slate-100 text-slate-500 font-semibold text-sm px-4 py-3 rounded-xl border border-slate-200 cursor-not-allowed" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">Nama Jalan / No. Rumah <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Contoh: 123 Baker Street" 
                  value={formData.detailAlamat}
                  onChange={(e) => handleChange('detailAlamat', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">Kota</label>
                <input 
                  type="text" 
                  placeholder="Nama Kota" 
                  value={formData.kota}
                  onChange={(e) => handleChange('kota', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">Kode Pos</label>
                <input 
                  type="text" 
                  placeholder="Kode Pos" 
                  value={formData.kodePos}
                  onChange={(e) => handleChange('kodePos', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: RINGKASAN TRANSAKSI & AKSES BAYAR (30%) */}
        <div className="w-full lg:w-[32%] lg:sticky lg:top-24 flex flex-col gap-4">
          <div className="bg-slate-900 text-white rounded-2xl shadow-md p-6 border border-slate-800 flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <IoLocationOutline className="text-blue-400 text-xl" />
              <h2 className="font-bold text-sm tracking-wide text-slate-200 uppercase">Ringkasan Transfer</h2>
            </div>

            {/* Simulasi Breakdown */}
            <div className="flex flex-col gap-3.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Nominal Transfer</span>
                <span className="font-bold text-sm">{nominalTransfer.toLocaleString()} {targetCurrency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Biaya Administrasi</span>
                <span className="text-emerald-400 font-semibold">+{biayaAdmin} {targetCurrency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Metode Pengiriman</span>
                <span className="text-slate-200 font-medium">Real-Time Network</span>
              </div>
              <hr className="border-slate-800 my-1" />
              <div className="flex justify-between items-end">
                <span className="text-slate-400 font-medium">Total Pembayaran</span>
                <span className="font-extrabold text-lg text-blue-400">{(nominalTransfer + biayaAdmin).toLocaleString()} {targetCurrency}</span>
              </div>
            </div>

            {/* Tombol Konfirmasi Bayar */}
            <button 
              type="button"
              onClick={handleSubmitPayment}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-bold text-sm shadow-lg transition-all tracking-wide flex items-center justify-center gap-2 ${
                isFormValid 
                  ? 'bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98] cursor-pointer' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
              }`}
            >
              <IoPaperPlaneOutline className="rotate-45" />
              Bayar Sekarang
            </button>
          </div>

          {/* Badge Keamanan */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <IoLockClosedOutline className="text-lg" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Enkripsi Bank Level 256-bit</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Dana Anda dilindungi dengan standar kepatuhan regulasi internasional.</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ProsesInternasional;
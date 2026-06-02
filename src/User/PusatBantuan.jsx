import { useEffect, useState } from 'react'; // 🛡️ FIX: Menggunakan React murni untuk menjaga kompatibilitas root DOM

const Icons = {
  Close: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Send: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
  ArrowDown: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
};

const PusatBantuan = ({ isOpen, onClose }) => {
  const [animate, setAnimate] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [pesanBantuan, setPesanBantuan] = useState(''); // State penampung input keluhan pelanggan

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Handler pengiriman keluhan kotak bantuan chat
  const handleKirimKeluhan = () => {
    if (!pesanBantuan.trim()) {
      alert('Harap tuliskan pertanyaan atau keluhan Anda terlebih dahulu.');
      return;
    }
    
    alert(`Pertanyaan Anda berhasil dikirim:\n"${pesanBantuan}"\n\nTim Support TrustPay akan membalas via email.`);
    setPesanBantuan(''); // Reset input box otomatis setelah submit sukses
  };

  const faqData = [
    { title: "Tentang TrustPay.Id", content: "TrustPay.Id adalah platform aman untuk mengelola semua kebutuhan pembayaran, transfer nasional, maupun internasional dalam satu akun terintegrasi." },
    { title: "Pemberitahuan Privasi", content: "Kami menjaga data pribadi Anda dengan standar keamanan enkripsi tingkat tinggi. Data Anda tidak akan dibagikan kepada pihak ketiga tanpa persetujuan." },
    { title: "Syarat dan Ketentuan", content: "Penggunaan layanan tunduk pada hukum yang berlaku. Pengguna wajib memastikan kevalidan data rekening tujuan sebelum melakukan eksekusi transfer." },
    { title: "Penutupan akun TrustPay.Id", content: "Untuk menutup akun, pastikan seluruh saldo Anda telah ditarik. Silakan kirim permohonan penutupan melalui kotak pesan di bawah ini." }
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-black/50 backdrop-blur-xs transition-opacity duration-300">
      
      {/* Area Backdrop Luar (Klik untuk menutup drawer) */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Konten Utama Drawer Samping */}
      <div
        className={`relative w-full max-w-[550px] h-full bg-white shadow-2xl p-8 flex flex-col justify-between transform transition-transform duration-500 ease-out border-l border-gray-200 ${
          animate ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Tombol Close Samping Atas */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors focus:outline-none p-1.5 hover:bg-gray-100 rounded-lg"
        >
          {Icons.Close}
        </button>

        {/* BAGIAN ATAS & KONTEN FAQ */}
        <div className="flex flex-col w-full overflow-y-auto pr-1">
          {/* Judul Utama */}
          <h2 className="text-[#1a56db] font-extrabold text-xl mb-6 tracking-tight text-left">
            Pusat Bantuan TrustPay
          </h2>

          {/* Kotak Sub-header Banner */}
          <div className="w-full bg-blue-50/70 border border-blue-100 text-left py-4 px-5 rounded-2xl mb-6">
            <h4 className="text-gray-900 font-bold text-sm">
              Ada yang bisa kami bantu?
            </h4>
            <p className="text-gray-600 text-xs font-medium mt-1 leading-relaxed">
              Temukan solusi instan melalui daftar tanya-jawab umum (FAQ) kami atau kirim pesan langsung kepada tim helpdesk di bawah ini.
            </p>
          </div>

          {/* AREA BOX FAQ ACCORDION */}
          <div className="w-full flex flex-col bg-white">
            <h3 className="text-gray-900 font-bold text-sm text-left mb-4 uppercase tracking-wider">
              Pertanyaan Sering Diajukan
            </h3>

            <div className="flex flex-col gap-3">
              {faqData.map((item, index) => (
                <div key={index} className="flex flex-col w-full border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full bg-white text-gray-900 font-bold text-xs px-5 py-4 flex justify-between items-center text-left focus:outline-none gap-4"
                  >
                    <span>{item.title}</span>
                    <div className={`text-gray-400 transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-[#1a56db]' : ''}`}>
                      {Icons.ArrowDown}
                    </div>
                  </button>

                  {/* Isi Jawaban Accordion */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="bg-slate-50 border-t border-gray-100 text-gray-600 text-xs px-5 py-4 leading-relaxed font-medium">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BAGIAN BAWAH: INPUT FORM CHAT HELPDESK */}
        <div className="w-full flex flex-col pt-4 bg-white border-t border-gray-100">
          <label className="text-gray-700 font-bold text-xs mb-3 text-left">
            Kirim Pertanyaan / Keluhan Langsung
          </label>
          
          <div className="w-full flex items-center border border-gray-300 rounded-xl p-2 bg-white focus-within:border-[#1a56db] transition-all shadow-xs">
            <input 
              type="text" 
              value={pesanBantuan}
              onChange={(e) => setPesanBantuan(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleKirimKeluhan()}
              placeholder="Ketik pertanyaan Anda di sini..."
              className="flex-1 bg-transparent text-gray-900 text-xs font-semibold px-3 py-2.5 focus:outline-none placeholder-gray-400"
            />
            <button 
              type="button"
              onClick={handleKirimKeluhan}
              className={`p-2.5 rounded-lg transition-colors focus:outline-none ${
                pesanBantuan.trim() ? 'text-[#1a56db] hover:bg-blue-50' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              {Icons.Send}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PusatBantuan;
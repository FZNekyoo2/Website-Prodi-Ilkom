import Link from "next/link";
import Image from "next/image";

export default function AkreditasiPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 animate-fade-in relative">
      
      {/* Background Gedung Tipis-tipis */}
      <div className="fixed inset-0 z-0 opacity-5">
         <Image 
           src="/image_3d16f5.jpg" 
           alt="Background Pattern"
           fill
           className="object-cover grayscale"
         />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Header Halaman */}
        <div className="text-center mb-12 animate-slide-up">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
            Penjaminan Mutu
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Akreditasi Program Studi
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Komitmen kami dalam menjaga standar kualitas pendidikan tinggi sesuai ketetapan Lembaga Akreditasi Mandiri Informatika dan Komputer (LAM-INFOKOM).
          </p>
        </div>

        {/* KARTU UTAMA: STATUS TERKINI (2025-2030) */}
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden mb-12 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-8 text-white relative overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-32 blur-3xl"></div>
            
            <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-emerald-100 font-medium text-lg mb-1">Peringkat Akreditasi Saat Ini</h2>
                <div className="text-xl md:text-5xl font-extrabold tracking-normal mb-2 drop-shadow-md">
                  BAIK SEKALI
                </div>
                <div className="inline-flex items-center gap-2 bg-emerald-800/50 border border-emerald-400/30 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Berlaku hingga: <span className="font-bold">18 Agustus 2030</span>
                </div>
              </div>
              
              {/* Badge Logo Unimed (Pengganti Piala) */}
              <div className="hidden md:block">
                 <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 backdrop-blur-md shadow-lg p-4">
                    {/* Pastikan file logo.png ada di folder public */}
                    <div className="relative w-full h-full">
                      <Image
                        src="/logo.png"
                        alt="Logo Unimed"
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              
              {/* Bagian Kiri: Preview Sertifikat (Visual) */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-100 rounded-xl border border-slate-200 aspect-[4/3] flex items-center justify-center overflow-hidden">
                  {/* Pastikan file ini ada di public */}
                  <Image 
                    src="/placeholder-sertifikat.jpg" 
                    alt="Preview Sertifikat Akreditasi 2025" 
                    fill 
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <p className="text-center text-xs text-slate-400 mt-2 italic">
                  *Visualisasi dokumen sertifikat akreditasi terbaru.
                </p>
              </div>

              {/* Bagian Kanan: Detail SK */}
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Detail Surat Keputusan
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Nomor SK</div>
                      <div className="text-slate-900 font-mono text-sm bg-white border border-slate-200 px-3 py-2 rounded-md">
                        246/SK/LAM-INFOKOM/Ak/S/VIII/2025
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Lembaga Akreditasi</div>
                      <div className="text-slate-800 font-medium">
                        LAM-INFOKOM (Lembaga Akreditasi Mandiri Informatika dan Komputer)
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Tanggal Mulai</div>
                          <div className="text-slate-800 font-medium">18 Agt 2025</div>
                       </div>
                       <div>
                          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Tanggal Berakhir</div>
                          <div className="text-slate-800 font-medium">18 Agt 2030</div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Tombol Download */}
                <a 
                  href="/S1 Ilmu Komputer 2025-2030.pdf" // Pastikan file ini ada di public
                  download 
                  target="_blank"
                  className="group w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-1"
                >
                  <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  <span>Download Sertifikat (PDF)</span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* TABEL RIWAYAT (Data Updated) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="text-2xl">📚</span> Riwayat Akreditasi Terdahulu
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-bold">Periode</th>
                  <th className="px-6 py-4 font-bold">Peringkat</th>
                  <th className="px-6 py-4 font-bold">Lembaga</th>
                  <th className="px-6 py-4 font-bold">Nomor SK</th>
                  <th className="px-6 py-4 text-right font-bold">Arsip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                
                {/* Data 2025 - 2030 */}
                <tr className="bg-emerald-50/30 hover:bg-emerald-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">2025 - 2030</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 uppercase">
                      BAIK SEKALI
                    </span>
                  </td>
                  <td className="px-6 py-4">LAM-INFOKOM</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">246/SK/LAM-INFOKOM/Ak/S/VIII/2025</td>
                  <td className="px-6 py-4 text-right">
                    <a href="/S1 Ilmu Komputer 2025-2030.pdf" download className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline">Download</a>
                  </td>
                </tr>

                {/* Data 2021 - 2026 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">2021 - 2026</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 uppercase">
                      BAIK
                    </span>
                  </td>
                  <td className="px-6 py-4">BAN-PT</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">10807/SK/BAN-PT/Akred/S/IX/2021</td>
                  <td className="px-6 py-4 text-right">
                    <a href="/S1 Ilmu Komputer 2021-2026.pdf" download className="text-slate-500 hover:text-slate-800 font-medium hover:underline">Download</a>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
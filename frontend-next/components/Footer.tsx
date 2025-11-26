import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Bagian Atas Footer (Informasi Utama) */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kolom 1: Identitas */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* Logo Unimed Kecil (Placeholder) */}
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                U
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-none">Ilmu Komputer</h3>
                <p className="text-emerald-500 text-sm font-medium">Universitas Negeri Medan</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Mencetak talenta digital unggul yang siap bersaing di era industri 4.0 dengan fokus pada Kecerdasan Buatan dan Data Science.
            </p>
          </div>

          {/* Kolom 2: Link Cepat */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Akses Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-emerald-400 transition-colors">Portal Berita</Link>
              </li>
              <li>
                <Link href="/dosen" className="hover:text-emerald-400 transition-colors">Daftar Dosen</Link>
              </li>
              <li>
                <Link href="https://www.unimed.ac.id" target="_blank" className="hover:text-emerald-400 transition-colors">Website Utama UNIMED</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1">📍</span>
                <span>Jl. Willem Iskandar Pasar V, Medan Estate, Sumatera Utara, Indonesia.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">📧</span>
                <span>ilkom@unimed.ac.id</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">📞</span>
                <span>(061) 6613365</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bagian Bawah: Copyright (Rata Tengah) */}
      <div className="border-t border-slate-800 py-6 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} <span className="text-emerald-500 font-medium">Prodi Ilmu Komputer UNIMED</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
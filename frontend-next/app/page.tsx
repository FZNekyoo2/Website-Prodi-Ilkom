"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Komponen Counter (Angka Jalan)
function Counter({ end, label, icon }: { end: number; label: string; icon: any }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform duration-300 hover:shadow-lg hover:border-emerald-200">
      <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4 text-3xl">
        {icon}
      </div>
      <div className="text-4xl font-bold text-slate-800 mb-2">{count}+</div>
      <div className="text-slate-500 font-medium">{label}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    // ANIMASI 1: Fade In seluruh halaman
    <main className="min-h-screen bg-white animate-fade-in">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[550px] flex items-center justify-center overflow-hidden">
        {/* Background Image dengan Animasi Zoom */}
        <div className="absolute inset-0 bg-slate-900">
           <div className="absolute inset-0 animate-scale-in origin-center">
             <Image 
               src="/gedung.jpg" // Pastikan gambar ini ada di folder public
               alt="Gedung Ilkom"
               fill
               priority
               className="object-cover opacity-50"
             />
           </div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Badge Prodi - Muncul Duluan */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-semibold mb-4 backdrop-blur-sm">
                Program Studi Ilmu Komputer
            </span>
          </div>

          {/* Judul Besar - Muncul Kedua */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            Membangun Masa Depan Digital dengan <span className="text-emerald-400 drop-shadow-lg">Kecerdasan Buatan</span>
          </h1>

          {/* Deskripsi - Muncul Ketiga */}
          <p className="text-slate-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            Bergabunglah menjadi talenta digital unggul di bidang Artificial Intelligence dan Data Science bersama UNIMED.
          </p>

          {/* Tombol - Muncul Terakhir */}
          <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <Link href="/berita" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1">
              Jelajahi Berita
            </Link>
            <Link href="/dosen" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-full font-semibold backdrop-blur-sm transition-all hover:-translate-y-1">
              Lihat Dosen
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TENTANG PRODI & STATISTIK */}
      <section className="py-20 px-4 bg-slate-50 relative z-20">
        <div className="max-w-6xl mx-auto animate-slide-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">Tentang Ilmu Komputer UNIMED</h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Program Studi Ilmu Komputer FMIPA UNIMED berfokus pada pengembangan teknologi cerdas dan komputasi sains. 
              Kami berkomitmen mencetak lulusan yang siap bersaing di era Industri 4.0 dan Society 5.0.
            </p>
          </div>

          {/* Statistik Counters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter end={45} label="Dosen Ahli" icon="👨‍🏫" />
            <Counter end={1250} label="Mahasiswa Aktif" icon="🎓" />
            <Counter end={89} label="Prestasi Nasional" icon="🏆" />
            <Counter end={15} label="Mitra Industri" icon="🤝" />
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Bagian Visi (Kiri) */}
          <div className="lg:w-1/3 sticky top-24 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-yellow-50 border-l-8 border-yellow-400 p-8 rounded-r-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-4xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-yellow-500">VISI</span>
              </h3>
              <p className="text-slate-700 text-lg font-medium leading-relaxed italic">
                "Menjadi program studi yang unggul pada bidang artificial intelegensi dan sains komputasi secara Nasional dan mendapat pengakuan Internasional."
              </p>
            </div>
            
             <div className="mt-8 relative h-64 w-full rounded-2xl overflow-hidden shadow-lg hidden lg:block hover:scale-105 transition-transform duration-500">
                <Image 
                  src="/visimisi.jpg" // Pastikan gambar ini ada
                  alt="Visi Misi Ilustrasi"
                  fill
                  className="object-cover"
                />
             </div>
          </div>

          {/* Bagian Misi (Kanan) */}
          <div className="lg:w-2/3">
            <h3 className="text-3xl font-bold text-emerald-800 mb-8 flex items-center gap-3">
              <span className="bg-emerald-600 text-white px-4 py-1 rounded-lg text-xl shadow-lg">MISI</span>
              <span>Program Studi</span>
            </h3>

            <div className="space-y-6">
              {[
                  { color: "bg-orange-100 text-orange-600", text: "Menyelenggarakan pendidikan dan pembelajaran ilmu komputer berfokus pada bidang artificial intelegensi dan sains komputasi yang bermutu dan bernuansa link and match dengan kebutuhan stakeholder." },
                  { color: "bg-emerald-100 text-emerald-600", text: "Menyelenggarakan penelitian di bidang ilmu komputer berfokus pada bidang artificial intelegensi dan sains komputasi yang inovatif dan aplikatif serta mengembangkan rekayasa industri dan teknologi yang kreatif." },
                  { color: "bg-red-100 text-red-600", text: "Menyelenggarakan pengabdian kepada masyarakat melalui pemetaan kebutuhan dan permasalahan teknologi komputer di masyarakat." },
                  { color: "bg-pink-100 text-pink-600", text: "Mengembangkan budaya ilmiah dan budaya etnik, kewirausahaan, membina suasana akademik yang sehat." },
                  { color: "bg-blue-100 text-blue-600", text: "Menjalin kerjasama secara berkelanjutan dengan berbagai instansi di tingkat lokal, nasional, regional, dan internasional." }
              ].map((misi, idx) => (
                <div 
                    key={idx} 
                    className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-md transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${0.2 + (idx * 0.1)}s`, animationFillMode: 'both' }}
                >
                    <div className={`flex-shrink-0 w-12 h-12 ${misi.color} rounded-full flex items-center justify-center font-bold text-xl`}>
                        {String(idx + 1).padStart(2, '0')}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{misi.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FASILITAS UNGGULAN */}
      <section className="py-20 px-4 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold mb-4">Fasilitas Penunjang</h2>
            <p className="text-emerald-200">Mendukung proses pembelajaran dengan teknologi terkini.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { icon: "🖥️", title: "Lab Artificial Intelligence", desc: "Komputer spesifikasi tinggi dengan GPU untuk training model Deep Learning dan Machine Learning." },
                { icon: "📡", title: "Lab Jaringan & IoT", desc: "Perangkat Cisco lengkap dan modul IoT untuk praktikum jaringan komputer modern." },
                { icon: "📚", title: "Digital Library", desc: "Akses ke ribuan jurnal internasional IEEE/ACM dan e-book untuk referensi skripsi." }
            ].map((item, idx) => (
                <div 
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all hover:-translate-y-2 animate-slide-up"
                    style={{ animationDelay: `${0.5 + (idx * 0.2)}s`, animationFillMode: 'both' }}
                >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-emerald-100 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 px-4 bg-slate-50 text-center">
        <div className="max-w-3xl mx-auto animate-scale-in">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Siap menjadi bagian dari kami?</h2>
            <p className="text-slate-600 mb-8">Dapatkan informasi pendaftaran mahasiswa baru terbaru.</p>
            <Link href="https://www.unimed.ac.id/penerimaan-mahasiswa-baru/" target="_blank" className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 shadow-lg hover:shadow-emerald-200 transition-all hover:scale-105">
            Daftar Sekarang
            </Link>
        </div>
      </section>
      
    </main>
  );
}
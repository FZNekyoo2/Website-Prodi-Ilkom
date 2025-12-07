"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Komponen Counter (Angka Jalan) - FULL COMPONENT
function Counter({ end, label, icon }: { end: number; label: string; icon: string }) {
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

// Komponen Ranking Baru dengan Data yang Benar
function UniversityRanking() {
  // Data ranking yang benar dari EduRank (Update: March 02, 2025)
  const rankingData = {
    worldRank: 2326,
    asiaRank: 722,
    indonesiaRank: 43,
    medanRank: 2,
    mathTeachersRank: 49,
    educationRank: 281,
    philosophyRank: 488,
    alumniImpactRank: 6521,
    nonAcademicRank: 3131,
    totalPublications: 18928,
    citations: 50322,
    lastUpdated: 'March 02, 2025',
    topPercentages: "TOP 50%"
  };

  const [isExpanded, setIsExpanded] = useState(false);

  // Top 5 kategori terbaik
  const topCategories = [
    { name: "Math Teachers", rank: rankingData.mathTeachersRank, total: 4268, category: "#49 dari 4.268" },
    { name: "Education Majors", rank: rankingData.educationRank, total: 4586, category: "#281 dari 4.586" },
    { name: "Philosophy", rank: rankingData.philosophyRank, total: 6689, category: "#488 dari 6.689" },
  ];

  // Additional categories yang bisa di-expand
  const additionalCategories = [
    { name: "Alumni Impact", rank: rankingData.alumniImpactRank, total: 7928, category: "#6.521 dari 7.928" },
    { name: "Non-academic Prominence", rank: rankingData.nonAcademicRank, total: 14131, category: "#3.131 dari 14.131" },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-emerald-900 rounded-2xl p-6 md:p-8 shadow-2xl border border-emerald-500/20 relative overflow-hidden my-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Peringkat Global 2025</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              <span className="text-emerald-300">UNIMED</span> dalam Peringkat Dunia
            </h2>
            <p className="text-slate-300">
              Berdasarkan data terbaru dari EduRank.org ({rankingData.lastUpdated})
            </p>
          </div>
          
          {/* Source Badge */}
          <a 
            href="https://edurank.org/uni/state-university-of-medan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg transition-colors mt-4 md:mt-0 border border-white/20 hover:border-white/30"
          >
            <span>Data dari</span>
            <span className="font-bold text-emerald-300">EduRank 2025</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Main Ranking Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* World Ranking Card */}
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/30 backdrop-blur-sm rounded-xl p-5 border border-blue-500/20 group hover:border-blue-500/40 transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm text-blue-200 font-medium">Dunia</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">#{rankingData.worldRank.toLocaleString()}</span>
              <span className="text-sm text-blue-300">dari 14.131</span>
            </div>
            <div className="text-xs text-blue-300/80 mt-2">Top {((rankingData.worldRank / 14131) * 100).toFixed(1)}% Global</div>
          </div>

          {/* Asia Ranking Card */}
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/30 backdrop-blur-sm rounded-xl p-5 border border-purple-500/20 group hover:border-purple-500/40 transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <span className="text-sm text-purple-200 font-medium">Asia</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">#{rankingData.asiaRank}</span>
              <span className="text-sm text-purple-300">dari 5.830</span>
            </div>
            <div className="text-xs text-purple-300/80 mt-2">Top {((rankingData.asiaRank / 5830) * 100).toFixed(1)}% Asia</div>
          </div>

          {/* Indonesia Ranking Card */}
          <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/30 backdrop-blur-sm rounded-xl p-5 border border-emerald-500/20 group hover:border-emerald-500/40 transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-sm text-emerald-200 font-medium">Indonesia</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">#{rankingData.indonesiaRank}</span>
              <span className="text-sm text-emerald-300">dari 562</span>
            </div>
            <div className="text-xs text-emerald-300/80 mt-2">Top {((rankingData.indonesiaRank / 562) * 100).toFixed(1)}% Nasional</div>
          </div>

          {/* Medan Ranking Card */}
          <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/30 backdrop-blur-sm rounded-xl p-5 border border-amber-500/20 group hover:border-amber-500/40 transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-sm text-amber-200 font-medium">Medan</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">#{rankingData.medanRank}</span>
              <span className="text-sm text-amber-300">dari 24</span>
            </div>
            <div className="text-xs text-amber-300/80 mt-2">Peringkat ke-2 di Medan</div>
          </div>
        </div>

        {/* Research & Publications */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Publikasi & Penelitian</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{rankingData.totalPublications.toLocaleString()}</div>
              <div className="text-sm text-slate-300">Publikasi Akademik</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{rankingData.citations.toLocaleString()}</div>
              <div className="text-sm text-slate-300">Kutipan Penelitian</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-300 mb-1">{rankingData.topPercentages}</div>
              <div className="text-sm text-slate-300">di 73 Topik Riset</div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Kategori Unggulan</h3>
          
          {/* Top 3 Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {topCategories.map((category, index) => (
              <div key={index} className="bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/5 transition-colors">
                <div className="text-sm text-slate-300 mb-1">{category.name}</div>
                <div className="text-2xl font-bold text-white mb-1">{category.category}</div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                    style={{ width: `${((category.total - category.rank + 1) / category.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Expandable Additional Categories */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 w-full text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            <span>{isExpanded ? 'Tutup' : 'Lihat lebih banyak kategori'}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-3">
              {additionalCategories.map((category, index) => (
                <div key={index} className="flex justify-between items-center bg-white/5 hover:bg-white/10 rounded-lg p-3 border border-white/5 transition-colors">
                  <div className="text-sm text-slate-300">{category.name}</div>
                  <div className="text-sm font-semibold text-emerald-300">{category.category}</div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-slate-400 text-sm text-center">
              Berdasarkan 3 faktor: Output penelitian, reputasi non-akademik, dan dampak alumni terkemuka
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen Utama HomePage Tetap Sama
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
               src="/gedung.jpg"
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

      {/* 3. RANKING UNIVERSITAS */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <UniversityRanking />
        </div>
      </section>

      {/* 4. VISI & MISI */}
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
                  src="/visimisi.jpg"
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

      {/* 5. FASILITAS UNGGULAN */}
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

      {/* 6. CALL TO ACTION */}
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

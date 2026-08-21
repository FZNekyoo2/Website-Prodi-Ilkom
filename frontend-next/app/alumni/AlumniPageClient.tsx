// app/alumni/AlumniPageClient.tsx - CLIENT COMPONENT
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Alumni } from '@/lib/api';

// Komponen SVG Icons
const GraduationCap = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const ClearIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface AlumniPageClientProps {
  initialAlumni: Alumni[];
}

export default function AlumniPageClient({ initialAlumni }: AlumniPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Safe handling untuk data alumni
  const alumniData = useMemo(() => {
    return Array.isArray(initialAlumni) ? initialAlumni : [];
  }, [initialAlumni]);

  // Extract tahun lulus unik untuk dropdown
  const tahunOptions = useMemo(() => {
    if (!Array.isArray(alumniData) || alumniData.length === 0) {
      return [{ value: 'all', label: 'Semua Tahun' }];
    }

    // Filter out undefined/null years dan ambil unique values
    const years = alumniData
      .map(a => a.tahun_lulus)
      .filter((year): year is number => 
        typeof year === 'number' && !isNaN(year)
      )
      .filter((year, index, self) => self.indexOf(year) === index)
      .sort((a, b) => b - a); // Sort descending
    
    return [
      { value: 'all', label: 'Semua Tahun' },
      ...years.map(year => ({ 
        value: year.toString(), 
        label: `Lulus ${year}` 
      }))
    ];
  }, [alumniData]);

  // Filter alumni berdasarkan search dan tahun
  const filteredAlumni = useMemo(() => {
    if (!Array.isArray(alumniData) || alumniData.length === 0) {
      return [];
    }

    return alumniData.filter(alumni => {
      // Pastikan alumni dan propertinya ada
      if (!alumni) return false;

      const matchesSearch = searchTerm === '' || 
        (alumni.nama && alumni.nama.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (alumni.jabatan && alumni.jabatan.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (alumni.perusahaan && alumni.perusahaan.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (alumni.ringkasan && alumni.ringkasan.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesYear = selectedYear === 'all' || 
        (alumni.tahun_lulus && alumni.tahun_lulus.toString() === selectedYear);
      
      return matchesSearch && matchesYear;
    });
  }, [alumniData, searchTerm, selectedYear]);

  // Hitung statistik dengan safe handling
  const stats = useMemo(() => {
    if (!Array.isArray(alumniData) || alumniData.length === 0) {
      return {
        total: 0,
        tahunTerlama: new Date().getFullYear(),
        tahunTerbaru: new Date().getFullYear(),
        perusahaan: 0,
        pencapaian: 0
      };
    }

    // Filter tahun yang valid
    const validYears = alumniData
      .map(a => a.tahun_lulus)
      .filter((year): year is number => 
        typeof year === 'number' && !isNaN(year)
      );

    const tahunTerlama = validYears.length > 0 
      ? Math.min(...validYears)
      : new Date().getFullYear();
    
    const tahunTerbaru = validYears.length > 0 
      ? Math.max(...validYears)
      : new Date().getFullYear();
    
    // Filter perusahaan yang valid
    const perusahaanUnik = Array.from(
      new Set(
        alumniData
          .map(a => a.perusahaan)
          .filter((p): p is string => typeof p === 'string' && p.trim() !== '')
      )
    );
    
    return {
      total: alumniData.length,
      tahunTerlama,
      tahunTerbaru,
      perusahaan: perusahaanUnik.length,
      pencapaian: alumniData.length * 2
    };
  }, [alumniData]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedYear('all');
  };

  // Jika data masih loading atau null
  if (initialAlumni === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data alumni...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative animate-fade-in">
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/gedung.jpg"
          alt="Background Fakultas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-12 animate-slide-up">
          {/* Badge/Kategori */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-lg border border-emerald-500/30">
            <GraduationCap />
            <span>Komunitas Alumni</span>
          </div>

          {/* Judul Utama */}
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-xl mb-4 tracking-tight">
            Jejak <span className="text-emerald-300">Prestasi</span> Alumni
          </h1>

          {/* Subjudul */}
          <p className="text-lg md:text-xl text-emerald-50/90 max-w-4xl mx-auto mb-10 leading-relaxed drop-shadow">
            Telusuri perjalanan karier inspiratif dan pencapaian gemilang 
            <span className="font-semibold text-emerald-200"> lulusan Program Studi Ilmu Komputer</span> 
            Universitas Negeri Medan di dunia profesional.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {/* Card 1: Total Alumni */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                  <p className="text-sm text-emerald-100/80">Total Alumni</p>
                </div>
              </div>
            </div>

            {/* Card 2: Tahun Aktif */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">
                    {stats.tahunTerlama !== stats.tahunTerbaru 
                      ? `${stats.tahunTerlama}-${stats.tahunTerbaru}` 
                      : stats.tahunTerlama}
                  </p>
                  <p className="text-sm text-emerald-100/80">Tahun Lulus</p>
                </div>
              </div>
            </div>

            {/* Card 3: Perusahaan */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">{stats.perusahaan}</p>
                  <p className="text-sm text-emerald-100/80">Perusahaan</p>
                </div>
              </div>
            </div>

            {/* Card 4: Prestasi */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">{stats.pencapaian}+</p>
                  <p className="text-sm text-emerald-100/80">Pencapaian</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FILTER BAR - Hanya tampilkan jika ada data */}
        {alumniData.length > 0 && (
          <div className="mb-10 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari alumni berdasarkan nama, jabatan, perusahaan..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <ClearIcon />
                    </button>
                  )}
                </div>

                {/* Tahun Dropdown */}
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FilterIcon />
                  </div>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {tahunOptions.map(option => (
                      <option 
                        key={option.value} 
                        value={option.value}
                        className="bg-slate-800 text-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Clear Button */}
                {(searchTerm || selectedYear !== 'all') && (
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors border border-white/30 hover:border-white/50 flex items-center gap-2"
                  >
                    <ClearIcon />
                    Reset Filter
                  </button>
                )}
              </div>

              {/* Result Info */}
              <div className="mt-4 flex flex-wrap items-center justify-between text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs font-medium">
                    {filteredAlumni.length} Alumni ditemukan
                  </span>
                  {(searchTerm || selectedYear !== 'all') && (
                    <span className="text-gray-400">
                      {searchTerm && `Pencarian: "${searchTerm}"`}
                      {searchTerm && selectedYear !== 'all' && ' • '}
                      {selectedYear !== 'all' && 
                        `Tahun: ${tahunOptions.find(t => t.value === selectedYear)?.label}`}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  {alumniData.length} data alumni tersedia
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ALUMNI GRID */}
        {alumniData.length === 0 ? (
          <div className="text-center py-20 bg-white/10 backdrop-blur rounded-xl border border-white/20">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg text-white font-medium mb-2">
              Data alumni belum tersedia
            </p>
            <p className="text-gray-300">
              Tidak ada data alumni yang dapat ditampilkan saat ini.
            </p>
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div className="text-center py-20 bg-white/10 backdrop-blur rounded-xl border border-white/20">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg text-white font-medium mb-2">
              Tidak ditemukan alumni
            </p>
            <p className="text-gray-300">
              Coba ubah filter atau kata kunci pencarian
            </p>
            {(searchTerm || selectedYear !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
              >
                Reset Filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAlumni.map((a, index) => {
              // Safe handling untuk URL gambar
              const fotoAlumni = a.fotoUrl
                ? a.fotoUrl.startsWith("http")
                  ? a.fotoUrl
                  : `${process.env.NEXT_PUBLIC_API_URL || ''}${a.fotoUrl}`
                : "/avatar-placeholder.png";

              const fotoPerusahaan = a.fotoPerusahaanUrl
                ? a.fotoPerusahaanUrl.startsWith("http")
                  ? a.fotoPerusahaanUrl
                  : `${process.env.NEXT_PUBLIC_API_URL || ''}${a.fotoPerusahaanUrl}`
                : "/company-placeholder.jpg";

              return (
                <article
                  key={a.id}
                  className="group relative rounded-2xl overflow-hidden bg-white/95 backdrop-blur border border-white/20 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-slide-up"
                  style={{
                    animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
                    animationFillMode: "both",
                  }}
                >
                  {/* FOTO PERUSAHAAN */}
                  <div className="relative h-40 w-full">
                    <Image
                      src={fotoPerusahaan}
                      alt={a.perusahaan || 'Perusahaan'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        // Fallback jika gambar error
                        const target = e.target as HTMLImageElement;
                        target.src = '/company-placeholder.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-900/40" />

                    {/* BADGE TAHUN */}
                    {a.tahun_lulus && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">
                        Lulus {a.tahun_lulus}
                      </div>
                    )}
                  </div>

                  {/* FOTO PROFIL */}
                  <div className="relative z-10 flex justify-center -mt-14">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                      <Image
                        src={fotoAlumni}
                        alt={a.nama || 'Alumni'}
                        width={112}
                        height={112}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        sizes="112px"
                        onError={(e) => {
                          // Fallback jika gambar error
                          const target = e.target as HTMLImageElement;
                          target.src = '/avatar-placeholder.png';
                        }}
                      />
                    </div>
                  </div>

                  {/* KONTEN */}
                  <div className="p-6 text-center">
                    <h2 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {a.nama || 'Nama Alumni'}
                    </h2>

                    <p className="text-sm text-slate-600 font-medium mt-1 line-clamp-1">
                      {a.jabatan || 'Jabatan'} 
                      {a.jabatan && a.perusahaan && <span className="text-slate-400"> • </span>}
                      {a.perusahaan || 'Perusahaan'}
                    </p>

                    {a.ringkasan && (
                      <p className="text-sm text-slate-500 mt-4 line-clamp-3">
                        {a.ringkasan}
                      </p>
                    )}

                    {a.slug && (
                      <div className="mt-6 pt-4 border-t border-slate-200/60 flex justify-center">
                        <Link
                          href={`/alumni/${a.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors group/link"
                        >
                          <span>Lihat Profil Lengkap</span>
                          <svg
                            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
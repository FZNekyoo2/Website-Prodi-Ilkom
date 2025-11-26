import Link from "next/link";
import Image from "next/image";
import { fetchBerita, Berita } from "@/lib/api";

export default async function BeritaPage() {
  const semuaBerita: Berita[] = await fetchBerita();

  return (
    // ANIMASI 1: Fade In seluruh halaman
    <div className="min-h-screen relative animate-fade-in">
      
      {/* BACKGROUND 1: Gambar Gedung (Fixed) */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/gedung.jpg" // Pastikan gambar ini ada di folder public
          alt="Background Gedung"
          fill
          className="object-cover"
        />
        {/* Overlay gelap biar teks tetap terbaca */}
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        
        {/* ANIMASI 2: Header muncul (Slide Up) */}
        <div className="mb-12 text-center animate-slide-up">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
            Portal Berita
          </h1>
          <p className="text-emerald-50 font-medium max-w-2xl mx-auto drop-shadow-md text-lg">
            Informasi kegiatan akademik, prestasi, dan kemahasiswaan terbaru.
          </p>
        </div>

        {semuaBerita.length === 0 ? (
           <div className="text-center py-20 bg-white/80 backdrop-blur rounded-xl border border-white/20 animate-scale-in">
             <p className="text-slate-600 font-medium">Belum ada berita yang diterbitkan.</p>
           </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {semuaBerita.map((b, index) => {
              const img = b.thumbnailUrl ?? "/placeholder-news.jpg";
              if (!b.slug || !b.judul) return null;

              return (
                <article
                  key={b.id}
                  // ANIMASI 3: Muncul satu per satu (Staggered) + Efek Kaca (Glassmorphism)
                  className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white animate-slide-up"
                  style={{ 
                    // Trik delay: Kartu pertama delay 0.1s, kedua 0.25s, dst.
                    animationDelay: `${index * 0.15}s`, 
                    animationFillMode: 'both' 
                  }}
                >
                  {/* Gambar Berita */}
                  <div className="relative w-full h-52 overflow-hidden">
                    <Image
                      src={
                        img.startsWith("http")
                          ? img
                          : `${process.env.NEXT_PUBLIC_API_URL}${img}`
                      }
                      alt={b.judul}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide border border-white/20">
                      {b.kategori || "Umum"}
                    </div>
                  </div>

                  {/* Isi Kartu */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                       <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">
                        📅 {b.tanggal
                          ? new Date(b.tanggal).toLocaleDateString("id-ID", {
                              day: 'numeric', month: 'long', year: 'numeric'
                            })
                          : "-"}
                      </span>
                    </div>

                    <h2 className="font-bold text-lg mb-3 line-clamp-2 text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {b.judul}
                    </h2>

                    <p className="text-sm text-slate-600 mb-5 line-clamp-3 leading-relaxed">
                      {b.deskripsi || "Tidak ada deskripsi singkat."}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-200/60">
                      <Link
                        href={`/berita/${b.slug}`}
                        className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
                      >
                        Baca Selengkapnya
                        <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </Link>
                    </div>
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
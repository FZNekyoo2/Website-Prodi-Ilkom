import { fetchBeritaBySlug, Berita } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Tipe Props untuk Next.js 15/16 (Promise)
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;

  // Logika Penyelamat Array/Object
  const rawData: any = await fetchBeritaBySlug(slug);
  const berita: Berita = Array.isArray(rawData) ? rawData[0] : rawData;

  if (!berita) return notFound();

  const img = berita.thumbnailUrl ?? "/placeholder-news.jpg";

  return (
    // ANIMASI 1: Fade In seluruh halaman
    <div className="min-h-screen bg-slate-50 pb-20 animate-fade-in">
      
      {/* HERO SECTION */}
      {/* ANIMASI 2: Scale In Gambar (Zoom effect) */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 animate-scale-in origin-center">
            <Image
            src={img.startsWith("http") ? img : `${process.env.NEXT_PUBLIC_API_URL}${img}`}
            alt={berita.judul || "Detail Berita"}
            fill
            priority
            className="object-cover"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 max-w-5xl mx-auto z-20">
          <Link href="/berita" className="inline-flex items-center text-emerald-300 hover:text-white mb-6 font-medium transition-colors hover:-translate-x-1 duration-300">
             &larr; Kembali ke Berita
          </Link>
          
          {/* ANIMASI 3: Slide Up Judul (Delay 0.2s) */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <span className="block mb-4">
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-lg">
                  {berita.kategori || "Berita"}
              </span>
            </span>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              {berita.judul}
            </h1>

            <div className="flex items-center gap-6 text-slate-300 text-sm">
              <span className="flex items-center gap-2">
                📅 {berita.tanggal ? new Date(berita.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KONTEN */}
      {/* ANIMASI 4: Slide Up Isi Berita (Delay 0.5s - Muncul belakangan) */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-30 animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-100">
           
           <article className="prose prose-emerald prose-lg max-w-none text-slate-700 leading-relaxed">
             <div className="whitespace-pre-line">
               {berita.deskripsi}
             </div>
           </article>

           <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-slate-500 text-sm italic">
                Artikel ini diterbitkan oleh Program Studi Ilmu Komputer UNIMED.
              </p>
           </div>

        </div>
      </div>
    </div>
  );
}
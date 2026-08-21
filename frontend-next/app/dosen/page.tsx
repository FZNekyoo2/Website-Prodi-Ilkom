import Image from "next/image";
import { fetchDosen, Dosen } from "@/lib/api";

export default async function DosenPage() {
  const dosen: Dosen[] = await fetchDosen();

  return (
    // ANIMASI 1: Fade In seluruh halaman
    <div className="min-h-screen relative animate-fade-in">
      
      {/* Background Gambar Gedung */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/gedung.jpg" // Pastikan file gambar ini ada di folder public
          alt="Background Gedung"
          fill
          className="object-cover"
        />
        {/* Overlay gelap supaya teks tetap terbaca */}
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ANIMASI 2: Judul muncul duluan (Slide Up) */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-3">
            Daftar Dosen & Staf Pengajar
          </h1>
          <p className="text-emerald-50 max-w-2xl mx-auto drop-shadow-md font-medium">
            Berkenalan dengan para ahli dan akademisi di Program Studi Ilmu Komputer UNIMED.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {dosen.map((d, index) => {
            const img = d.fotoUrl ?? "/placeholder-dosen.jpg";

            return (
              <div
                key={d.id}
                // ANIMASI 3: Kartu muncul berurutan (Staggered) + Efek Glassmorphism
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-[1.02] transition-transform flex flex-col gap-4 animate-slide-up"
                style={{ 
                    // Trik delay: Kartu ke-1 delay 0.1s, Kartu ke-2 delay 0.2s, dst.
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both' // Biar tetep kelihatan setelah animasi selesai
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-emerald-100 bg-slate-50">
                    <Image
                      src={
                        img.startsWith("http")
                          ? img
                          : `${process.env.NEXT_PUBLIC_API_URL}${img}`
                      }
                      alt={d.nama}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800 text-lg leading-tight mb-1">
                      {d.nama}
                    </h2>
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-md">
                      {d.jabatan}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-slate-600 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Bidang Keahlian
                    </p>
                    <p className="text-slate-800 font-medium">
                      {d.keahlian || "-"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
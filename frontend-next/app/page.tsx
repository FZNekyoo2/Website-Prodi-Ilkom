import Link from "next/link";
import Image from "next/image";
import { fetchBerita } from "@/lib/api";

export default async function HomePage() {
  const semuaBerita = await fetchBerita();
  const latest = semuaBerita.slice(0, 1); // ambil berita terbaru

  return (
    <main>
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative text-white"
        style={{
          backgroundImage: "url('/gedung.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-6xl mx-auto px-4 py-24 grid gap-8 md:grid-cols-2 items-center">
          {/* KIRI - TEKS */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] mb-2">
              Program Studi Ilmu Komputer
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
              Selamat Datang di Prodi Ilmu Komputer UNIMED
            </h1>

            <p className="text-sm md:text-base mb-6">
              Portal informasi akademik, kegiatan, dan berita terkini.
            </p>

            <Link
              href="/berita"
              className="inline-flex px-4 py-2 rounded-lg bg-white text-emerald-700 text-sm font-semibold hover:bg-slate-100"
            >
              Lihat Semua Berita
            </Link>
          </div>

          {/* KANAN - BERITA TERBARU */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <h2 className="text-sm font-semibold mb-3">Berita Terbaru</h2>

            <div className="space-y-3">
              {latest.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="block bg-white/10 rounded p-3 hover:bg-white/20 transition"
                >
                  <div className="text-emerald-100 text-[10px] uppercase mb-1">
                    {item.kategori}
                  </div>
                  <div className="font-semibold text-white text-sm leading-tight">
                    {item.judul}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPACER ================= */}
      {/* SECTION PUTIH */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">
            Berita Utama
          </h2>

          <p className="text-slate-600 mb-10">
            Update terbaru mengenai kegiatan akademik dan non-akademik Prodi Ilmu Komputer UNIMED.
          </p>

          {/* Nanti isi card berita di sini */}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">
            Event Mendatang
          </h2>

          {/* Jadwal event */}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">
            Tentang Ilmu Komputer UNIMED
          </h2>

          {/* Profil prodi */}
        </div>
      </section>
    </main>
  );
}

// app/berita/page.tsx
import Link from "next/link";
import Image from "next/image";
import { fetchBerita, Berita } from "@/lib/api";

export default async function BeritaPage() {
  const semuaBerita: Berita[] = await fetchBerita();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-emerald-800 mb-2">
        Portal Berita
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        Informasi kegiatan akademik dan kemahasiswaan Prodi Ilmu Komputer.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {semuaBerita.map((b) => {
          const img = b.thumbnailUrl ?? "/placeholder-news.jpg";

          // Lewati berita yang nggak punya slug/judul
          if (!b.slug || !b.judul) return null;

          return (
            <article
              key={b.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-40">
                <Image
                  src={
                    img.startsWith("http")
                      ? img
                      : `${process.env.NEXT_PUBLIC_API_URL}${img}`
                  }
                  alt={b.judul}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="text-[11px] uppercase text-emerald-700 mb-1">
                  {b.kategori}
                </div>

                <h2 className="font-semibold text-sm mb-2 line-clamp-2 text-slate-900">
                  {b.judul}
                </h2>

                <p className="text-xs text-slate-600 mb-3 line-clamp-3">
                  {b.deskripsi?.slice(0, 120)}…
                </p>

                <div className="mt-auto flex justify-between items-center text-[11px] text-slate-500">
                  <span>
                    {b.tanggal
                      ? new Date(b.tanggal).toLocaleDateString("id-ID")
                      : ""}
                  </span>
                  <Link
                    href={`/berita/${b.slug}`}
                    className="text-emerald-700 font-semibold"
                  >
                    Baca
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

// app/berita/[slug]/page.tsx
import Image from "next/image";
import { fetchBeritaBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function BeritaDetailPage({ params }: Props) {
  // JANGAN KASIH TYPE MANUAL DI SINI
  const data = await fetchBeritaBySlug(params.slug);

  if (!data) return notFound();

  const img = data.thumbnailUrl ?? "/placeholder-news.jpg";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-xs text-emerald-700 uppercase mb-2">
        {data.kategori}
      </p>

      <h1 className="text-2xl font-semibold text-slate-900 mb-2">
        {data.judul}
      </h1>

      <p className="text-xs text-slate-500 mb-4">
        {new Date(data.tanggal).toLocaleDateString("id-ID")}
      </p>

      <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
        <Image
          src={
            img.startsWith("http")
              ? img
              : `${process.env.NEXT_PUBLIC_API_URL}${img}`
          }
          alt={data.judul}
          fill
          className="object-cover"
        />
      </div>

      <article className="prose prose-sm max-w-none">
        <p>{data.deskripsi}</p>
      </article>
    </div>
  );
}

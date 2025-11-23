// app/dosen/page.tsx
import Image from "next/image";
import { fetchDosen, Dosen } from "@/lib/api";

export default async function DosenPage() {
  const dosen: Dosen[] = await fetchDosen();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-emerald-800 mb-2">
        Daftar Dosen
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        Staf pengajar Program Studi Ilmu Komputer UNIMED.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {dosen.map((d) => {
          const img =
            d.fotoUrl ??
            "/placeholder-dosen.jpg"; // fallback kalau tidak ada foto

          return (
            <div
              key={d.id}
              className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4 items-center"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-100">
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

              <div className="flex-1">
                <h2 className="font-semibold text-sm text-slate-900">
                  {d.nama}
                </h2>

                <p className="text-xs text-slate-500">
                  {d.jabatan}
                </p>

                <p className="text-xs text-slate-600 mt-1">
                  Keahlian:{" "}
                  <span className="font-medium">
                    {d.keahlian}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ilmu Komputer UNIMED",
  description: "Website Program Studi Ilmu Komputer UNIMED",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-50">
        <header className="bg-emerald-700 text-white sticky top-0 z-20 shadow">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* ====== LOGO + NAMA PRODI ====== */}
            <Link href="/" className="flex items-center gap-2">
                <div className="w-20 h-20 relative">
                <Image
                  src="/logo.png" // <- file di /public
                  alt="Logo Prodi Ilmu Komputer UNIMED"
                  fill
                  className="object-contain p-1"
                />
                </div>
                <div className="font-semibold text-sm md:text-base">
                <div>Ilmu Komputer UNIMED</div>
                <div>FMIPA Universitas Negeri Medan</div>
                </div>
            </Link>

            <div className="flex gap-4 text-xs md:text-sm">
              <Link href="/berita">Berita</Link>
              <Link href="/dosen">Dosen</Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-emerald-800 text-slate-100 text-xs mt-8">
          <div className="max-w-6xl mx-auto px-4 py-4">
            © {new Date().getFullYear()} Prodi Ilmu Komputer UNIMED
          </div>
        </footer>
      </body>
    </html>
  );
}

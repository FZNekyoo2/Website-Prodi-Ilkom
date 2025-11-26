import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ilmu Komputer UNIMED",
  description: "Website Program Studi Ilmu Komputer Universitas Negeri Medan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50`}>
        
        {/* HEADER / NAVBAR */}
        <header className="bg-emerald-700 text-white sticky top-0 z-50 shadow-md">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            
            {/* Logo & Nama Prodi */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="w-12 h-12 relative bg-white rounded-full p-1 overflow-hidden">
                  <Image
                    src="/logo.png" 
                    alt="Logo Prodi"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-base tracking-wide">Ilmu Komputer</div>
                  <div className="text-xs text-emerald-100 font-medium">FMIPA Universitas Negeri Medan</div>
                </div>
            </Link>

            {/* Menu Navigasi (Dashboard Dihapus sesuai request) */}
            <div className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-emerald-200 transition-colors">Beranda</Link>
              <Link href="/berita" className="hover:text-emerald-200 transition-colors">Berita</Link>
              <Link href="/dosen" className="hover:text-emerald-200 transition-colors">Dosen</Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">
            {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}
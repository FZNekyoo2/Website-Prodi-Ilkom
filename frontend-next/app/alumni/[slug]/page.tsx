// app/alumni/[slug]/page.tsx - FINAL FIXED VERSION
import { fetchAlumniBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import React from 'react';

// ==================== TYPES ====================
interface StrapiTextChild {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  url?: string;
  children?: StrapiTextChild[];
}

interface StrapiBlock {
  type: string;
  children?: StrapiTextChild[];
  level?: number;
  format?: string;
  url?: string;
}

// ==================== ICONS ====================
const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

// ==================== RICH TEXT PARSER ====================
const StrapiRichTextRenderer = ({ content }: { content: any }) => {
  if (!content) return null;
  
  // Jika content adalah string HTML biasa
  if (typeof content === 'string') {
    return (
      <div 
        className="prose prose-lg max-w-none 
                   prose-headings:font-bold prose-headings:text-slate-800
                   prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-justify
                   prose-ul:text-slate-700 prose-ol:text-slate-700
                   prose-li:my-1 prose-li:leading-relaxed
                   prose-strong:text-slate-900 prose-em:text-slate-600
                   prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 
                   prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:py-2
                   prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:text-emerald-800 hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  }
  
  // Jika content adalah array JSON dari Strapi
  if (Array.isArray(content)) {
    const blocks = content as StrapiBlock[];
    
    // Helper untuk render children dengan tipe yang benar
    const renderChildren = (children: StrapiTextChild[] = []): React.ReactNode[] => {
      return children.map((child, childIndex) => {
        if (child.type === 'text' || !child.type) {
          let element: React.ReactNode = child.text || '';
          
          if (child.bold) element = <strong key={childIndex}>{element}</strong>;
          if (child.italic) element = <em key={childIndex}>{element}</em>;
          if (child.underline) element = <u key={childIndex}>{element}</u>;
          if (child.code) element = <code key={childIndex}>{element}</code>;
          
          if (!child.bold && !child.italic && !child.underline && !child.code) {
            return <span key={childIndex}>{element}</span>;
          }
          return element;
        }
        
        if (child.type === 'link') {
          return (
            <a 
              key={childIndex}
              href={child.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-800 hover:underline"
            >
              {renderChildren(child.children || [])}
            </a>
          );
        }
        
        return null;
      });
    };
    
    return (
      <div className="prose prose-lg max-w-none 
                     prose-headings:font-bold prose-headings:text-slate-800
                     prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-justify
                     prose-ul:text-slate-700 prose-ol:text-slate-700
                     prose-li:my-1 prose-li:leading-relaxed
                     prose-strong:text-slate-900 prose-em:text-slate-600
                     prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 
                     prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:py-2">
        {blocks.map((block, index) => {
          // Render berdasarkan tipe block
          switch (block.type) {
            case 'paragraph':
              return (
                <p key={index} className="text-justify mb-4">
                  {renderChildren(block.children || [])}
                </p>
              );
              
            case 'heading':
              const level = block.level || 1;
              const headingClass = `font-bold mt-6 mb-3 ${
                level === 1 ? 'text-3xl' :
                level === 2 ? 'text-2xl' :
                level === 3 ? 'text-xl' :
                level === 4 ? 'text-lg' :
                'text-base'
              }`;
              
              // Render heading berdasarkan level
              if (level === 1) {
                return (
                  <h1 key={index} className={headingClass}>
                    {renderChildren(block.children || [])}
                  </h1>
                );
              } else if (level === 2) {
                return (
                  <h2 key={index} className={headingClass}>
                    {renderChildren(block.children || [])}
                  </h2>
                );
              } else if (level === 3) {
                return (
                  <h3 key={index} className={headingClass}>
                    {renderChildren(block.children || [])}
                  </h3>
                );
              } else if (level === 4) {
                return (
                  <h4 key={index} className={headingClass}>
                    {renderChildren(block.children || [])}
                  </h4>
                );
              } else if (level === 5) {
                return (
                  <h5 key={index} className={headingClass}>
                    {renderChildren(block.children || [])}
                  </h5>
                );
              } else {
                return (
                  <h6 key={index} className={headingClass}>
                    {renderChildren(block.children || [])}
                  </h6>
                );
              }
              
            case 'list':
              if (block.format === 'unordered') {
                return (
                  <ul key={index} className="list-disc ml-5 my-4">
                    {block.children?.map((item, itemIndex) => (
                      <li key={itemIndex} className="mb-1">
                        {renderChildren(item.children || [])}
                      </li>
                    ))}
                  </ul>
                );
              } else {
                return (
                  <ol key={index} className="list-decimal ml-5 my-4">
                    {block.children?.map((item, itemIndex) => (
                      <li key={itemIndex} className="mb-1">
                        {renderChildren(item.children || [])}
                      </li>
                    ))}
                  </ol>
                );
              }
              
            case 'quote':
              return (
                <blockquote key={index} className="border-l-4 border-emerald-500 pl-4 italic my-4 py-2 text-slate-600">
                  {renderChildren(block.children || [])}
                </blockquote>
              );
              
            default:
              return (
                <p key={index} className="mb-4 text-justify">
                  {renderChildren(block.children || [])}
                </p>
              );
          }
        })}
      </div>
    );
  }
  
  // Fallback
  return <div className="text-slate-700 whitespace-pre-line">{String(content)}</div>;
};

const getTextSummary = (content: any, maxLength: number = 150): string => {
  if (!content) return '';
  
  let text = '';
  
  if (typeof content === 'string') {
    text = content;
  } else if (Array.isArray(content)) {
    const extractText = (data: any): string => {
      if (!data) return '';
      if (typeof data === 'string') return data;
      if (data.text) return data.text || '';
      if (Array.isArray(data)) {
        return data.map(item => extractText(item)).join(' ');
      }
      if (data.children) {
        return extractText(data.children);
      }
      return '';
    };
    text = extractText(content);
  } else {
    text = String(content);
  }
  
  text = text.replace(/<[^>]*>/g, '');
  
  if (text.length > maxLength) {
    return text.substring(0, maxLength).trim() + '...';
  }
  
  return text.trim();
};

// ==================== METADATA ====================
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { slug } = await Promise.resolve(params);
    if (!slug) {
      return {
        title: 'Alumni Tidak Ditemukan',
        description: 'Profil alumni tidak ditemukan'
      };
    }

    const alumni = await fetchAlumniBySlug(slug);
    
    if (!alumni) {
      return {
        title: 'Alumni Tidak Ditemukan',
        description: 'Profil alumni tidak ditemukan'
      };
    }
    
    return {
      title: `${alumni.nama} - Alumni Berprestasi Ilmu Komputer UNIMED`,
      description: alumni.ringkasan || `Profil ${alumni.nama}, ${alumni.jabatan} di ${alumni.perusahaan}`,
      openGraph: {
        title: `${alumni.nama} - Alumni Ilmu Komputer UNIMED`,
        description: alumni.ringkasan || '',
        images: alumni.fotoUrl ? [alumni.fotoUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Alumni',
      description: 'Profil alumni'
    };
  }
}

// ==================== MAIN COMPONENT ====================
export default async function AlumniDetailPage({ params }: { params: { slug: string } }) {
  try {
    const { slug } = await Promise.resolve(params);
    
    if (!slug) {
      notFound();
    }
    
    const alumni = await fetchAlumniBySlug(slug);
    
    if (!alumni) {
      notFound();
    }

    const getImageUrl = (url: string | null, defaultImage: string) => {
      if (!url) return defaultImage;
      return url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_API_URL || ''}${url}`;
    };

    const fotoAlumni = getImageUrl(alumni.fotoUrl, "/avatar-placeholder.png");
    const fotoPerusahaan = getImageUrl(alumni.fotoPerusahaanUrl, "/company-placeholder.jpg");

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-emerald-900 to-slate-900 text-white">
          <div className="absolute inset-0">
            <Image
              src="/gedung.jpg"
              alt="Background"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-8">
            {/* Back Button */}
            <div className="mb-6">
              <Link 
                href="/alumni" 
                className="inline-flex items-center gap-2 text-emerald-100 hover:text-white transition-colors group"
              >
                <ArrowLeftIcon />
                <span className="group-hover:underline">Kembali ke Daftar Alumni</span>
              </Link>
            </div>

            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Photo */}
              <div className="relative">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white">
                  <Image
                    src={fotoAlumni}
                    alt={alumni.nama}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                
                {/* Year Badge */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-bold px-5 py-2 rounded-full shadow-xl border-2 border-white whitespace-nowrap z-10">
                  Lulus {alumni.tahun_lulus}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <GraduationCapIcon />
                    <span className="text-sm font-medium">Alumni Berprestasi</span>
                  </div>
                  
                  {alumni.bidang && (
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-sm font-medium">{alumni.bidang}</span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{alumni.nama}</h1>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-emerald-100 mb-4">
                  <div className="flex items-center gap-1">
                    <BriefcaseIcon />
                    <span>{alumni.jabatan}</span>
                  </div>
                  <div className="hidden md:block">•</div>
                  <div className="flex items-center gap-1">
                    <BuildingIcon />
                    <span>{alumni.perusahaan}</span>
                  </div>
                </div>
                
                <p className="text-lg text-emerald-50/90 max-w-3xl">
                  {alumni.ringkasan}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Company Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <BuildingIcon />
                  <h2 className="text-xl font-bold text-slate-800">Tentang Perusahaan</h2>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-48 h-32 relative rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={fotoPerusahaan}
                      alt={alumni.perusahaan}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{alumni.perusahaan}</h3>
                    <p className="text-slate-600">
                      {/* @ts-ignore */}
                      {alumni.deskripsi_perusahaan || 
                       'Alumni ini saat ini berkarier di perusahaan tersebut dan memberikan kontribusi yang signifikan dalam bidangnya.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Profile */}
              {alumni.deskripsi_lengkap && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800 mb-6">Profil & Perjalanan Karier</h2>
                  <div className="text-slate-700">
                    <StrapiRichTextRenderer content={alumni.deskripsi_lengkap} />
                  </div>
                </div>
              )}

              {/* Achievements */}
              {alumni.pencapaian && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <TrophyIcon />
                    <h2 className="text-xl font-bold text-slate-800">Pencapaian & Prestasi</h2>
                  </div>
                  <div className="text-slate-700 whitespace-pre-line">
                    {alumni.pencapaian}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {alumni.testimoni && (
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-6">
                    <QuoteIcon />
                    <h2 className="text-xl font-bold text-slate-800">Testimoni untuk Prodi</h2>
                  </div>
                  <div className="text-slate-700 italic text-lg leading-relaxed">
                    <StrapiRichTextRenderer content={alumni.testimoni} />
                  </div>
                  <div className="mt-4 text-slate-600 font-medium">
                    — {alumni.nama}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Informasi Kontak</h3>
                <div className="space-y-4">
                  {alumni.email && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <EmailIcon />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Email</p>
                        <a 
                          href={`mailto:${alumni.email}`}
                          className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline break-all"
                        >
                          {alumni.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {alumni.linkedin && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <LinkedinIcon />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">LinkedIn</p>
                        <a 
                          href={alumni.linkedin.startsWith('http') ? alumni.linkedin : `https://${alumni.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-800 font-medium hover:underline break-all"
                        >
                          {alumni.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, 'in/')}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {alumni.website && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <GlobeIcon />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Website</p>
                        <a 
                          href={alumni.website.startsWith('http') ? alumni.website : `https://${alumni.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-700 hover:text-purple-800 font-medium hover:underline break-all"
                        >
                          {alumni.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Education & Career Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Latar Belakang</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <CalendarIcon />
                        <span>Tahun Masuk</span>
                      </div>
                      <p className="text-emerald-700 font-bold">
                        {alumni.tahun_masuk || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <CalendarIcon />
                        <span>Tahun Lulus</span>
                      </div>
                      <p className="text-emerald-700 font-bold">
                        {alumni.tahun_lulus}
                      </p>
                    </div>
                  </div>
                  
                  {alumni.bidang_keahlian && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span>Bidang Keahlian</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {alumni.bidang_keahlian.split(',').map((skill: string, index: number) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                      <GraduationCapIcon />
                      <span>Program Studi</span>
                    </div>
                    <p className="text-slate-800 font-medium">Ilmu Komputer</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                      <BuildingIcon />
                      <span>Universitas</span>
                    </div>
                    <p className="text-slate-800 font-medium">Universitas Negeri Medan</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Profil Singkat</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <span>Lulusan Ilmu Komputer UNIMED</span>
                  </li>
                  {alumni.bidang && (
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                      <span>Bidang: {alumni.bidang}</span>
                    </li>
                  )}
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <span>Berkarier di {alumni.perusahaan}</span>
                  </li>
                  {alumni.tahun_masuk && (
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                      <span>Masa studi: {alumni.tahun_lulus - alumni.tahun_masuk} tahun</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-3">Tertarik Menjadi Alumni Berprestasi?</h3>
                <p className="text-slate-300 mb-4 text-sm">
                  Bagikan kisah sukses Anda dan inspirasi generasi berikutnya.
                </p>
                <Link
                  href="/kontak"
                  className="inline-block w-full text-center bg-white text-emerald-700 font-bold py-3 px-4 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Link 
                href="/alumni" 
                className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-6 py-3 rounded-lg transition-colors"
              >
                <ArrowLeftIcon />
                Kembali ke Daftar Alumni
              </Link>
              
              <div className="flex gap-4">
                {alumni.linkedin && (
                  <a 
                    href={alumni.linkedin.startsWith('http') ? alumni.linkedin : `https://${alumni.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    <LinkedinIcon />
                    LinkedIn Profile
                  </a>
                )}
                <Link 
                  href={`/alumni?search=${encodeURIComponent(alumni.nama.split(' ')[0])}`}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Cari Alumni Lainnya
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 py-8 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Program Studi Ilmu Komputer UNIMED. Semua hak dilindungi.</p>
          </div>
        </div>
      </div>
    );
    
  } catch (error) {
    console.error('Error loading alumni detail:', error);
    notFound();
  }
}
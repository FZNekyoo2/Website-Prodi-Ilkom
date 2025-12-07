// app/alumni/page.tsx - SERVER COMPONENT
import { fetchAlumni } from '@/lib/api';
import AlumniPageClient from './AlumniPageClient';
import { Suspense } from 'react';

// Loading Skeleton Component
function LoadingSkeleton() {
  return (
    <div className="min-h-screen relative">
      {/* Background Skeleton */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-slate-800 to-slate-900" />
      
      <div className="max-w-7xl mx-auto px-4 py-14 relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="h-8 w-32 bg-slate-700/50 rounded-full animate-pulse" />
          </div>
          <div className="h-12 w-3/4 max-w-2xl bg-slate-700/50 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-full max-w-3xl bg-slate-700/50 rounded-lg mx-auto mb-10 animate-pulse" />
          
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-5 border border-slate-600/20">
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-slate-600/30 rounded-lg">
                    <div className="w-6 h-6 bg-slate-500/50 rounded" />
                  </div>
                  <div className="text-left">
                    <div className="h-7 w-12 bg-slate-500/50 rounded mb-1 animate-pulse" />
                    <div className="h-4 w-16 bg-slate-500/30 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="mb-10">
          <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="h-12 bg-slate-600/30 rounded-lg animate-pulse" />
              </div>
              <div className="w-full md:w-64">
                <div className="h-12 bg-slate-600/30 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-slate-700/20 backdrop-blur rounded-2xl overflow-hidden border border-slate-600/20 animate-pulse">
              <div className="h-40 w-full bg-slate-600/30" />
              <div className="relative flex justify-center -mt-14">
                <div className="w-28 h-28 rounded-full bg-slate-600/50 border-4 border-slate-700/50" />
              </div>
              <div className="p-6 space-y-3">
                <div className="h-5 w-3/4 bg-slate-600/30 rounded mx-auto" />
                <div className="h-4 w-full bg-slate-600/20 rounded" />
                <div className="h-3 w-full bg-slate-600/20 rounded" />
                <div className="h-3 w-2/3 bg-slate-600/20 rounded mx-auto" />
                <div className="pt-4 mt-6 border-t border-slate-600/20">
                  <div className="h-4 w-24 bg-slate-600/30 rounded mx-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function AlumniPage() {
  try {
    const alumni = await fetchAlumni();
    
    // Debug: cek data yang diterima
    console.log('Data alumni dari Strapi:', {
      jumlah: alumni?.length || 0,
      contoh: alumni?.[0],
      tipe: typeof alumni,
      isArray: Array.isArray(alumni)
    });
    
    // Pastikan alumni adalah array
    const safeAlumni = Array.isArray(alumni) ? alumni : [];
    
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <AlumniPageClient initialAlumni={safeAlumni} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching alumni:', error);
    return <AlumniPageClient initialAlumni={[]} />;
  }
}
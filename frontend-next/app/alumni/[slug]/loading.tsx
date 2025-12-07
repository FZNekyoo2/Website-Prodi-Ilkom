// app/alumni/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white animate-pulse">
      {/* Header Loading */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 h-80"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl h-64"></div>
            <div className="bg-white rounded-2xl h-96"></div>
            <div className="bg-white rounded-2xl h-48"></div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl h-64"></div>
            <div className="bg-white rounded-2xl h-48"></div>
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl h-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
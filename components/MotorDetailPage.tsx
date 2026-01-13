
import React, { useEffect } from 'react';
import { Motor } from '../types';
import CreditSimulator from './CreditSimulator';
import { TESTIMONIALS } from '../constants';

interface MotorDetailPageProps {
  motor: Motor;
  onBack: () => void;
  onSimulate: (motor: Motor) => void;
  onApply?: (motor: Motor, tenure: number, dp: number, installment: number) => void;
}

const MotorDetailPage: React.FC<MotorDetailPageProps> = ({ motor, onBack, onSimulate, onApply }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(motor.price);

  return (
    <div className="min-h-screen bg-white animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Navigation Header */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Katalog
          </button>
          <div className="hidden sm:block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Detail Unit</span>
            <span className="mx-2 text-slate-200">|</span>
            <span className="text-sm font-extrabold text-slate-900">{motor.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Visual Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl group">
              <img 
                src={motor.imageUrl} 
                alt={motor.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                 <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold text-white shadow-xl ${motor.isReady ? 'bg-green-500' : 'bg-amber-500'}`}>
                   {motor.isReady ? 'READY STOCK' : 'INDENT UNIT'}
                 </span>
                 {motor.condition === 'Used' && (
                    <span className="bg-blue-600 px-4 py-1.5 rounded-full text-xs font-extrabold text-white shadow-xl">
                      QUALITY CHECKED ✓
                    </span>
                 )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
               {[1,2,3].map(i => (
                 <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 cursor-pointer hover:border-blue-400 transition-colors">
                    <img src={motor.imageUrl} className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" alt={`view-${i}`} />
                 </div>
               ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  {motor.brand} • {motor.condition}
                </span>
                {motor.promoExpiry && (
                   <span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
                     🔥 Promo Berakhir: {motor.promoExpiry}
                   </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-2 tracking-tight">
                {motor.name}
              </h1>
              <div className="flex items-baseline gap-3">
                 <div className="text-3xl font-extrabold text-blue-600">{formattedPrice}</div>
                 {motor.marketPrice && (
                    <div className="text-lg text-slate-300 line-through font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(motor.marketPrice)}</div>
                 )}
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">OTR JABODETABEK • {motor.year}</p>
            </div>

            {/* Selling Points */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-blue-50/50 p-5 rounded-[2rem] border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">DP Ringan</span>
                  <p className="text-sm font-extrabold text-slate-900">Mulai {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(motor.price * 0.1)}</p>
               </div>
               <div className="bg-green-50/50 p-5 rounded-[2rem] border border-green-100">
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest block mb-1">Status Unit</span>
                  <p className="text-sm font-extrabold text-slate-900">{motor.isReady ? 'Tersedia Sekarang' : 'Indent 2-4 Minggu'}</p>
               </div>
            </div>

            <div className="prose prose-slate mb-10">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-4">Deskripsi Produk</h3>
              <p className="text-slate-500 leading-relaxed text-base italic">
                "{motor.description}"
              </p>
            </div>

            {motor.bonus && (
               <div className="mb-10">
                 <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-4">Bonus Pembelian</h4>
                 <div className="flex flex-wrap gap-2">
                   {motor.bonus.map(b => (
                     <span key={b} className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-xs font-bold border border-amber-200">
                       ✨ {b}
                     </span>
                   ))}
                 </div>
               </div>
            )}

            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="#simulation"
                className="bg-blue-600 text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cek Cicilan
              </a>
              <button className="bg-slate-900 text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200">
                Beli Cash
              </button>
            </div>
          </div>
        </div>

        {/* Simulation Section */}
        <div id="simulation" className="scroll-mt-32 mb-32 bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Simulasi Kredit {motor.name}</h2>
              <p className="text-slate-500">Atur budget DP dan tenor sesuai kemampuan. Transparan tanpa biaya siluman.</p>
            </div>
            <CreditSimulator selectedMotor={motor} onApply={onApply} />
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Testimoni Pembeli</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Kepercayaan Anda adalah prioritas kami. Lihat pengalaman mereka beli motor di MotoClick.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi) => (
              <div key={testi.id} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-4 w-4 ${i < testi.rating ? 'text-amber-400' : 'text-slate-100'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 mb-8 italic leading-relaxed">"{testi.comment}"</p>
                <div className="flex items-center gap-4">
                  <img src={testi.avatar} alt={testi.name} className="w-12 h-12 rounded-full border-2 border-blue-50" />
                  <div>
                    <h5 className="font-bold text-slate-900">{testi.name}</h5>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MotorDetailPage;

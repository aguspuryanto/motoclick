
import React, { useEffect } from 'react';
import { Motor } from '../types';
import CreditSimulator from './CreditSimulator';
import { TESTIMONIALS } from '../constants';

interface MotorDetailPageProps {
  motor: Motor;
  onBack: () => void;
  onSimulate: (motor: Motor) => void;
}

const MotorDetailPage: React.FC<MotorDetailPageProps> = ({ motor, onBack, onSimulate }) => {
  // Scroll to top when page opens
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
            <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl">
              <img 
                src={motor.imageUrl} 
                alt={motor.name} 
                className="w-full h-full object-cover"
              />
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
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-200">
                  {motor.brand}
                </span>
                <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {motor.type}
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight leading-none">
                {motor.name}
              </h1>
              <div className="text-3xl font-extrabold text-blue-600">
                {formattedPrice}
                <span className="text-sm text-slate-400 font-medium ml-2 uppercase tracking-wide">On the road Jakarta</span>
              </div>
            </div>

            <div className="prose prose-slate mb-12">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Tentang Kendaraan</h3>
              <p className="text-slate-600 leading-relaxed text-lg italic">
                "{motor.description}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Performa Mesin</span>
                <span className="text-xl font-extrabold text-slate-900">{motor.engine}</span>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Status Ketersediaan</span>
                <span className="text-xl font-extrabold text-green-600">Ready Stock</span>
              </div>
            </div>

            <div className="mb-12">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Pilihan Warna Eksklusif</h4>
              <div className="flex flex-wrap gap-3">
                {motor.colors.map(color => (
                  <div key={color} className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm hover:border-blue-300 transition-colors cursor-default">
                    <div className="w-4 h-4 rounded-full bg-slate-400"></div>
                    <span className="text-sm font-bold text-slate-700">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="#simulation"
                className="bg-blue-600 text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Cek Cicilan
              </a>
              <button className="bg-slate-900 text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200">
                Beli Cash Sekarang
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Spec Table Section */}
        <div className="border-t border-slate-100 pt-16 mb-24">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-12">Spesifikasi Lengkap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             <div className="space-y-4">
                <h4 className="font-bold text-blue-600 border-b border-blue-100 pb-2">Mesin</h4>
                <div className="flex justify-between text-sm py-1 border-b border-slate-50"><span className="text-slate-500">Tipe Mesin</span><span className="font-bold">{motor.engine}</span></div>
                <div className="flex justify-between text-sm py-1 border-b border-slate-50"><span className="text-slate-500">Sistem Bahan Bakar</span><span className="font-bold">Fuel Injection</span></div>
                <div className="flex justify-between text-sm py-1 border-b border-slate-50"><span className="text-slate-500">Tipe Transmisi</span><span className="font-bold">Otomatis / Manual</span></div>
             </div>
             <div className="space-y-4">
                <h4 className="font-bold text-blue-600 border-b border-blue-100 pb-2">Rangka & Kaki</h4>
                <div className="flex justify-between text-sm py-1 border-b border-slate-50"><span className="text-slate-500">Suspensi Depan</span><span className="font-bold">Telescopic</span></div>
                <div className="flex justify-between text-sm py-1 border-b border-slate-50"><span className="text-slate-500">Ban Depan</span><span className="font-bold">100/80 - 14 M/C</span></div>
                <div className="flex justify-between text-sm py-1 border-b border-slate-50"><span className="text-slate-500">Rem</span><span className="font-bold">Disc Brake ABS</span></div>
             </div>
             <div className="space-y-4">
                <h4 className="font-bold text-blue-600 border-b border-blue-100 pb-2">Dimensi</h4>
                <div className="flex justify-between text-sm py-1 border-b border-slate-50"><span className="text-slate-500">Kapasitas Tangki</span><span className="font-bold">7.5 Liter</span></div>
                <div className="flex justify-between text-sm py-1 border-b border-slate-50"><span className="text-slate-500">Berat Isi</span><span className="font-bold">115 kg</span></div>
                <div className="flex justify-between text-sm py-1 border-b border-slate-50"><span className="text-slate-500">Ground Clearance</span><span className="font-bold">135 mm</span></div>
             </div>
          </div>
        </div>

        {/* Simulation Section */}
        <div id="simulation" className="scroll-mt-32 mb-32 bg-slate-50 rounded-[3rem] p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Simulasi Kredit {motor.name}</h2>
              <p className="text-slate-500">Atur budget dan tenor sesuai kemampuan finansial Anda dengan simulasi transparan kami.</p>
            </div>
            <CreditSimulator selectedMotor={motor} />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Apa Kata Mereka?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Lebih dari 10.000+ customer telah mempercayakan MotoClick sebagai partner berkendara mereka.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi) => (
              <div key={testi.id} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-5 w-5 ${i < testi.rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 mb-8 italic leading-relaxed">
                  "{testi.comment}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={testi.avatar} alt={testi.name} className="w-12 h-12 rounded-full border-2 border-blue-100" />
                  <div>
                    <h5 className="font-bold text-slate-900">{testi.name}</h5>
                    <p className="text-xs text-slate-400 font-medium">{testi.role}</p>
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

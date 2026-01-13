
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MotorCard from './components/MotorCard';
import CreditSimulator from './components/CreditSimulator';
import MembershipSection from './components/MembershipSection';
import MotorDetailPage from './components/MotorDetailPage';
import { MOTORS, BRANDS } from './constants';
import { Motor, MotorType } from './types';
import { getMotorAdvice } from './services/gemini';

type ViewState = 'HOME' | 'DETAIL';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedMotorForSimulation, setSelectedMotorForSimulation] = useState<Motor | null>(null);
  const [detailedMotor, setDetailedMotor] = useState<Motor | null>(null);
  
  const [filterBrand, setFilterBrand] = useState<string>('Semua');
  const [filterType, setFilterType] = useState<string>('Semua');
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const filteredMotors = MOTORS.filter(m => {
    const brandMatch = filterBrand === 'Semua' || m.brand === filterBrand;
    const typeMatch = filterType === 'Semua' || m.type === filterType;
    return brandMatch && typeMatch;
  });

  const handleAiAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    const advice = await getMotorAdvice(aiInput);
    setAiResponse(advice || 'Maaf, tidak dapat memproses permintaan.');
    setIsAiLoading(false);
  };

  const navigateToDetail = (motor: Motor) => {
    setDetailedMotor(motor);
    setCurrentView('DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('HOME');
  };

  const handleSimulateFromDetail = (motor: Motor) => {
    setSelectedMotorForSimulation(motor);
    setCurrentView('HOME');
    // Give time for DOM update before scrolling
    setTimeout(() => {
      document.getElementById('credit')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {currentView === 'HOME' ? (
        <div className="animate-in fade-in duration-500">
          {/* Hero Section */}
          <header className="relative bg-slate-900 py-32 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-40">
               <img 
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=2000" 
                alt="Motorcycle Background" 
                className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-2xl">
                <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 leading-tight">
                  Beli Motor, <br/>
                  <span className="text-blue-500">Tinggal Klik.</span>
                </h1>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                  Dapatkan motor impian Anda dari berbagai merk ternama dengan proses paling transparan, aman, dan cepat.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#katalog" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30">
                    Lihat Katalog
                  </a>
                  <a href="#credit" className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-center hover:bg-slate-100 transition-all">
                    Simulasi Kredit
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Brand Selector */}
          <section id="brands" className="py-12 bg-white border-b border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-12 items-center">
               {BRANDS.map(brand => (
                 <button 
                    key={brand}
                    onClick={() => setFilterBrand(brand)}
                    className={`text-sm font-bold uppercase tracking-widest transition-colors ${filterBrand === brand ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   {brand}
                 </button>
               ))}
               <button 
                 onClick={() => setFilterBrand('Semua')}
                 className={`text-sm font-bold uppercase tracking-widest transition-colors ${filterBrand === 'Semua' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Semua
               </button>
            </div>
          </section>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            
            {/* Catalog Header */}
            <div id="katalog" className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 scroll-mt-24">
              <div>
                <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">CATALOG</span>
                <h2 className="text-3xl font-extrabold text-slate-900">Katalog Motor</h2>
              </div>
              <div className="flex gap-4">
                <select 
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="Semua">Semua Tipe</option>
                  {Object.values(MotorType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Grid Katalog */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {filteredMotors.length > 0 ? (
                filteredMotors.map(motor => (
                  <MotorCard 
                    key={motor.id} 
                    motor={motor} 
                    onSelect={navigateToDetail} 
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-500 font-medium">Motor tidak ditemukan dengan filter ini.</p>
                </div>
              )}
            </div>

            {/* Gemini AI Advisor */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 sm:p-12 text-white mb-24 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">Bingung Pilih Motor? <br/> Tanya AI Kami!</h2>
                  <p className="text-indigo-100 text-lg mb-8 opacity-90">
                    Dapatkan saran motor yang paling cocok dengan kebutuhan, budget, dan gaya hidup Anda dalam hitungan detik.
                  </p>
                  
                  <form onSubmit={handleAiAdvice} className="relative">
                    <input 
                      type="text" 
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Contoh: Motor matic irit untuk kerja harian..."
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 text-white placeholder:text-white/50 focus:bg-white/20 outline-none transition-all pr-16"
                    />
                    <button 
                      disabled={isAiLoading}
                      className="absolute right-3 top-3 bottom-3 aspect-square bg-white text-blue-600 rounded-xl flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                    >
                      {isAiLoading ? (
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </button>
                  </form>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 min-h-[200px] flex items-center justify-center">
                  {aiResponse ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                           <span className="text-blue-600 text-xs font-bold">AI</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-white/70">Rekomendasi Pintar</span>
                      </div>
                      <p className="text-lg font-medium leading-relaxed italic">
                        "{aiResponse}"
                      </p>
                    </div>
                  ) : (
                    <p className="text-indigo-100/60 text-center text-sm font-medium">
                      Tuliskan kriteria motor yang Anda inginkan di kolom sebelah kiri.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Credit Simulation */}
            <CreditSimulator selectedMotor={selectedMotorForSimulation} />

          </main>

          <MembershipSection />
        </div>
      ) : (
        detailedMotor && (
          <MotorDetailPage 
            motor={detailedMotor} 
            onBack={navigateToHome} 
            onSimulate={handleSimulateFromDetail}
          />
        )
      )}

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-1.5 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">MotoClick</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Solusi terlengkap untuk pembelian motor segala merk di Indonesia. Cash maupun credit, proses cepat hanya dengan sekali klik.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Tautan Cepat</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Katalog Motor</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Simulasi Kredit</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Daftar Membership</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Promo Terbaru</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Dukungan</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Cara Pembelian</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Hubungi Kami</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Langganan Newsletter</h4>
              <p className="text-xs text-slate-500 mb-4 font-medium italic">Dapatkan update harga dan promo eksklusif.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email Anda" 
                  className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm w-full outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                  Ikut
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <p>© 2024 MotoClick Indonesia. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900">Instagram</a>
              <a href="#" className="hover:text-slate-900">YouTube</a>
              <a href="#" className="hover:text-slate-900">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

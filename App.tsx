
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MotorCard from './components/MotorCard';
import CreditSimulator from './components/CreditSimulator';
import MembershipSection from './components/MembershipSection';
import MotorDetailPage from './components/MotorDetailPage';
import CreditApplicationForm from './components/CreditApplicationForm';
import PromoBanner from './components/PromoBanner';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AuthModal from './components/AuthModal';
import { MOTORS, BRANDS, LOCATIONS, TESTIMONIALS } from './constants';
import { Motor, MotorType, CreditApplication } from './types';
import { getMotorAdvice } from './services/gemini';

type ViewState = 'HOME' | 'DETAIL';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedMotorForSimulation, setSelectedMotorForSimulation] = useState<Motor | null>(null);
  const [detailedMotor, setDetailedMotor] = useState<Motor | null>(null);
  
  // Application Form State
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [appMotor, setAppMotor] = useState<Motor | null>(null);
  const [appTenure, setAppTenure] = useState(0);
  const [appDp, setAppDp] = useState(0);
  const [appInstallment, setAppInstallment] = useState(0);

  // Filter States
  const [filterBrand, setFilterBrand] = useState<string>('Semua');
  const [filterType, setFilterType] = useState<string>('Semua');
  const [filterLocation, setFilterLocation] = useState<string>('Semua');
  const [maxPrice, setMaxPrice] = useState<number>(150000000);
  const [minYear, setMinYear] = useState<number>(2020);

  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Auth State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<{ name: string } | null>(null);

  const filteredMotors = MOTORS.filter(m => {
    const brandMatch = filterBrand === 'Semua' || m.brand === filterBrand;
    const typeMatch = filterType === 'Semua' || m.type === filterType;
    const locMatch = filterLocation === 'Semua' || m.location === filterLocation;
    const priceMatch = m.price <= maxPrice;
    const yearMatch = m.year >= minYear;
    return brandMatch && typeMatch && locMatch && priceMatch && yearMatch;
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
    setTimeout(() => {
      document.getElementById('credit')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenApplication = (motor: Motor, tenure: number, dp: number, installment: number) => {
    setAppMotor(motor);
    setAppTenure(tenure);
    setAppDp(dp);
    setAppInstallment(installment);
    setIsApplicationOpen(true);
  };

  const handleApplicationSubmit = (data: CreditApplication) => {
    console.log('Application Submitted:', data);
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        onLoginClick={() => openAuth('login')} 
        onSignUpClick={() => openAuth('signup')} 
        user={user}
        onLogout={() => setUser(null)}
      />

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

          <PromoBanner />

          {/* Quick Filters */}
          <section id="brands" className="py-8 bg-white border-y border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-hide sticky top-16 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-12 items-center">
               <button 
                 onClick={() => setFilterBrand('Semua')}
                 className={`text-xs font-bold uppercase tracking-[0.2em] transition-all border-b-2 pb-1 ${filterBrand === 'Semua' ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
               >
                 Semua Merk
               </button>
               {BRANDS.map(brand => (
                 <button 
                    key={brand}
                    onClick={() => setFilterBrand(brand)}
                    className={`text-xs font-bold uppercase tracking-[0.2em] transition-all border-b-2 pb-1 ${filterBrand === brand ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                 >
                   {brand}
                 </button>
               ))}
            </div>
          </section>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            
            {/* Catalog Section */}
            <div id="katalog" className="scroll-mt-24 mb-16">
              <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Advanced Filter Sidebar */}
                <aside className="lg:w-1/4 space-y-8">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-8">
                    <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filter Pencarian
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tipe Motor</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                      >
                        <option value="Semua">Semua Tipe</option>
                        {Object.values(MotorType).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Lokasi Unit</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                      >
                        <option value="Semua">Semua Lokasi</option>
                        {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Harga Maksimal</label>
                        <span className="text-xs font-extrabold text-blue-600">{Math.round(maxPrice / 1000000)}jt</span>
                      </div>
                      <input 
                        type="range" 
                        min="15000000" 
                        max="150000000" 
                        step="5000000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tahun Minimum</label>
                      <div className="flex gap-2 flex-wrap">
                        {[2020, 2021, 2022, 2023, 2024].map(y => (
                          <button 
                            key={y}
                            onClick={() => setMinYear(y)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${minYear === y ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                          >
                            {y}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setFilterBrand('Semua');
                        setFilterType('Semua');
                        setFilterLocation('Semua');
                        setMaxPrice(150000000);
                        setMinYear(2020);
                      }}
                      className="w-full text-xs font-bold text-slate-400 hover:text-red-500 transition-colors py-2 border-t border-slate-50"
                    >
                      Reset Filter
                    </button>
                  </div>

                  {/* WhatsApp Support CTA */}
                  <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl">
                    <h4 className="font-extrabold mb-2">Butuh Bantuan?</h4>
                    <p className="text-xs text-slate-400 mb-6">Konsultasi gratis dengan sales representative kami sekarang.</p>
                    <button 
                      onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                      className="w-full bg-[#25D366] text-white py-3 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                    >
                      WhatsApp Kami
                    </button>
                  </div>
                </aside>

                {/* Catalog Grid */}
                <div className="lg:w-3/4">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      Unit Tersedia <span className="text-blue-600 ml-1">({filteredMotors.length})</span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                    {filteredMotors.length > 0 ? (
                      filteredMotors.map(motor => (
                        <MotorCard 
                          key={motor.id} 
                          motor={motor} 
                          onSelect={navigateToDetail} 
                        />
                      ))
                    ) : (
                      <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                         <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                         </div>
                        <p className="text-slate-500 font-extrabold text-lg">Waduh, motornya nggak ada nih.</p>
                        <p className="text-slate-400 text-sm">Coba atur ulang filternya yuk!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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

            {/* General Credit Simulation */}
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm mb-24">
              <div className="max-w-4xl mx-auto text-center mb-16">
                 <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">FINANCING</span>
                 <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Mulai Simulasi Kredit</h2>
                 <p className="text-slate-500">Pilih salah satu unit di katalog untuk melihat detail cicilan yang lebih spesifik.</p>
              </div>
              <CreditSimulator 
                selectedMotor={selectedMotorForSimulation} 
                onApply={handleOpenApplication}
              />
            </div>

            {/* Testimonials */}
            <section className="mb-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Kata Pelanggan Kami</h2>
                <p className="text-slate-500 max-w-2xl mx-auto italic">MotoClick hadir memberikan kemudahan dan kepastian dalam setiap transaksi.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((testi) => (
                  <div key={testi.id} className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < testi.rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-600 mb-8 italic text-sm leading-relaxed">"{testi.comment}"</p>
                    <div className="flex items-center gap-4">
                      <img src={testi.avatar} alt={testi.name} className="w-12 h-12 rounded-full border-2 border-blue-50" />
                      <div>
                        <h5 className="font-extrabold text-slate-900 text-sm">{testi.name}</h5>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{testi.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>

          <MembershipSection />
        </div>
      ) : (
        detailedMotor && (
          <MotorDetailPage 
            motor={detailedMotor} 
            onBack={navigateToHome} 
            onSimulate={handleSimulateFromDetail}
            onApply={handleOpenApplication}
          />
        )
      )}

      {/* Overlays & FABs */}
      {isApplicationOpen && appMotor && (
        <CreditApplicationForm 
          motor={appMotor}
          tenure={appTenure}
          dpAmount={appDp}
          installment={appInstallment}
          onClose={() => setIsApplicationOpen(false)}
          onSubmit={handleApplicationSubmit}
        />
      )}

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={(u) => setUser(u)}
      />

      <FloatingWhatsApp />

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold tracking-tighter">MotoClick</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Platform jual beli motor terpercaya. Semua merk, semua tipe, semua lokasi. Cukup dengan satu klik, motor sampai di depan pintu.
              </p>
            </div>
            
            <div>
              <h4 className="font-extrabold mb-8 uppercase text-xs tracking-[0.2em] text-blue-500">Layanan</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Beli Motor Baru</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Simulasi Kredit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cek Status STNK</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Layanan Servis</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold mb-8 uppercase text-xs tracking-[0.2em] text-blue-500">Perusahaan</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold mb-8 uppercase text-xs tracking-[0.2em] text-blue-500">Kontak Kami</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li className="flex items-center gap-3">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                   hello@motoclick.id
                </li>
                <li className="flex items-center gap-3">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                   </svg>
                   +62 812 3456 7890
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <p>© 2024 MotoClick Indonesia. Dibuat dengan dedikasi tinggi.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

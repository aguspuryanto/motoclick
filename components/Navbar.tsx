
import React from 'react';

interface NavbarProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  user: { name: string } | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignUpClick, user, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">MotoClick</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Katalog</a>
            <a href="#brands" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Merk</a>
            <a href="#credit" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Simulasi Kredit</a>
            <a href="#membership" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Membership</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{user.name}</span>
                </div>
                <button onClick={onLogout} className="text-sm font-medium text-red-500 hover:text-red-600">Keluar</button>
              </div>
            ) : (
              <>
                <button onClick={onLoginClick} className="hidden sm:block text-sm font-medium text-slate-600 hover:text-blue-600">Masuk</button>
                <button 
                  onClick={onSignUpClick}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                  Daftar Sekarang
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

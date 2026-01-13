
import React from 'react';
import { Motor } from '../types';

interface MotorCardProps {
  motor: Motor;
  onSelect: (motor: Motor) => void;
}

const MotorCard: React.FC<MotorCardProps> = ({ motor, onSelect }) => {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  // Quick estimation for display
  const minDp = motor.price * 0.1;
  const estInstallment = Math.round((motor.price - minDp) * 1.24 / 36);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={motor.imageUrl} 
          alt={motor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-extrabold text-blue-600 shadow-xl tracking-widest uppercase">
            {motor.brand} • {motor.condition}
          </span>
          {motor.isReady ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1 w-fit">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              READY STOCK
            </span>
          ) : (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-lg w-fit">
              INDENT / PRE-ORDER
            </span>
          )}
        </div>

        <div className="absolute bottom-4 left-4">
           <span className="bg-slate-900/80 backdrop-blur text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {motor.location} • {motor.year}
           </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">
            {motor.name}
          </h3>
          <p className="text-xs text-slate-400 font-medium">{motor.engine} • {motor.type}</p>
        </div>
        
        {/* Pricing Strategy Info */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
          {motor.condition === 'New' ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DP Ringan</span>
                <span className="text-xs font-extrabold text-blue-600">Mulai {formatCurrency(minDp)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cicilan Jelas</span>
                <span className="text-sm font-extrabold text-slate-900">{formatCurrency(estInstallment)}/bln</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Harga Pasaran</span>
                <span className="text-xs font-medium text-slate-400 line-through">{formatCurrency(motor.marketPrice || motor.price + 700000)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Harga Deal</span>
                <span className="text-sm font-extrabold text-green-600">{formatCurrency(motor.price)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Total Harga</span>
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">{formatCurrency(motor.price)}</span>
          </div>
          <button 
            onClick={() => onSelect(motor)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl hover:bg-blue-700 transition-all font-bold text-xs shadow-lg shadow-blue-100 active:scale-95"
          >
            Cek Promo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotorCard;

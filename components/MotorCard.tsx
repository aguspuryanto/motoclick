
import React from 'react';
import { Motor } from '../types';

interface MotorCardProps {
  motor: Motor;
  onSelect: (motor: Motor) => void;
}

const MotorCard: React.FC<MotorCardProps> = ({ motor, onSelect }) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(motor.price);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={motor.imageUrl} 
          alt={motor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-extrabold text-blue-600 shadow-xl tracking-widest uppercase">
            {motor.brand}
          </span>
        </div>
        {motor.isPopular && (
          <div className="absolute top-4 right-4">
            <span className="bg-amber-400 px-4 py-1.5 rounded-full text-[10px] font-extrabold text-amber-950 shadow-xl tracking-widest uppercase">
              Hot Deal
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 block mb-1">{motor.type}</span>
          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{motor.name}</h3>
        </div>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-6 h-10 leading-relaxed">
          {motor.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            {motor.engine}
          </div>
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-slate-50">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Mulai Dari</span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">{formattedPrice}</span>
          </div>
          <button 
            onClick={() => onSelect(motor)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl hover:bg-blue-700 transition-all font-bold text-xs shadow-lg shadow-blue-100 active:scale-95"
          >
            Detail
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotorCard;

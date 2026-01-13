
import React from 'react';
import { PROMOS } from '../constants';

const PromoBanner: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROMOS.map((promo) => (
            <div 
              key={promo.id} 
              className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-r ${promo.color} p-8 text-white group shadow-xl`}
            >
              <div className="relative z-10 max-w-[60%]">
                <span className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 block">Promo Terbatas</span>
                <h3 className="text-3xl font-extrabold mb-2">{promo.title}</h3>
                <p className="text-lg opacity-90 mb-6 font-medium">{promo.subtitle}</p>
                <button className="bg-white text-slate-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-100 transition-colors">
                  Klaim Promo
                </button>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 group-hover:scale-110 transition-transform duration-700">
                <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;

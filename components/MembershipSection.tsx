
import React from 'react';
import { MEMBERSHIP_TIERS } from '../constants';

const MembershipSection: React.FC = () => {
  return (
    <section id="membership" className="py-24 bg-slate-900 text-white overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 block">LOYALTY PROGRAM</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">MotoClick Membership</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Dapatkan keuntungan eksklusif dan layanan prioritas dengan bergabung dalam program keanggotaan kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div key={tier.name} className="relative group">
              <div className={`absolute inset-0 ${tier.color} opacity-10 rounded-3xl blur-xl group-hover:opacity-20 transition-opacity`}></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl h-full flex flex-col hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-2xl ${tier.color} text-slate-900`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Tier {tier.name}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-sm text-slate-400 mb-8">Minimal pembelian {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(tier.minPurchase)}</p>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3 text-sm text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-all text-sm">
                  Cek Syarat & Ketentuan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;

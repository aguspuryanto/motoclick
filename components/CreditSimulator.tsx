
import React, { useState, useEffect } from 'react';
import { Motor } from '../types';

interface CreditSimulatorProps {
  selectedMotor: Motor | null;
  onApply?: (motor: Motor, tenure: number, dpAmount: number, installment: number) => void;
}

const CreditSimulator: React.FC<CreditSimulatorProps> = ({ selectedMotor, onApply }) => {
  const [tenure, setTenure] = useState(36);
  const [dpPercent, setDpPercent] = useState(20);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);

  useEffect(() => {
    if (selectedMotor) {
      const dpAmount = selectedMotor.price * (dpPercent / 100);
      const loanAmount = selectedMotor.price - dpAmount;
      const annualInterest = 0.08; // 8% per year
      const totalInterest = loanAmount * annualInterest * (tenure / 12);
      const totalLoan = loanAmount + totalInterest;
      setMonthlyInstallment(Math.round(totalLoan / tenure));
    }
  }, [selectedMotor, tenure, dpPercent]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  if (!selectedMotor) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-400">Pilih motor untuk memulai simulasi kredit</h3>
      </div>
    );
  }

  const dpAmount = selectedMotor.price * (dpPercent / 100);

  return (
    <div id="credit" className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Simulasi Kredit</h2>
          <p className="text-slate-500">Estimasi cicilan untuk {selectedMotor.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Tenor (Bulan)</label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48].map((t) => (
                <button
                  key={t}
                  onClick={() => setTenure(t)}
                  className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                    tenure === t 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                  }`}
                >
                  {t} Bln
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-slate-700">Uang Muka (DP)</label>
              <span className="text-blue-600 font-bold">{dpPercent}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="70" 
              step="5"
              value={dpPercent}
              onChange={(e) => setDpPercent(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">
              <span>Minimal 10%</span>
              <span>Maksimal 70%</span>
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-slate-600">Harga OTR</span>
              <span className="font-bold text-slate-900">{formatCurrency(selectedMotor.price)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Total DP</span>
              <span className="font-bold text-blue-600">{formatCurrency(dpAmount)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          
          <span className="text-slate-400 text-sm font-medium mb-2">Cicilan per Bulan</span>
          <div className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-6 drop-shadow-sm">
            {formatCurrency(monthlyInstallment)}
          </div>
          <p className="text-center text-slate-400 text-xs mb-8">
            *Estimasi bunga 8% per tahun. Harga dapat berubah sewaktu-waktu sesuai ketentuan dealer.
          </p>
          <button 
            onClick={() => onApply?.(selectedMotor, tenure, dpAmount, monthlyInstallment)}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40"
          >
            Ajukan Kredit Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditSimulator;

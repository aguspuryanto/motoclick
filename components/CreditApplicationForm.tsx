
import React, { useState } from 'react';
import { Motor, CreditApplication } from '../types';

interface CreditApplicationFormProps {
  motor: Motor;
  tenure: number;
  dpAmount: number;
  installment: number;
  onClose: () => void;
  onSubmit: (data: CreditApplication) => void;
}

const CreditApplicationForm: React.FC<CreditApplicationFormProps> = ({ 
  motor, tenure, dpAmount, installment, onClose, onSubmit 
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    nik: '',
    phone: '',
    address: '',
    paymentMethod: 'Virtual Account'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSubmit({
        ...formData,
        motorId: motor.id,
        tenure,
        dpAmount,
        installment
      });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
        <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Pengajuan Terkirim!</h2>
          <p className="text-slate-500 mb-8">Terima kasih {formData.fullName}. Tim analis kami akan menghubungi Anda dalam waktu maksimal 1x24 jam untuk verifikasi data.</p>
          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Form Pengajuan Kredit</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Langkah {step} dari 3</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-10">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-bold text-slate-900">Data Diri Pemohon</h3>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap (Sesuai KTP)</label>
                <input 
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">NIK (Nomor Induk Kependudukan)</label>
                <input 
                  required
                  type="text"
                  maxLength={16}
                  value={formData.nik}
                  onChange={e => setFormData({...formData, nik: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="16 Digit NIK"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nomor WhatsApp</label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="0812xxxx"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Alamat Domisili</label>
                <textarea 
                  required
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 h-24 resize-none"
                  placeholder="Alamat lengkap tempat tinggal saat ini"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-bold text-slate-900">Ringkasan Pengajuan</h3>
              <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <img src={motor.imageUrl} className="w-20 h-20 rounded-2xl object-cover border border-white/20" alt={motor.name} />
                  <div>
                    <h4 className="font-bold text-xl">{motor.name}</h4>
                    <p className="text-slate-400 text-sm">{motor.brand}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-4 text-sm border-t border-white/10 pt-6">
                  <div>
                    <p className="text-slate-400 mb-1">Tenor</p>
                    <p className="font-bold">{tenure} Bulan</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">Uang Muka (DP)</p>
                    <p className="font-bold text-blue-400">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(dpAmount)}</p>
                  </div>
                  <div className="col-span-2 bg-white/5 rounded-2xl p-4">
                    <p className="text-slate-400 mb-1">Estimasi Cicilan / Bulan</p>
                    <p className="text-2xl font-extrabold text-blue-400">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(installment)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <p className="text-xs text-amber-800 leading-relaxed font-medium">
                   Data ini akan dikirim ke pihak leasing untuk proses BI Checking dan persetujuan kredit. Pastikan data diri Anda sudah benar.
                 </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-bold text-slate-900">Metode Pembayaran Angsuran</h3>
              <p className="text-sm text-slate-500">Pilih metode pembayaran yang paling memudahkan Anda setiap bulannya.</p>
              
              <div className="space-y-3">
                {['Virtual Account (BCA/Mandiri/BNI)', 'Auto Debit Rekening', 'Retail (Indomaret/Alfamart)', 'E-Wallet (GoPay/OVO)'].map(method => (
                  <label 
                    key={method}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === method 
                      ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/10' 
                      : 'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === method ? 'border-blue-600' : 'border-slate-300'}`}>
                        {formData.paymentMethod === method && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{method}</span>
                    </div>
                    <input 
                      type="radio" 
                      name="payment" 
                      className="hidden" 
                      checked={formData.paymentMethod === method}
                      onChange={() => setFormData({...formData, paymentMethod: method})}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-12 flex gap-4">
            {step > 1 && (
              <button 
                type="button"
                onClick={handleBack}
                className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                Kembali
              </button>
            )}
            {step < 3 ? (
              <button 
                type="button"
                onClick={handleNext}
                className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
              >
                Lanjutkan
              </button>
            ) : (
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Kirim Pengajuan'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditApplicationForm;

import { useState, useEffect } from 'react';
import { FileText, Pill, Calendar, Download, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { TableSkeleton } from './Skeleton';

const prescriptions = [
  {
    id: 'PR-1029',
    doctor: 'Dr. Sarah Mitchell',
    date: '12 Sep 2023',
    status: 'Active',
    medicines: [
      { name: 'Paracetamol', dosage: '500mg', instruction: 'Twice daily after meals', duration: '5 days' },
      { name: 'Amoxicillin', dosage: '250mg', instruction: 'Once daily before bed', duration: '7 days' },
    ]
  },
  {
    id: 'PR-1011',
    doctor: 'Dr. James Wilson',
    date: '02 Aug 2023',
    status: 'Completed',
    medicines: [
      { name: 'Iron Supplements', dosage: '10mg', instruction: 'Morning only', duration: '30 days' },
    ]
  }
];

export default function Prescriptions() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="w-56 h-8 bg-slate-100 rounded-xl animate-pulse" />
        <div className="w-32 h-10 bg-slate-100 rounded-xl animate-pulse" />
      </div>
      <TableSkeleton />
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="typography-h1">Prescriptions</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Digital records of medication protocols provided by authorized physicians.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">History</button>
          <button className="btn-primary">
            <span>New Order</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {prescriptions.map((px, i) => (
          <motion.div 
            key={px.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="section-card !p-0 overflow-hidden flex flex-col group"
          >
            <div className={`p-5 flex items-center justify-between border-b border-slate-100 ${px.status === 'Active' ? 'bg-primary-light/30' : 'bg-slate-50/50'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${px.status === 'Active' ? 'bg-primary text-white shadow-sm' : 'bg-slate-200 text-slate-500'}`}>
                  <FileText size={20} />
                </div>
                <div>
                  <p className="typography-label lowercase leading-none mb-1">ID: {px.id}</p>
                  <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{px.doctor}</h3>
                </div>
              </div>
              <div className="text-right">
                <span className={`status-badge ${px.status === 'Active' ? 'status-success' : 'status-info'}`}>
                  {px.status}
                </span>
                <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-wider">{px.date}</p>
              </div>
            </div>

            <div className="p-6 space-y-6 flex-1">
              {px.medicines.map((med, j) => (
                <div key={j} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Pill size={14} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{med.name}</h4>
                      <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-tighter">{med.dosage}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">"{med.instruction}"</p>
                    <div className="flex items-center gap-1.5 mt-2.5 text-slate-400">
                      <Calendar size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Limit: {med.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-slate-50/50 border-t border-slate-100 flex gap-3">
              <button className="flex-1 btn-primary text-xs py-2.5">Refill Meds</button>
              <button className="btn-secondary px-3 py-2.5">
                <Download size={16} />
              </button>
            </div>
          </motion.div>
        ))}

        <div className="section-card border-dashed bg-slate-50/30 flex flex-col items-center justify-center text-center p-12 min-h-[320px]">
          <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-5">
            <AlertCircle size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Digitize Paper Prescription</h3>
          <p className="text-xs text-slate-500 max-w-[240px] font-medium leading-relaxed">
            Upload a photo of your offline prescription and our AI will process it for verification.
          </p>
          <button className="mt-6 text-primary font-bold uppercase tracking-widest text-[10px] hover:text-primary-dark transition-colors">
            Upload Asset
          </button>
        </div>
      </div>
    </div>
  );
}

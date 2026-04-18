import { useState, useEffect } from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, History, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

const history = [
  { id: 1, type: 'Payment', title: 'Medication Order', date: '21 Oct 2023', amount: '-$24.50', status: 'Success' },
  { id: 2, type: 'Payment', title: 'Virtual Consultation', date: '18 Oct 2023', amount: '-$120.00', status: 'Success' },
  { id: 3, type: 'Credit', title: 'Wallet Top-up', date: '15 Oct 2023', amount: '+$500.00', status: 'Success' },
  { id: 4, type: 'Payment', title: 'Lab Test: Blood Work', date: '12 Oct 2023', amount: '-$45.00', status: 'Success' },
];

export default function Wallet() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="w-56 h-8 bg-slate-100 rounded-xl animate-pulse" />
        <div className="w-32 h-10 bg-slate-100 rounded-xl animate-pulse" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 h-72 bg-slate-100 rounded-[24px] animate-pulse border-dashed" />
        <div className="h-72 bg-slate-100 rounded-[24px] animate-pulse border-dashed" />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="typography-h1">Wallet & Benefits</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage your medical expenditures, insurance policies, and platform credits.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">Get Logs</button>
          <button className="btn-primary">
            <Plus size={16} />
            <span>Add Funds</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Card */}
        <div className="xl:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-[32px] bg-slate-900 text-white relative overflow-hidden shadow-2xl shadow-slate-200 border border-slate-800"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-16">
                <div className="w-12 h-8 rounded bg-white/[0.08] backdrop-blur-md flex items-center justify-center border border-white/10">
                  <span className="text-[10px] font-bold tracking-widest text-white/40">NIR</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary-light">Verified System</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Available Liquidity</p>
                <h2 className="text-6xl font-bold tracking-tight">$840.50</h2>
              </div>
              
              <div className="mt-16 flex justify-between items-end">
                <div>
                  <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-1">Authenticated Holder</p>
                  <p className="text-sm font-bold tracking-tight">AYUSH STUDIES</p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <CreditCard size={24} className="text-white/10" />
                  <p className="text-sm font-bold text-white/60 tabular-nums lowercase tracking-tighter">•••• 5824</p>
                </div>
              </div>
            </div>

            {/* Architectural light leaks */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Platform Credit', value: '$420.00' },
              { label: 'Insurance Limit', value: '$5,000.00' },
              { label: 'Reward Points', value: '1,240' },
            ].map((node, i) => (
              <div key={i} className="section-card flex flex-col justify-between h-24 p-5">
                <p className="typography-label leading-none">{node.label}</p>
                <p className="text-xl font-bold text-slate-900 leading-none">{node.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="section-card flex flex-col p-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
            <h3 className="typography-h3">Ledger Activity</h3>
            <button className="text-primary font-bold text-[10px] uppercase tracking-widest hover:text-primary-dark transition-colors">Audit All</button>
          </div>

          <div className="space-y-6 flex-1">
            {history.map((tx, i) => (
              <div key={tx.id} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-50 transition-colors ${tx.type === 'Credit' ? 'bg-primary-light text-primary' : 'bg-slate-50 text-slate-500'}`}>
                  {tx.type === 'Credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-xs text-slate-900 truncate tracking-tight">{tx.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{tx.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`font-bold text-sm tabular-nums ${tx.type === 'Credit' ? 'text-primary' : 'text-slate-900'}`}>
                    {tx.amount}
                  </p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase leading-none mt-1">Settled</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-slate-50/80 rounded-2xl p-6 border border-slate-100 border-dashed">
            <div className="flex items-center justify-between mb-3">
              <h4 className="typography-label lowercase">Threshold Usage</h4>
              <span className="text-[10px] font-bold text-slate-900">65%</span>
            </div>
            <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-primary w-[65%] shadow-[0_0_8px_rgba(6,78,59,0.2)]"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="text-slate-400 italic font-medium">Spent: $1,240.50</span>
              <span className="text-slate-900">Cap: $2k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

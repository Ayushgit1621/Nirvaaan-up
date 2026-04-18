import { Role } from '../types';
import { User, Activity, TestTube, Pill, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface RoleSelectorProps {
  onSelect: (role: Role) => void;
}

export default function RoleSelector({ onSelect }: RoleSelectorProps) {
  const roles = [
    { type: 'PATIENT' as Role, label: 'Patient', icon: User, desc: 'Manage your health, appointments and medicine.' },
    { type: 'DOCTOR' as Role, label: 'Doctor', icon: Activity, desc: 'Provide consultations and manage patient records.' },
    { type: 'LAB' as Role, label: 'Lab Center', icon: TestTube, desc: 'Process test requests and upload diagnostic reports.' },
    { type: 'PHARMACY' as Role, label: 'Pharmacy', icon: Pill, desc: 'Manage inventory and process medicine orders.' },
    { type: 'DELIVERY' as Role, label: 'Delivery Partner', icon: Truck, desc: 'Fast and reliable medicine delivery partner.' },
    { type: 'ADMIN' as Role, label: 'Admin', icon: ShieldCheck, desc: 'Platform oversight, analytics and system management.' },
  ];

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-xl shadow-slate-200 border border-slate-900">
            N
          </div>
          <h1 className="typography-h1 !text-5xl mb-4">Choose Entry Identity</h1>
          <p className="text-slate-500 font-medium text-lg max-w-md mx-auto">Authenticate as one of the specialized roles in the NIRVAAAN clinical ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.type}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onSelect(item.type)}
                className="section-card card-hover text-left flex flex-col group cursor-pointer p-8 h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all mb-8 shadow-sm">
                  <Icon size={24} />
                </div>
                <h3 className="typography-h3 !text-xl mb-3 group-hover:text-primary transition-colors">{item.label}</h3>
                <p className="text-slate-400 text-[13px] leading-relaxed font-medium flex-1">{item.desc}</p>
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-primary transition-colors">Select Identity</span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

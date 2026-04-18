import { useState, useEffect } from 'react';
import { Users, Calendar, Search, MoreVertical, Plus, Activity, TrendingUp, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { DashboardSkeleton } from './Skeleton';

export default function DoctorDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const stats = [
    { label: 'Today\'s Consultations', value: '12', trend: '+2 relative to yesterday', icon: Calendar },
    { label: 'Total Patients', value: '1,280', trend: '48 new this month', icon: Users },
    { label: 'Profile Rating', value: '4.9', trend: 'Top 2% in Hospital', icon: TrendingUp },
  ];

  const patients = [
    { id: 'P-1029', name: 'Alex Johnson', age: 34, gender: 'Male', lastVisit: '12 Oct 2023', status: 'Follow-up' },
    { id: 'P-1030', name: 'Sarah Williams', age: 28, gender: 'Female', lastVisit: '15 Oct 2023', status: 'New Patient' },
    { id: 'P-1031', name: 'Michael Brown', age: 52, gender: 'Male', lastVisit: '14 Oct 2023', status: 'Stable' },
    { id: 'P-1032', name: 'Emily Davis', age: 41, gender: 'Female', lastVisit: '16 Oct 2023', status: 'Critical' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Doctor Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-950 rounded-[32px] p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-200 border border-slate-800"
      >
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-light">Verified Specialist</span>
          </div>
          <h1 className="typography-h1 !text-white !text-5xl mb-4 leading-tight">Welcome, <br />Dr. James Mitchell</h1>
          <p className="text-white/60 text-lg font-medium max-w-md">
            You have <span className="font-bold text-white underline decoration-primary decoration-2 underline-offset-4">4 high-priority</span> patient reviews pending.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="bg-white text-slate-950 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95">
              Open Logbook
            </button>
            <button className="bg-white/5 hover:bg-white/10 backdrop-blur-sm px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest border border-white/10 transition-all">
              Digital Prescribe
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 flex items-center justify-center">
          <Activity size={320} strokeWidth={1} />
        </div>
        {/* Leaks */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="section-card card-hover group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <stat.icon size={20} />
              </div>
              <span className="status-badge status-info">Active</span>
            </div>
            <p className="typography-label lowercase">{stat.label}</p>
            <h3 className="typography-h1 !text-3xl mt-2">{stat.value}</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-3 flex items-center gap-1.5 italic">
              <TrendingUp size={12} className="text-primary" />
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Patients Table */}
      <div className="section-card !p-0 overflow-hidden">
        <div className="p-8 border-b border-border-main bg-slate-50/50 flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
            <UserCheck className="text-primary" />
            Recent Patient Activity
          </h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
            <input 
              type="text" 
              placeholder="Filter patients..."
              className="w-full bg-white border border-border-main rounded-xl py-2 pl-9 pr-3 text-xs font-bold outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-main">
                <th className="px-8 py-4 text-[10px] font-black uppercase text-text-secondary tracking-widest">ID</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-text-secondary tracking-widest">Patient Name</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-text-secondary tracking-widest">Details</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-text-secondary tracking-widest">Last Consult</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-text-secondary tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-text-secondary tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main">
              {patients.map((patient, i) => (
                <tr key={i} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 text-mono text-[11px] font-bold text-text-secondary">{patient.id}</td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-sm text-text-primary group-hover:text-primary transition-colors">{patient.name}</p>
                  </td>
                  <td className="px-8 py-5 text-xs font-medium text-text-secondary">{patient.age}Y • {patient.gender}</td>
                  <td className="px-8 py-5 text-xs font-bold text-text-primary">{patient.lastVisit}</td>
                  <td className="px-8 py-5">
                    <span className={`status-badge ${
                      patient.status === 'Critical' ? 'status-error' :
                      patient.status === 'New Patient' ? 'status-info' :
                      'status-success'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-white rounded-lg text-text-secondary hover:text-primary transition-all shadow-sm">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

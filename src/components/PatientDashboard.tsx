import { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Search, 
  Pill, 
  Bot, 
  Calendar, 
  ChevronRight,
  MapPin,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DashboardSkeleton } from './Skeleton';

export default function PatientDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const quickActions = [
    { label: 'Symptom AI', icon: Stethoscope, path: '/symptom-checker', color: 'bg-primary-light text-primary' },
    { label: 'Find Doctor', icon: Search, path: '/find-doctors', color: 'bg-slate-50 text-slate-600' },
    { label: 'Medicines', icon: Pill, path: '/order-medicines', color: 'bg-slate-50 text-slate-600' },
    { label: 'Chat Assistant', icon: Bot, path: '/chatbot', color: 'bg-slate-50 text-slate-600' },
  ];

  const metrics = [
    { label: 'Systolic BP', value: '120', unit: 'mmHg', status: 'Optimal', icon: Activity, pulse: true },
    { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal', icon: Activity, pulse: true },
    { label: 'Blood Glucose', value: '94', unit: 'mg/dL', status: 'Stable', icon: Zap, pulse: false },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Universal Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="typography-h1">Overview</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Clinical orchestration and health intelligence monitoring.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Calendar size={16} />
            <span>Schedule</span>
          </button>
          <button className="btn-primary">
            <PlusIcon />
            <span>Initialize Visit</span>
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Main Content Area */}
        <div className="dashboard-main">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((m, i) => (
              <div key={i} className="section-card card-hover flex flex-col justify-between h-44 p-7 relative overflow-hidden bg-white group hover:z-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-ekg-grid opacity-[0.03]" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <p className="typography-label lowercase">{m.label}</p>
                    <div className={m.pulse ? "animate-[pulse_2s_infinite]" : ""}>
                      <m.icon size={14} className={m.pulse ? "text-primary" : "text-slate-300"} />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-display font-black text-slate-900 leading-none tracking-tighter">{m.value}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{m.unit}</span>
                  </div>
                </div>
                <div className="flex items-center pt-5 border-t border-slate-50 relative z-10">
                  <span className={`status-badge ${m.status === 'Optimal' || m.status === 'Normal' ? 'status-success' : 'status-warning'}`}>
                    <div className="w-1 h-1 rounded-full bg-current mr-1.5 animate-pulse" />
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickActions.map((action, i) => (
              <Link 
                key={i} 
                to={action.path}
                className="section-card card-hover group flex flex-col items-center justify-center gap-4 py-8"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.color} transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-md`}>
                  <action.icon size={24} />
                </div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-primary transition-colors">{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Core Panel: Appointments */}
          <div className="section-card !p-0 overflow-hidden relative group">
            <div className="absolute inset-0 bg-ekg-grid opacity-[0.02] pointer-events-none" />
            <div className="px-8 py-7 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-primary rounded-full" />
                <h2 className="typography-h3 tracking-tight">Consultation Pipeline</h2>
              </div>
              <Link to="/appointments" className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-primary font-bold text-[10px] uppercase tracking-[0.2em] hover:shadow-md hover:border-primary/10 transition-all">
                View Register
              </Link>
            </div>
            
            <div className="px-8 divide-y divide-slate-100">
              {[
                { name: 'Dr. Sarah Mitchell', type: 'Cardiology Specialist', time: '10:30 AM', date: 'Today', mode: 'In Person', site: 'Greenside Medical' },
                { name: 'Dr. Robert Chen', type: 'Dermatologist', time: '02:00 PM', date: 'Tomorrow', mode: 'Virtual', site: 'Digital HQ' },
              ].map((appt, i) => (
                <div key={i} className="py-6 flex items-center justify-between group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-slate-900 group-hover:text-primary transition-colors">{appt.name}</h4>
                      <p className="typography-label lowercase text-slate-400 mt-1">{appt.type} / {appt.site}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 tracking-tight">{appt.date}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{appt.time}</p>
                    </div>
                    <span className="status-badge status-info">
                      {appt.mode}
                    </span>
                    <button className="btn-secondary h-11 w-11 !p-0 !rounded-xl active:scale-95 transition-transform shadow-none hover:shadow-sm">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar panels */}
        <div className="dashboard-sidebar">
          {/* AI Panel: Enhanced spacing and layout v3 */}
          <div className="ai-insight-card min-h-[500px] justify-between !bg-slate-950">
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                  <Bot size={24} className="text-primary-light" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight leading-none mb-1.5">Health AI</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
                    <p className="text-[9px] text-primary-light font-extrabold uppercase tracking-[0.25em]">Neural Analysis v11.0</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="ai-inner-block !mt-0 !p-7">
                  <div className="flex items-center gap-2 mb-4 opacity-60">
                    <Activity size={14} className="text-primary-light" />
                    <p className="typography-label !text-primary-light">Trend Analysis</p>
                  </div>
                  <p className="text-[14px] text-slate-300 leading-relaxed font-medium">
                    Your heart rate has stabilized at <span className="text-white font-bold text-sm tracking-tight bg-white/10 px-1.5 py-0.5 rounded">72 bpm</span>. There is a marked <span className="text-primary-light font-bold">12% improvement</span> in rest quality this week.
                  </p>
                </div>
                
                <div className="ai-inner-block !mt-0 !p-7">
                  <div className="flex items-center gap-2 mb-4 opacity-60">
                    <TrendingUp size={14} className="text-primary-light" />
                    <p className="typography-label !text-primary-light">Clinical Insight</p>
                  </div>
                  <p className="text-[14px] text-slate-300 leading-relaxed font-medium">
                    Sodium intake is <span className="text-white font-bold text-sm tracking-tight text-slate-400 bg-white/10 px-1.5 py-0.5 rounded italic">15% above</span> normal limits. Recommend adjusting dietary DASH parameters.
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full bg-white text-slate-950 py-4.5 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] hover:bg-slate-50 transition-all shadow-2xl active:scale-95 mt-10">
              Consult Clinical Advisor
            </button>
            
            {/* Architectural light leaks v3 */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary/20 rounded-full blur-[110px] pointer-events-none" />
          </div>

          {/* Profile Identity Card */}
          <div className="section-card p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100">
                <ShieldCheck size={20} />
              </div>
              <h3 className="typography-h3">Digital ID</h3>
            </div>
            <div className="space-y-5">
              {[
                { label: 'Security Status', value: 'Verified', color: 'text-primary' },
                { label: 'Carrier Provider', value: 'Insurance Alpha' },
                { label: 'Biological Group', value: 'O Positive' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-[11px] pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">{item.label}</span>
                  <span className={`font-bold ${item.color || 'text-slate-900'}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3V13M13 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


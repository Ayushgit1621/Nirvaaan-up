import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { 
  Heart, 
  ArrowRight, 
  User as UserIcon, 
  Activity, 
  ShieldCheck, 
  Pill, 
  Truck, 
  Star,
  Users,
  CheckCircle2,
  Clock,
  FlaskConical,
  Store,
  ArrowLeft,
  ChevronRight,
  Shield,
  Stethoscope,
  Lock,
  Eye,
  Settings
} from 'lucide-react';
import { Role } from '../types';

interface LandingProps {
  onSelectRole: (role: Role) => void;
  onLogin: () => void;
}

type TabType = 'demo' | 'login' | 'register';

export default function Landing({ onSelectRole, onLogin }: LandingProps) {
  const [activeTab, setActiveTab] = useState<TabType>('demo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'PATIENT' as Role,
    password: ''
  });

  const roles = [
    { type: 'PATIENT' as Role, label: 'Patient', sub: 'Clinical consultations & pharmacy orders', icon: Users, color: 'bg-primary' },
    { type: 'DOCTOR' as Role, label: 'Doctor', sub: 'Neural diagnostic assistance & practice management', icon: Stethoscope, color: 'bg-primary' },
    { type: 'ADMIN' as Role, label: 'Admin', sub: 'Full ecosystem orchestration & monitoring', icon: ShieldCheck, color: 'bg-slate-900' },
    { type: 'PHARMACY' as Role, label: 'Medical Shop', sub: 'Inventory intelligence & fulfillment', icon: Store, color: 'bg-primary' },
    { type: 'DELIVERY' as Role, label: 'Delivery', sub: 'Last-mile medical logistics', icon: Truck, color: 'bg-primary' },
  ];

  const features = [
    { title: 'Neural Diagnostics', desc: 'AI-driven symptom analysis with 99.4% clinical correlation.', icon: Activity },
    { title: 'Clinical Orchestration', desc: 'Seamlessly connect with top-tier healthcare professionals.', icon: Users },
    { title: 'Medical Supply Chain', desc: 'Enterprise-grade medicine procurement and delivery systems.', icon: Pill },
    { title: 'Zero-Trust Security', desc: 'HIPAA-compliant data encryption and identity management.', icon: Shield },
  ];

  const renderAuthTerminal = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto w-full pt-12 pb-20 px-6"
    >
      <div className="flex bg-slate-100/60 p-1.5 rounded-[24px] mb-12 border border-slate-200/50">
        {(['demo', 'login', 'register'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 rounded-[20px] text-[13px] font-black tracking-tight transition-all uppercase ${
              activeTab === tab 
                ? 'bg-white text-slate-900 shadow-premium' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab === 'demo' ? 'Quick Demo' : tab === 'login' ? 'Sign In' : 'Register'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'demo' && (
          <motion.div 
            key="demo" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="text-center mb-10">
              <h3 className="typography-h2 mb-3">Instant Access</h3>
              <p className="typography-body !text-sm">Experience the NIRVAAAN ecosystem. No sign-up required.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {roles.map((role, idx) => {
                const Icon = role.icon;
                return (
                  <motion.button
                    key={role.type}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onSelectRole(role.type)}
                    className="w-full p-6 bg-white border border-slate-200 rounded-[24px] flex items-center gap-5 group hover:border-primary hover:shadow-premium transition-all text-left"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${role.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-3`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-slate-900 text-[15px] tracking-tight">{role.label}</h5>
                      <p className="text-xs text-slate-400 font-medium mt-1 leading-snug">{role.sub}</p>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'login' && (
          <motion.div 
            key="login" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h3 className="typography-h2 mb-3">Welcome Back</h3>
              <p className="typography-body !text-sm">Your clinical journey continues here.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="typography-label px-2">Email Identity</label>
                <input 
                  type="email" 
                  placeholder="name@clinical.ai"
                  className="w-full input-diagnostic"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="typography-label px-2">Access Key</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter password"
                    className="w-full input-diagnostic"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors p-2"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
              <button onClick={onLogin} className="w-full btn-primary !py-5 uppercase tracking-widest text-[11px]">
                Authorize & Access
              </button>
              <div className="pt-10 border-t border-slate-100 mt-10">
                <div className="flex justify-center gap-6 opacity-30">
                   <ShieldCheck size={24} />
                   <Activity size={24} />
                   <Lock size={24} />
                </div>
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-6">Enterprise encryption enabled</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'register' && (
          <motion.div 
            key="register" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h3 className="typography-h2 mb-3">Join NIRVAAAN</h3>
              <p className="typography-body !text-sm">Start your data-driven healthcare journey.</p>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                  <label className="typography-label px-2">Full Legal Name</label>
                  <input 
                    type="text" 
                    placeholder="Clinical Practitioner or Patient"
                    className="w-full input-diagnostic"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="typography-label px-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="name@email.com"
                      className="w-full input-diagnostic"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="typography-label px-2">Role</label>
                    <select 
                      className="w-full input-diagnostic cursor-pointer"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value as Role})}
                    >
                      <option value="PATIENT">Patient</option>
                      <option value="DOCTOR">Doctor</option>
                      <option value="ADMIN">Admin</option>
                      <option value="PHARMACY">Pharmacy</option>
                      <option value="DELIVERY">Delivery</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="typography-label px-2">Security Key</label>
                  <input 
                    type="password" 
                    placeholder="Secure credentials"
                    className="w-full input-diagnostic"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
              <button 
                onClick={() => onSelectRole(formData.role)} 
                className="w-full btn-primary !py-5 uppercase tracking-widest text-[11px]"
              >
                Initialize Profile
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 bg-ekg-grid">
      <AnimatePresence>
        {isAuthVisible ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto scrollbar-hide"
          >
             <nav className="h-20 px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
                <Logo variant="emerald" />
                <button 
                  onClick={() => setIsAuthVisible(false)}
                  className="p-3 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X size={24} />
                </button>
             </nav>
             {renderAuthTerminal()}
          </motion.div>
        ) : (
          <div className="relative">
            {/* Minimal Nav */}
            <nav className="h-24 px-8 lg:px-16 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-50">
              <Logo variant="emerald" />
              <div className="hidden md:flex items-center gap-12 font-semibold text-sm text-slate-600">
                <a href="#features" className="hover:text-primary transition-colors">Intelligence</a>
                <a href="#roles" className="hover:text-primary transition-colors">Ecosystem</a>
                <a href="#how" className="hover:text-primary transition-colors">Workflow</a>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => { setActiveTab('login'); setIsAuthVisible(true); }}
                  className="hidden sm:block font-bold text-sm text-slate-900 px-6 py-2 hover:bg-slate-50 rounded-xl transition-all"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { setActiveTab('demo'); setIsAuthVisible(true); }}
                  className="btn-primary !py-2.5 !px-8 !text-sm"
                >
                  Start Demo
                </button>
              </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-24 pb-32 px-8 lg:px-16 overflow-hidden">
               <div className="max-w-7xl mx-auto text-center relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-light rounded-full border border-primary/10 mb-10"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">v11 Neural Orchestration Live</span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="typography-h1 max-w-5xl mx-auto mb-10"
                  >
                    Medical Intelligence. <br/>
                    <span className="text-primary italic">Orchestrated.</span>
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="typography-body max-w-2xl mx-auto mb-14 text-xl"
                  >
                    Experience the ecosystem where clinical diagnostics meets AI precision. One platform for patients, practitioners, and medical supply chains.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5"
                  >
                    <button 
                      onClick={() => { setActiveTab('register'); setIsAuthVisible(true); }}
                      className="btn-primary !px-12 !py-5 shadow-2xl shadow-primary/20 w-full sm:w-auto"
                    >
                      Get Started <ArrowRight size={18} />
                    </button>
                    <button 
                      onClick={() => { setActiveTab('demo'); setIsAuthVisible(true); }}
                      className="btn-secondary !px-12 !py-5 w-full sm:w-auto"
                    >
                      Instant Demo
                    </button>
                  </motion.div>
               </div>

               {/* Visual Flourish: Abstract Clinical Grid */}
               <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[120%] aspect-square opacity-[0.03] pointer-events-none">
                  <div className="w-full h-full bg-ekg-grid rotate-12 scale-150" />
               </div>
            </header>

            {/* Trust Section */}
            <section className="py-24 border-y border-slate-100 bg-slate-50/30">
               <div className="max-w-7xl mx-auto px-8 lg:px-16 text-center">
                  <p className="typography-label mb-16 opacity-60">Architected for Medical Precision</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                     {[
                       { label: 'HIPAA Compliant', value: 'Security' },
                       { label: '10K+ Patients', value: 'Scale' },
                       { label: '500+ Experts', value: 'Network' },
                       { label: '24/7 Access', value: 'Availability' },
                     ].map((s, i) => (
                       <div key={i} className="flex flex-col items-center">
                          <h4 className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{s.value}</h4>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{s.label}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-8 lg:px-16">
               <div className="max-w-7xl mx-auto">
                  <div className="mb-24 max-w-2xl">
                     <h2 className="typography-h2 mb-6">Autonomous Clinical Ecosystem</h2>
                     <p className="typography-body text-xl italic font-medium">Neural processing meets healthcare logistics for the modern era.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {features.map((f, i) => (
                       <div key={i} className="section-card card-hover group h-full flex flex-col justify-between p-10">
                          <div>
                             <div className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl group-hover:rotate-6 transition-transform">
                                <f.icon size={26} />
                             </div>
                             <h4 className="typography-h3 mb-4 leading-tight">{f.title}</h4>
                             <p className="text-slate-500 font-medium leading-relaxed mb-8">{f.desc}</p>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                             Deep Dive <ArrowRight size={14} />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* How It Works - Minimal 3-Step */}
            <section id="how" className="py-32 px-8 lg:px-16 bg-slate-950 text-white overflow-hidden relative">
               <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-24">
                     <p className="typography-label !text-primary-light mb-6 font-black">Workflow Orchestration</p>
                     <h2 className="typography-h2 !text-white">Three steps to intelligent care.</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative">
                     {[
                       { n: '01', t: 'Identify Identity', d: 'Securely authenticate and initialize your role-based workstation.' },
                       { n: '02', t: 'Neural Diagnostic', d: 'Describe symptoms or manage patient cohorts via AI-assisted terminals.' },
                       { n: '03', t: 'Execute Care', d: 'Order medicines, issue prescriptions, or verify fulfillment instantly.' },
                     ].map((step, i) => (
                       <div key={i} className="relative group">
                          <span className="font-display font-black text-8xl text-white/5 absolute -top-12 -left-4 group-hover:text-primary/10 transition-colors">{step.n}</span>
                          <h4 className="text-xl font-display font-bold mb-5 relative z-10">{step.t}</h4>
                          <p className="text-slate-400 font-medium leading-relaxed relative z-10">{step.d}</p>
                       </div>
                     ))}
                  </div>
               </div>
               {/* Grid Decoration */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="w-full h-full bg-ekg-grid bg-white" />
               </div>
            </section>

            {/* Role Access Section */}
            <section id="roles" className="py-32 px-8 lg:px-16 overflow-hidden">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-20 max-w-3xl mx-auto">
                     <h2 className="typography-h2 mb-6">Designed for Every Actor</h2>
                     <p className="typography-body italic font-medium">Distinct surgical precision for every role in the medical supply chain.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                     {roles.map((r, i) => {
                       const Icon = r.icon;
                       return (
                        <button 
                          key={i}
                          onClick={() => { setActiveTab('demo'); setIsAuthVisible(true); }}
                          className="section-card card-hover flex flex-col items-center justify-center p-10 text-center group"
                        >
                           <div className={`w-16 h-16 rounded-3xl ${r.color} text-white flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                              <Icon size={28} />
                           </div>
                           <h5 className="font-bold text-slate-900 mb-2 leading-none">{r.label}</h5>
                           <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Access Node</p>
                        </button>
                       );
                     })}
                  </div>
               </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 px-8 lg:px-16">
               <div className="max-w-5xl mx-auto section-card !bg-primary !border-none !p-20 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-ekg-grid bg-white opacity-[0.05] pointer-events-none" />
                  <h2 className="typography-h2 !text-white mb-10 relative z-10">Ready to orchestrate your <br/> healthcare intelligence?</h2>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                     <button 
                      onClick={() => { setActiveTab('register'); setIsAuthVisible(true); }}
                      className="px-12 py-5 bg-white text-primary font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl hover:scale-105 transition-all"
                     >
                        Get Started Instantly
                     </button>
                     <button 
                      onClick={() => { setActiveTab('login'); setIsAuthVisible(true); }}
                      className="px-12 py-5 bg-primary-dark/20 text-white font-black uppercase tracking-widest text-xs rounded-2xl border border-white/20 hover:bg-white/10 transition-all"
                     >
                        Secure Login
                     </button>
                  </div>
               </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-8 lg:px-16 border-t border-slate-100">
               <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                  <Logo variant="emerald" />
                  <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                     <a href="#" className="hover:text-primary transition-colors">Privacy Neural</a>
                     <a href="#" className="hover:text-primary transition-colors">Terms of Orchestration</a>
                     <a href="#" className="hover:text-primary transition-colors">Compliance Nodes</a>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">© 2026 NIRVAAAN. ALL BIOLOGICAL DATA ENCRYPTED.</p>
               </div>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

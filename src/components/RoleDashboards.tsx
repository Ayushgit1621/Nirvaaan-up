import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Star, 
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  ShoppingBag,
  Stethoscope,
  BarChart3,
  Wallet,
  Activity,
  ArrowRight,
  Plus,
  Calendar,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Shield,
  Globe,
  Truck,
  Search,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';
import { DashboardSkeleton } from './Skeleton';

const DashboardStats = ({ stats }: { stats: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    {stats.map((stat, i) => {
      const Icon = stat.icon;
      return (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="section-card card-hover"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="typography-label">{stat.label}</span>
            <div className={`p-1.5 rounded-md ${stat.color || 'bg-slate-100 text-slate-500'}`}>
              <Icon size={14} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
          {stat.trend && (
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp size={12} className="text-primary" />
              <span className="text-[10px] font-bold text-primary">{stat.trend}</span>
            </div>
          )}
        </motion.div>
      );
    })}
  </div>
);

const UniversalHeader = ({ title, subtitle, actions }: { title: string, subtitle: string, actions?: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
    <div>
      <h1 className="typography-h1">{title}</h1>
      <p className="text-slate-500 text-sm mt-1 font-medium">{subtitle}</p>
    </div>
    <div className="flex items-center gap-3">
      {actions}
    </div>
  </div>
);

export function DoctorDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const stats = [
    { label: 'Total Consults', value: '42', icon: Clock, trend: '+12%' },
    { label: 'Active Patients', value: '1.2k', icon: Users, trend: 'Stable' },
    { label: 'Avg Rating', value: '4.9/5', icon: Star, color: 'bg-slate-50 text-slate-500' },
    { label: 'Revenue YTD', value: '$8.4k', icon: DollarSign, trend: '+24%' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <UniversalHeader 
        title="Clinical Overview" 
        subtitle="Review your patient queue and health analytics for today."
        actions={
          <>
            <button className="btn-secondary">Export Labs</button>
            <button className="btn-primary">
              <Plus size={16} />
              New Patient
            </button>
          </>
        }
      />
      
      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="section-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="typography-h3">Queue for Consultation</h2>
              <button className="btn-ghost">View Schedule</button>
            </div>
            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="py-5 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={`https://picsum.photos/seed/patient${i}/100/100`} className="w-11 h-11 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Patient #NIR-20{i}</h4>
                      <p className="text-xs text-slate-500 font-medium">Chronic Hypertension • Lab Pending</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">10:30 AM</p>
                      <span className="status-badge status-info">Regular Visit</span>
                    </div>
                    <button className="btn-secondary py-1.5 px-4 text-xs font-bold">Open EHR</button>
                    <button className="btn-ghost p-1.5">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="section-card">
            <h2 className="typography-h3 mb-6">Clinical Performance</h2>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-0.5 text-slate-300 mb-2">
                    {[...Array(5)].map((_, j) => <Star key={j} size={10} fill="currentColor" />)}
                  </div>
                  <p className="text-xs font-medium text-slate-600 italic leading-relaxed">
                    "Dr. Mitchell's use of AI diagnostic assistance made me feel very secure about my treatment plan."
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">PAT-88{i}</span>
                    <span className="text-[10px] text-slate-300">2d ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PharmacyDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const stats = [
    { label: 'Stock Items', value: '4,290', icon: Package, trend: '+12%', color: 'bg-slate-50 text-slate-500' },
    { label: 'Total Revenue', value: '$12,4k', icon: DollarSign, trend: '+8%' },
    { label: 'Orders (Today)', value: '18', icon: ShoppingBag, color: 'bg-slate-50 text-slate-500' },
    { label: 'Fulfillment', value: '98%', icon: CheckCircle2, color: 'bg-primary-light text-primary' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <UniversalHeader 
        title="Pharmacy Operations" 
        subtitle="Manage inventory, verify prescriptions, and track shipments."
        actions={<button className="btn-primary">Update Stock</button>}
      />
      
      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="section-card">
            <h2 className="typography-h3 mb-6">Inventory Alerts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-5 border border-slate-100 rounded-xl hover:border-primary/20 transition-all bg-slate-50/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-slate-900">Atorvastatin 20mg</h4>
                    <span className="status-badge status-warning leading-none">Critical</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 font-medium">8 units remaining • Last refill: 12d ago</p>
                  <button className="w-full btn-secondary text-xs py-2">Restock Item</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="section-card h-full">
            <h2 className="typography-h3 mb-6">Pending Deliveries</h2>
            <div className="space-y-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                    <Package size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">#ORD-902{i}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Pickup scheduled: 14:00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeliveryDashboard() {
  const stats = [
    { label: 'Active Tasks', value: '03', icon: Clock },
    { label: 'Total Completed', value: '1,420', icon: CheckCircle2, trend: '+45 this week' },
    { label: 'Service Rating', value: '4.85', icon: Star, color: 'bg-slate-50 text-slate-500' },
    { label: 'Balance', value: '$2,850', icon: Wallet },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <UniversalHeader 
        title="Logistics Panel" 
        subtitle="Real-time delivery fulfillment and dispatcher tracking."
      />
      <DashboardStats stats={stats} />
      <div className="section-card">
        <h2 className="typography-h3 mb-6">Live Delivery Requests</h2>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-5 border border-slate-100 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                  <Package size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Order #NIR-DEL-90{i}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Pickup: Greenside Meds • Destination: NW Sector</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">$12.50</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fee</p>
                </div>
                <button className="btn-primary py-2 px-6 text-xs font-bold">Accept Task</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const stats = [
    { label: 'Ecosystem Users', value: '1,248', icon: Users, trend: '+12%', color: 'bg-slate-50 text-slate-500' },
    { label: 'Node Status', value: '99.9%', icon: Activity, color: 'bg-primary-light text-primary' },
    { label: 'Rev Run Rate', value: '$84.2k', icon: Wallet },
    { label: 'Health Audits', value: '02', icon: ShieldCheck, color: 'bg-slate-900 text-white' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <UniversalHeader 
        title="Infrastructure Monitor" 
        subtitle="High-level visibility into platform status, users, and compliance."
        actions={<button className="btn-primary">System Health Root</button>}
      />
      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="section-card">
            <div className="flex items-center justify-between mb-8">
              <h2 className="typography-h3">Platform Performance</h2>
              <div className="flex gap-2">
                <span className="status-badge status-success leading-none flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Cluster-01 Active
                </span>
              </div>
            </div>
            {/* Minimalist Chart Mock */}
            <div className="h-64 bg-slate-50/50 rounded-2xl flex items-end justify-between p-8 gap-3 border border-slate-100">
              {[40, 60, 45, 90, 65, 80, 55, 75, 85, 95, 70, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-200 hover:bg-slate-900 rounded-sm transition-all cursor-help relative group" style={{ height: `${h}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                    ${(h * 0.8).toFixed(1)}k
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="section-card h-full">
            <h2 className="typography-h3 mb-8">Compliance Overview</h2>
            <div className="space-y-8">
              {[
                { label: 'Network Integrity', val: 98 },
                { label: 'EHR Encryption', val: 100 },
                { label: 'AI Model Safety', val: 92 },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="typography-label">{m.label}</span>
                    <span className="text-xs font-bold text-slate-800">{m.val}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${m.val}%` }}
                      className="h-full bg-slate-900 transition-all duration-1000"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LabDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="section-card p-20 text-center border-dashed bg-slate-50/30">
        <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-8">
          <Activity size={24} />
        </div>
        <h2 className="typography-h2 mb-4">Diagnostic Pipeline Integration</h2>
        <p className="text-slate-500 max-w-md mx-auto font-medium text-sm leading-relaxed">
          The unified lab test processing pipelines are currently being linked to the primary infrastructure node. Secure audit logs will be active shortly.
        </p>
        <button className="btn-secondary mt-10 mx-auto px-10">Notify Admin</button>
      </div>
    </div>
  );
}



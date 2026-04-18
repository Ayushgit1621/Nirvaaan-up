import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { 
  Home,
  LayoutDashboard, 
  Stethoscope, 
  Search, 
  Calendar, 
  FileText, 
  Pill, 
  ShoppingBag, 
  Wallet, 
  Bot, 
  History, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Role } from '../types';

interface SidebarProps {
  role: Role;
  onLogout: () => void;
}

export default function Sidebar({ role, onLogout }: SidebarProps) {
  const location = useLocation();

  const commonMenu = [
    { path: '/', label: 'Portal Home', icon: Home },
  ];

  const patientMenu = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/symptom-checker', label: 'AI Symptom Checker', icon: Stethoscope },
    { path: '/find-doctors', label: 'Find Doctors', icon: Search },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
    { path: '/prescriptions', label: 'Prescriptions', icon: FileText },
    { path: '/order-medicines', label: 'Order Medicines', icon: Pill },
    { path: '/my-orders', label: 'My Orders', icon: ShoppingBag },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
    { path: '/chatbot', label: 'AI Chatbot', icon: Bot },
    { path: '/medical-history', label: 'Medical History', icon: History },
  ];

  const doctorMenu = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/appointments', label: 'Patient Consults', icon: Calendar },
    { path: '/patients', label: 'Patient Records', icon: History },
    { path: '/prescriptions', label: 'Issue Prescription', icon: FileText },
    { path: '/chatbot', label: 'AI Asst (Beta)', icon: Bot },
  ];

  const menuItems = [...commonMenu, ...(role === 'PATIENT' ? patientMenu : doctorMenu)];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-30 shadow-2xl shadow-slate-200/20 overflow-hidden">
      <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
        <Link to="/" className="block mb-10 group cursor-pointer active:scale-95 transition-transform px-2">
          <Logo variant="emerald" />
        </Link>

        <div className="space-y-6">
          <div>
            <p className="typography-label px-4 mb-3">Main Navigation</p>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                  >
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Action area moved inside scrollable div to ensure visibility */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-2">
          <p className="typography-label px-4 mb-3">Identity Management</p>
          <Link to="/settings" className={`sidebar-link ${location.pathname === '/settings' ? 'sidebar-link-active' : ''}`}>
            <Settings size={16} />
            <span>Profile Settings</span>
          </Link>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all text-sm font-bold uppercase tracking-widest active:scale-95 group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors">
              <LogOut size={16} />
            </div>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-50/50 border-t border-slate-100 hidden lg:block">
        <div className="flex items-center gap-2 px-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Online</span>
        </div>
      </div>
    </aside>
  );
}

import { Bell, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="h-[76px] bg-white/80 backdrop-blur-md border-b border-border-main flex items-center justify-between px-10 sticky top-0 z-20">
      <div className="flex flex-col">
        <h2 className="typography-h3 !text-base leading-none">Welcome back, {user.name.split(' ')[0]}</h2>
        <p className="typography-label lowercase mt-1.5 font-medium italic opacity-70">Platform Overview</p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 text-slate-400 hover:text-slate-900 transition-all cursor-pointer bg-slate-50 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 shadow-sm active:scale-95">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white shadow-[0_0_5px_rgba(6,78,59,0.3)]"></span>
        </button>

        <div className="h-6 w-[1px] bg-slate-100"></div>

        <div className="flex items-center gap-4">
          <div className="text-right flex flex-col items-end">
            <div className="font-display font-bold text-sm text-slate-900 tracking-tight">{user.name}</div>
            <div className="mt-1.5 flex gap-2">
              <span className="status-badge status-success !text-[8px] !px-1.5 font-extrabold lowercase">
                {user.role}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            ) : (
              <UserIcon size={18} className="text-slate-400" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

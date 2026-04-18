import { User as UserIcon, Shield, MapPin, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import { User } from '../types';
import { motion } from 'motion/react';

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-text-primary tracking-tight">Profile & Preferences</h1>
        <button className="btn-primary">Edit Profile</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="section-card text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-primary/10"></div>
            <div className="relative pt-8">
              <div className="w-28 h-28 rounded-full bg-white mx-auto mb-6 overflow-hidden border-4 border-white shadow-soft relative">
                {user.avatar ? (
                  <img src={user.avatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <UserIcon size={40} className="w-full h-full p-8 text-text-secondary" />
                )}
                <div className="absolute bottom-1 right-1 bg-primary text-white p-1 rounded-full border-2 border-white">
                  <CheckCircle2 size={12} fill="currentColor" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">{user.name}</h2>
              <div className="mt-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                  {user.role} Verified
                </span>
              </div>
            </div>
            
            <div className="mt-10 space-y-5 text-left border-t border-border-main pt-8">
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-bg-main flex items-center justify-center text-text-secondary">
                  <Mail size={16} />
                </div>
                <span className="text-text-primary">{user.email}</span>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-bg-main flex items-center justify-center text-text-secondary">
                  <Phone size={16} />
                </div>
                <span className="text-text-primary">+1 (555) 001-2345</span>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-bg-main flex items-center justify-center text-text-secondary">
                  <MapPin size={16} />
                </div>
                <span className="text-text-primary">San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div className="section-card bg-primary text-white border-none shadow-lg shadow-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Award size={24} />
              <h3 className="font-black text-lg">Health Platinum</h3>
            </div>
            <p className="text-xs text-white/80 font-medium leading-relaxed">
              You've maintained your health score above 85 for 3 consecutive months. Check your rewards section for ecosystem benefits.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="section-card">
            <h3 className="text-lg font-black mb-8 flex items-center gap-3">
              <Shield size={20} className="text-primary" />
              Verified Identity & Health Metrics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest block mb-2">Blood Group</label>
                  <p className="font-black text-primary text-2xl tracking-tight">O Positive (O+)</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest block mb-2">Primary Emergency Contact</label>
                  <p className="font-bold text-base text-text-primary">Jane Johnson (Spouse)</p>
                  <p className="text-xs text-text-secondary mt-1">+1 (555) 003-9988</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest block mb-2">Birth Date</label>
                  <p className="font-black text-text-primary text-2xl tracking-tight">June 12, 1992</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest block mb-2">Known Allergies</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest border border-slate-200">Peanuts</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest border border-slate-200">Latex</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3 className="text-lg font-black mb-6 flex items-center gap-3">
              <CheckCircle2 size={20} className="text-primary" />
              AI Activity Log & Suggestions
            </h3>
            <div className="space-y-5">
              {[
                { time: '2 hours ago', text: 'Daily activity goal reached. Your metabolism is showing consistent morning peaks.' },
                { time: 'Yesterday', text: 'Water intake was 15% below target. We recommend setting a smart bottle reminder.' },
                { time: '3 days ago', text: 'Sleep quality score: 92/100. Excellent deep sleep cycles detected.' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mb-1"></div>
                    <div className="w-[1px] flex-1 bg-border-main"></div>
                  </div>
                  <div className="pb-4">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">{log.time}</p>
                    <p className="text-xs text-text-primary font-medium leading-relaxed">{log.text}</p>
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


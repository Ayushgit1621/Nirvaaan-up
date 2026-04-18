import { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 bg-[url('https://picsum.photos/seed/healthcare/1920/1080?blur=10')] bg-cover bg-center">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xs"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-border-main relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            N
          </div>
          <h1 className="text-2xl font-black text-text-main tracking-tight">NIRVAAAN</h1>
          <p className="text-text-muted text-sm mt-2">{isLogin ? 'Sign in to your health portal' : 'Create your secure account'}</p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <LogIn className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full bg-slate-50 border border-border-main rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white transition-all outline-hidden"
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full bg-slate-50 border border-border-main rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white transition-all outline-hidden"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-slate-50 border border-border-main rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white transition-all outline-hidden"
            />
          </div>

          <button 
            onClick={onLogin}
            className="w-full btn-primary py-3 rounded-lg flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/20"
          >
            {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-text-muted hover:text-primary font-medium underline underline-offset-4"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

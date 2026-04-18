import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'emerald';
}

export default function Logo({ className = "", variant = 'emerald' }: LogoProps) {
  const getColors = () => {
    switch(variant) {
      case 'light': return { heart: 'fill-white', line: 'stroke-white' };
      case 'dark': return { heart: 'fill-slate-950', line: 'stroke-slate-950' };
      default: return { heart: 'fill-primary', line: 'stroke-primary' };
    }
  };

  const colors = getColors();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* The Heart Shape */}
        <svg 
          viewBox="0 0 24 24" 
          className={`absolute inset-0 w-full h-full ${colors.heart} opacity-20`}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        
        {/* The Heartbeat Line (EKG) */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`relative z-10 w-8 h-8 ${variant === 'light' ? 'text-white' : 'text-primary'}`}
        >
          <path d="M2 12h3l2-6 3 12 2-6h3l1-2" className="animate-[heartbeat_3s_ease-in-out_infinite]" />
          <path d="M16 10l1 4 1-4 1 4 3-4" className="animate-[heartbeat_3s_ease-in-out_infinite_0.5s]" />
        </svg>
      </div>
      <div>
        <h1 className={`text-xl font-black tracking-tighter leading-none ${variant === 'light' ? 'text-white' : 'text-slate-950'}`}>
          NIRVAAAN
        </h1>
        <p className={`text-[9px] uppercase tracking-[0.3em] font-black mt-1 ${variant === 'light' ? 'text-primary-light/80' : 'text-primary'}`}>
          AI Healthcare
        </p>
      </div>
    </div>
  );
}

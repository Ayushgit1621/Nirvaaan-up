import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export function Skeleton({ className = '', width, height, borderRadius }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className={`bg-slate-200 rounded-md ${className}`}
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
      }}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-10 pb-12 animate-pulse">
      {/* Banner Skeleton */}
      <div className="bg-slate-200 rounded-[40px] h-[320px] w-full" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-10">
          {/* Quick Actions Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white border border-border-main rounded-2xl p-8 h-32 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
                <div className="w-16 h-2 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
          
          {/* Metrics Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-border-main rounded-2xl p-8 h-36">
                <div className="flex justify-between mb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                  <div className="w-12 h-4 bg-slate-100 rounded" />
                </div>
                <div className="w-24 h-8 bg-slate-100 rounded mb-2" />
                <div className="w-16 h-3 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-200 rounded-2xl h-[400px] w-full" />
          <div className="bg-white border border-border-main rounded-2xl p-8 h-48" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="section-card !p-0 overflow-hidden animate-pulse">
      <div className="p-8 border-b border-border-main bg-slate-50/50 flex items-center justify-between">
        <div className="w-48 h-6 bg-slate-200 rounded" />
        <div className="w-64 h-10 bg-slate-200 rounded-xl" />
      </div>
      <div className="p-8 space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-border-main last:border-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-200 rounded-lg" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-slate-200 rounded" />
                <div className="w-20 h-2 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="w-24 h-4 bg-slate-200 rounded" />
            <div className="w-16 h-6 bg-slate-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

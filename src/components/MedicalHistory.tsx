import { useState, useEffect } from 'react';
import { FileText, Download, Eye, Calendar, User, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { TableSkeleton } from './Skeleton';

const records = [
  { id: 1, name: 'Cardiology Report', date: '12 Sep 2023', doctor: 'Dr. Sarah Mitchell', type: 'Laboratory', size: '2.4 MB' },
  { id: 2, name: 'Blood Test Results', date: '15 Aug 2023', doctor: 'City Diagnostics', type: 'Pathology', size: '1.2 MB' },
  { id: 3, name: 'Annual Physical Exams', date: '10 Jan 2023', doctor: 'Dr. James Wilson', type: 'General', size: '4.8 MB' },
  { id: 4, name: 'Dental X-Ray', date: '05 Dec 2022', doctor: 'Smile Dental Clinic', type: 'Radiology', size: '8.5 MB' },
  { id: 5, name: 'COVID-19 Vaccination Certificate', date: '22 Jun 2022', doctor: 'Public Health Center', type: 'Vaccination', size: '512 KB' },
];

export default function MedicalHistory() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="w-64 h-8 bg-slate-100 rounded-xl animate-pulse" />
        <div className="w-40 h-10 bg-slate-100 rounded-xl animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="section-card h-28 animate-pulse bg-slate-50 border-dashed" />
        ))}
      </div>
      <TableSkeleton />
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="typography-h1">Medical History</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Archival records and diagnostic results from throughout your care journey.</p>
        </div>
        <button className="btn-primary">
          <FileText size={16} />
          <span>Import Record</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Verified Records', value: '24', icon: FileText, color: 'text-primary' },
          { label: 'Authorized Providers', value: '08', icon: User, color: 'text-slate-400' },
          { label: 'Scheduled Audits', value: '02', icon: Activity, color: 'text-slate-900' },
        ].map((stat, i) => (
          <div key={i} className="section-card card-hover flex flex-col justify-between h-28">
            <div className="flex items-center justify-between">
              <p className="typography-label lowercase">{stat.label}</p>
              <stat.icon size={14} className={stat.color} />
            </div>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="section-card !p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="typography-h3">Diagnostic Register</h3>
          <div className="flex gap-2">
            <button className="btn-secondary py-1.5 text-xs">Filter by Type</button>
            <button className="btn-secondary py-1.5 text-xs">Download All</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30">
                <th className="px-6 py-4 typography-label">Asset Name</th>
                <th className="px-6 py-4 typography-label">Verified Date</th>
                <th className="px-6 py-4 typography-label">Entity / Provider</th>
                <th className="px-6 py-4 typography-label">Classification</th>
                <th className="px-6 py-4 typography-label text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record, i) => (
                <motion.tr 
                  key={record.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 group-hover:text-primary transition-colors">{record.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{record.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">{record.date}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-700">{record.doctor}</td>
                  <td className="px-6 py-4">
                    <span className="status-badge status-info lowercase">
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-10 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="btn-secondary p-1.5 h-auto">
                        <Eye size={14} />
                      </button>
                      <button className="btn-secondary p-1.5 h-auto">
                        <Download size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

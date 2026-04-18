import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Video, MoreVertical, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { TableSkeleton } from './Skeleton';

const upcoming = [
  { id: 1, doctor: 'Dr. Sarah Mitchell', specialty: 'Cardiologist', date: '21 Oct', time: '10:30 AM', type: 'In Person', location: 'City Hospital, NY', image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783' },
  { id: 2, doctor: 'Dr. John Davies', specialty: 'Dermatologist', date: '25 Oct', time: '02:00 PM', type: 'Virtual', location: 'AI Telelink', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d' },
];

export default function Appointments() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="w-56 h-8 bg-slate-100 rounded-xl animate-pulse" />
        <div className="w-32 h-10 bg-slate-100 rounded-xl animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map(i => (
          <div key={i} className="section-card h-[280px] bg-slate-50 animate-pulse border-dashed" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="typography-h1">Schedule</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Coordinate your clinical visits and digital consultations.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          <span>New Visit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 space-y-6">
          <h2 className="typography-h3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
              <Clock size={16} />
            </div>
            Upcoming Sessions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((appt, i) => (
              <motion.div 
                key={appt.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="section-card card-hover flex flex-col p-6 group"
              >
                <div className="flex gap-6 flex-1">
                  <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl w-24 h-24 shrink-0 transition-colors group-hover:bg-white group-hover:shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Oct</span>
                    <span className="text-3xl font-bold text-slate-900 leading-none">{appt.date.split(' ')[0]}</span>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">{appt.doctor}</h3>
                        <p className="typography-label lowercase mt-1 text-primary">{appt.specialty}</p>
                      </div>
                      <button className="p-1 text-slate-300 hover:text-slate-900 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-1">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={12} className="text-primary" />
                        <span className="text-xs font-semibold">{appt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        {appt.type === 'Virtual' ? <Video size={12} className="text-primary" /> : <MapPin size={12} className="text-primary" />}
                        <span className="text-xs font-semibold">{appt.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex gap-3">
                  <button className="flex-1 btn-primary text-xs py-2.5">
                    {appt.type === 'Virtual' ? 'Join Portal' : 'View Facility'}
                  </button>
                  <button className="flex-1 btn-secondary text-xs py-2.5">
                    Re-schedule
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-12 space-y-6">
          <h2 className="typography-h3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
              <Calendar size={16} />
            </div>
            Availability Register
          </h2>
          <div className="section-card h-64 border-dashed bg-slate-50/20 flex flex-col items-center justify-center text-center p-8">
            <Calendar size={32} className="text-slate-200 mb-4" />
            <p className="text-slate-400 text-xs font-medium max-w-xs leading-relaxed">
              The surgical and outpatient calendar registry is loading. You can sync this with your global platform calendar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

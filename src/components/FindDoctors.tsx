import { useState, useEffect } from 'react';
import { Search, MapPin, Star, Calendar, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'motion/react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    hospital: 'City Hospital, NY',
    rating: 4.9,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200&h=200',
    available: 'Today',
    price: '$120'
  },
  {
    id: 2,
    name: 'Dr. James Wilson',
    specialty: 'Cardiologist',
    hospital: 'Metropolitan Medical',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200',
    available: 'Tomorrow',
    price: '$100'
  },
  {
    id: 3,
    name: 'Dr. Elena Rodriguez',
    specialty: 'Cardiologist',
    hospital: 'Green Valley Clinic',
    rating: 5.0,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200',
    available: '24 Oct',
    price: '$150'
  },
  {
    id: 4,
    name: 'Dr. Robert Chen',
    specialty: 'Cardiologist',
    hospital: 'Health First Center',
    rating: 4.7,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200',
    available: 'Today',
    price: '$110'
  }
];

export default function FindDoctors() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Universal Search Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="max-w-xl">
          <h1 className="typography-h1">Find Specialists</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Connect with top-rated medical professionals in your network area.</p>
        </div>
        
        <div className="relative w-full lg:w-[420px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search specialties, doctors, or clinics..." 
            className="w-full bg-slate-100/50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="section-card h-[420px] bg-slate-50 animate-pulse border-dashed" />
          ))
        ) : (
          doctors.map((doc, i) => (
            <motion.div 
              key={doc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="section-card card-hover flex flex-col group p-5"
            >
              <div className="relative mb-5 overflow-hidden rounded-xl bg-slate-100 aspect-[4/3] border border-slate-100">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md border border-white/20 px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                  <Star size={11} className="fill-primary text-primary" />
                  <span className="text-[11px] font-bold text-slate-900">{doc.rating}</span>
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{doc.name}</h3>
                  <p className="text-xs font-bold text-slate-900 shrink-0">{doc.price}</p>
                </div>
                <p className="text-[11px] font-bold text-primary uppercase tracking-wider">{doc.specialty}</p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
                    <MapPin size={12} />
                  </div>
                  <span className="text-xs font-medium text-slate-500 truncate">{doc.hospital}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-50 flex items-center gap-2">
                <button className="flex-1 btn-primary text-xs py-2.5">
                  Book Visit
                </button>
                <button className="btn-secondary px-3 py-2.5">
                  <MessageSquare size={16} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

import { ShoppingCart, Search, Filter, Plus, Minus, Trash2, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const medicines = [
  { id: 1, name: 'Paracetamol 500mg', type: 'Fever & Pain', price: 12.50, image: 'https://images.unsplash.com/photo-1550572017-ed2002b4227d?auto=format&fit=crop&q=80&w=200&h=200', stock: 120 },
  { id: 2, name: 'Amoxicillin 250mg', type: 'Antibiotics', price: 24.00, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200&h=200', stock: 45 },
  { id: 3, name: 'Vitamin C Syrup', type: 'Supplements', price: 18.25, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=200&h=200', stock: 80 },
  { id: 4, name: 'Insulin Glargine', type: 'Diabetes', price: 45.99, image: 'https://images.unsplash.com/photo-1550572017-ed2002b4227d?auto=format&fit=crop&q=80&w=200&h=200', stock: 15 },
  { id: 5, name: 'Ibuprofen 400mg', type: 'Pain Relief', price: 15.00, image: 'https://images.unsplash.com/photo-1550572017-ed2002b4227d?auto=format&fit=crop&q=80&w=200&h=200', stock: 65 },
  { id: 6, name: 'Cough Syrup', type: 'Cold & Flu', price: 9.50, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=200&h=200', stock: 32 },
];

export default function MedicineOrders() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{id: number, qty: number}[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) return { ...i, qty: Math.max(1, i.qty + delta) };
      return i;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => {
    const med = medicines.find(m => m.id === item.id);
    return acc + (med ? med.price * item.qty : 0);
  }, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      <div className="flex-1 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <h1 className="typography-h1">Pharmacy</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Browse and order certified medical supplies.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search medications..." 
              className="w-full bg-slate-100/50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:bg-white focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="section-card h-80 bg-slate-50 animate-pulse border-dashed" />
            ))
          ) : (
            medicines.map((med, i) => (
              <motion.div 
                key={med.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="section-card group card-hover p-4"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-50 border border-slate-100 relative">
                  <img src={med.image} alt={med.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" referrerPolicy="no-referrer" />
                  {med.stock < 20 && (
                    <div className="absolute top-3 right-3 bg-slate-100 text-slate-700 px-2 py-1 rounded text-[9px] font-bold uppercase border border-slate-200">
                      Low Stock
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{med.type}</p>
                  <h3 className="font-bold text-slate-900 mt-1 truncate">{med.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-slate-900">${med.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(med.id)}
                      className="btn-primary p-2 h-auto"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-full lg:w-[380px]">
        <div className="section-card sticky top-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary-light text-primary rounded-lg flex items-center justify-center">
              <ShoppingCart size={20} />
            </div>
            <h2 className="typography-h3">Review Cart</h2>
          </div>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-slate-400 text-sm font-medium">Your basket is currently empty.</p>
              </div>
            ) : (
              cart.map(item => {
                const med = medicines.find(m => m.id === item.id);
                if (!med) return null;
                return (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0">
                    <img src={med.image} className="w-14 h-14 rounded-lg object-cover border border-slate-100" referrerPolicy="no-referrer" />
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{med.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">${med.price.toFixed(2)} / unit</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center bg-slate-50 rounded-lg px-2 py-1 gap-4 border border-slate-100">
                        <button onClick={() => updateQty(item.id, -1)} className="text-slate-400 hover:text-slate-900"><Minus size={10} /></button>
                        <span className="text-[11px] font-bold text-slate-900">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="text-slate-400 hover:text-slate-900"><Plus size={10} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-primary transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {cart.length > 0 && (
            <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-900 font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">Fullfillment</span>
                <span className="text-primary font-bold">$2.50</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-xl font-bold text-slate-900">${(cartTotal + 2.5).toFixed(2)}</span>
              </div>
              
              <button className="btn-primary w-full h-12 mt-6">
                Complete Purchase
              </button>
              
              <div className="flex items-center gap-2 justify-center pt-4 opacity-50">
                <Activity size={12} className="text-slate-400" />
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                  Secure Medical Checkout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { ShoppingBag, Truck, CheckCircle2, Package, Clock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const activeOrders = [
  {
    id: 'ORD-8291',
    items: ['Paracetamol', 'Cough Syrup'],
    status: 'In Transit',
    step: 3, // 1: Confirmed, 2: Prepared, 3: Shipped, 4: Delivered
    eta: '15 mins',
    price: '$22.00',
    deliveryPartner: 'David K.',
    address: '123 Health Ave, Suite 402, NY'
  }
];

const pastOrders = [
  { id: 'ORD-7622', date: '15 Sep 2023', items: 'Vitamins, First Aid Kit', price: '$45.00', status: 'Delivered' },
  { id: 'ORD-6511', date: '02 Sep 2023', items: 'Amoxicillin', price: '$12.00', status: 'Delivered' },
  { id: 'ORD-5490', date: '12 Aug 2023', items: 'Blood Pressure Monitor', price: '$89.00', status: 'Delivered' },
];

export default function MyOrders() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-text-primary tracking-tight">Track Your Orders</h1>
        <p className="text-text-secondary text-sm font-medium mt-1">Real-time tracking of your medicine and health equipment deliveries</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Active Order Tracking */}
        <div className="space-y-6">
          <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
            <Truck className="text-primary" />
            Active Deliveries
          </h2>
          
          {activeOrders.map(order => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-card border-2 border-primary"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] uppercase font-black text-primary tracking-widest bg-primary/5 px-2 py-1 rounded">Order ID: {order.id}</span>
                  <h3 className="text-lg font-black mt-2">{order.items.join(', ')}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Est. Delivery</p>
                  <p className="text-xl font-black text-primary">{order.eta}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-12">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-1000"
                  style={{ width: `${(order.step - 1) * 33.3}%` }}
                ></div>
                
                <div className="flex justify-between relative">
                  {[
                    { label: 'Confirmed', icon: CheckCircle2 },
                    { label: 'Packed', icon: Package },
                    { label: 'Shipped', icon: Truck },
                    { label: 'Arriving', icon: MapPin }
                  ].map((s, i) => {
                    const isActive = i + 1 <= order.step;
                    const Icon = s.icon;
                    return (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all duration-500 ${isActive ? 'bg-primary text-white scale-110' : 'bg-slate-200 text-text-secondary'}`}>
                          <Icon size={16} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-primary' : 'text-text-secondary'}`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-bg-main rounded-xl p-6 grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-secondary shadow-sm">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black text-text-secondary tracking-widest">Delivery Partner</p>
                    <p className="text-sm font-bold text-text-primary">{order.deliveryPartner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-secondary shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black text-text-secondary tracking-widest">Destination</p>
                    <p className="text-sm font-bold text-text-primary truncate">{order.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order History */}
        <div className="space-y-6">
          <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
            <ShoppingBag className="text-primary" />
            Order History
          </h2>
          
          <div className="section-card space-y-4">
            {pastOrders.map((order, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-border-main rounded-xl hover:border-primary transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-text-secondary group-hover:bg-primary group-hover:text-white transition-all">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Order ID: {order.id}</p>
                    <p className="font-bold text-sm text-text-primary">{order.items}</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-text-primary">{order.price}</p>
                  <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-widest">{order.status}</p>
                </div>
              </div>
            ))}
            <button className="w-full text-center py-2 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-primary transition-colors">
              Load More History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

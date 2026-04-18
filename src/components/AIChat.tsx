import { useState } from 'react';
import { Send, Sparkles, X, Minimize2, Maximize2, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../types';

interface AIChatProps {
  user: User;
}

export default function AIChat({ user }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'ai', text: `Hello ${user.name.split(' ')[0]}! I am your NIRVAAAN assistant. How can I help you today? I have access to your health score and recent reports.` }
  ]);

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice capture
      setTimeout(() => {
        const voiceText = "I have a slight fever today.";
        setMessage(voiceText);
        setIsListening(false);
      }, 3000);
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    setChat(prev => [...prev, { role: 'user', text: message }]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'ai', 
        text: "Based on your latest blood pressure sync (120/80), you are in the optimal range. Would you like to see a trend chart for the last 30 days?" 
      }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 text-white cursor-pointer hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all z-40 group"
      >
        <Sparkles size={24} fill="currentColor" className="group-hover:animate-pulse" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-light border-2 border-white rounded-full" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              filter: 'blur(0px)',
              height: isMinimized ? '72px' : '520px'
            }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
            className="fixed bottom-8 right-8 w-[380px] bg-white border border-slate-100 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-white/10 relative">
              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-tight text-white leading-none">NIRVAAAN Orchestrator</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-light">Secure Bio-Link Active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Context Status Banner */}
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white rounded-md border border-slate-200 flex items-center justify-center">
                        <div className="w-1 h-1 bg-slate-400 rounded-full" />
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">EHR Context Synchronized</span>
                    </div>
                    <span className="text-[9px] font-bold text-primary tabular-nums">ID: {user.id.slice(0, 8)}</span>
                  </div>
                  
                  {/* Health Score Mini Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                        <Activity size={14} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Health Score</p>
                        <p className="text-sm font-black text-slate-900 leading-none tracking-tight">88.4 / 100</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-primary uppercase tracking-widest leading-none mb-1">+2.1%</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Weekly Delta</p>
                    </div>
                  </div>
                </div>

                {/* Chat body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 scrollbar-hide">
                  {chat.map((msg, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0 mt-1 relative overflow-hidden">
                        {msg.role === 'user' ? (
                          user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <div className="text-[10px] font-bold text-slate-400">ME</div>
                        ) : (
                          <Sparkles size={14} className="text-primary" fill="currentColor" />
                        )}
                      </div>
                      <div className={`max-w-[75%] p-5 text-[13px] leading-relaxed font-medium transition-all group relative ${
                        msg.role === 'user' 
                          ? 'bg-slate-900 shadow-xl shadow-slate-200 text-white rounded-[24px] rounded-tr-none' 
                          : 'bg-white shadow-sm border border-slate-100 text-slate-700 rounded-[24px] rounded-tl-none hover:shadow-md'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-6 bg-white border-t border-slate-100">
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type clinical query or medication scan..."
                      className="w-full py-4 pl-5 pr-28 text-sm rounded-2xl font-medium shadow-inner input-diagnostic border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <button 
                        onClick={toggleVoice}
                        className={`p-2.5 rounded-xl transition-all relative flex items-center justify-center ${
                          isListening 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' 
                            : 'bg-slate-50 text-slate-400 hover:text-primary hover:bg-white border border-slate-100 hove:shadow-sm'
                        }`}
                      >
                        {isListening ? (
                          <>
                            <Mic size={18} />
                            <span className="absolute inset-0 bg-white/20 rounded-xl animate-ping" />
                          </>
                        ) : <Mic size={18} />}
                      </button>
                      <button 
                        onClick={handleSend}
                        className="p-2.5 bg-slate-900 text-white rounded-xl shadow-xl shadow-slate-200 hover:bg-primary transition-all active:scale-95 flex items-center justify-center"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-[0.2em] mt-4">
                    Medical Intelligence Encryption Active
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

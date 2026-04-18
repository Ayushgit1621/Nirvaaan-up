import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  Mic, 
  Search, 
  AlertCircle, 
  RefreshCw, 
  ChevronRight, 
  AlertTriangle,
  Activity,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useState } from 'react';
import { analyzeSymptoms, SymptomAnalysis } from '../services/geminiService';

export default function SymptomChecker() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<SymptomAnalysis | null>(null);

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice capture
      setTimeout(() => {
        const voiceText = "I have a sharp pain in my lower back that radiates down my left leg.";
        setQuery(voiceText);
        setIsListening(false);
      }, 4000);
    }
  };

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const analysis = await analyzeSymptoms(query);
      setResult(analysis);
    } catch (error) {
      console.error("AI Analysis Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-primary-light text-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/10 border border-primary/10 transition-transform hover:rotate-6">
          <Stethoscope size={40} />
        </div>
        <h1 className="typography-h1 !text-5xl mb-4 leading-tight">AI Diagnostic <br />Intelligence</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
          Describe your physiological state in natural language. Our neural engine will orchestrate a critical analysis of your symptoms.
        </p>
      </div>

      <motion.div 
        layout
        className="section-card !p-12 shadow-2xl shadow-slate-200/50 relative z-10 overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Stethoscope size={120} />
        </div>
        
        <div className="relative mb-10 group px-2">
          <div className="flex items-center justify-between mb-4">
            <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Diagnostic Input Terminal</label>
            <div className="flex items-center gap-4">
              {query.length > 20 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[8px] font-black text-primary uppercase tracking-widest">Confidence Correlation</span>
                  <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(query.length / 3, 100)}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                </motion.div>
              )}
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border border-slate-100 transition-all ${isListening ? 'bg-primary/5 border-primary/20' : 'bg-slate-50'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-primary animate-pulse' : 'bg-slate-300'}`} />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                  {isListening ? 'Neural Capture Active' : 'System Ready'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="System Awaiting Symptom Narrative...&#10;&#10;Examples:&#10;• 'Intense sub-sternal pressure radiating to the left mandible, associated with diaphoresis.'&#10;• 'Cyclical nausea and abdominal distension specifically 30 minutes post-prandial for 4 days.'&#10;• 'Unilateral lower limb edema with localized erythema and warmth since previous morning.'"
              className="w-full min-h-[260px] p-10 rounded-[40px] text-xl font-display font-medium text-slate-900 leading-relaxed shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] input-diagnostic resize-none placeholder:text-slate-300 placeholder:not-italic focus:ring-8 focus:ring-primary/5 transition-all border-slate-100 bg-white"
            />
            <div className="absolute bottom-8 right-8 flex gap-3">
               <button 
                onClick={toggleVoice}
                title="Voice Input (AI Orchestrated)" 
                className={`w-16 h-16 rounded-[24px] shadow-lg hover:shadow-2xl transition-all flex items-center justify-center border overflow-hidden relative group/mic active:scale-95 ${
                  isListening ? 'bg-primary text-white border-primary-dark rotate-3' : 'bg-white text-slate-400 hover:text-primary border-slate-200 group-hover:scale-105 group-hover:-rotate-3'
                }`}
               >
                  <div className={`absolute inset-0 bg-primary/0 ${!isListening && 'group-hover/mic:bg-primary/5'} transition-colors`} />
                  {isListening ? (
                    <>
                      <Mic size={28} className="animate-pulse" />
                      <span className="absolute inset-0 bg-white/20 animate-ping rounded-full" />
                    </>
                  ) : <Mic size={28} />}
               </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100">
          <div className="flex items-start gap-3 text-slate-400 max-w-sm">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
               <Info size={14} className="text-slate-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] leading-relaxed text-slate-400/80">Neural engine analyzes temporal and qualitative biological indicators. Core diagnostic orchestration only.</span>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => { setQuery(''); setResult(null); }}
              className="px-8 py-3.5 font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all flex-1 md:flex-initial"
            >
              Reset
            </button>
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn-primary flex-1 md:flex-initial !py-4 !px-12 !text-xs"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Orchestrating Analysis...
                </>
              ) : (
                <>
                  <Activity size={18} />
                  Analyze Symptoms
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="mt-12 space-y-8"
          >
            {/* Emergency Ribbon - Match Reference Screenshot */}
            {result.isEmergency && (
              <motion.div 
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="bg-slate-950 border border-slate-800 rounded-3xl p-8 flex items-start gap-6 text-white overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-display font-bold text-white mb-1">Critical: Potential Emergency</h3>
                  <p className="text-white/60 font-medium leading-relaxed">
                    {result.emergencyMessage || "This may require immediate clinical attention. Please visit the nearest emergency room or call emergency services (911) immediately. Time is critical."}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              {/* Detected Symptoms */}
              <div className="section-card p-10">
                <h3 className="typography-h3 mb-8 flex items-center gap-3">
                  <Activity size={20} className="text-primary" />
                  Extracted Symptoms
                </h3>
                <div className="flex flex-wrap gap-3">
                  {result.detectedSymptoms.map((symptom, i) => (
                    <span key={i} className="px-5 py-2.5 bg-primary-light/50 text-primary border border-primary/10 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 size={12} />
                       {symptom}
                    </span>
                  ))}
                </div>
              </div>

              {/* Probable Conditions - Match Reference Screenshot Style */}
              <div className="section-card p-10">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="typography-h3 flex items-center gap-3">
                    <Search size={20} className="text-primary" />
                    Probable Conditions
                  </h3>
                  <span className="typography-label uppercase">Confidience Correlation</span>
                </div>
                
                <div className="space-y-8">
                  {result.probableConditions.map((condition, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-display font-bold text-slate-900">{condition.condition}</span>
                        <span className="font-mono font-bold text-slate-400 text-xs">{condition.probability}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative border border-slate-50 shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${condition.probability}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-primary shadow-sm relative"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                      <Bot size={18} />
                   </div>
                   <p className="text-[11px] text-slate-500 font-medium flex-1">
                      This analysis is AI-generated and for informational purposes only. Always consult a qualified healthcare professional for proper medical advice.
                   </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Examples */}
      {!result && !isAnalyzing && (
        <div className="mt-16 text-center">
          <h4 className="typography-label !text-slate-300 mb-8 lowercase">Pre-defined simulation queries</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Heavy pressure in chest and cold sweat",
              "Persistent dry coughing with fatigue",
              "Acute lower abdominal pain",
              "Sudden loss of balance and blurred vision"
            ].map((ex, i) => (
              <button 
                key={i} 
                onClick={() => setQuery(ex)}
                className="px-6 py-2.5 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-500 hover:border-primary hover:text-primary hover:shadow-md transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Bot({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

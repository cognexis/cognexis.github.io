import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Cpu, 
  Layers, 
  RefreshCw, 
  Zap, 
  Binary, 
  Activity, 
  ShieldAlert, 
  Info,
  Maximize2,
  Table as TableIcon,
  ArrowRight
} from 'lucide-react';

// --- Components ---

const TechnicalBorder = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`blueprint-border bg-white/50 backdrop-blur-sm p-6 ${className}`}>
    {children}
  </div>
);

const MetricCard = ({ label, formula, description }: { label: string; formula: string; description: string }) => (
  <TechnicalBorder className="flex flex-col gap-3">
    <div className="flex justify-between items-start">
      <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-black/60">{label}</h4>
      <Info size={14} className="text-black/30" />
    </div>
    <div className="bg-[#1A1A1A] p-4 text-white font-mono text-lg flex items-center justify-center min-h-[60px]">
      {formula}
    </div>
    <p className="text-sm text-black/70 leading-relaxed">{description}</p>
  </TechnicalBorder>
);

const RecurrentDiagram = ({ loops = 3 }: { loops?: number }) => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    {/* Background Grid for detail */}
    <div className="absolute inset-0 border border-dashed border-black/5 rounded-full" />
    
    {/* Rotating Loops */}
    {[...Array(loops)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute border border-black/20 rounded-full"
        style={{ 
          width: `${(i + 1) * 20}%`, 
          height: `${(i + 1) * 20}%`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
      />
    ))}
    
    {/* Core Block */}
    <div className="z-10 w-16 h-16 bg-[#1A1A1A] flex items-center justify-center transform rotate-45 border-4 border-white shadow-xl">
      <RefreshCw className="text-white -rotate-45" size={24} />
    </div>
    
    {/* Dynamic Arrows */}
    <svg className="absolute inset-0 w-full h-full -rotate-90">
      <circle 
        cx="50%" cy="50%" r="45%" 
        fill="none" 
        stroke="black" 
        strokeWidth="1" 
        strokeDasharray="5,5" 
        className="opacity-20"
      />
    </svg>
  </div>
);

export default function App() {
  const [dialValue, setDialValue] = useState(8);
  const [activeTab, setActiveTab] = useState('architecture');

  return (
    <div className="min-h-screen selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black flex items-center justify-center">
            <RefreshCw className="text-white" size={18} />
          </div>
          <span className="font-extrabold text-xl tracking-tighter uppercase italic">Cognexis</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-mono font-bold uppercase tracking-widest">
          <a href="#architecture" className="hover:text-black/50 transition-colors">Architecture</a>
          <a href="#economics" className="hover:text-black/50 transition-colors">Economics</a>
          <a href="#fleet" className="hover:text-black/50 transition-colors">Fleet</a>
          <a href="#research" className="hover:text-black/50 transition-colors">Research</a>
        </div>
        <button className="bg-black text-white text-[10px] font-mono px-4 py-2 uppercase tracking-widest font-bold hover:bg-black/80 transition-colors">
          Access Engine
        </button>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32">
        
        {/* --- Hero Section --- */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-block bg-black text-white px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em]">
              Computing Paradigm Shift
            </div>
            <h1 className="text-7xl md:text-8xl font-black leading-none tracking-tighter">
              Cognexis <br />
              <span className="text-black/20">Leap v1</span>
            </h1>
            <p className="text-2xl text-black/60 font-medium leading-tight max-w-lg">
              Decoupling Reasoning Depth from Parameter Count with Recurrent-Depth Transformers.
            </p>
            <div className="flex gap-4 pt-4">
              <TechnicalBorder className="py-2 px-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-[10px] uppercase font-bold text-black/60">System Ready: Recurrent Core Enabled</span>
              </TechnicalBorder>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center relative"
          >
            <RecurrentDiagram loops={5} />
            <div className="absolute -bottom-8 -right-8">
              <TechnicalBorder className="bg-white p-4 max-w-[200px]">
                <p className="font-mono text-[10px] leading-tight text-black/50 italic">
                  "A single block is reused, refining the hidden state identically to deep equilibrium models."
                </p>
              </TechnicalBorder>
            </div>
          </motion.div>
        </section>

        {/* --- The Shift (Table/Comparison) --- */}
        <section id="architecture" className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight uppercase">A Fundamental Shift in Scaling Economics</h2>
            <div className="h-1 w-20 bg-black" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <TechnicalBorder className="space-y-6">
              <div className="flex items-center gap-3">
                <Layers className="text-black/30" />
                <h3 className="font-bold text-lg uppercase">Traditional Stacking</h3>
              </div>
              <ul className="space-y-4 font-mono text-sm">
                <li className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/40">Parameter Growth</span>
                  <span className="font-bold">Linear w/ Depth</span>
                </li>
                <li className="flex justify-between border-b border-black/5 pb-2 text-red-500">
                  <span className="text-red-500/40">Memory Footprint</span>
                  <span className="font-bold">Massive (Unique Weights)</span>
                </li>
                <li className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/40">Reasoning Control</span>
                  <span className="font-bold">Hardcoded at Training</span>
                </li>
              </ul>
            </TechnicalBorder>

            <TechnicalBorder className="bg-black text-white space-y-6">
              <div className="flex items-center gap-3">
                <RefreshCw className="text-white/30" />
                <h3 className="font-bold text-lg uppercase">Cognexis Recurrence</h3>
              </div>
              <ul className="space-y-4 font-mono text-sm">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">Parameter Growth</span>
                  <span className="font-bold text-blue-400">Constant (Shared Block)</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">Memory Footprint</span>
                  <span className="font-bold text-blue-400">Minimal (Tied Weights)</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">Reasoning Control</span>
                  <span className="font-bold text-blue-400">Runtime Dial (Budget)</span>
                </li>
              </ul>
            </TechnicalBorder>
          </div>
        </section>

        {/* --- Interactive Dial Section --- */}
        <section className="bg-[#1A1A1A] text-white p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="h-full w-full border-t border-white/20 scale-150 rotate-12" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-black tracking-tighter">Reasoning depth as a runtime parameter.</h2>
              <p className="text-white/60 text-lg max-w-md">
                Cognexis breaks static scaling. By reusing a shared core, it matches processing power to problem complexity—token by token.
              </p>
              
              <div className="space-y-8 pt-8">
                <div className="space-y-4">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/40">
                    <span>Zero-Shot Speed</span>
                    <span>Deep Reasoning</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="24" 
                    value={dialValue} 
                    onChange={(e) => setDialValue(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-white"
                  />
                  <div className="flex justify-between font-mono text-xs">
                    <span>N = 1 Loop</span>
                    <span className="text-blue-400 font-bold uppercase">Budget: N = {dialValue} Loops</span>
                    <span>N = 24 Loops</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-80 h-80 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={dialValue}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="absolute inset-0 border-2 border-white/10 rounded-full flex items-center justify-center"
                  >
                    {[...Array(Math.min(dialValue, 12))].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute border border-blue-400/30 rounded-full" 
                        style={{ width: `${(i+1) * 8}%`, height: `${(i+1) * 8}%` }}
                      />
                    ))}
                    <div className="text-6xl font-black tracking-tighter">{dialValue}x</div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* --- Metrics / Economics --- */}
        <section id="economics" className="space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tight uppercase">Quantifying Recurrence</h2>
              <p className="text-black/50 font-mono text-sm italic">Economic vocabulary for compute-adaptive intelligence.</p>
            </div>
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-black/5 flex items-center justify-center"><Binary size={18} /></div>
              <div className="w-10 h-10 bg-black/5 flex items-center justify-center"><Activity size={18} /></div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              label="Depth Efficiency Index" 
              formula="DEI(N)"
              description="Measures performance gain per unit of compute integrated over N loops."
            />
            <MetricCard 
              label="Loop Saturation Point" 
              formula="argmax DEI(N)"
              description="The loop count where efficiency maximizes for standard inference."
            />
            <MetricCard 
              label="Overthinking Threshold" 
              formula="min { N : Perf < Gain }"
              description="The point where additional iterations introduce noise and destabilize hidden states."
            />
            <MetricCard 
              label="Depth Gain Ratio" 
              formula="M(N) / M(0)"
              description="Total performance gain from recurrence compared to the baseline zero-loop model."
            />
          </div>
        </section>

        {/* --- Architecture Tabs --- */}
        <section id="architecture-detail" className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-3xl font-black uppercase leading-none">The Prelude-Recurrent-Coda Engine</h2>
            <div className="space-y-2">
              {[
                { id: 'prelude', label: 'Prelude (L_p)', icon: <Layers size={16} /> },
                { id: 'recurrent', label: 'Recurrent Core (L_r)', icon: <RefreshCw size={16} /> },
                { id: 'coda', label: 'Coda (L_c)', icon: <ArrowRight size={16} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 p-4 border transition-all font-mono text-xs font-bold uppercase tracking-widest ${
                    activeTab === tab.id 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black/40 border-black/5 hover:border-black/20'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <TechnicalBorder className="h-full">
                  {activeTab === 'prelude' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold uppercase tracking-tight">Initial Representation Building</h3>
                      <p className="text-black/70 leading-relaxed">
                        6-12 standard GPT-style blocks build initial representations using Grouped Query Attention (GQA) and Rotary Position Encodings (RoPE). This phase prepares the token sequence for the deep reasoning core.
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-3 bg-black/5 font-mono text-[10px]">FIXED_WIDTH = 4096</div>
                        <div className="p-3 bg-black/5 font-mono text-[10px]">HEADS = 32</div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'recurrent' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold uppercase tracking-tight">The Reasoning Engine (Core)</h3>
                      <p className="text-black/70 leading-relaxed">
                        A single refined block loops N times to deepen reasoning. The hidden state update mechanism follows: 
                        <span className="block my-4 p-4 bg-black text-white font-mono text-center italic">h_t+1 = h_t + R(h_t)</span>
                        Spectral normalization ensures stability even across 24+ iterations.
                      </p>
                    </div>
                  )}
                  {activeTab === 'coda' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold uppercase tracking-tight">Final Integration</h3>
                      <p className="text-black/70 leading-relaxed">
                        The Coda blocks integrate post-recurrence data for the language modeling head. These final transformer blocks smooth out the recurrent oscillations and map the high-dimensional hidden state back to the vocabulary.
                      </p>
                    </div>
                  )}
                </TechnicalBorder>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* --- Fleet Table --- */}
        <section id="fleet" className="space-y-12">
           <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight uppercase">Cognexis Fleet Configuration</h2>
            <p className="text-black/50 max-w-2xl">
              Training distributed via FSDP scales the embedding and attention heads, but the reasoning engine remains a single, highly refined loop.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b-2 border-black bg-black/5">
                  <th className="p-4 uppercase tracking-widest font-black">Model</th>
                  <th className="p-4 uppercase tracking-widest font-black">Hidden Size</th>
                  <th className="p-4 uppercase tracking-widest font-black">Heads</th>
                  <th className="p-4 uppercase tracking-widest font-black">Prelude (L_p)</th>
                  <th className="p-4 uppercase tracking-widest font-black bg-blue-100 text-blue-900">Recurrent (L_r)</th>
                  <th className="p-4 uppercase tracking-widest font-black">Coda (L_c)</th>
                  <th className="p-4 uppercase tracking-widest font-black">Max Loops</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Cognexis-8B', size: 4096, heads: 32, p: 8, r: 1, c: 8, max: 12 },
                  { name: 'Cognexis-64B', size: 8192, heads: 64, p: 10, r: 1, c: 10, max: 16 },
                  { name: 'Cognexis-256B', size: 12288, heads: 96, p: 12, r: 1, c: 12, max: 20 },
                  { name: 'Cognexis-1.28T', size: 16384, heads: 128, p: 16, r: 1, c: 16, max: 24 },
                ].map((m) => (
                  <tr key={m.name} className="border-b border-black/5 hover:bg-black/[0.02] transition-colors">
                    <td className="p-4 font-bold text-sm tracking-tighter">{m.name}</td>
                    <td className="p-4 text-black/50">{m.size}</td>
                    <td className="p-4 text-black/50">{m.heads}</td>
                    <td className="p-4 text-black/50">{m.p}</td>
                    <td className="p-4 bg-blue-50 font-bold text-blue-600">{m.r}</td>
                    <td className="p-4 text-black/50">{m.c}</td>
                    <td className="p-4 font-bold">{m.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Stability & Security (Circular Cards) --- */}
        <section className="grid md:grid-cols-3 gap-8">
           {[
             { title: "Loop Stability", desc: "Excessive iterations risk divergence. Strict hard limits and hidden state norm monitoring prevent spectral explosions.", icon: <Activity size={24}/> },
             { title: "Resource Exhaustion", desc: "Adaptive compute creates vulnerability to maliciously complex prompts. Enforced compute budgets per inference call.", icon: <ShieldAlert size={24}/> },
             { title: "Timing Side Channels", desc: "Observers can infer prompt difficulty via latency. Deliberate randomization of loop counts in high-risk deployments.", icon: <RefreshCw size={24}/> }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center text-center p-8 border border-black/5 bg-white space-y-6">
                <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center relative">
                   <div className="absolute inset-0 border-t-2 border-black rounded-full animate-spin [animation-duration:3s]" />
                   {item.icon}
                </div>
                <h3 className="font-bold uppercase tracking-widest text-sm">{item.title}</h3>
                <p className="text-xs text-black/50 leading-loose uppercase font-mono tracking-wider">{item.desc}</p>
             </div>
           ))}
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-black px-6 py-12 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black flex items-center justify-center">
                <RefreshCw className="text-white" size={14} />
              </div>
              <span className="font-black text-lg tracking-tight uppercase">Cognexis</span>
            </div>
            <p className="text-xs font-mono text-black/40 uppercase leading-relaxed tracking-widest">
              A Project by the Recurrent Research Group. <br />
              Open Source v1.0.0-Leap
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="space-y-4">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/30">Science</h4>
                <ul className="text-xs font-bold uppercase tracking-wider space-y-2">
                   <li><a href="#" className="hover:underline">DEQ Models</a></li>
                   <li><a href="#" className="hover:underline">ACT Optimization</a></li>
                   <li><a href="#" className="hover:underline">Scaling Laws</a></li>
                </ul>
             </div>
             <div className="space-y-4">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/30">Fleet</h4>
                <ul className="text-xs font-bold uppercase tracking-wider space-y-2">
                   <li><a href="#" className="hover:underline">8B Small-Refined</a></li>
                   <li><a href="#" className="hover:underline">1.28T Deep-Loop</a></li>
                </ul>
             </div>
             <div className="space-y-4">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/30">Connect</h4>
                <ul className="text-xs font-bold uppercase tracking-wider space-y-2">
                   <li><a href="#" className="hover:underline">GitHub</a></li>
                   <li><a href="#" className="hover:underline">ArXiv</a></li>
                </ul>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/5 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-black/30">
          <span>© 2026 COGNEXIS TECHNOLOGIES</span>
          <span>SYSTEM_TIME: 2026-04-28_06:38</span>
        </div>
      </footer>
    </div>
  );
}

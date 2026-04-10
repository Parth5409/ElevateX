import React from 'react';

const StudentDashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Welcome & Profile Column */}
      <div className="col-span-8 space-y-8">
        {/* Hero Welcome Card */}
        <section className="glass-card rounded-2xl p-8 relative overflow-hidden flex items-end min-h-[320px]">
          <img className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="abstract" src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop" />
          <div className="relative z-10 w-full flex justify-between items-end">
            <div className="max-w-md">
              <span className="bg-primary-container/10 text-primary-container px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">System Status: Active</span>
              <h2 className="text-5xl font-black tracking-tighter text-white leading-none">Welcome back, Alex.</h2>
              <p className="text-secondary mt-4 text-lg">Your kinetic engine is optimized. 4 new placement matches are ready for review.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative h-28 w-28 flex items-center justify-center">
                <svg className="h-full w-full -rotate-90">
                  <circle cx="56" cy="56" fill="transparent" r="50" stroke="rgba(250,91,49,0.1)" strokeWidth="8"></circle>
                  <circle cx="56" cy="56" fill="transparent" r="50" stroke="#fa5b31" strokeDasharray="314" strokeDashoffset="47" strokeLinecap="round" strokeWidth="8"></circle>
                </svg>
                <span className="absolute text-2xl font-black text-white">85%</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary mt-3">Profile Completion</span>
            </div>
          </div>
        </section>

        {/* Placement Status Bento */}
        <div className="grid grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-6 ai-glow">
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-primary-container text-3xl">work_history</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] font-bold">SHORTLISTED</span>
            </div>
            <h3 className="text-tertiary text-xs font-bold uppercase tracking-widest mb-1">Active Placement</h3>
            <p className="text-xl font-bold text-white mb-2">TechNova Systems</p>
            <p className="text-secondary text-sm">Senior AI Research Analyst</p>
            <div className="mt-6 flex items-center gap-2">
              <div className="h-1 flex-1 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-[75%]"></div>
              </div>
              <span className="text-[10px] font-bold text-tertiary">STAGE 3/4</span>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-tertiary text-3xl">psychology_alt</span>
              <span className="text-primary-container text-[10px] font-bold">NEXT UP</span>
            </div>
            <h3 className="text-tertiary text-xs font-bold uppercase tracking-widest mb-1">Recommended Training</h3>
            <p className="text-xl font-bold text-white mb-2">Neural Architectures</p>
            <p className="text-secondary text-sm">Estimated effort: 12 hours</p>
            <button className="mt-6 w-full py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-all border border-white/10">Resume Module</button>
          </div>
        </div>
      </div>

      {/* Intelligence Stream Sidebar */}
      <div className="col-span-4">
        <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black tracking-tight text-white">Intelligence Stream</h3>
            <span className="material-symbols-outlined text-primary-container">sensors</span>
          </div>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            
            <div className="relative pl-6 border-l border-primary-container/20 pb-2">
              <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary-container"></div>
              <p className="text-[10px] font-bold text-primary-container uppercase tracking-widest">Just Now</p>
              <p className="text-sm font-bold text-white mt-1">Skill Gap Analyzed</p>
              <p className="text-xs text-secondary mt-1">AI detected missing proficiency in 'TensorFlow 2.0' based on TechNova requirements.</p>
            </div>
            
            <div className="relative pl-6 border-l border-white/10 pb-2">
              <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-surface-container-highest"></div>
              <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest">2 hours ago</p>
              <p className="text-sm font-bold text-white mt-1">New Match Identified</p>
              <p className="text-xs text-secondary mt-1">QuantumLogic Inc. matches 92% of your core kinetic profile.</p>
            </div>
            
          </div>
          <button className="mt-8 w-full text-center text-[10px] font-bold text-tertiary hover:text-white uppercase tracking-widest py-2 border-t border-white/5 pt-4 transition-colors">
            View Full Activity
          </button>
        </div>
      </div>

      {/* Bottom Metric Cards */}
      <div className="col-span-12 grid grid-cols-4 gap-8">
        <div className="bg-surface-container-low rounded-2xl p-6 border-b-2 border-primary-container/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-tertiary text-[10px] font-bold uppercase tracking-widest">Intelligence Score</span>
            <span className="material-symbols-outlined text-primary-container text-lg" style={{fontVariationSettings: "'FILL' 1"}}>insights</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">2,840</span>
            <span className="text-xs font-bold text-green-400">+12%</span>
          </div>
        </div>
        
        <div className="bg-surface-container-low rounded-2xl p-6 border-b-2 border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-tertiary text-[10px] font-bold uppercase tracking-widest">New Matches</span>
            <span className="material-symbols-outlined text-tertiary text-lg">hub</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">04</span>
            <span className="text-[10px] font-bold text-primary-container px-1.5 py-0.5 bg-primary-container/10 rounded">NEW</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

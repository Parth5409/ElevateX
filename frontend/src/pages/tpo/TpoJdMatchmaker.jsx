import React, { useState } from 'react';
import { matchJD } from '../../services/aiService';

const TpoJdMatchmaker = () => {
  const [jdText, setJdText] = useState('');
  const [matches, setMatches] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!jdText) return;
    setIsAnalyzing(true);
    try {
      const results = await matchJD(jdText);
      setMatches(results);
    } catch (e) {
      console.error(e);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="font-['Inter'] font-bold uppercase tracking-widest text-[10px] text-[#fa5b31] mb-2 block">Placement Matchmaker</span>
          <h2 className="text-5xl font-extrabold tracking-tighter text-white">Find Your <span className="text-primary-container">Perfect Talent.</span></h2>
        </div>
        <div className="text-right">
          <p className="text-secondary/60 text-sm max-w-xs italic">Kinetic intelligence mapping job architectures to individual talent signatures.</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Job Description Input */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-8 ai-glow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-8xl">description</span>
            </div>
            <label className="block text-xs font-black uppercase tracking-widest text-secondary mb-4">Input Job Architecture</label>
            <textarea
              className="w-full h-96 bg-surface-container-low/50 border-none rounded-xl p-6 text-on-surface placeholder:text-secondary/30 focus:ring-2 focus:ring-primary-container/20 transition-all font-mono text-sm leading-relaxed outline-none"
              placeholder="Paste the Job Description here... AI will extract core competencies, kinetic potential, and culture fit requirements automatically."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            ></textarea>

            <div className="mt-6 flex justify-between items-center">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20">AI EXTRACTOR ACTIVE</span>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-primary-container text-white px-8 py-3 rounded-xl font-black text-sm tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-container/20 focus:outline-none disabled:opacity-50 disabled:scale-100"
              >
                {isAnalyzing ? 'ANALYZING...' : 'RUN MATCHMAKER'}
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex items-center gap-6">
            <div className="h-12 w-12 bg-surface-container-highest rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container">auto_awesome</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Kinetic Scoring Enabled</h4>
              <p className="text-xs text-secondary/60">Using V4.2 Neural Models for behavioral alignment.</p>
            </div>
          </div>
        </div>

        {/* Right: Results & Analysis */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
              Top Potential Matches
              <span className="text-xs font-normal text-secondary/40 bg-surface-container-low px-2 py-0.5 rounded">Processed {matches.length ? '1,240' : '0'} Profiles</span>
            </h3>
            <div className="flex gap-2">
              <button className="p-2 bg-surface-container rounded-lg text-secondary hover:text-white"><span className="material-symbols-outlined text-sm">filter_list</span></button>
            </div>
          </div>

          {/* Match Table/Cards */}
          <div className="space-y-4">
            {!matches.length && !isAnalyzing && (
              <div className="p-8 text-center text-secondary">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search</span>
                <p>Run matchmaker to see top candidates</p>
              </div>
            )}

            {matches.map((match, idx) => (
              <div key={match.student._id} className={`glass-card p-1 rounded-2xl ${idx === 0 ? 'border-primary-container/30 shadow-xl shadow-primary-container/5' : ''}`}>
                <div className={`${idx === 0 ? 'bg-surface-container-low' : 'bg-transparent hover:bg-surface-container'} rounded-[14px] p-6 flex items-center justify-between transition-colors`}>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 bg-surface-container flex items-center justify-center font-bold text-secondary text-2xl">
                        {match.student.full_name.substring(0, 1)}
                      </div>
                      {idx === 0 && <div className="absolute -bottom-1 -right-1 bg-primary-container text-[8px] font-black text-white px-1.5 py-0.5 rounded border border-surface">TOP</div>}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{match.student.full_name}</h4>
                      <p className="text-xs text-secondary/50 font-medium">{match.student.branch} • CGPA: {match.student.cgpa}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-[10px] font-black uppercase text-primary mb-1">Match Score</div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary-container" style={{ width: `${match.match_percentage}%` }}></div>
                        </div>
                        <span className="text-xl font-black text-white italic">{match.match_percentage}%</span>
                      </div>
                    </div>
                    <button className="h-10 w-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary-container hover:text-white transition-all">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {matches.length > 0 && (
              <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-surface-container to-surface-container-low border-l-4 border-primary-container mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-primary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container text-lg">hub</span>
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-white">Why {matches[0].student.full_name}? <span className="text-primary text-[10px] ml-2 lowercase font-mono">/ai_analysis_report</span></h4>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-secondary/40 uppercase mb-1">Kinetic Alignment</p>
                      <p className="text-xs text-on-surface leading-relaxed">Demonstrates a <span className="text-primary">{matches[0].match_percentage}% velocity match</span> for your high-growth environment.</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-secondary/40 uppercase mb-1">Skill Synthesis</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {matches[0].student.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 bg-surface-container-highest rounded text-[10px] border border-white/5">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest/50 rounded-xl p-4 border border-white/5">
                    <p className="text-[10px] font-bold text-secondary/40 uppercase mb-3">Critical Intel</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                        <p className="text-xs">Propensity to lead is in the top 2% of cohort.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                        <p className="text-xs">Highly compatible with current team neural signatures.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default TpoJdMatchmaker;

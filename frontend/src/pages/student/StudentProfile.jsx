import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile as updateProfileThunk } from '../../store/slices/studentSlice';

const StudentProfile = () => {
  const dispatch = useDispatch();
  const { profile: reduxProfile, loading } = useSelector((state) => state.student);
  const [profile, setProfile] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (reduxProfile) {
      setProfile(reduxProfile);
    }
  }, [reduxProfile]);

  const handleUpdate = () => {
    dispatch(updateProfileThunk(profile));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setProfile({
        ...profile,
        skills: [...(profile.skills || []), newSkill.trim()]
      });
      setNewSkill('');
      setIsAddingSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: (profile.skills || []).filter(s => s !== skillToRemove)
    });
  };

  if (!profile && loading) return <div className="text-white p-8">Initializing Kinetic Identity...</div>;
  if (!profile) return <div className="text-white p-8">Terminal Synchronizing...</div>;

  const skills = profile.skills || [];
  const projects = profile.projects || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-extrabold tracking-tighter mb-2">Identity &amp; <span className="text-primary-container">Roadmap</span></h2>
          <p className="text-secondary-fixed-dim text-lg">Define your trajectory in the kinetic intelligence ecosystem.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border border-outline-variant/30 rounded-xl font-bold text-sm hover:bg-white/5 transition-all">Export JSON</button>
          <button 
            onClick={handleUpdate}
            disabled={loading}
            className="px-8 py-3 bg-primary-container text-on-primary-fixed font-bold rounded-xl text-sm shadow-xl shadow-primary-container/20 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Syncing...' : 'Update Profile'}
          </button>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Main Form: Identity (8 Columns) */}
        <div className="col-span-8 glass-card p-8 rounded-2xl border border-white/5 ai-glow">
          <h3 className="font-['Inter'] font-bold uppercase tracking-widest text-[11px] text-primary-container mb-8">Core Parameters</h3>
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-fixed-dim ml-1">Full Name</label>
                <input 
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-container/50 text-lg font-medium transition-all outline-none" 
                  type="text" 
                  value={profile.full_name} 
                  onChange={e => setProfile({...profile, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-fixed-dim ml-1">Academic Branch</label>
                <select 
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-container/50 text-lg font-medium outline-none transition-all"
                  value={profile.branch}
                  onChange={e => setProfile({...profile, branch: e.target.value})}
                >
                  <option>Artificial Intelligence &amp; Data Science</option>
                  <option>Computer Science Engineering</option>
                  <option>Neural Network Architecture</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-fixed-dim ml-1">Cumulative GPA (Current Index)</label>
                <div className="flex items-center gap-1 bg-primary-container pl-4 pr-3 py-1.5 rounded-full text-sm font-black text-white shadow-inner">
                  <input 
                    type="number" 
                    min="0" 
                    max="10" 
                    step="0.1" 
                    className="bg-transparent border-none p-0 text-center w-12 focus:ring-0 text-white font-black text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    value={profile.cgpa}
                    onChange={(e) => setProfile({...profile, cgpa: e.target.value})}
                  />
                  <span className="opacity-70 text-xs">/ 10.0</span>
                </div>
              </div>
              <div className="relative py-4">
                <input 
                  className="w-full h-2 bg-surface-container-highest rounded-full appearance-none cursor-pointer focus:outline-none" 
                  max="10" 
                  min="0" 
                  step="0.1" 
                  type="range" 
                  value={profile.cgpa}
                  onChange={(e) => setProfile({...profile, cgpa: e.target.value})}
                />
                <div className="flex justify-between mt-4 text-[10px] font-bold text-tertiary-container uppercase tracking-tighter">
                  <span>Probation (0.0)</span>
                  <span>Standard (5.0)</span>
                  <span>Excellence (10.0)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Arsenal (4 Columns) */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="glass-card p-8 rounded-2xl border border-white/5 flex-1 flex flex-col">
            <h3 className="font-['Inter'] font-bold uppercase tracking-widest text-[11px] text-primary-container mb-6">Technical Arsenal</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill, i) => (
                <span key={i} className="group px-4 py-2 bg-primary-container/10 border border-primary-container/20 text-primary-container rounded-full text-xs font-bold hover:bg-primary-container hover:text-white transition-all cursor-pointer flex items-center gap-2">
                  {skill}
                  <button onClick={() => handleRemoveSkill(skill)} className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">close</button>
                </span>
              ))}
              {skills.length === 0 && <p className="text-secondary-fixed-dim text-xs italic">No skill modules active yet...</p>}
            </div>

            {isAddingSkill ? (
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input 
                  autoFocus
                  className="flex-1 bg-surface-container-low border border-primary-container/30 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary-container"
                  placeholder="Enter skill (e.g. Python)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button type="submit" className="bg-primary-container text-white px-3 py-2 rounded-lg material-symbols-outlined text-sm">add</button>
                <button type="button" onClick={() => setIsAddingSkill(false)} className="bg-white/5 text-secondary px-3 py-2 rounded-lg material-symbols-outlined text-sm">close</button>
              </form>
            ) : (
              <button 
                onClick={() => setIsAddingSkill(true)}
                className="mt-auto w-full py-3 border border-dashed border-white/10 rounded-xl text-xs font-bold text-tertiary hover:border-primary-container/40 hover:text-primary-container transition-all"
              >
                + Add Skill Parameter
              </button>
            )}
          </div>
        </div>

        {/* Project Ecosystem (12 Columns) */}
        <div className="col-span-12 glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h3 className="font-['Inter'] font-bold uppercase tracking-widest text-[11px] text-primary-container">Project Ecosystem</h3>
            <div className="flex gap-2">
              <span className="bg-white/10 text-[10px] font-bold px-3 py-1 rounded-full text-tertiary">{projects.length} REPOSITORIES ACTIVE</span>
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {projects.length === 0 && <div className="p-8 text-secondary-fixed-dim text-center text-sm italic">Project workspace is currently empty. Initialize repositories below.</div>}
            {projects.map((proj, i) => (
              <div key={i} className="p-8 hover:bg-white/5 transition-all group flex items-center gap-8">
                <div className="h-16 w-16 bg-surface-container-high rounded-xl flex items-center justify-center border border-white/5 group-hover:border-primary-container/30 transition-all">
                  <span className="material-symbols-outlined text-3xl text-tertiary">terminal</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-xl font-bold">{proj.title}</h4>
                    <span className="bg-primary-container/10 text-primary-container text-[10px] font-bold px-2 py-0.5 rounded uppercase">{proj.status}</span>
                  </div>
                  <p className="text-secondary-fixed-dim text-sm max-w-2xl">{proj.description}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs font-bold text-tertiary uppercase mb-1">Stack</p>
                    <p className="text-xs font-medium">{proj.tech_stack.join(" • ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfile;

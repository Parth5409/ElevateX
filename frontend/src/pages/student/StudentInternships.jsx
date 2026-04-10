import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInternships, requestInternship } from '../../store/slices/studentSlice';

const StudentInternships = () => {
  const dispatch = useDispatch();
  const { internships, loading } = useSelector((state) => state.student);
  const [formData, setFormData] = useState({
    company_name: '',
    domain: '',
    duration_months: 3,
    brief: ''
  });

  useEffect(() => {
    dispatch(fetchInternships());
  }, [dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(requestInternship(formData));
    setFormData({ company_name: '', domain: '', duration_months: 3, brief: '' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Header */}
      <div className="mb-12 flex justify-between items-end">
        <div>
          <span className="font-['Inter'] font-bold uppercase tracking-[0.3em] text-[10px] text-[#fa5b31]">Student Internships</span>
          <h2 className="text-5xl font-black tracking-tighter mt-2">Placements <span className="text-white/20">&amp;</span> Engagements</h2>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Active Nodes</p>
            <p className="text-2xl font-black">{internships.length}</p>
          </div>
          <div className="w-px h-8 bg-white/10 mx-2 self-center"></div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Success Rate</p>
            <p className="text-2xl font-black text-[#fa5b31]">94%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: New Internship Form */}
        <div className="col-span-12 lg:col-span-5">
          <div className="glass-card p-8 rounded-2xl border border-white/5 ai-glow h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fa5b31]">add_circle</span>
              Initiate Engagement
            </h3>
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-2">Target Corporation</label>
                <input 
                  className="w-full bg-surface-container border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary-container/20 transition-all outline-none" 
                  placeholder="e.g. Neuralink, Aesthetic Labs" 
                  type="text" 
                  value={formData.company_name}
                  onChange={e => setFormData({...formData, company_name: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-2">Domain</label>
                  <input 
                    className="w-full bg-surface-container border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary-container/20 transition-all outline-none" 
                    placeholder="e.g. Frontend, Machine Learning" 
                    type="text" 
                    value={formData.domain}
                    onChange={e => setFormData({...formData, domain: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-2">Duration (Months)</label>
                  <select 
                    className="w-full bg-surface-container border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary-container/20 transition-all outline-none"
                    value={formData.duration_months}
                    onChange={e => setFormData({...formData, duration_months: parseInt(e.target.value)})}
                  >
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-2">Brief &amp; Intent</label>
                <textarea 
                  className="w-full bg-surface-container border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary-container/20 transition-all outline-none" 
                  placeholder="Describe the kinetic value of this placement..." 
                  rows="4"
                  value={formData.brief}
                  onChange={e => setFormData({...formData, brief: e.target.value})}
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#fa5b31] text-white font-black py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary-container/20 uppercase tracking-widest text-xs disabled:opacity-50"
              >
                {loading ? 'Submitting Node...' : 'Submit Placement Proposal'}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Active Engagements Bento */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-6">
          <div className="col-span-2 glass-card p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-primary-container/5 to-transparent">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-sm">AI Kinetic Insight</h4>
                <p className="text-secondary/70 text-xs mt-1">Based on your training nodes, you are 89% ready for "Quantum Core" placements.</p>
              </div>
              <span className="material-symbols-outlined text-[#fa5b31]">auto_awesome</span>
            </div>
          </div>
        </div>
      </div>

      {/* Internship History Table */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold uppercase tracking-tighter">Engagement History</h3>
          <div className="flex gap-2">
            <button className="bg-surface-container-low px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-secondary/60 hover:text-white transition-colors border border-white/5">Export Log</button>
          </div>
        </div>
        <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-[10px] font-bold text-secondary/40 uppercase tracking-[0.2em]">Partner Node</th>
                <th className="px-8 py-5 text-[10px] font-bold text-secondary/40 uppercase tracking-[0.2em]">Domain</th>
                <th className="px-8 py-5 text-[10px] font-bold text-secondary/40 uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading && internships.length === 0 ? (
                <tr><td colSpan="3" className="px-8 py-10 text-center text-xs text-secondary uppercase tracking-widest font-bold">Querying Internship Logs...</td></tr>
              ) : (
                internships.map(intern => (
                  <tr key={intern._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-black text-xs text-secondary">
                          {intern.company_name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{intern.company_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-medium text-sm">{intern.domain}</td>
                    <td className="px-8 py-5">
                      {intern.status === 'Approved' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-[#fa5b31]/10 text-[#fa5b31] uppercase tracking-widest">Approved</span>}
                      {intern.status === 'Pending' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-white/10 text-secondary uppercase tracking-widest">Pending</span>}
                      {intern.status === 'Rejected' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-error/10 text-error uppercase tracking-widest">Rejected</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentInternships;

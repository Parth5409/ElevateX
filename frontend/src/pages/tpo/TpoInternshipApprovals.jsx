import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllInternships, updateInternship } from '../../store/slices/tpoSlice';

const TpoInternshipApprovals = () => {
  const dispatch = useDispatch();
  const { internships, loading } = useSelector((state) => state.tpo);

  useEffect(() => {
    dispatch(fetchAllInternships({ status: 'Pending' }));
  }, [dispatch]);

  const handleUpdateStatus = (id, status) => {
    dispatch(updateInternship({ id, status }));
  };

  const pending = internships.filter(i => i.status === 'Pending');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-extrabold tracking-tighter text-white mb-2">Internship Approvals</h2>
          <p className="text-secondary/60 text-sm">Review incoming student placements.</p>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-8 border border-white/5 ai-glow relative overflow-hidden group">
        <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Pending Review Queue ({pending.length})</h3>
        
        {loading && pending.length === 0 ? (
           <p className="text-secondary text-center py-10 uppercase text-[10px] font-bold tracking-widest">Resonating with Approval Queue...</p>
        ) : pending.length === 0 ? (
           <p className="text-secondary text-center py-10">All placement logs reviewed.</p>
        ) : (
          <div className="space-y-4">
            {pending.map(intern => (
              <div key={intern._id} className="bg-surface-container p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg text-white">{intern.company_name}</h4>
                  <p className="text-secondary text-sm">{intern.domain} • {intern.duration_months} Months</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleUpdateStatus(intern._id, 'Approved')}
                    disabled={loading}
                    className="bg-primary-container hover:scale-105 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase transition-all shadow-lg disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(intern._id, 'Rejected')}
                    disabled={loading}
                    className="bg-error/20 hover:bg-error text-error hover:text-white border border-error/30 px-6 py-2 rounded-xl text-xs font-bold uppercase transition-all disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TpoInternshipApprovals;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStudents } from '../../store/slices/tpoSlice';

const TpoDirectory = () => {
  const [filter, setFilter] = useState('All');
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.tpo);

  useEffect(() => {
    const queryParams = filter === 'All' ? {} : { status: filter };
    dispatch(fetchAllStudents(queryParams));
  }, [filter, dispatch]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-extrabold tracking-tighter text-white mb-2">Talent Directory</h2>
          <p className="text-secondary/60 text-sm">Comprehensive index of global student nodes.</p>
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-surface-container border border-white/5 rounded-xl px-4 py-2 font-bold text-sm text-white"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Placed">Placed</option>
            <option value="Unplaced">Unplaced</option>
          </select>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low/50">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold text-secondary/40 uppercase tracking-[0.2em]">Student Name</th>
              <th className="px-8 py-5 text-[10px] font-bold text-secondary/40 uppercase tracking-[0.2em]">Branch</th>
              <th className="px-8 py-5 text-[10px] font-bold text-secondary/40 uppercase tracking-[0.2em]">CGPA</th>
              <th className="px-8 py-5 text-[10px] font-bold text-secondary/40 uppercase tracking-[0.2em]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan="4" className="px-8 py-10 text-center text-xs text-secondary uppercase tracking-widest font-bold">Resonating with Talent Database...</td></tr>
            ) : (
              students.map(student => (
                <tr key={student._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-5 font-bold text-sm text-white">{student.full_name}</td>
                  <td className="px-8 py-5 text-sm text-secondary">{student.branch}</td>
                  <td className="px-8 py-5 text-sm text-secondary font-mono">{student.cgpa}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${student.placement_status === 'Placed' ? 'bg-primary-container/20 text-primary-container' : 'bg-surface-container text-secondary'}`}>
                      {student.placement_status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TpoDirectory;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalytics } from '../../store/slices/tpoSlice';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TpoDashboard = () => {
  const dispatch = useDispatch();
  const { analytics, loading } = useSelector((state) => state.tpo);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  // Default values or derived data from analytics
  const placementData = analytics?.placement_data || [
    { name: 'Placed', value: 0, color: '#fa5b31' },
    { name: 'Awaiting', value: 100, color: '#363531' },
  ];

  const skillsData = analytics?.skills_distribution || [];
  const stats = {
    totalStudents: analytics?.total_students || 0,
    avgCgpa: analytics?.avg_cgpa || 0,
    activeDrives: analytics?.active_drives || 0,
    avgPackage: analytics?.avg_package_lpa || 0,
  };

  if (loading && !analytics) return <div className="text-white p-8">Initializing Analytics Hub...</div>;
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-5xl font-extrabold tracking-tighter text-white mb-2">Analytics Hub</h2>
          <p className="text-secondary tracking-tight font-medium">Real-time kinetic intelligence dashboard for elevateX placement operations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-[#21201c] border border-white/10 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-white/5 transition-all">Export Report</button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-container/10 rounded-lg text-primary-container">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">Total Students</p>
          <h3 className="text-3xl font-black text-white">{stats.totalStudents.toLocaleString()}</h3>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-tertiary-container/10 rounded-lg text-tertiary">
              <span className="material-symbols-outlined">grade</span>
            </div>
          </div>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">Avg CGPA</p>
          <h3 className="text-3xl font-black text-white">{stats.avgCgpa.toFixed(2)}</h3>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-container/10 rounded-lg text-primary-container">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <span className="text-[10px] font-black text-primary-container bg-primary-container/10 px-2 py-1 rounded-full">LIVE</span>
          </div>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">Active Drives</p>
          <h3 className="text-3xl font-black text-white">{stats.activeDrives}</h3>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-tertiary-container/10 rounded-lg text-tertiary">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">Avg Package</p>
          <h3 className="text-3xl font-black text-white">{stats.avgPackage} <span className="text-sm font-medium opacity-50">LPA</span></h3>
        </div>
      </div>

      {/* Main Analytics Panels using Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Placement Status (Donut Chart) */}
        <div className="lg:col-span-4 glass-card p-8 rounded-3xl border border-white/5 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-xl font-bold text-white tracking-tight">Placement Status</h4>
              <p className="text-xs text-secondary/60">Cohort 2024 Progress</p>
            </div>
            <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-secondary uppercase">Live</div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center relative min-h-[200px]">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={placementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {placementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#21201c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-white">
                {placementData.find(d => d.name === 'Placed')?.value || 0}%
              </span>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Placed</span>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                <span className="text-xs font-medium text-secondary">Placed Students</span>
              </div>
              <span className="text-xs font-bold text-white">3,476</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <span class="text-xs font-medium text-secondary">Awaiting Placement</span>
              </div>
              <span className="text-xs font-bold text-white">1,353</span>
            </div>
          </div>
        </div>

        {/* Skill Proficiency (Bar Chart) */}
        <div className="lg:col-span-8 glass-card p-8 rounded-3xl border border-white/5 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xl font-bold text-white tracking-tight">Skill Proficiency Distribution</h4>
              <p className="text-xs text-secondary/60">Automated Intelligence Assessment Scores</p>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[250px]">
             <ResponsiveContainer width="100%" height={250}>
                <BarChart data={skillsData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#cfc5ba', fontSize: 12, fontWeight: 'bold' }} width={100} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#21201c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="score" fill="#fa5b31" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpoDashboard;

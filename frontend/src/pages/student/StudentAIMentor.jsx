import React from 'react';
import { mockNotifications } from '../../utils/mockData';

const StudentAIMentor = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Intelligence Feed</span>
            <div className="h-[1px] w-12 bg-outline-variant"></div>
          </div>
          <h2 className="text-5xl font-black tracking-tight text-white">Kinetic Mentor</h2>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-primary-container text-on-primary-container font-bold text-xs uppercase tracking-widest rounded-lg hover:scale-[1.02] transition-transform">Refresh Engine</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Feed */}
        <div className="col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary">Inbox &amp; Placements</h3>
          </div>

          {mockNotifications.map((notif, index) => (
            <div key={notif._id} className={`glass-card p-6 rounded-xl relative overflow-hidden group ${notif.type === 'Invite' ? 'ai-glow border-l-4 border-primary' : 'border border-white/5'}`}>
              <div className="absolute top-0 right-0 p-6">
                <div className="flex flex-col items-end">
                  {notif.matchScore && <span className="text-4xl font-black text-primary leading-none">{notif.matchScore}%</span>}
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{notif.date}</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {notif.type === 'Invite' ? 'hub' : 'analytics'}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{notif.title}</h4>
                  <p className="text-secondary text-sm font-medium">{notif.message}</p>
                  
                  {notif.missing_skills?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {notif.missing_skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-error/10 text-error text-[10px] font-bold rounded-full uppercase">MISSING: {skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                <p className="text-xs text-tertiary max-w-md">{notif.action_item}</p>
                {notif.type === 'Invite' && (
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">
                    Initiate Protocol <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Content */}
        <div className="col-span-4 space-y-6">
          {/* Neural Growth Path */}
          <div className="bg-surface-container-low p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Neural Growth Path</h3>
            </div>
            <div className="relative h-1 w-full bg-white/5 rounded-full mb-6">
              <div className="absolute top-0 left-0 h-full w-[72%] bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAIMentor;

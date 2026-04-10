import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const SideNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isTpo = location.pathname.includes('/tpo');
  
  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: 'psychology' },
    { name: 'Profile Builder', path: '/student/profile', icon: 'person' },
    { name: 'Internship Log', path: '/student/internships', icon: 'work' },
    { name: 'Kinetic Mentor', path: '/student/ai-mentor', icon: 'auto_awesome' },
  ];

  const tpoLinks = [
    { name: 'Analytics Hub', path: '/tpo/dashboard', icon: 'leaderboard' },
    { name: 'AI Matchmaker', path: '/tpo/jd-matchmaker', icon: 'hub' },
    { name: 'Talent Directory', path: '/tpo/directory', icon: 'groups' },
    { name: 'Approvals', path: '/tpo/internship-approvals', icon: 'fact_check' },
  ];

  const links = isTpo ? tpoLinks : studentLinks;

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-[#1c1b19] flex flex-col z-50">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center text-white font-black text-xl">X</div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-[#fa5b31]">elevateX</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#cfc5ba] opacity-60">Kinetic Intelligence</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map(link => {
          const isActive = location.pathname === link.path;
          return (
            <NavLink 
              key={link.path} 
              to={link.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-['Inter'] font-medium text-sm tracking-tight transition-transform duration-200 
                ${isActive ? 'bg-[#21201c] text-[#fa5b31] border-l-4 border-[#fa5b31] scale-[1.02]' : 'text-[#cfc5ba] hover:bg-white/5 hover:scale-[1.02]'}`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5 pt-4">
        <div className="bg-[#21201c] rounded-xl p-4 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#fa5b31] mb-2">{user?.role === 'tpo' ? 'Admin Node' : 'Student Node'}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#fa5b31] animate-[pulse_2s_ease-in-out_infinite]"></div>
            <span className="text-[10px] text-[#cfc5ba] truncate">{user?.email || 'AI Core Active'}</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-error hover:bg-error/10 hover:border-error/20 rounded-lg font-['Inter'] font-bold text-xs uppercase tracking-widest transition-all border border-transparent"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Sever Connection
        </button>
      </div>
    </aside>
  );
};

export default SideNavBar;

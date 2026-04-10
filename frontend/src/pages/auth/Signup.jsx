import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearError } from '../../store/slices/authSlice';

const Signup = () => {
  const [role, setRole] = useState('student'); // 'student' or 'tpo'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'tpo') {
        navigate('/tpo/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, user, navigate, dispatch]);

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(signup({ fullName, email, password, role }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center text-white relative overflow-hidden py-12 px-6">
      <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-primary-container/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10 glass-card p-10 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-3xl ai-glow">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight mb-2 text-primary-container">elevateX</h2>
          <p className="text-xs text-secondary/60 uppercase tracking-widest font-bold">Register Kinetic Node</p>
        </div>

        {/* Role Switcher */}
        <div className="flex p-1 bg-surface-container-low rounded-xl mb-8">
          <button 
            onClick={() => setRole('student')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${role === 'student' ? 'bg-white/10 text-white shadow-lg border border-white/5' : 'text-secondary/50 hover:text-white'}`}
          >
            Talent Profile
          </button>
          <button 
            onClick={() => setRole('tpo')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${role === 'tpo' ? 'bg-white/10 text-white shadow-lg border border-white/5' : 'text-secondary/50 hover:text-white'}`}
          >
            TPO Admin
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          {error && <div className="p-3 bg-error/10 border border-error/20 text-error text-xs font-bold rounded-lg text-center">{error}</div>}
          
          <div>
            <label className="block text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-2 ml-1">Full Name</label>
            <input 
              type="text" 
              required 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-surface-container border border-white/5 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary-container/20 outline-none transition-all" 
              placeholder="Arjun Vardhan" 
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-2 ml-1">Academic Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container border border-white/5 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary-container/20 outline-none transition-all" 
              placeholder="user@college.edu" 
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-2 ml-1">Passkey</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-surface-container border border-white/5 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary-container/20 outline-none transition-all" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-surface-container-highest text-white font-black mt-4 py-4 rounded-xl hover:bg-on-surface hover:text-background active:scale-95 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
          >
            {loading ? 'Initializing...' : 'Construct Profile'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-xs font-medium text-secondary/40 hover:text-white transition-colors">
            Return to Endpoint
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

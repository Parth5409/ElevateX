import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/slices/authSlice';

const Login = () => {
  const [role, setRole] = useState('student'); // 'student' or 'tpo'
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

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen bg-background flex text-white relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] bg-tertiary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Split Screen Design */}
      <div className="w-full flex">
        {/* Left Side: Branding/Visuals */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-16 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-6xl font-black tracking-tighter text-[#fa5b31] mb-6">elevateX</h1>
            <p className="text-2xl font-bold tracking-tight text-white/90 mb-4">The Kinetic Intelligence Platform.</p>
            <p className="text-secondary/60 text-lg leading-relaxed mb-12 max-w-md">Bridging the gap between talent signatures and job architectures with AI-driven placement dynamics.</p>
            
            <div className="glass-card p-6 rounded-2xl border border-white/5 ai-glow inline-block">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary-container text-4xl">auto_awesome</span>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-widest">Model V4.2 Active</p>
                  <p className="text-xs text-secondary/60">Matching algorithms fully operational.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative z-10 z-20">
          <div className="w-full max-w-md glass-card p-10 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-3xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black tracking-tight mb-2">Access Node</h2>
              <p className="text-xs text-secondary/60 uppercase tracking-widest font-bold">Authenticate to Engine</p>
            </div>

            {/* Role Switcher */}
            <div className="flex p-1 bg-surface-container-low rounded-xl mb-8">
              <button 
                onClick={() => setRole('student')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${role === 'student' ? 'bg-primary-container text-white shadow-lg' : 'text-secondary/50 hover:text-white'}`}
              >
                Talent
              </button>
              <button 
                onClick={() => setRole('tpo')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${role === 'tpo' ? 'bg-primary-container text-white shadow-lg' : 'text-secondary/50 hover:text-white'}`}
              >
                TPO Admin
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && <div className="p-3 bg-error/10 border border-error/20 text-error text-xs font-bold rounded-lg text-center">{error}</div>}
              
              <div>
                <label className="block text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-2 ml-1">Identity Endpoint</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 text-sm">mail</span>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary-container/20 transition-all outline-none font-medium" 
                    placeholder="user@college.edu" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-2 ml-1">Cryptographic Key</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 text-sm">lock</span>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full bg-surface-container border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary-container/20 transition-all outline-none font-medium" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#fa5b31] text-white font-black py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary-container/20 uppercase tracking-widest text-xs disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Initiate Session'}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-xs text-secondary/60 font-medium">Unregistered Signature?</p>
              <Link to="/signup" className="inline-block mt-2 text-xs font-black text-primary-container uppercase tracking-widest hover:underline">
                Create Placement Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

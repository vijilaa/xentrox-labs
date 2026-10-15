import React, { useState } from 'react';
import { adminLogin } from '../../services/api';
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { LogoSymbol } from '../Logo';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();

    try {
      const response = await adminLogin(cleanEmail, password);
      if (response.success && response.data) {
        localStorage.setItem('xentrox_admin_token', response.data.token);
        localStorage.setItem('xentrox_admin_user', JSON.stringify(response.data));
        onLoginSuccess(response.data);
      } else {
        setErrorMsg(response.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-50 dark:bg-[#040814] flex items-center justify-center p-4 sm:p-6 overflow-y-auto tech-bg-grid transition-colors duration-300">
      {/* Background Soft Glows (strictly absolute so they do NOT affect flex layout) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Login Card */}
      <div className="w-full max-w-[420px] bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 sm:p-9 shadow-2xl relative z-10 backdrop-blur-xl mx-auto my-auto">
        {/* Brand Header */}
        <div className="text-center mb-7">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/10 dark:from-blue-600/20 to-lime-500/10 dark:to-lime-500/20 border border-slate-200 dark:border-slate-700/60 p-2 shadow-sm inline-flex items-center justify-center mb-3">
            <LogoSymbol size={38} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/70 border border-blue-200 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            XentroX Security Portal
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight">Admin Authentication</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sign in to access your administrative dashboard</p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Admin Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@xentroxlabs.com"
                autoComplete="username"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-colors shadow-xs"
              />
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          {/* Password field with show/hide */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 pl-10 pr-10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-colors shadow-xs"
              />
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 dark:text-slate-500" />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer p-0.5 rounded"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full justify-center py-3 text-xs rounded-xl mt-3 font-bold bg-blue-600 hover:bg-blue-700 active:scale-98 text-white flex items-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50 cursor-pointer transition-all hover:shadow-blue-600/50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </span>
            ) : (
              <>
                <span className="tracking-wide uppercase font-heading">Access Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back to Site Link */}
        {onBackToSite && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <button
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

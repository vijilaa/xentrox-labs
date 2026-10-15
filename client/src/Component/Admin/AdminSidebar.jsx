import React from 'react';
import {
  LayoutDashboard,
  FolderTree,
  BookOpen,
  Briefcase,
  FileText,
  MessageSquare,
  LogOut,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { LogoSymbol } from '../Logo';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  onLogout,
  onBackToSite,
  enquiriesCount = 0,
  pendingCount = 0
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    {
      id: 'enquiries',
      label: 'Student Enquiries',
      icon: MessageSquare,
      badge: enquiriesCount,
      pending: pendingCount
    }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900/95 border-r border-slate-200 dark:border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 transition-colors duration-300">
      <div>
        {/* Brand Header with Exact Logo Symbol */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/10 dark:from-blue-600/30 to-lime-500/10 dark:to-lime-500/20 p-1.5 border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center justify-center shrink-0">
            <LogoSymbol size={28} />
          </div>

          <div>
            <h1 className="text-sm font-black text-slate-900 dark:text-white tracking-wider flex items-center gap-1 font-heading">
              XENTRO<span className="text-lime-500">X</span>
            </h1>
            <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-widest block">
              Control Panel
            </span>
          </div>
        </div>

        <nav className="p-3 space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Management Modules
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-cyan-300' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge > 0 ? (
                  <div className="flex items-center gap-1.5">
                    <span
                      title={`${item.badge} Student Enquiries (${item.pending || 0} Pending)`}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black transition-colors ${
                        isActive
                          ? 'bg-white text-blue-700'
                          : 'bg-blue-100 text-blue-700 dark:bg-cyan-500 dark:text-slate-950 shadow-sm'
                      }`}
                    >
                      {item.badge}
                    </span>
                    {item.pending > 0 && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title={`${item.pending} pending action`} />
                    )}
                  </div>
                ) : (
                  isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-white dark:text-cyan-300" />
                  )
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
        <button
          type="button"
          onClick={onBackToSite}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          <span>View Public Website</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Admin Logout</span>
        </button>
      </div>
    </aside>
  );
}


import React from 'react';
import { Search, Menu, Sun, Moon, X } from 'lucide-react';

export default function AdminNavbar({
  title,
  user,
  onToggleMobileSidebar,
  searchQuery = '',
  setSearchQuery,
  theme = 'dark',
  toggleTheme
}) {
  return (
    <header className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 py-3.5 sticky top-0 z-20 backdrop-blur-md flex items-center justify-between gap-4 transition-colors duration-300">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white capitalize font-heading">{title}</h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Manage your website content, courses, and student leads</p>
        </div>
      </div>

      {/* Right: Search, Theme Toggle & Admin User Info */}
      <div className="flex items-center gap-3">
        {setSearchQuery && (
          <div className="relative hidden md:block w-64 lg:w-72">
            <input
              type="text"
              placeholder={`Search in ${title}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 pl-9 pr-8 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-colors"
            />
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Theme Toggle Button */}
        {toggleTheme && (
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        )}

        {/* User Card */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white dark:bg-blue-600/30 dark:text-cyan-400 border border-blue-500/40 flex items-center justify-center text-xs font-bold shadow-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">{user?.name || 'XentroX Admin'}</p>
            <p className="text-[10px] text-blue-600 dark:text-cyan-400 mt-0.5 font-mono">{user?.email || 'admin@xentroxlabs.com'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}


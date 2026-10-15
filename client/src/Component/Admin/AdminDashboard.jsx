import React from 'react';
import {
  BookOpen,
  FolderTree,
  Briefcase,
  FileText,
  MessageSquare,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard({
  stats,
  recentEnquiries,
  onNavigateTab,
  onUpdateEnquiryStatus
}) {
  const cards = [
    {
      label: 'Total Courses',
      value: stats.coursesCount,
      icon: BookOpen,
      color: 'text-blue-600 dark:text-cyan-400',
      bg: 'bg-blue-50 dark:bg-cyan-500/10 border-blue-200 dark:border-cyan-500/30',
      tab: 'courses'
    },
    {
      label: 'Total Categories',
      value: stats.categoriesCount,
      icon: FolderTree,
      color: 'text-indigo-600 dark:text-blue-400',
      bg: 'bg-indigo-50 dark:bg-blue-500/10 border-indigo-200 dark:border-blue-500/30',
      tab: 'categories'
    },
    {
      label: 'Portfolio Projects',
      value: stats.portfolioCount,
      icon: Briefcase,
      color: 'text-purple-600 dark:text-indigo-400',
      bg: 'bg-purple-50 dark:bg-indigo-500/10 border-purple-200 dark:border-indigo-500/30',
      tab: 'portfolio'
    },
    {
      label: 'Published Blogs',
      value: stats.blogsCount,
      icon: FileText,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/30',
      tab: 'blogs'
    },
    {
      label: 'Total Enquiries',
      value: stats.enquiriesCount,
      icon: MessageSquare,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30',
      tab: 'enquiries'
    },
    {
      label: 'Pending Leads',
      value: stats.pendingEnquiriesCount,
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30',
      tab: 'enquiries'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner — adaptive light/dark */}
      <div className="p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4
        bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700
        dark:bg-gradient-to-r dark:from-blue-900 dark:via-indigo-950 dark:to-slate-900
        border border-blue-500/40 dark:border-slate-700/60">

        {/* Subtle glare overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 mb-2.5">
            Live System Statistics
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">XentroX Control Dashboard</h3>
          <p className="text-xs text-blue-100 dark:text-slate-300 mt-1 max-w-lg leading-relaxed">
            Real-time management portal connected directly to MongoDB. Control your courses, categories, blogs, and student leads.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 relative z-10">
          <button
            onClick={() => onNavigateTab('courses')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-blue-700 hover:bg-blue-50 shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Course</span>
          </button>
          <button
            onClick={() => onNavigateTab('enquiries')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-200" />
            <span>Manage Leads ({stats.enquiriesCount})</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(card.tab)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-cyan-500/50 cursor-pointer transition-all hover:-translate-y-1 shadow-md flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors" />
              </div>

              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white font-heading">{card.value}</p>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Enquiries Table Preview */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">Recent Student Lead Enquiries</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Latest submissions dynamically loaded from database ({recentEnquiries.length} total)
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('enquiries')}
            className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800/80">
            <MessageSquare className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-900 dark:text-white">No Lead Enquiries Yet</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              When visitors fill out forms on the website, they will appear here in real-time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Contact Details</th>
                  <th className="p-3">Program / Course</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {recentEnquiries.slice(0, 5).map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-950/40 transition-colors">
                    <td className="p-3 text-slate-900 dark:text-white font-bold">{enquiry.fullName}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      <div>{enquiry.email}</div>
                      <div className="text-[10px] text-blue-600 dark:text-cyan-400 font-mono font-semibold">{enquiry.phone}</div>
                    </td>
                    <td className="p-3 text-slate-800 dark:text-slate-200">{enquiry.course}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enquiry.status === 'enrolled'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30'
                            : enquiry.status === 'contacted'
                            ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-cyan-400 border border-blue-300 dark:border-blue-500/30'
                            : enquiry.status === 'closed'
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                            : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30'
                        }`}
                      >
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <select
                        value={enquiry.status}
                        onChange={(e) => onUpdateEnquiryStatus(enquiry._id, e.target.value)}
                        className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-colors"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

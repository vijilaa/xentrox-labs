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
      color: 'text-lime-600 dark:text-lime-400',
      bg: 'bg-lime-50 dark:bg-lime-500/10 border-lime-200 dark:border-lime-500/30',
      tab: 'courses'
    },
    {
      label: 'Total Categories',
      value: stats.categoriesCount,
      icon: FolderTree,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30',
      tab: 'categories'
    },
    {
      label: 'Portfolio Projects',
      value: stats.portfolioCount,
      icon: Briefcase,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/30',
      tab: 'portfolio'
    },
    {
      label: 'Published Blogs',
      value: stats.blogsCount,
      icon: FileText,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30',
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
      <div className="p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4
        bg-gradient-to-r from-emerald-800 via-[#033B32] to-[#022620]
        dark:bg-gradient-to-r dark:from-emerald-950 dark:via-emerald-900 dark:to-slate-900
        border border-lime-500/40 dark:border-emerald-700/60">

        {/* Subtle glare overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 mb-2.5">
            Live System Statistics
          </span>
          <h3 className="text-lg xs:text-xl sm:text-2xl font-black text-white">XentroX Control Dashboard</h3>
          <p className="text-xs text-lime-100 dark:text-slate-300 mt-1 max-w-lg leading-relaxed">
            Real-time management portal connected directly to MongoDB. Control your courses, categories, blogs, and student leads.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 xs:gap-2.5 relative z-10">
          <button
            onClick={() => onNavigateTab('courses')}
            className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-lime-400 text-[#022620] hover:bg-lime-300 shadow-lg transition-all cursor-pointer flex-1 xs:flex-none"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Course</span>
          </button>
          <button
            onClick={() => onNavigateTab('enquiries')}
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer flex-1 xs:flex-none"
          >
            <MessageSquare className="w-3.5 h-3.5 text-lime-300" />
            <span>Manage Leads ({stats.enquiriesCount})</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 xs:gap-3.5 sm:gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(card.tab)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-lime-500/60 dark:hover:border-lime-500/50 cursor-pointer transition-all hover:-translate-y-1 shadow-md flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors" />
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
      <div className="p-4 xs:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5 mb-4 sm:mb-5">
          <div>
            <h4 className="text-sm xs:text-base font-black text-slate-900 dark:text-white">Recent Student Lead Enquiries</h4>
            <p className="text-[11px] xs:text-xs text-slate-500 dark:text-slate-400">
              Latest submissions dynamically loaded from database ({recentEnquiries.length} total)
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('enquiries')}
            className="text-xs font-bold text-lime-600 dark:text-lime-400 hover:underline flex items-center gap-1 self-start xs:self-auto"
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
                      <div className="text-[10px] text-lime-600 dark:text-lime-400 font-mono font-semibold">{enquiry.phone}</div>
                    </td>
                    <td className="p-3 text-slate-800 dark:text-slate-200">{enquiry.course}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enquiry.status === 'enrolled'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30'
                            : enquiry.status === 'contacted'
                            ? 'bg-lime-50 dark:bg-lime-500/10 text-lime-700 dark:text-lime-400 border border-lime-300 dark:border-lime-500/30'
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
                        className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-lime-500 dark:focus:border-lime-500 transition-colors"
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

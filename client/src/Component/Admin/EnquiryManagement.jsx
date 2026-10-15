import React, { useState } from 'react';
import { Search, MessageSquare, Trash2, Eye, X, Phone, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function EnquiryManagement({
  enquiries,
  searchQuery = '',
  setSearchQuery,
  onUpdateStatus,
  onDeleteEnquiry
}) {
  const [localSearch, setLocalSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const activeSearch = searchQuery !== undefined && searchQuery !== '' ? searchQuery : localSearch;

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    if (setSearchQuery) setSearchQuery(val);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    if (setSearchQuery) setSearchQuery('');
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const q = activeSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (e.fullName && e.fullName.toLowerCase().includes(q)) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      (e.phone && e.phone.includes(q)) ||
      (e.course && e.course.toLowerCase().includes(q)) ||
      (e.message && e.message.toLowerCase().includes(q));

    const matchesStatus = selectedStatus === 'all' || e.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'enrolled':
        return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30';
      case 'contacted':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-cyan-400 border border-blue-300 dark:border-blue-500/30';
      case 'closed':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
      default:
        return 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Student Lead Enquiries</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            View and manage counseling requests & enrollment applications ({enquiries.length} total)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {['all', 'pending', 'contacted', 'enrolled', 'closed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-44 sm:w-60">
            <input
              type="text"
              placeholder="Search leads..."
              value={activeSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 pl-9 pr-8 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-colors"
            />
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
            {activeSearch && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
        {filteredEnquiries.length === 0 ? (
          <div className="text-center py-12 px-4">
            <MessageSquare className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
            {activeSearch || selectedStatus !== 'all' ? (
              <>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  No enquiries found matching {activeSearch ? `"${activeSearch}"` : `status "${selectedStatus}"`}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  No student records matched your search query or filter. Try another keyword or reset filters.
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  {activeSearch && (
                    <button
                      onClick={handleClearSearch}
                      className="px-4 py-1.5 rounded-xl bg-blue-50 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/20 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-xs font-bold transition-all"
                    >
                      Clear Search
                    </button>
                  )}
                  {selectedStatus !== 'all' && (
                    <button
                      onClick={() => setSelectedStatus('all')}
                      className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all"
                    >
                      Show All Statuses
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-slate-900 dark:text-white">No Enquiries Found</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  When students submit enrollment or counseling requests on the website, they will appear dynamically here.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Phone Number</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Requested Course</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-950/40 transition-colors">
                    <td className="p-3.5 text-slate-900 dark:text-white font-bold">{enquiry.fullName}</td>
                    <td className="p-3.5 text-blue-600 dark:text-cyan-400 font-mono">{enquiry.phone}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{enquiry.email}</td>
                    <td className="p-3.5 text-slate-800 dark:text-slate-200 font-medium">{enquiry.course}</td>
                    <td className="p-3.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3.5">
                      <select
                        value={enquiry.status}
                        onChange={(e) => onUpdateStatus(enquiry._id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold focus:outline-none transition-colors ${getStatusBadgeClass(
                          enquiry.status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-cyan-300 hover:bg-blue-600 hover:text-white transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(enquiry._id)}
                        className="p-1.5 rounded-lg bg-red-50 dark:bg-red-600/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden transition-colors">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                {selectedEnquiry.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{selectedEnquiry.fullName}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusBadgeClass(
                    selectedEnquiry.status
                  )}`}
                >
                  Status: {selectedEnquiry.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Phone className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedEnquiry.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{selectedEnquiry.email}</span>
                </div>
              </div>

              <div>
                <p className="text-slate-500 dark:text-slate-400 font-bold mb-1">Target Program / Track:</p>
                <p className="text-slate-900 dark:text-white font-bold bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  {selectedEnquiry.course}
                </p>
              </div>

              {selectedEnquiry.message && (
                <div>
                  <p className="text-slate-500 dark:text-slate-400 font-bold mb-1">Student Message:</p>
                  <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                    {selectedEnquiry.message}
                  </p>
                </div>
              )}

              <div className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                Submitted on: {new Date(selectedEnquiry.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <select
                value={selectedEnquiry.status}
                onChange={async (e) => {
                  const newStatus = e.target.value;
                  await onUpdateStatus(selectedEnquiry._id, newStatus);
                  setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
                }}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
              >
                <option value="pending">Set Pending</option>
                <option value="contacted">Set Contacted</option>
                <option value="enrolled">Set Enrolled</option>
                <option value="closed">Set Closed</option>
              </select>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="btn-primary text-xs py-2 px-4 rounded-xl font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center shadow-2xl transition-colors">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h4 className="text-base font-black text-slate-900 dark:text-white">Delete Lead Record?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to delete this student enquiry record?
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await onDeleteEnquiry(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-lg shadow-red-500/20"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

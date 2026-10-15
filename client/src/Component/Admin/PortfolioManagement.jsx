import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Search, Briefcase, ExternalLink, AlertCircle } from 'lucide-react';

export default function PortfolioManagement({
  portfolioItems,
  searchQuery = '',
  setSearchQuery,
  onCreatePortfolio,
  onUpdatePortfolio,
  onDeletePortfolio
}) {
  const [localSearch, setLocalSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
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

  const [formData, setFormData] = useState({
    title: '',
    category: 'Full Stack Development',
    client: 'Internal Client Project',
    description: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    liveUrl: '',
    tagsStr: 'React, Node.js, MongoDB',
    featured: false
  });

  const filteredItems = portfolioItems.filter((item) => {
    const q = activeSearch.toLowerCase().trim();
    if (!q) return true;
    const matchesTags = item.tags && item.tags.some((t) => t.toLowerCase().includes(q));
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.client && item.client.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      matchesTags
    );
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Full Stack Development',
      client: 'Internal Client Project',
      description: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      liveUrl: '',
      tagsStr: 'React, Node.js, MongoDB',
      featured: false
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'Full Stack Development',
      client: item.client || '',
      description: item.description || '',
      image: item.image || '',
      liveUrl: item.liveUrl || '',
      tagsStr: item.tags ? item.tags.join(', ') : '',
      featured: item.featured || false
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tagsStr ? formData.tagsStr.split(',').map((t) => t.trim()) : []
    };

    if (editingItem) {
      await onUpdatePortfolio(editingItem._id, payload);
    } else {
      await onCreatePortfolio(payload);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Portfolio Projects</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showcase student live projects & real-world client builds ({portfolioItems.length} total)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              placeholder="Search portfolio..."
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

          <button onClick={handleOpenCreate} className="btn-primary text-xs py-2 px-4 rounded-xl font-bold">
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Portfolio Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl px-4 transition-colors">
          <Briefcase className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
          {activeSearch ? (
            <>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                No portfolio projects found matching "{activeSearch}"
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                No projects matched your search query. Try another search term or clear the filter.
              </p>
              <button
                onClick={handleClearSearch}
                className="mt-4 px-4 py-1.5 rounded-xl bg-blue-50 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/20 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-xs font-bold transition-all"
              >
                Clear Search Filter
              </button>
            </>
          ) : (
            <>
              <p className="text-sm font-bold text-slate-900 dark:text-white">No Portfolio Projects Found</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Add client builds and case studies to highlight student capability.
              </p>
              <button onClick={handleOpenCreate} className="btn-primary text-xs py-2 px-4 rounded-xl font-bold mt-4">
                <Plus className="w-4 h-4" />
                <span>Create First Project</span>
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between group hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all"
            >
              <div>
                <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 mb-4 border border-slate-200 dark:border-slate-800 relative">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 cyber-badge text-[9px] px-2 py-0.5 bg-white/90 dark:bg-slate-950/80">
                    {item.category}
                  </span>
                </div>

                <h4 className="text-base font-black text-slate-900 dark:text-white mb-1">{item.title}</h4>
                <p className="text-[11px] text-blue-600 dark:text-cyan-400 font-semibold mb-2">Client: {item.client}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">{item.description}</p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Preview</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Internal Repo</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-cyan-300 hover:bg-blue-600 hover:text-white transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item._id)}
                    className="p-1.5 rounded-lg bg-red-50 dark:bg-red-600/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden transition-colors">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
              {editingItem ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. E-Commerce Microservices Platform"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full Stack Development"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Retail Tech Corp"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Describe the application architecture and features"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tech Stack Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB, Docker"
                  value={formData.tagsStr}
                  onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary py-2 px-5 rounded-xl font-bold">
                  <span>{editingItem ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center shadow-2xl transition-colors">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h4 className="text-base font-black text-slate-900 dark:text-white">Delete Portfolio Project?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to permanently delete this project?
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
                  await onDeletePortfolio(deleteConfirmId);
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

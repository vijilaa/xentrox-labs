import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Search, FolderTree, AlertCircle } from 'lucide-react';

export default function CategoryManagement({
  categories,
  searchQuery = '',
  setSearchQuery,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory
}) {
  const [localSearch, setLocalSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    iconName: 'Code2',
    theme: 'dark',
    badge: 'Popular',
    description: ''
  });

  const activeSearch = searchQuery !== undefined && searchQuery !== '' ? searchQuery : localSearch;

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    if (setSearchQuery) setSearchQuery(val);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    if (setSearchQuery) setSearchQuery('');
  };

  const filteredCategories = categories.filter((c) => {
    const q = activeSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      (c.title && c.title.toLowerCase().includes(q)) ||
      (c.categoryId && c.categoryId.toLowerCase().includes(q)) ||
      (c.badge && c.badge.toLowerCase().includes(q)) ||
      (c.description && c.description.toLowerCase().includes(q))
    );
  });

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormData({
      title: '',
      categoryId: '',
      iconName: 'Code2',
      theme: 'dark',
      badge: 'Popular',
      description: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      title: category.title || '',
      categoryId: category.categoryId || '',
      iconName: category.iconName || 'Code2',
      theme: category.theme || 'dark',
      badge: category.badge || 'Popular',
      description: category.description || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCategory) {
      await onUpdateCategory(editingCategory._id, formData);
    } else {
      await onCreateCategory(formData);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Categories Management</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage learning tracks, certifications, and course categories ({categories.length} total)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              placeholder="Filter categories..."
              value={activeSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 pl-9 pr-8 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
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
            <span>New Category</span>
          </button>
        </div>
      </div>

      {/* Categories Table Container */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 px-4">
            <FolderTree className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
            {activeSearch ? (
              <>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  No categories found matching "{activeSearch}"
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  We couldn't find any category tracks matching your search keyword. Check your spelling or reset the filter.
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
                <p className="text-sm font-bold text-slate-900 dark:text-white">No Categories Added Yet</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Create your first category track to start organizing course modules.
                </p>
                <button onClick={handleOpenCreate} className="btn-primary text-xs py-2 px-4 rounded-xl font-bold mt-4">
                  <Plus className="w-4 h-4" />
                  <span>Create First Category</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Category Title</th>
                  <th className="p-3.5">Category Key / Slug</th>
                  <th className="p-3.5">Icon</th>
                  <th className="p-3.5">Badge</th>
                  <th className="p-3.5">Modules Count</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredCategories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-950/40 transition-colors">
                    <td className="p-3.5 text-slate-900 dark:text-white font-bold">{cat.title}</td>
                    <td className="p-3.5 text-blue-600 dark:text-cyan-400 font-mono text-[11px]">{cat.categoryId}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300 font-mono">{cat.iconName || 'Code2'}</td>
                    <td className="p-3.5">
                      <span className="cyber-badge text-[9px] px-2 py-0.5">{cat.badge || 'Popular'}</span>
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-bold">
                      {cat.courses ? cat.courses.length : 0} Courses
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(cat)}
                        className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-cyan-300 hover:bg-blue-600 hover:text-white transition-colors"
                        title="Edit Category"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(cat._id)}
                        className="p-1.5 rounded-lg bg-red-50 dark:bg-red-600/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Category"
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

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden transition-colors">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Category Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Development"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Category Key / Slug ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. software-dev"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Icon Name</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                  >
                    <option value="Code2">Code2</option>
                    <option value="Laptop">Laptop</option>
                    <option value="TrendingUp">TrendingUp</option>
                    <option value="PenTool">PenTool</option>
                    <option value="Cpu">Cpu</option>
                    <option value="BarChart3">BarChart3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. High Demand"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Short description of this learning category"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  <span>{editingCategory ? 'Save Changes' : 'Create Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center shadow-2xl transition-colors">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h4 className="text-base font-black text-slate-900 dark:text-white">Delete Category?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              This will permanently delete this category and all its linked course modules.
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
                  await onDeleteCategory(deleteConfirmId);
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

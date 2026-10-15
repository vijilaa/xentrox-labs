import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Search, FileText, AlertCircle } from 'lucide-react';

export default function BlogManagement({
  blogs,
  searchQuery = '',
  setSearchQuery,
  onCreateBlog,
  onUpdateBlog,
  onDeleteBlog
}) {
  const [localSearch, setLocalSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
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
    slug: '',
    content: '',
    excerpt: '',
    author: 'XentroX Labs Team',
    category: 'Technology & Trends',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    tagsStr: 'MERN, Career, WebDev',
    isPublished: true
  });

  const filteredBlogs = blogs.filter((b) => {
    const q = activeSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      b.title.toLowerCase().includes(q) ||
      (b.slug && b.slug.toLowerCase().includes(q)) ||
      (b.category && b.category.toLowerCase().includes(q)) ||
      (b.author && b.author.toLowerCase().includes(q)) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(q))
    );
  });

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      author: 'XentroX Labs Team',
      category: 'Technology & Trends',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      tagsStr: 'MERN, Career, WebDev',
      isPublished: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      author: blog.author || 'XentroX Labs Team',
      category: blog.category || 'Technology & Trends',
      image: blog.image || '',
      tagsStr: blog.tags ? blog.tags.join(', ') : '',
      isPublished: blog.isPublished !== undefined ? blog.isPublished : true
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tagsStr ? formData.tagsStr.split(',').map((t) => t.trim()) : []
    };

    if (editingBlog) {
      await onUpdateBlog(editingBlog._id, payload);
    } else {
      await onCreateBlog(payload);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Blogs & Articles</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish industry insights, career guides, and technical tutorials ({blogs.length} total)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              placeholder="Search blogs..."
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
            <span>Write Blog</span>
          </button>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 px-4">
            <FileText className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
            {activeSearch ? (
              <>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  No blog articles found matching "{activeSearch}"
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  No articles matched your keyword. Try searching for a different title or topic.
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
                <p className="text-sm font-bold text-slate-900 dark:text-white">No Blog Articles Found</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Publish your first blog article to share career insights with students.
                </p>
                <button onClick={handleOpenCreate} className="btn-primary text-xs py-2 px-4 rounded-xl font-bold mt-4">
                  <Plus className="w-4 h-4" />
                  <span>Write First Article</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Blog Title</th>
                  <th className="p-3.5">Slug</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Author</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-950/40 transition-colors">
                    <td className="p-3.5 text-slate-900 dark:text-white font-bold">{blog.title}</td>
                    <td className="p-3.5 text-blue-600 dark:text-cyan-400 font-mono text-[11px]">{blog.slug}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{blog.category}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{blog.author}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          blog.isPublished
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(blog)}
                        className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-cyan-300 hover:bg-blue-600 hover:text-white transition-colors"
                        title="Edit Blog"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(blog._id)}
                        className="p-1.5 rounded-lg bg-red-50 dark:bg-red-600/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Blog"
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
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto transition-colors">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
              {editingBlog ? 'Edit Blog Article' : 'Write New Blog Article'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Blog Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Top 5 Full Stack Development Trends"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Excerpt Summary</label>
                <input
                  type="text"
                  placeholder="Short 1-2 sentence preview"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Full Article Content</label>
                <textarea
                  rows="5"
                  required
                  placeholder="Write the full blog article content..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 font-sans"
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
                  <span>{editingBlog ? 'Save Changes' : 'Publish Article'}</span>
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
            <h4 className="text-base font-black text-slate-900 dark:text-white">Delete Blog Article?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to permanently delete this article?
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
                  await onDeleteBlog(deleteConfirmId);
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

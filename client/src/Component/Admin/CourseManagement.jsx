import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Search, BookOpen, AlertCircle } from 'lucide-react';

export default function CourseManagement({
  courses,
  categories,
  searchQuery = '',
  setSearchQuery,
  onCreateCourse,
  onUpdateCourse,
  onDeleteCourse
}) {
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
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
    name: '',
    categorySlug: categories.length > 0 ? categories[0].categoryId : 'software-dev',
    duration: '3 Months',
    level: 'Beginner to Advanced',
    tag: '',
    description: '',
    price: 0,
    badge: '',
    isPopular: false
  });

  const filteredCourses = courses.filter((c) => {
    const q = activeSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      (c.tag && c.tag.toLowerCase().includes(q)) ||
      (c.level && c.level.toLowerCase().includes(q)) ||
      (c.duration && c.duration.toLowerCase().includes(q)) ||
      (c.categorySlug && c.categorySlug.toLowerCase().includes(q));

    const matchesCategory = !selectedCategory || c.categorySlug === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setFormData({
      name: '',
      categorySlug: categories.length > 0 ? categories[0].categoryId : 'software-dev',
      duration: '3 Months',
      level: 'Beginner to Advanced',
      tag: '',
      description: '',
      price: 0,
      badge: '',
      isPopular: false
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name || '',
      categorySlug: course.categorySlug || (categories[0] ? categories[0].categoryId : ''),
      duration: course.duration || '3 Months',
      level: course.level || 'Beginner to Advanced',
      tag: course.tag || '',
      description: course.description || '',
      price: course.price || 0,
      badge: course.badge || '',
      isPopular: course.isPopular || false
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCourse) {
      await onUpdateCourse(editingCourse._id, formData);
    } else {
      await onCreateCourse(formData);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Courses Management</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Add and update technical course modules & track syllabi ({courses.length} total)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-colors"
          >
            <option value="">All Categories ({courses.length})</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.categoryId}>
                {cat.title}
              </option>
            ))}
          </select>

          {/* Search Box */}
          <div className="relative w-44 sm:w-60">
            <input
              type="text"
              placeholder="Filter courses..."
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
            <span>New Course</span>
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 px-4">
            <BookOpen className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
            {activeSearch || selectedCategory ? (
              <>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  No courses found matching {activeSearch ? `"${activeSearch}"` : 'selected category'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  No course modules match your search query or filter. Try a different keyword or reset filters.
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
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all"
                    >
                      Reset Category Filter
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-slate-900 dark:text-white">No Courses Found</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Create your first course module to populate your curriculum.
                </p>
                <button onClick={handleOpenCreate} className="btn-primary text-xs py-2 px-4 rounded-xl font-bold mt-4">
                  <Plus className="w-4 h-4" />
                  <span>Create First Course</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Course Name</th>
                  <th className="p-3.5">Category Track</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Level</th>
                  <th className="p-3.5">Tag</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredCourses.map((course) => (
                  <tr key={course._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-950/40 transition-colors">
                    <td className="p-3.5 text-slate-900 dark:text-white font-bold">{course.name}</td>
                    <td className="p-3.5 text-blue-600 dark:text-cyan-400 font-mono text-[11px]">{course.categorySlug}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{course.duration}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{course.level}</td>
                    <td className="p-3.5">
                      {course.tag ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-blue-50 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/30">
                          {course.tag}
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-600 text-[10px]">-</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(course)}
                        className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-cyan-300 hover:bg-blue-600 hover:text-white transition-colors"
                        title="Edit Course"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(course._id)}
                        className="p-1.5 rounded-lg bg-red-50 dark:bg-red-600/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Course"
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
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden transition-colors">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
              {editingCourse ? 'Edit Course Module' : 'Create New Course Module'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Course Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MERN Stack Development"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Category Track</label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.categoryId}>
                        {cat.title} ({cat.categoryId})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4 Months"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Skill Level</label>
                  <input
                    type="text"
                    placeholder="e.g. Beginner to Pro"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Highlight Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Popular, Hot, High ROI"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  rows="2"
                  placeholder="Overview of syllabus and skills acquired"
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
                  <span>{editingCourse ? 'Save Changes' : 'Create Course'}</span>
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
            <h4 className="text-base font-black text-slate-900 dark:text-white">Delete Course?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to permanently delete this course module?
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
                  await onDeleteCourse(deleteConfirmId);
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

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';
import { fallbackBlogs } from '../data/coursesData';
import { ArrowRight, Calendar, User, Sparkles, Loader2, Clock } from 'lucide-react';

function formatDate(d) {
  try { return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return d || ''; }
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=80';

const catColour = {
  'React.js':   'bg-blue-50 text-blue-700 border-blue-200',
  'MERN Stack': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Artificial Intelligence': 'bg-violet-50 text-violet-700 border-violet-200',
  'Digital Marketing': 'bg-orange-50 text-orange-700 border-orange-200',
  'Web Development': 'bg-lime-50 text-lime-700 border-lime-200',
};
function cc(cat) { return catColour[cat] || 'bg-slate-50 text-slate-600 border-slate-200'; }

export default function BlogsBanner() {
  const [blogs,   setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [active,  setActive]  = useState(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getBlogs();
      setBlogs(res?.data?.length > 0 ? res.data.slice(0, 4) : fallbackBlogs.slice(0, 4));
    } catch {
      setBlogs(fallbackBlogs.slice(0, 4));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  return (
    <>
      <section className="py-16 sm:py-20 bg-[#F4F9F6] border-y border-[#D4E8DC]">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="institute-badge mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Insights &amp; Learning
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-900">
                Engineering <span className="text-lime-600">Articles</span>
              </h2>
              <p className="text-base text-slate-500 mt-2 max-w-lg">
                Expert guides on React, MERN Stack, AI, and digital marketing from our training team.
              </p>
            </div>
            <Link
              to="/blogs"
              className="btn-outline text-sm py-3 px-6 rounded-xl font-bold inline-flex items-center gap-2 shrink-0 no-underline"
            >
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards */}
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 text-lime-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {blogs.map((blog, i) => (
                <article
                  key={blog._id || blog.id || i}
                  onClick={() => setActive(blog)}
                  className="group flex flex-col bg-white border border-[#D4E8DC] rounded-2xl overflow-hidden hover:border-lime-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <img
                      src={blog.image || FALLBACK_IMG}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.src = FALLBACK_IMG; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    {blog.category && (
                      <span className={`absolute top-3 left-3 text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${cc(blog.category)}`}>
                        {blog.category}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2">
                      <User className="w-3 h-3 text-lime-500" />
                      <span>{blog.author || 'XentroX Labs'}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-lime-700 transition-colors leading-snug mb-2 line-clamp-2 font-heading flex-1">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{blog.excerpt}</p>
                    <span className="text-xs font-bold text-lime-700 flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Quick modal */}
      {active && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-xl bg-white border border-[#D4E8DC] rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {active.image && (
              <div className="h-44 overflow-hidden">
                <img src={active.image} alt={active.title} className="w-full h-full object-cover"
                  onError={e => { e.target.src = FALLBACK_IMG; }} />
              </div>
            )}
            <div className="p-6">
              {active.category && (
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border mb-3 inline-block ${cc(active.category)}`}>
                  {active.category}
                </span>
              )}
              <h2 className="text-xl font-black font-heading text-slate-900 mb-3 leading-tight">{active.title}</h2>
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1"><User className="w-3 h-3 text-lime-500" />{active.author || 'XentroX Labs'}</span>
                {(active.createdAt || active.date) && <span>{formatDate(active.createdAt || active.date)}</span>}
              </div>
              <div className="text-base text-slate-700 leading-relaxed space-y-3">
                {(active.content || active.excerpt || '').split('\n').map((p, i) => p.trim() ? <p key={i}>{p}</p> : null)}
              </div>
            </div>
            <div className="px-6 pb-5 pt-4 border-t border-[#D4E8DC] flex justify-between items-center">
              <Link to="/blogs" onClick={() => setActive(null)} className="text-xs font-bold text-lime-700 hover:underline">
                View All Articles →
              </Link>
              <button onClick={() => setActive(null)} className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';
import { fallbackBlogs } from '../data/coursesData';
import {
  Calendar, User, ArrowRight, Sparkles, Loader2,
  Tag, Clock, RefreshCw, AlertCircle
} from 'lucide-react';

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return d || ''; }
}

/* ── Category pill colours ── */
const catColour = {
  'React.js':           'bg-blue-50 text-blue-700 border-blue-200',
  'MERN Stack':         'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Artificial Intelligence': 'bg-violet-50 text-violet-700 border-violet-200',
  'Digital Marketing':  'bg-orange-50 text-orange-700 border-orange-200',
  'Web Development':    'bg-lime-50 text-lime-700 border-lime-200',
  'Software Development': 'bg-teal-50 text-teal-700 border-teal-200',
  'Career Assistance':  'bg-pink-50 text-pink-700 border-pink-200',
};

function getCatColour(cat) {
  return catColour[cat] || 'bg-slate-50 text-slate-700 border-slate-200';
}

/* ── Read time estimator ── */
function estimateReadTime(text = '') {
  const words = text.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/* ── Blog Card ── */
function BlogCard({ blog, onRead, featured }) {
  const fallbackImg = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80';
  const readTime    = blog.readTime || estimateReadTime(blog.content || blog.excerpt || '');

  if (featured) {
    return (
      <article
        className="group relative rounded-2xl overflow-hidden border border-[#D4E8DC] hover:border-lime-400 hover:shadow-xl transition-all duration-300 cursor-pointer lg:col-span-2"
        onClick={() => onRead(blog)}
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src={blog.image || fallbackImg}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.src = fallbackImg; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {blog.category && (
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border mb-3 inline-block ${getCatColour(blog.category)}`}>
                {blog.category}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-black font-heading text-white leading-tight mb-2 group-hover:text-lime-300 transition-colors">
              {blog.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-white/60">
              <span className="flex items-center gap-1"><User className="w-3 h-3" />{blog.author || 'XentroX Labs'}</span>
              {(blog.createdAt || blog.date) && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(blog.createdAt || blog.date)}</span>}
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group flex flex-col bg-white border border-[#D4E8DC] rounded-2xl overflow-hidden hover:border-lime-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onRead(blog)}
    >
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={blog.image || fallbackImg}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = fallbackImg; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        {blog.category && (
          <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${getCatColour(blog.category)}`}>
            {blog.category}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2.5">
          <span className="flex items-center gap-1"><User className="w-3 h-3 text-lime-500" />{blog.author || 'XentroX Labs'}</span>
          {(blog.createdAt || blog.date) && (
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-lime-500" />{formatDate(blog.createdAt || blog.date)}</span>
          )}
        </div>
        <h3 className="text-base font-bold text-slate-900 group-hover:text-lime-700 transition-colors leading-snug mb-2 line-clamp-2 font-heading">
          {blog.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-4">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-[#EEF3F0] mt-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{readTime}</span>
          <span className="text-xs font-bold text-lime-700 flex items-center gap-1 group-hover:gap-2 transition-all">
            Read More <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

/* ── Blog Detail Modal ── */
function BlogModal({ blog, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const fallbackImg = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-[#D4E8DC] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={blog.image || fallbackImg}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = fallbackImg; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer text-lg font-bold"
          >
            ×
          </button>
          {blog.category && (
            <span className={`absolute bottom-4 left-5 text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${getCatColour(blog.category)}`}>
              {blog.category}
            </span>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-black font-heading text-slate-900 mb-3 leading-tight">{blog.title}</h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-5">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-lime-500" />{blog.author || 'XentroX Labs'}</span>
            {(blog.createdAt || blog.date) && (
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-lime-500" />{formatDate(blog.createdAt || blog.date)}</span>
            )}
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {blog.tags.map((t, i) => (
                <span key={i} className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F4F9F6] text-slate-600 border border-[#D4E8DC]">
                  <Tag className="w-3 h-3" />{t}
                </span>
              ))}
            </div>
          )}
          <div className="text-base text-slate-700 leading-relaxed space-y-4">
            {(blog.content || blog.excerpt || '').split('\n').map((p, i) =>
              p.trim() ? <p key={i}>{p}</p> : null
            )}
          </div>
        </div>
        <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-[#D4E8DC] flex justify-between items-center">
          <p className="text-xs text-slate-500">By <strong className="text-slate-700">{blog.author || 'XentroX Labs'}</strong></p>
          <button onClick={onClose} className="text-xs font-bold text-lime-700 hover:underline cursor-pointer">
            ← Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogsPage() {
  const [blogs,    setBlogs]   = useState([]);
  const [loading,  setLoading] = useState(true);
  const [error,    setError]   = useState('');
  const [active,   setActive]  = useState(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getBlogs();
      setBlogs(res?.data?.length > 0 ? res.data : fallbackBlogs);
    } catch {
      setBlogs(fallbackBlogs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  return (
    <>
      <div className="pt-20 bg-white">

        {/* ── Page Banner ── */}
        <section className="page-banner py-16 sm:py-24">
          <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Insights &amp; Learning
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white leading-[1.05] mb-5 max-w-2xl">
              Engineering &amp; Marketing Insights
            </h1>
            <p className="text-lg text-white/70 max-w-lg leading-relaxed">
              Expert articles on React, MERN Stack, AI tools, digital marketing, and building a tech career from scratch.
            </p>
          </div>
        </section>

        {/* ── Blog Grid ── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-10 h-10 text-lime-500 animate-spin" />
                <p className="text-slate-500 text-sm font-medium">Loading articles...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <AlertCircle className="w-10 h-10 text-red-400" />
                <p className="text-slate-600 font-semibold">Failed to load blogs</p>
                <button
                  onClick={fetchBlogs}
                  className="flex items-center gap-2 text-sm font-bold text-lime-600 hover:underline cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Try again
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog, i) => (
                    <BlogCard
                      key={blog._id || blog.id || i}
                      blog={blog}
                      onRead={setActive}
                      featured={i === 0 && blogs.length >= 3}
                    />
                  ))}
                </div>

                {blogs.length === 0 && (
                  <div className="text-center py-20">
                    <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-base">No articles published yet. Check back soon.</p>
                  </div>
                )}
              </>
            )}

          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="py-14 bg-[#F4F9F6] border-t border-[#D4E8DC]">
          <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 mb-3">
              Want to Learn More?
            </h2>
            <p className="text-base text-slate-600 mb-7 max-w-md mx-auto">
              Enroll in a track and learn directly from our engineering team inside a live software studio.
            </p>
            <Link to="/courses" className="btn-primary text-base py-3.5 px-9 rounded-xl font-bold inline-flex items-center gap-2 no-underline">
              Explore Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>

      {active && <BlogModal blog={active} onClose={() => setActive(null)} />}
    </>
  );
}

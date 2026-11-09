import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';
import { fallbackBlogs } from '../data/coursesData';
import { resolveImageUrl, handleImageError, DEFAULT_BLOG_FALLBACK } from '../utils/imageHelper';
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
  'React.js': 'bg-blue-50 text-blue-700 border-blue-200',
  'MERN Stack': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Artificial Intelligence': 'bg-violet-50 text-violet-700 border-violet-200',
  'Digital Marketing': 'bg-orange-50 text-orange-700 border-orange-200',
  'Web Development': 'bg-lime-50 text-lime-700 border-lime-200',
  'Software Development': 'bg-teal-50 text-teal-700 border-teal-200',
  'Career Assistance': 'bg-pink-50 text-pink-700 border-pink-200',
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
  const readTime = blog.readTime || estimateReadTime(blog.content || blog.excerpt || '');
  const imageSrc = resolveImageUrl(blog.image, DEFAULT_BLOG_FALLBACK);

  if (featured) {
    return (
      <article
        className="group relative rounded-2xl overflow-hidden border border-[#E2EBE5] hover:border-lime-500/70 hover:shadow-xs transition-all duration-200 cursor-pointer lg:col-span-2"
        onClick={() => onRead(blog)}
      >
        <div className="relative h-72 overflow-hidden bg-slate-100">
          <img
            src={imageSrc}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            onError={e => handleImageError(e, DEFAULT_BLOG_FALLBACK)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
            {blog.category && (
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border mb-3 inline-block ${getCatColour(blog.category)}`}>
                {blog.category}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-black font-heading text-white leading-tight mb-2 group-hover:text-lime-300 transition-colors">
              {blog.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-white/70">
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
      className="group flex flex-col bg-white border border-[#E2EBE5] rounded-2xl overflow-hidden hover:border-lime-500/70 hover:shadow-xs transition-all duration-200 cursor-pointer"
      onClick={() => onRead(blog)}
    >
      <div className="relative h-44 overflow-hidden flex-shrink-0 bg-slate-100">
        <img
          src={imageSrc}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          onError={e => handleImageError(e, DEFAULT_BLOG_FALLBACK)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
        {blog.category && (
          <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${getCatColour(blog.category)}`}>
            {blog.category}
          </span>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2.5">
          <span className="flex items-center gap-1"><User className="w-3 h-3 text-lime-600" />{blog.author || 'XentroX Labs'}</span>
          {(blog.createdAt || blog.date) && (
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-lime-600" />{formatDate(blog.createdAt || blog.date)}</span>
          )}
        </div>
        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#003831] transition-colors leading-snug mb-2 line-clamp-2 font-heading">
          {blog.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1 mb-4">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3.5 border-t border-[#F0F5F2] mt-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{readTime}</span>
          <span className="text-xs font-bold text-lime-700 flex items-center gap-1 group-hover:gap-1.5 transition-all">
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

  const imageSrc = resolveImageUrl(blog?.image, DEFAULT_BLOG_FALLBACK);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-[#E2EBE5] rounded-2xl overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <img
            src={imageSrc}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={e => handleImageError(e, DEFAULT_BLOG_FALLBACK)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
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
          <h2 className="text-2xl font-black font-heading text-slate-900 mb-3 leading-tight tracking-tight">{blog.title}</h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-5">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-lime-600" />{blog.author || 'XentroX Labs'}</span>
            {(blog.createdAt || blog.date) && (
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-lime-600" />{formatDate(blog.createdAt || blog.date)}</span>
            )}
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {blog.tags.map((t, i) => (
                <span key={i} className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F7FAF8] text-slate-700 border border-[#E2EBE5]">
                  <Tag className="w-3 h-3" />{t}
                </span>
              ))}
            </div>
          )}
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            {(blog.content || blog.excerpt || '').split('\n').map((p, i) =>
              p.trim() ? <p key={i}>{p}</p> : null
            )}
          </div>
        </div>
        <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-[#E2EBE5] flex justify-between items-center">
          <p className="text-xs text-slate-500">By <strong className="text-slate-800">{blog.author || 'XentroX Labs'}</strong></p>
          <button onClick={onClose} className="text-xs font-bold text-lime-700 hover:underline cursor-pointer">
            ← Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState(null);

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
        <section className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center overflow-hidden page-banner bg-[#01231B]">
          {/* Background: Laptop & tech desk artwork anchored on the left */}
          <img
            src="/blog-banner.jpg"
            alt="Engineering & Marketing Insights"
            className="absolute inset-0 w-full h-full object-cover object-left pointer-events-none"
            onError={e => { e.target.src = '/image copy 5.png'; }}
          />

          {/* Right gradient overlay so the text on the right stands out with high contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#01231B]/35 to-[#01231B]/90 sm:to-[#01231B]/85 pointer-events-none" />

          {/* Mobile dark wash for clean legibility on small screens */}
          <div className="absolute inset-0 bg-[#01231B]/75 sm:bg-transparent pointer-events-none" />

          {/* Content on the right side */}
          <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10 py-10 sm:py-16">
            <div className="flex sm:justify-end">
              <div className="max-w-xl text-left">
                <span className="inline-block text-[11px] font-bold tracking-widest text-lime-400 uppercase mb-2.5 drop-shadow-sm">
                  Knowledge Hub
                </span>
                <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-bold font-heading tracking-tight text-white leading-[1.18] mb-3 sm:mb-4 drop-shadow-md">
                  Engineering &amp; Marketing Insights
                </h1>
                <p className="text-xs sm:text-base lg:text-lg text-slate-200 leading-relaxed drop-shadow-sm">
                  Expert articles on React, MERN Stack, AI tools, digital marketing, and building a tech career from scratch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Blog Grid ── */}
        <section className="py-12 sm:py-20 lg:py-24 bg-[#F7FAF8]">
          <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-10 h-10 text-lime-600 animate-spin" />
                <p className="text-slate-500 text-sm font-medium">Loading articles...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <AlertCircle className="w-10 h-10 text-red-400" />
                <p className="text-slate-600 font-semibold">Failed to load blogs</p>
                <button
                  type="button"
                  onClick={fetchBlogs}
                  className="flex items-center gap-2 text-sm font-bold text-lime-600 hover:underline cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Try again
                </button>
              </div>
            ) : (
              <>
                <div data-anim="stagger" data-stagger="100" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                  <div className="text-center py-20 bg-white rounded-2xl border border-[#E2EBE5] p-8">
                    <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-base">No articles published yet. Check back soon.</p>
                  </div>
                )}
              </>
            )}

          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section data-anim="scale-in" data-delay="150" className="py-12 sm:py-20 bg-white border-t border-[#E2EBE5]">
          <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 text-center">
            <span className="text-xs font-bold tracking-wider text-lime-700 uppercase">
              Accelerate Your Journey
            </span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading text-slate-900 tracking-tight mt-1 mb-2.5 sm:mb-3">
              Want to Learn More?
            </h2>
            <p className="text-xs sm:text-base text-slate-600 mb-6 sm:mb-7 max-w-md mx-auto leading-relaxed">
              Enroll in a track and learn directly from our engineering team inside a live software studio.
            </p>
            <Link to="/courses" className="btn-primary text-xs sm:text-sm h-10 px-5.5 rounded-lg font-bold inline-flex items-center justify-center gap-2 w-full xs:w-auto no-underline shadow-xs active:scale-95 transition-all">
              Explore Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>

      {active && <BlogModal blog={active} onClose={() => setActive(null)} />}
    </>
  );
}

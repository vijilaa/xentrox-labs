import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { headerInfo } from '../data/coursesData';
import { Phone, Mail, Globe, MapPin, Send, Sparkles, AlertCircle } from 'lucide-react';
import { createEnquiry } from '../services/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      let phoneDigits = (form.phone || '').replace(/\D/g, '');
      if (phoneDigits.length === 12 && phoneDigits.startsWith('91')) {
        phoneDigits = phoneDigits.slice(2);
      } else if (phoneDigits.length === 11 && phoneDigits.startsWith('0')) {
        phoneDigits = phoneDigits.slice(1);
      }

      if (phoneDigits.length < 10) {
        setErrorMsg('Please enter a valid 10-digit mobile number.');
        setLoading(false);
        return;
      }

      await createEnquiry({
        fullName: form.name,
        email: form.email,
        phone: phoneDigits.slice(0, 10),
        course: 'General Contact Inquiry',
        message: form.message
      });

      window.dispatchEvent(new Event('enquiry_submitted'));
      setSent(true);
    } catch (err) {
      console.error('Contact submit error:', err);
      setErrorMsg(err.message || 'Failed to send message. Please contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-20 bg-white">

      {/* Page Banner */}
      <section className="bg-[#033B32] py-14 sm:py-20">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-xs font-mono mb-3 flex items-center gap-2 text-lime-400/60">
            <Link to="/" className="hover:text-lime-400">Home</Link>
            <span>/</span>
            <span className="text-lime-400">Contact Us</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white leading-tight mb-3 max-w-2xl">
            Talk to Us About Your Tech Journey
          </h1>
          <p className="text-slate-300 text-base max-w-xl leading-relaxed">
            Have a question about courses, enrollment, or career guidance? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left: Contact Details */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="institute-badge mb-3">Contact Details</span>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900">Reach XentroX Labs</h2>
                <p className="text-sm text-slate-600 mt-2">Admissions open. Our team responds within 24 hours.</p>
              </div>

              {[
                { icon: Phone, label: 'Call Us', value: headerInfo.formattedPhone, href: `tel:${headerInfo.phone}` },
                { icon: Mail, label: 'Email Us', value: headerInfo.email, href: `mailto:${headerInfo.email}` },
                { icon: Globe, label: 'Parent Studio', value: headerInfo.website, href: headerInfo.websiteUrl },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE9E4] hover:border-lime-400 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-lime-50 border border-lime-200 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-lime-700" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-lime-700 transition-colors">{item.value}</p>
                    </div>
                  </a>
                );
              })}

              {/* Locations */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Training Campuses</h3>
                {headerInfo.locations.map((loc, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE9E4]">
                    <MapPin className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{loc.city}</p>
                      <p className="text-xs text-slate-500">{loc.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-lime-100 border border-lime-200 flex items-center justify-center mb-4">
                    <Send className="w-7 h-7 text-lime-600" />
                  </div>
                  <h3 className="text-2xl font-black font-heading text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600 text-sm max-w-xs">We will get back to you within 24 hours. Meanwhile, explore our courses.</p>
                  <Link to="/courses" className="mt-5 btn-primary text-sm py-2.5 px-6 rounded-xl font-bold inline-flex items-center gap-2 no-underline">
                    Explore Courses
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl text-sm bg-[#F6FAF8] border border-[#DDE9E4] focus:outline-none focus:border-lime-500 text-slate-900 placeholder-slate-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Email *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl text-sm bg-[#F6FAF8] border border-[#DDE9E4] focus:outline-none focus:border-lime-500 text-slate-900 placeholder-slate-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Phone Number</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-[#F6FAF8] border border-[#DDE9E4] focus:outline-none focus:border-lime-500 text-slate-900 placeholder-slate-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      placeholder="Which course are you interested in? Any questions?"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-[#F6FAF8] border border-[#DDE9E4] focus:outline-none focus:border-lime-500 text-slate-900 placeholder-slate-400 resize-none" />
                  </div>
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                  <button type="submit" disabled={loading} className="btn-primary text-sm py-3 px-8 rounded-xl font-bold inline-flex items-center gap-2 disabled:opacity-50">
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

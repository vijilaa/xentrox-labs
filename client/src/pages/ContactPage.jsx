import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { headerInfo } from '../data/coursesData';
import { Phone, Mail, Globe, MapPin, Send, AlertCircle } from 'lucide-react';
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
    <div className="pt-20 bg-white">

      {/* Page Banner */}
      <section className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center overflow-hidden page-banner bg-[#01231B] scroll-reveal">
        {/* Background Artwork: Kanyakumari landmark & glowing contact icons */}
        <img
          src="/contact-banner.jpg"
          alt="Contact XentroX Labs"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-40 sm:opacity-90 lg:opacity-100"
          onError={e => { e.target.src = '/image copy 6.png'; }}
        />

        {/* Subtle left-side dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#01231B]/95 via-[#01231B]/75 to-[#01231B]/40 sm:via-[#01231B]/40 sm:to-transparent pointer-events-none" />

        {/* Content on the left */}
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10 py-10 sm:py-16">
          <div className="max-w-xl">
            <span className="inline-block text-[11px] font-bold tracking-widest text-lime-400 uppercase mb-2.5 drop-shadow-sm">
              Connect With Us
            </span>
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-bold font-heading tracking-tight text-white leading-[1.18] mb-3 sm:mb-4 drop-shadow-md">
              Talk to Us About Your Tech Journey
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-200 leading-relaxed drop-shadow-sm">
              Have a question about courses, enrollment, or career guidance? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[#F7FAF8]">
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Left: Contact Details */}
            <div data-anim="fade-right" data-delay="100" className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-wider text-lime-700 uppercase">
                  Get In Touch
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight mt-1">
                  Reach XentroX Labs
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Admissions open for new cohorts. Our career counselors and engineers respond within 24 hours.
                </p>
              </div>

              {[
                { icon: Phone, label: 'Call Us', value: headerInfo.formattedPhone, href: `tel:${headerInfo.phone}` },
                { icon: Mail, label: 'Email Us', value: headerInfo.email, href: `mailto:${headerInfo.email}` },
                { icon: Globe, label: 'Parent Studio', value: headerInfo.website, href: headerInfo.websiteUrl },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E2EBE5] hover:border-lime-500/70 hover:shadow-xs transition-all duration-200 group">
                    <div className="w-11 h-11 rounded-xl bg-lime-50 border border-lime-200/60 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-lime-700" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#003831] transition-colors">{item.value}</p>
                    </div>
                  </a>
                );
              })}

              {/* Locations */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Training Studios</h3>
                {headerInfo.locations.map((loc, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-[#E2EBE5]">
                    <MapPin className="w-4.5 h-4.5 text-lime-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{loc.city}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{loc.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div data-anim="fade-left" data-delay="200" className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-[#E2EBE5] p-5 xs:p-6 sm:p-8 lg:p-10 shadow-xs">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-lime-100 border border-lime-200 flex items-center justify-center mb-4">
                      <Send className="w-7 h-7 text-lime-700" />
                    </div>
                    <h3 className="text-2xl font-black font-heading text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600 text-sm max-w-xs leading-relaxed">
                      We will get back to you within 24 hours. Meanwhile, explore our course catalog.
                    </p>
                    <Link to="/courses" className="mt-6 btn-primary text-xs sm:text-sm h-10 px-5 rounded-lg font-bold inline-flex items-center gap-2 no-underline shadow-xs active:scale-95 transition-all">
                      Explore Courses
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-slate-900 mb-1">Send an Inquiry</h3>
                      <p className="text-xs text-slate-500">Fill in your details and our team will get back to you shortly.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Full Name *</label>
                        <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl text-sm bg-[#F7FAF8] border border-[#E2EBE5] focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 text-slate-900 placeholder-slate-400 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Email *</label>
                        <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl text-sm bg-[#F7FAF8] border border-[#E2EBE5] focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 text-slate-900 placeholder-slate-400 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Phone Number *</label>
                      <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl text-sm bg-[#F7FAF8] border border-[#E2EBE5] focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 text-slate-900 placeholder-slate-400 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Message *</label>
                      <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Which course are you interested in? Any specific questions?"
                        className="w-full px-4 py-3 rounded-xl text-sm bg-[#F7FAF8] border border-[#E2EBE5] focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 text-slate-900 placeholder-slate-400 resize-none transition-all" />
                    </div>
                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}
                    <button type="submit" disabled={loading} className="w-full sm:w-auto btn-primary text-xs sm:text-sm h-10 px-5.5 rounded-lg font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs cursor-pointer active:scale-95 transition-all">
                      <Send className="w-4 h-4" />
                      <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

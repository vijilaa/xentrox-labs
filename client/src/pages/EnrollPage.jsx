import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createEnquiry } from '../services/api';
import { courseCategories, headerInfo } from '../data/coursesData';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  Phone,
  Clock,
  BookOpen,
  Calendar,
  Award,
  Users
} from 'lucide-react';

export default function EnrollPage() {
  const [searchParams] = useSearchParams();
  const initialTrack = searchParams.get('track') || 'Full Stack Web Development';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedTrack: initialTrack,
    mode: 'Classroom Lab (Marthandam)',
    batchTime: 'Evening Cohort (6:00 PM – 8:00 PM)',
    experience: 'Recent College Graduate',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, phone: digits });
    if (digits.length === 0) {
      setPhoneError('');
    } else if (digits.length < 10) {
      setPhoneError('Mobile number must be exactly 10 digits.');
    } else if (digits.length > 10) {
      setPhoneError('Mobile number must not exceed 10 digits.');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setPhoneError('');
    setLoading(true);

    try {
      await createEnquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: phoneDigits,
        course: `${formData.selectedTrack} [${formData.mode} • ${formData.batchTime}]`,
        message: `Profile: ${formData.experience}. Note: ${formData.message || 'Direct enrollment application.'}`
      });

      setSubmitted(true);
      window.dispatchEvent(new Event('enquiry_submitted'));
    } catch (err) {
      console.error('Enrollment submission error:', err);
      setErrorMsg(err.message || 'Failed to submit enrollment application. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  // Flatten courses for select options
  const allAvailableCourses = courseCategories.flatMap((cat) =>
    cat.courses.map((c) => ({ name: c.name, category: cat.title }))
  );

  return (
    <div className="pt-24 pb-20">
      {/* 1. Page Hero */}
      <section className="py-14 sm:py-18 bg-[#F8FAF8] border-b border-[#E2ECE6] transition-colors">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-xs font-mono font-bold text-lime-600 mb-3 flex items-center gap-2">
            <Link to="/" className="hover:underline text-slate-500">Home</Link>
            <span>/</span>
            <span>Enroll Now</span>
          </div>

          <div className="max-w-3xl">
            <span className="institute-badge mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              ADMISSIONS OPEN 2026
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 leading-tight mb-4">
              Apply for Upcoming Training Batches
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Join South India's premier hands-on tech training institution. Free career counseling, zero upfront registration fee, and flexible batch timings in Marthandam &amp; Trivandrum.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Enrollment Application Form + Sidebar */}
      <section className="py-16 sm:py-20 bg-white transition-colors">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left 7 Cols: Application Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#F7FCF9] border border-[#D3E8DE] shadow-xl">
                <div className="mb-8">
                  <span className="cyber-badge text-xs mb-2">APPLICATION FORM</span>
                  <h2 className="text-2xl font-black font-heading text-slate-900">
                    Candidate Enrollment Details
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Please provide accurate information so our admissions team can schedule your counseling sprint.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-lime-500/20 text-lime-500 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black font-heading text-slate-900">
                      Enrollment Application Submitted!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Congratulations! Your seat reservation request has been registered in the XentroX Labs admissions portal. An instructor will contact you on <strong>+91 {formData.phone}</strong> shortly.
                    </p>
                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/91${headerInfo.phone}?text=Hi%20XentroX%20Labs%2C%20I%20just%20submitted%20my%20enrollment%20for%20${encodeURIComponent(formData.selectedTrack)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs py-2.5 px-6 rounded-full font-bold inline-flex items-center gap-2"
                      >
                        <span>Chat With Advisor on WhatsApp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-outline text-xs py-2.5 px-5 rounded-full font-bold cursor-pointer"
                      >
                        Submit Another Form
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMsg && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Candidate Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Full Name <span className="text-lime-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Johnson"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D3E8DE] text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                          Email Address <span className="text-lime-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. alex@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#D3E8DE] text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                          10-Digit Mobile <span className="text-lime-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          maxLength={10}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#D3E8DE] text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                        {phoneError && (
                          <p className="text-[11px] text-red-500 font-semibold mt-1">
                            {phoneError}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Course Track */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Select Specialized Track <span className="text-lime-500">*</span>
                      </label>
                      <select
                        value={formData.selectedTrack}
                        onChange={(e) => setFormData({ ...formData, selectedTrack: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D3E8DE] text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer"
                      >
                        {allAvailableCourses.map((c, i) => (
                          <option key={i} value={c.name}>
                            {c.name} ({c.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Learning Mode & Batch Timing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                          Preferred Mode
                        </label>
                        <select
                          value={formData.mode}
                          onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#D3E8DE] text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer"
                        >
                          <option value="Classroom Lab (Marthandam)">Classroom Lab (Marthandam, TN)</option>
                          <option value="Classroom Lab (Trivandrum)">Classroom Lab (Trivandrum, KL)</option>
                          <option value="100% Live Online Cohort">100% Live Online Cohort</option>
                          <option value="Hybrid (Lab + Online)">Flexible Hybrid (Lab + Online)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                          Preferred Batch Timing
                        </label>
                        <select
                          value={formData.batchTime}
                          onChange={(e) => setFormData({ ...formData, batchTime: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#D3E8DE] text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer"
                        >
                          <option value="Morning Cohort (9:30 AM – 12:30 PM)">Morning Cohort (9:30 AM – 12:30 PM)</option>
                          <option value="Evening Cohort (6:00 PM – 8:00 PM)">Evening Cohort (6:00 PM – 8:00 PM)</option>
                          <option value="Weekend Intensive (Sat & Sun)">Weekend Intensive (Sat &amp; Sun)</option>
                        </select>
                      </div>
                    </div>

                    {/* Current Background */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Current Experience / Background
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D3E8DE] text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer"
                      >
                        <option value="College Student (Pre-final / Final Year)">College Student (Pre-final / Final Year)</option>
                        <option value="Recent College Graduate (2024–2026)">Recent College Graduate (2024–2026)</option>
                        <option value="Working Professional (Tech)">Working Professional (Tech)</option>
                        <option value="Career Switcher (Non-Tech to Tech)">Career Switcher (Non-Tech to Tech)</option>
                      </select>
                    </div>

                    {/* Note */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Learning Goals &amp; Specific Questions
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us what you hope to achieve (e.g. MERN job placement, freelance skills, remote roles)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D3E8DE] text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary py-3.5 text-xs font-black rounded-xl justify-center shadow-lg shadow-lime-500/25 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <span>Apply for Admission — Free Consultation</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-slate-500">
                      No commitment or credit card required. Free 1-on-1 counseling with an instructor.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Right 5 Cols: What Happens Next & Benefits Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              {/* Process timeline card */}
              <div className="p-7 rounded-3xl bg-[#F7FCF9] border border-[#D3E8DE] shadow-sm space-y-5">
                <span className="cyber-badge text-[10px]">NEXT STEPS</span>
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  What Happens After You Apply?
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-500 text-[#022620] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Advisor Connect Call</p>
                      <p className="text-slate-600 mt-0.5">
                        Within 2 hours, a course mentor will contact you to understand your background and clarify questions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-500 text-[#022620] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Free Diagnostic &amp; Syllabus Review</p>
                      <p className="text-slate-600 mt-0.5">
                        Receive detailed module breakdowns, live project previews, and curriculum milestones.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-500 text-[#022620] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Studio Visit / Live Demo</p>
                      <p className="text-slate-600 mt-0.5">
                        Visit our lab in Marthandam or Trivandrum, or attend a live online interactive demo session.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-500 text-[#022620] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Cohort Onboarding</p>
                      <p className="text-slate-600 mt-0.5">
                        Set up your development sandbox, join the Discord/Slack studio channel, and start coding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-7 rounded-3xl bg-[#EEF8F2] border border-[#D3E8DE] space-y-3">
                <div className="flex items-center gap-2 text-lime-700 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-lime-500" />
                  <span>The XentroX Labs Guarantee</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-500 shrink-0" />
                    <span>100% active code on real production repositories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-500 shrink-0" />
                    <span>1-on-1 code reviews with working software engineers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-500 shrink-0" />
                    <span>Complete resume, LinkedIn &amp; placement referrals</span>
                  </li>
                </ul>
              </div>

              {/* Instant WhatsApp Connect */}
              <div className="p-6 rounded-3xl bg-white border border-[#D3E8DE] text-center space-y-3">
                <p className="text-xs font-bold text-slate-900">
                  Want an instant answer right now?
                </p>
                <a
                  href={`https://wa.me/91${headerInfo.phone}?text=Hello%20XentroX%20Labs%2C%20I%20have%20a%20question%20about%20course%20enrollment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark-green text-xs py-2.5 px-6 rounded-full font-bold inline-flex items-center gap-2 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-lime-400" />
                  <span>Chat With Advisor on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}



import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Send, CheckCircle2, Phone, Mail, User, BookOpen, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { posterCategories } from './CourseCategories';
import { createEnquiry } from '../services/api';

export default function EnrollmentModal({ isOpen, onClose, initialCourse = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedTrack: initialCourse || 'Full Stack Web Development',
    mode: 'Classroom Lab',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (initialCourse) {
      setFormData((prev) => ({ ...prev, selectedTrack: initialCourse }));
    }
  }, [initialCourse]);

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith('0')) {
      digits = digits.slice(1);
    }
    const cleanPhone = digits.slice(0, 10);
    setFormData({ ...formData, phone: cleanPhone });
    if (cleanPhone.length === 0) {
      setPhoneError('');
    } else if (cleanPhone.length < 10) {
      setPhoneError('Please enter a 10-digit mobile number.');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    let phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length === 12 && phoneDigits.startsWith('91')) {
      phoneDigits = phoneDigits.slice(2);
    } else if (phoneDigits.length === 11 && phoneDigits.startsWith('0')) {
      phoneDigits = phoneDigits.slice(1);
    }

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
        course: `${formData.selectedTrack} (${formData.mode})`,
        message: formData.message || `Direct application for ${formData.selectedTrack} via ${formData.mode}.`
      });

      window.dispatchEvent(new Event('enquiry_submitted'));
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3500);
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setErrorMsg(err.message || 'Unable to submit enquiry right now. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const modalJSX = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-backdrop"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-lg bg-white border-2 border-lime-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto z-[10000] animate-modal-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F4F9F6] border border-[#DCEBE2] text-slate-500 hover:text-[#003831] hover:bg-lime-50 flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Animated Success State */
          <div className="text-center py-8 sm:py-10 space-y-4 animate-fade-in">
            <div className="relative w-20 h-20 mx-auto">
              <svg className="w-20 h-20" viewBox="0 0 64 64">
                <circle
                  className="svg-checkmark-circle text-lime-500 stroke-current"
                  strokeWidth="4"
                  fill="#F0FDF4"
                  cx="32"
                  cy="32"
                  r="28"
                />
                <polyline
                  className="svg-checkmark-check text-[#003831] stroke-current"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="20,33 28,41 44,24"
                />
              </svg>
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-100 text-[#003831] text-xs font-extrabold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-lime-600" />
                Application Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#003831] font-heading">
                Welcome to XentroX Labs!
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you <strong className="text-[#003831] font-bold">{formData.fullName}</strong>. An admissions mentor will call you at <strong className="text-lime-700 font-bold">{formData.phone}</strong> to guide you through your batch schedule and studio workstation setup.
            </p>

            <div className="p-3.5 rounded-2xl bg-[#F4F9F6] border border-[#DCEBE2] text-xs text-slate-700 max-w-sm mx-auto">
              <span className="font-bold text-[#003831]">Program Track: </span>
              {formData.selectedTrack} • {formData.mode}
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={onClose}
                className="btn-primary py-2.5 px-8 text-sm font-extrabold rounded-xl cursor-pointer shadow-md"
              >
                Back to Website
              </button>
            </div>
          </div>
        ) : (
          /* Enrollment Form */
          <div>
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-50 border border-lime-200 text-[#003831] text-xs font-bold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-lime-600" />
                Admissions · 2026 Batch
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#003831] font-heading leading-tight">
                Enroll at XentroX Labs
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Learn from professionals. Work on real projects. Build your future.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Full Name <span className="text-lime-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#F4F9F6] border border-[#DCEBE2] rounded-xl px-4 py-3 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 focus:bg-white transition-colors"
                  />
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Mobile Number <span className="text-lime-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    className={`w-full bg-[#F4F9F6] border rounded-xl px-4 py-3 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-colors ${
                      phoneError
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#DCEBE2] focus:border-lime-500'
                    }`}
                  />
                  <Phone className={`w-4 h-4 absolute left-3.5 top-3.5 ${phoneError ? 'text-red-500' : 'text-slate-400'}`} />
                  {formData.phone && (
                    <span className={`absolute right-3.5 top-3.5 text-xs font-bold ${
                      formData.phone.length === 10 ? 'text-lime-600' : 'text-slate-400'
                    }`}>
                      {formData.phone.length}/10
                    </span>
                  )}
                </div>
                {phoneError && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {phoneError}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Email Address <span className="text-lime-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F4F9F6] border border-[#DCEBE2] rounded-xl px-4 py-3 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 focus:bg-white transition-colors"
                  />
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                </div>
              </div>

              {/* Selected Track */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Select Training Track
                </label>
                <div className="relative">
                  <select
                    value={formData.selectedTrack}
                    onChange={(e) => setFormData({ ...formData, selectedTrack: e.target.value })}
                    className="w-full bg-[#F4F9F6] border border-[#DCEBE2] rounded-xl px-4 py-3 pl-10 text-sm text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white cursor-pointer transition-colors"
                  >
                    {posterCategories.map((cat) => (
                      <optgroup key={cat.id} label={cat.title}>
                        {cat.courses.map((course, idx) => (
                          <option key={idx} value={course}>
                            {course}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <BookOpen className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Learning Mode */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Learning Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Classroom Lab', 'Online Live', 'Studio Hybrid'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFormData({ ...formData, mode: m })}
                      className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        formData.mode === m
                          ? 'bg-[#003831] text-lime-400 border-[#003831] shadow-sm'
                          : 'bg-[#F4F9F6] border-[#DCEBE2] text-slate-700 hover:bg-white hover:border-lime-500'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Questions or Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any questions about batches or mentorship?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#F4F9F6] border border-[#DCEBE2] rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 focus:bg-white transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 rounded-xl text-sm font-extrabold justify-center shadow-lg cursor-pointer disabled:opacity-50 btn-interactive"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-[#003831] border-t-transparent animate-spin" />
                    Submitting Application...
                  </span>
                ) : (
                  <>
                    <span>Confirm Enrollment Reservation</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-slate-500 pt-1">
                🔒 Strictly confidential. Direct admission counseling from working engineers.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalJSX, document.body);
}

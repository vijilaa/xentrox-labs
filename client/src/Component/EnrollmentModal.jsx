import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Send, CheckCircle2, Phone, Mail, User, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-backdrop"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-[calc(100vw-1.5rem)] xs:max-w-[440px] bg-white border border-[#E2EBE5] rounded-2xl p-4 xs:p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto z-[10000] animate-modal-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7.5 h-7.5 rounded-full bg-[#F7FAF8] hover:bg-slate-100 border border-[#E2EBE5] text-slate-400 hover:text-slate-700 flex items-center justify-center transition-all duration-200 hover:rotate-90 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Animated Success State */
          <div className="text-center py-6 space-y-3 animate-fade-in">
            <div className="relative w-16 h-16 mx-auto">
              <svg className="w-16 h-16" viewBox="0 0 64 64">
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
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="20,33 28,41 44,24"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#003831] font-heading">
                Welcome to XentroX Labs!
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
              Thank you <strong className="text-[#003831] font-semibold">{formData.fullName}</strong>. An admissions mentor will call you at <strong className="text-lime-700 font-semibold">{formData.phone}</strong>.
            </p>

            <div className="p-2.5 rounded-lg bg-[#F7FAF8] border border-[#E2EBE5] text-[11px] text-slate-700 max-w-xs mx-auto">
              <span className="font-semibold text-[#003831]">Track: </span>
              {formData.selectedTrack} • {formData.mode}
            </div>

            <div className="pt-1 flex justify-center">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-6 text-xs font-bold rounded-lg bg-[#84CC16] hover:bg-[#92dc1d] text-[#003831] transition-all cursor-pointer shadow-xs"
              >
                Back to Website
              </button>
            </div>
          </div>
        ) : (
          /* Enrollment Form */
          <div>
            <div className="mb-4 pr-7">
              <h3 className="text-lg sm:text-xl font-bold text-[#003831] font-heading leading-tight tracking-tight">
                Enroll at XentroX Labs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                Learn from professionals. Work on real projects. Build your future.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-[#84CC16] font-bold">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#F9FBFA] border border-[#DCE7E0] rounded-lg py-2.5 pl-10 pr-3 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 placeholder:text-xs sm:placeholder:text-[13px] focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/15 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Mobile Number <span className="text-[#84CC16] font-bold">*</span>
                </label>
                <div className="relative flex items-center">
                  <Phone className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${phoneError ? 'text-red-500' : 'text-slate-400'}`} />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    className={`w-full bg-[#F9FBFA] border rounded-lg py-2.5 pl-10 pr-14 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 placeholder:text-xs sm:placeholder:text-[13px] focus:outline-none focus:bg-white transition-all ${
                      phoneError
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20'
                        : 'border-[#DCE7E0] focus:border-lime-500 focus:ring-2 focus:ring-lime-500/15'
                    }`}
                  />
                  {formData.phone && (
                    <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10.5px] font-semibold pointer-events-none ${
                      formData.phone.length === 10 ? 'text-lime-600' : 'text-slate-400'
                    }`}>
                      {formData.phone.length}/10
                    </span>
                  )}
                </div>
                {phoneError && (
                  <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {phoneError}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-[#84CC16] font-bold">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F9FBFA] border border-[#DCE7E0] rounded-lg py-2.5 pl-10 pr-3 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 placeholder:text-xs sm:placeholder:text-[13px] focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/15 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Selected Track */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Select Training Track
                </label>
                <div className="relative flex items-center">
                  <BookOpen className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    value={formData.selectedTrack}
                    onChange={(e) => setFormData({ ...formData, selectedTrack: e.target.value })}
                    className="w-full bg-[#F9FBFA] border border-[#DCE7E0] rounded-lg py-2.5 pl-10 pr-9 text-xs sm:text-[13px] text-slate-900 focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/15 focus:bg-white cursor-pointer transition-all appearance-none"
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
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Learning Mode */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Learning Mode
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F1F5F3] rounded-xl border border-[#DCE7E0]">
                  {['Classroom Lab', 'Online Live', 'Studio Hybrid'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFormData({ ...formData, mode: m })}
                      className={`py-1.5 px-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 cursor-pointer text-center ${
                        formData.mode === m
                          ? 'bg-[#003831] text-[#84CC16] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Questions or Notes <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Any questions about batches or mentorship?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#F9FBFA] border border-[#DCE7E0] rounded-lg px-3 py-1.5 text-xs sm:text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/15 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#84CC16] hover:bg-[#92dc1d] active:scale-[0.99] text-[#003831] flex items-center justify-center gap-1.5 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50 mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-[#003831] border-t-transparent animate-spin" />
                    Submitting Application...
                  </span>
                ) : (
                  <>
                    <span>Confirm Enrollment Reservation</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </>
                )}
              </button>

              <p className="text-[10.5px] text-center text-slate-400 pt-0.5">
                🔒 Strictly confidential • Free career counseling session
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalJSX, document.body);
}

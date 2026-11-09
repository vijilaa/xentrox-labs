import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  Mail,
  Phone,
  BookOpen,
  MapPin,
  MessageSquare,
  Clock,
  ArrowRight
} from 'lucide-react';
import { createEnquiry } from '../../services/api';

gsap.registerPlugin(ScrollTrigger);

export default function EnrollmentSection({ initialTrack = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: initialTrack || 'MERN Stack Development',
    learningMode: 'Offline Classroom Lab',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const sectionRef = useRef(null);
  const formBoxRef = useRef(null);

  useEffect(() => {
    if (initialTrack) {
      setFormData((prev) => ({ ...prev, course: initialTrack }));
    }
  }, [initialTrack]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formBoxRef.current, {
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    // 1. Client-Side Validation
    if (!formData.fullName.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your full name.' });
      return;
    }

    const cleanEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (cleanEmail && !emailRegex.test(cleanEmail)) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid 10-digit mobile number.' });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: cleanEmail || `${phoneDigits}@lead.xentrox.com`,
        phone: phoneDigits,
        course: formData.course,
        message: `Mode: ${formData.learningMode}. ${formData.message ? `Notes: ${formData.message}` : ''}`
      };

      const res = await createEnquiry(payload);

      if (res && res.success) {
        setIsSuccess(true);
        setStatusMessage({
          type: 'success',
          text: 'Application submitted successfully! Our admissions counselor will contact you shortly.'
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          course: 'MERN Stack Development',
          learningMode: 'Offline Classroom Lab',
          message: ''
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res?.message || 'Failed to submit application. Please retry or contact us on WhatsApp.'
        });
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Network error while submitting. Please reach out on WhatsApp.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="enroll"
      ref={sectionRef}
      className="py-20 sm:py-24 bg-[#003F35] text-white relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section 11: Enrollment CTA Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#A3E635] border border-white/15 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
            2026 Batch Admissions Open
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            Ready to Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-emerald-300">Future in Tech?</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-medium leading-relaxed">
            Start learning through practical projects, expert guidance, and industry-oriented training.
          </p>
        </div>

        {/* Section 12: Integrated Enrollment Form Card */}
        <div
          ref={formBoxRef}
          className="rounded-3xl bg-white text-[#101828] p-7 sm:p-10 shadow-2xl border border-[#E5EAE5] max-w-3xl mx-auto"
        >
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black font-heading text-[#003F35]">
                Application Received!
              </h3>
              <p className="text-sm text-[#667085] max-w-md mx-auto leading-relaxed">
                Thank you for applying to XentroX Labs. Your details have been recorded in our admissions system. A senior mentor will contact you within 2 hours to confirm batch schedules.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://wa.me/919940727614?text=Hello%20XentroX%20Labs%2C%20I%20just%20submitted%20my%20enrollment%20form%20online."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center gap-1.5"
                >
                  Confirm on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-[#003F35] bg-[#F5F9F5] hover:bg-[#ebf5ef] border border-[#E5EAE5] transition-all"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4.5">
              <div className="border-b border-[#E5EAE5] pb-4 mb-2">
                <h3 className="text-lg font-bold font-heading text-[#101828]">
                  Candidate Application &amp; Consultation Form
                </h3>
                <p className="text-xs text-[#667085]">
                  Fields marked with an asterisk are required. No advance fee required to apply.
                </p>
              </div>

              {statusMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    statusMessage.type === 'error'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {statusMessage.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Anandhu Krishnan"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#F5F9F5] border border-[#E5EAE5] focus:border-[#78B82A] focus:bg-white rounded-xl outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. anandhu@example.com"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#F5F9F5] border border-[#E5EAE5] focus:border-[#78B82A] focus:bg-white rounded-xl outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1.5">
                    Phone Number (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#F5F9F5] border border-[#E5EAE5] focus:border-[#78B82A] focus:bg-white rounded-xl outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Preferred Course */}
                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1.5">
                    Preferred Career Track <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#F5F9F5] border border-[#E5EAE5] focus:border-[#78B82A] focus:bg-white rounded-xl outline-none transition-all text-[#101828]"
                    >
                      <option value="MERN Stack Development">MERN Stack Development</option>
                      <option value="Python Full Stack Development">Python Full Stack Development</option>
                      <option value="Java Full Stack Development">Java Full Stack Development</option>
                      <option value="Front-End Development">Front-End (React.js / Next.js)</option>
                      <option value="Back-End Development">Back-End (Node.js &amp; Express)</option>
                      <option value="UI/UX Design">UI/UX &amp; Product Design</option>
                      <option value="Digital Marketing & Growth">Digital Marketing &amp; Growth</option>
                      <option value="Data Analytics & AI">Data Analytics &amp; Generative AI</option>
                      <option value="Mobile App Development">Flutter Mobile App Development</option>
                      <option value="DevOps & Cloud">DevOps &amp; Cloud (AWS / Docker)</option>
                      <option value="General Technical Inquiry">Not Sure — Need Career Counseling</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Learning Mode */}
              <div>
                <label className="block text-xs font-bold text-[#101828] mb-1.5">
                  Preferred Learning Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    'Offline Classroom Lab',
                    'Weekend Intensive Batch',
                    'Live Interactive Online'
                  ].map((mode) => (
                    <label
                      key={mode}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors ${
                        formData.learningMode === mode
                          ? 'border-[#003F35] bg-[#F5F9F5] text-[#003F35] font-bold'
                          : 'border-[#E5EAE5] bg-white text-[#667085] hover:bg-[#F5F9F5]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="learningMode"
                        value={mode}
                        checked={formData.learningMode === mode}
                        onChange={handleChange}
                        className="text-[#003F35] focus:ring-[#78B82A]"
                      />
                      <span className="line-clamp-1">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message / Questions */}
              <div>
                <label className="block text-xs font-bold text-[#101828] mb-1.5">
                  Message, Questions or Career Background (Optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your background (e.g. non-IT graduate, gap year, fresher, working employee) and questions..."
                  className="w-full p-3 text-xs bg-[#F5F9F5] border border-[#E5EAE5] focus:border-[#78B82A] focus:bg-white rounded-xl outline-none transition-all"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-[#003F35] bg-[#A3E635] hover:bg-[#84CC16] shadow-lg shadow-lime-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <span>Submitting Application to Database...</span>
                ) : (
                  <>
                    <span>Apply for the Next Batch</span>
                    <ArrowRight className="w-4 h-4 text-[#003F35]" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

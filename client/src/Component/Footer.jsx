import React from 'react';
import { Link } from 'react-router-dom';
import { headerInfo } from '../data/coursesData';
import Logo from './Logo';
import { Phone, Globe, ArrowUp, Mail, MapPin } from 'lucide-react';

export default function Footer({ onOpenEnroll }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="footer" className="border-t border-[#E2EBE5] relative z-10 pt-10 xs:pt-12 sm:pt-14 pb-8 xs:pb-10 bg-[#F7FAF8] text-slate-600 text-xs">
      <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Footer Nav Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#E2EBE5]">

          {/* Brand & Direct Contact */}
          <div className="space-y-4 lg:col-span-1">
            <Logo size="md" href="/" />
            <p className="text-xs text-slate-600 leading-relaxed">
              XentroX Labs is the official training academy of XentroX Solutions. We bridge academic education with production-grade engineering and real client systems.
            </p>
            <p className="text-[11px] font-bold text-lime-700 tracking-wider uppercase">
              {headerInfo.motto}
            </p>

            {/* Direct Contact Links */}
            <div className="pt-3 space-y-2.5 border-t border-[#E2EBE5]">
              <a
                href={`tel:${headerInfo.phone}`}
                className="flex items-center gap-2.5 text-xs font-bold text-slate-900 hover:text-lime-700 transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-[#E6F4EA] flex items-center justify-center shrink-0 group-hover:bg-lime-200 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-lime-700" />
                </div>
                <span>{headerInfo.formattedPhone}</span>
              </a>
              <a
                href={`mailto:${headerInfo.email}`}
                className="flex items-center gap-2.5 text-xs font-medium text-slate-700 hover:text-lime-700 transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-[#E6F4EA] flex items-center justify-center shrink-0 group-hover:bg-lime-200 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-lime-700" />
                </div>
                <span className="truncate">{headerInfo.email}</span>
              </a>
              <a
                href={headerInfo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs font-medium text-slate-700 hover:text-lime-700 transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-[#E6F4EA] flex items-center justify-center shrink-0 group-hover:bg-lime-200 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-lime-700" />
                </div>
                <span>{headerInfo.website}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-heading">Quick Links</h4>
            <ul className="space-y-2.5 font-medium text-slate-600">
              {[['/', 'Home'], ['/about', 'About Us'], ['/courses', 'Courses (50+)'], ['/projects', 'Projects'], ['/career-assistance', 'Career Assistance'], ['/blogs', 'Blogs'], ['/contact', 'Contact Us']].map(([to, label]) => (
                <li key={to}><Link to={to} className="hover:text-lime-600 transition-colors">{label}</Link></li>
              ))}
              <li><Link to="/enroll" className="text-lime-600 font-bold hover:underline">Enroll Now →</Link></li>
            </ul>
          </div>

          {/* Software Tracks */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-heading">Software Tracks</h4>
            <ul className="space-y-2.5 font-medium text-slate-600">
              {['Full Stack Web Dev', 'MERN Stack Engineering', 'Python & DSA', 'Java Enterprise Dev', 'Generative AI', 'Cloud & DevOps'].map((t) => (
                <li key={t}><Link to="/courses" className="hover:text-lime-600 transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Marketing Tracks */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-heading">Marketing & Media</h4>
            <ul className="space-y-2.5 font-medium text-slate-600">
              {['Digital Marketing', 'Technical SEO', 'Social Media & Meta Ads', 'UI/UX Design', 'Video Editing', 'Graphic Design'].map((t) => (
                <li key={t}><Link to="/courses" className="hover:text-lime-600 transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-heading">Locations</h4>
            <div className="p-3.5 rounded-xl bg-white border border-[#E2EBE5] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <MapPin className="w-3.5 h-3.5 text-lime-600" />
                <span>Marthandam Studio</span>
              </div>
              <p className="text-[11px] text-slate-500">Kanyakumari District, Tamil Nadu, India</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E2EBE5] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <MapPin className="w-3.5 h-3.5 text-lime-600" />
                <span>Trivandrum Tech Hub</span>
              </div>
              <p className="text-[11px] text-slate-500">Technopark Corridor, Kerala, India</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p className="text-center sm:text-left text-xs">
            © {new Date().getFullYear()} XentroX Labs. All rights reserved. A brand of{' '}
            <a href="https://xentroxsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-lime-600 font-bold hover:underline">
              XentroX Solutions
            </a>.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-lime-600 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-lime-500" />
          </button>
        </div>
      </div>
    </footer>
  );
}

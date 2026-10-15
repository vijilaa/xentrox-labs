import React from 'react';
import { headerInfo } from '../data/coursesData';

export default function WhatsAppButton() {
  const rawPhone = import.meta.env.VITE_WHATSAPP_NUMBER || headerInfo.phone || '9940727614';
  const cleanPhone = String(rawPhone).replace(/\D/g, '');
  // Default to India country code 91 if a 10-digit number is provided
  const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(
    'Hello XentroX Labs, I would like to know more about your courses.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center group">
      {/* Tooltip */}
      <div className="mr-3 px-3 py-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden sm:flex items-center gap-1.5 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span>Chat on WhatsApp</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with XentroX Labs admissions counselor"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba59] transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        title="Chat on WhatsApp"
      >
        {/* Subtle Ambient Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

        {/* Official WhatsApp Logo SVG */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white relative z-10 drop-shadow-sm"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.07 16.3C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.05 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.27 11.92C20.27 16.46 16.58 20.15 12.04 20.15ZM16.56 14.38C16.31 14.26 15.09 13.66 14.86 13.58C14.64 13.5 14.47 13.46 14.3 13.71C14.13 13.96 13.65 14.53 13.5 14.7C13.36 14.87 13.21 14.89 12.96 14.77C12.71 14.65 11.91 14.38 10.96 13.54C10.22 12.88 9.72 12.07 9.57 11.82C9.43 11.57 9.56 11.44 9.68 11.31C9.79 11.2 9.93 11.02 10.05 10.87C10.18 10.73 10.22 10.62 10.3 10.45C10.39 10.29 10.34 10.14 10.28 10.02C10.22 9.9 9.73 8.69 9.52 8.19C9.32 7.7 9.12 7.77 8.96 7.76C8.82 7.75 8.65 7.75 8.48 7.75C8.31 7.75 8.04 7.81 7.81 8.06C7.58 8.31 6.94 8.91 6.94 10.13C6.94 11.35 7.83 12.53 7.95 12.69C8.07 12.86 9.69 15.35 12.16 16.42C12.75 16.67 13.21 16.83 13.57 16.94C14.16 17.13 14.7 17.1 15.12 17.04C15.6 16.97 16.59 16.44 16.8 15.85C17.01 15.27 17.01 14.77 16.95 14.67C16.88 14.57 16.81 14.51 16.56 14.38Z"
          />
        </svg>
      </a>
    </div>
  );
}



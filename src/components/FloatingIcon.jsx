// app/_Components/FloatingIconsBackground.js
"use client";

import React from 'react';

// --- Komponen untuk Ikon yang Melayang ---
const IconChip = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="5" y="5" width="14" height="14" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

const IconCode = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const IconGlobe = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

// Pastikan Anda menggunakan 'export default' di sini
export default function FloatingIconsBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-slate-900"></div>
      <IconChip 
        className="absolute text-cyan-500/20 w-32 h-32" 
        style={{ top: '10%', left: '15%', animation: 'float 15s ease-in-out infinite' }} 
      />
      <IconCode 
        className="absolute text-cyan-500/20 w-48 h-48" 
        style={{ top: '20%', right: '10%', animation: 'float-reverse 20s ease-in-out infinite', animationDelay: '-5s' }} 
      />
      <IconGlobe 
        className="absolute text-cyan-500/10 w-24 h-24" 
        style={{ bottom: '15%', left: '30%', animation: 'float 18s ease-in-out infinite', animationDelay: '-10s' }} 
      />
       <IconChip 
        className="hidden md:block absolute text-cyan-500/10 w-20 h-20" 
        style={{ bottom: '5%', right: '25%', animation: 'float-reverse 25s ease-in-out infinite' }} 
      />
       <IconCode 
        className="hidden lg:block absolute text-cyan-500/15 w-28 h-28" 
        style={{ top: '60%', left: '5%', animation: 'float 12s ease-in-out infinite', animationDelay: '-2s' }} 
      />
    </div>
  );
};

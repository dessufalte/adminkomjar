// app/praktikum/_Components/search.js
"use client";

// Komponen ini menyediakan input field untuk pencarian
export default function Search({ onSearchChange }) {
  return (
    <div className="relative w-full mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Cari nama praktikum..."
        className="block w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Search from "@/app/praktikum/_Components/search";
import Link from "next/link";
import Image from "next/image";

export default function ProjekList({ initialData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjek, setFilteredProjek] = useState(initialData);
  const [activeFilter, setActiveFilter] = useState('Semua');

  const languages = [...new Set(initialData.map(item => item.bahasa))];

  useEffect(() => {
    let result = initialData.filter(item =>
      (item.nama && item.nama.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.deskripsi && item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.bahasa && item.bahasa.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (activeFilter !== 'Semua') {
      result = result.filter(item => item.bahasa === activeFilter);
    }
    setFilteredProjek(result);
  }, [searchQuery, activeFilter, initialData]);

  return (
    <div>
      <Search onSearchChange={setSearchQuery} />
      
      <div className="flex flex-wrap gap-2 mb-8 mt-4">
        <button
          onClick={() => setActiveFilter('Semua')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === 'Semua'
              ? 'bg-cyan-500 text-white'
              : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
          }`}
        >
          Semua
        </button>
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveFilter(lang)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === lang
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {filteredProjek.length > 0 ? (
        <div className="space-y-6">
          {filteredProjek.map((projek) => (
            <div key={projek.id} className="p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700 flex flex-col md:flex-row gap-6">
              {projek.fotoUrl && (
                <div className="flex-shrink-0 w-full md:w-48 h-32 rounded-lg overflow-hidden">
                  <img 
                    src={projek.fotoUrl} 
                    alt={projek.nama} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-slate-100 mb-1">{projek.nama}</h3>
                <p className="text-sm text-slate-400 mb-3">{projek.deskripsi}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    {projek.bahasa}
                  </span>
                  <span>Oleh: {projek.pembuat}</span>
                  <span>
                    Tanggal: {projek.tanggal ? new Date(projek.tanggal).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : 'N/A'}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center md:justify-end">
                {projek.tautanGithub && (
                  <Link
                    href={projek.tautanGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 text-white bg-slate-700 rounded-lg font-medium hover:bg-slate-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-white"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387 0.599 0.111 0.793-0.261 0.793-0.577v-2.234c-3.338 0.726-4.033-1.416-4.033-1.416-0.546-1.387-1.333-1.756-1.333-1.756-1.089-0.745 0.083-0.729 0.083-0.729 1.205 0.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.49-0.002 0.109-0.729 0.42-1.305 0.762-1.604-2.665-0.305-5.467-1.334-5.467-2.964 0-1.305 0.469-2.388 1.236-3.221-0.124-0.305-0.535-1.524 0.117-3.176 0 0 1.008-0.322 3.301 1.23 2.809-0.777 5.497-0.777 8.306 0 2.293-1.552 3.297-1.23 3.297-1.23 0.653 1.653 0.242 2.871 0.118 3.176 0.766 0.833 1.235 1.916 1.235 3.221 0 1.63-2.808 2.637-5.476 2.962 0.43 0.372 0.823 1.102 0.823 2.222v3.293c0 0.319 0.192 0.694 0.801 0.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>Kunjungi GitHub</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-800 rounded-xl">
          <h3 className="text-xl font-semibold text-slate-200">Tidak Ditemukan</h3>
          <p className="mt-2 text-slate-400">
            {searchQuery
              ? `Proyek dengan kata kunci "${searchQuery}" tidak dapat ditemukan.`
              : "Tidak ada data proyek yang tersedia saat ini."
            }
          </p>
        </div>
      )}
    </div>
  );
}

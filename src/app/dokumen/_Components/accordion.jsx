// app/_Components/accordion.jsx

"use client";
import { useState } from "react";

// Komponen untuk satu item di dalam accordion
const AccordionItem = ({ title, dokumen, isOpen, onToggle }) => {
  // Prop 'children' diganti menjadi 'dokumen'
  return (
    <div className="border border-slate-700 bg-slate-800 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 cursor-pointer text-white text-left"
        onClick={onToggle}
      >
        <h2 className="text-md font-semibold">{title}</h2>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
        style={{ maxHeight: isOpen ? `${dokumen.length * 50}px` : '0px' }} // Kalkulasi tinggi dinamis
      >
        <div className="border-t border-slate-700 text-slate-300 text-sm">
          <ul className="py-2">
            {/* Memastikan 'dokumen' adalah array sebelum di-map */}
            {Array.isArray(dokumen) && dokumen.map((item) => (
              <li key={item.id}>
                <a 
                  href={item.url} 
                  className="block px-4 py-2 text-blue-400 hover:bg-slate-700/50 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Komponen utama Accordion
const Accordion = ({ items }) => {
  // State untuk melacak item mana yang sedang terbuka
  const [openIndex, setOpenIndex] = useState(null);

  // Fungsi untuk membuka/menutup item
  const toggleItem = (index) => {
    // Jika item yang sama diklik lagi, tutup. Jika tidak, buka item baru.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-2">
      {/* Memastikan 'items' adalah array sebelum di-map */}
      {Array.isArray(items) && items.map((item) => (
        <AccordionItem
          key={item.id} 
          title={item.name}
          dokumen={item.dokumen} // Menggunakan prop 'dokumen' bukan 'children'
          isOpen={openIndex === item.id}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
};

export default Accordion;

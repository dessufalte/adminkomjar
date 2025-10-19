"use client";

import { useState, useEffect } from "react";
import Search from "./search";
import PraktikumCard from "./PraktikumCard";

export default function PraktikumList({ initialData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPrak, setFilteredPrak] = useState(initialData);

  useEffect(() => {
    const filtered = initialData.filter(item =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPrak(filtered);
  }, [searchQuery, initialData]);

  return (
    <div>
      <Search onSearchChange={setSearchQuery} />

      {filteredPrak.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrak.map((item) => (
            <PraktikumCard
              key={item.id}
              id={item.id}
              title={item.nama}
              desc={item.deskripsi}
              imageUrl={item.fotoUrl}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-800 rounded-xl">
          <h3 className="text-xl font-semibold text-slate-200">Tidak Ditemukan</h3>
          <p className="mt-2 text-slate-400">
            {searchQuery
              ? `Praktikum dengan nama "${searchQuery}" tidak dapat ditemukan.`
              : "Tidak ada data praktikum yang tersedia saat ini."
            }
          </p>
        </div>
      )}
    </div>
  );
}

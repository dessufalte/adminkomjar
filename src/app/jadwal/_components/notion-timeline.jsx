"use client";

import { useState } from "react";

// Helper function untuk memformat tanggal (tidak ada perubahan)
function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


export default function Timeline({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);

  // Fungsi untuk menutup panel detail
  const handleClose = () => setSelectedItem(null);

  return (
    <div className="relative border-l-2 border-slate-700 pl-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="mb-10 relative group cursor-pointer"
          onClick={() => setSelectedItem(item)}
        >
          {/* Titik timeline dengan warna netral */}
          <div className="absolute -left-[18px] top-1 w-5 h-5 bg-slate-400 group-hover:bg-white rounded-full border-4 border-slate-700 shadow-lg transition-colors duration-300" />

          {/* Kartu event dengan tema slate */}
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg hover:border-slate-600 transition-all duration-300">
            <p className="text-sm text-slate-500 mb-1">
              {formatDate(item.startDate)}
              {item.endDate && item.endDate !== item.startDate
                ? ` – ${formatDate(item.endDate)}`
                : ""}
            </p>
            <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
              {item.title}
            </h3>
            {item.jenis && (
              <span className="inline-block mt-2 text-xs px-2 py-1 bg-slate-700 text-slate-300 border border-slate-600 rounded-full">
                {item.jenis}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Slide-in Detail Panel dengan tema slate */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          selectedItem
            ? "opacity-100 bg-black/70"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose} // Menutup panel saat area luar diklik
      >
        <div
          className={`w-full max-w-md bg-slate-800 border-l border-slate-700 h-full shadow-2xl p-6 relative transform transition-transform duration-300 ease-in-out ml-auto ${
            selectedItem ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat panel itu sendiri diklik
        >
          <button
            className="absolute top-4 right-4 text-slate-500 hover:text-white text-3xl leading-none transition-colors"
            onClick={handleClose}
          >
            &times;
          </button>

          {selectedItem && (
            <div className="text-slate-300 h-full overflow-y-auto pr-4">
              <h2 className="text-2xl font-bold text-white mb-4 pt-8">
                {selectedItem.title}
              </h2>
              <div className="space-y-3 text-sm">
                <p className="flex items-center">
                  <span className="mr-3 text-slate-400">🗓️</span>
                  {formatDate(selectedItem.startDate)}{" "}
                  {selectedItem.endDate &&
                    selectedItem.endDate !== selectedItem.startDate &&
                    `– ${formatDate(selectedItem.endDate)}`}
                </p>
                <p className="flex items-center">
                  <span className="mr-3 text-slate-400">📍</span>
                  {selectedItem.location || "Tidak ada lokasi"}
                </p>
                <p className="flex items-center">
                  <span className="mr-3 text-slate-400">🗂️</span>
                  {selectedItem.jenis || "Tanpa jenis"}
                </p>
                <p className="flex items-center">
                  <span className="mr-3 text-slate-400">🏷️</span>
                  Status:{" "}
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      selectedItem.status === "Not Started"
                        ? "bg-slate-600 text-slate-300"
                        : selectedItem.status === "In Progress"
                        ? "bg-yellow-500 text-yellow-900" // Kuning tetap dipertahankan untuk status 'In Progress' agar menonjol
                        : "bg-slate-300 text-slate-900" // Status 'Completed'
                    }`}
                  >
                    {selectedItem.status}
                  </span>
                </p>
              </div>

              {selectedItem.tasks && (
                <div className="mt-6 border-t border-slate-700 pt-4">
                    <h3 className="font-semibold text-slate-200 mb-2">Deskripsi / Tugas:</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        {selectedItem.tasks}
                    </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

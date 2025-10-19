"use client"
import { useState } from "react";

const GaleriList = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Menghitung total halaman
  const totalPages = Math.ceil(children.length / itemsPerPage);

  // Menentukan item yang akan ditampilkan pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = children.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk berpindah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="h-[47rem] justify-between flex flex-col">
      {/* Grid Galeri */}
      <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-6 mx-auto gap-2 w-full">
        {currentItems}
      </div>

      {/* Pagination di bawah */}
      <div className="flex justify-center mt-6 ">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-slate-600 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-slate-600 text-white" : "bg-slate-500"}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-slate-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GaleriList;

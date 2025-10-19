"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import GalleryImageCard from "./_Components/GalleryImageCard";
import { notFound } from "next/navigation";

// Komponen Modal yang akan menampilkan detail foto
const ImageModal = ({ isOpen, onClose, imageData }) => {
  if (!isOpen || !imageData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity duration-300">
      <div className="relative bg-slate-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-slate-300 transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={imageData.fotoUrl}
          alt={imageData.judul}
          className="w-full h-auto rounded-t-lg object-cover"
        />
        <div className="p-6 text-white space-y-3">
          <h2 className="text-2xl font-bold">{imageData.judul}</h2>
          <p className="text-sm text-slate-400">
            Tanggal: {imageData.tanggal ? new Date(imageData.tanggal).toLocaleDateString() : 'N/A'}
          </p>
          <p className="text-md">{imageData.deskripsi}</p>
        </div>
      </div>
    </div>
  );
};

// Fungsi untuk mengambil data dari API route internal
async function getGaleriFromAPI() {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/galeri`;

  try {
    const response = await fetch(apiUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`Gagal mengambil data dari API. Status: ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Gagal fetch data galeri:", error.message);
    return [];
  }
}

export default function Galeri() {
  const [listGaleri, setListGaleri] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getGaleriFromAPI();
      setListGaleri(data);
    }
    fetchData();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-slate-100">Galeri</h1>
          <p className="text-slate-400 mt-2">
            Dokumentasi berbagai kegiatan, praktikum, dan acara di laboratorium komputer dan jaringan.
          </p>
        </div>

        {listGaleri && listGaleri.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {listGaleri.map((image) => (
              <div
                key={image.id}
                onClick={() => openModal(image)}
                className="cursor-pointer"
              >
                <GalleryImageCard
                  imageUrl={image.fotoUrl}
                  caption={`${image.judul} - ${image.tanggal ? new Date(image.tanggal).toLocaleDateString() : ''}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-800 rounded-lg text-slate-400">
            <p>Tidak ada foto yang tersedia saat ini.</p>
          </div>
        )}
      </div>
      <ImageModal isOpen={!!selectedImage} onClose={closeModal} imageData={selectedImage} />
    </div>
  );
}

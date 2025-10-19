// app/galeri/_Components/GalleryImageCard.js

"use client";

// 1. Impor useState untuk mengelola state
import { useState } from "react"; 
import Image from "next/image";

export default function GalleryImageCard({ imageUrl, caption }) {
  // 2. Buat state untuk URL gambar dan caption
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [currentCaption, setCurrentCaption] = useState(caption);
  const [hasError, setHasError] = useState(false);

  // 3. Buat fungsi untuk menangani error saat gambar gagal dimuat
  const handleError = () => {
   
    if (!hasError) {
      setHasError(true);
      // Ganti URL gambar ke placeholder
      setCurrentImageUrl('/lkj.png');
      // Ganti caption
      setCurrentCaption("Gambar tidak ditemukan");
    }
  };

  return (
    <div
      className="group relative block w-full aspect-square bg-slate-800 rounded-lg overflow-hidden shadow-lg"
    >
      <Image
        // 4. Gunakan state untuk sumber gambar dan alt text
        src={currentImageUrl}
        alt={currentCaption} 
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
        // 5. Panggil fungsi handleError saat terjadi error
        onError={handleError}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 text-white">
        <p className="text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          {/* 6. Tampilkan caption dari state */}
          {currentCaption}
        </p>
      </div>
    </div>
  );
}

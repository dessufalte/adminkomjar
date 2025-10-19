// app/_Components/glasscont.js

// Komponen ini menyediakan latar belakang dinamis dan sebuah kontainer dengan efek kaca.
function GlassCont({ children }) {
  return (
    // Kontainer utama dengan latar belakang gelap dan posisi relatif
    // untuk menampung elemen latar belakang animasi.
    <div className="relative w-full overflow-hidden bg-transparent">
      
      {/* Elemen Latar Belakang Animasi (Blobs) */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Kontainer kaca itu sendiri */}
      {/* Diposisikan di atas latar belakang (z-10) dan terpusat di layar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl">
          {/* Konten dari halaman utama akan dirender di sini */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default GlassCont;

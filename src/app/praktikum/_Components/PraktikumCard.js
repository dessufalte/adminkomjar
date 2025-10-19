import Link from "next/link";

export default function PraktikumCard({ id, title, desc, imageUrl }) {
  return (
    <Link
      href={`/praktikum/${id}`}
      className="group block bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative w-full h-40">
        {/* Ganti Next/Image dengan <img> biasa */}
        <img
          src={imageUrl}
          alt={`Gambar untuk ${title}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-400 line-clamp-2">
          {desc}
        </p>
        <div className="mt-4 text-sm font-semibold text-cyan-500 flex items-center">
          Lihat Detail
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

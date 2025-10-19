import Link from "next/link";
import Image from "next/image";

export default function ProjekCard({ projek }) {
  const formattedDate = projek.tanggal
    ? new Date(projek.tanggal).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <div className="flex flex-col bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
      <div className="h-48 overflow-hidden">
        {projek.fotoUrl ? (
          <img 
            src={projek.fotoUrl} 
            alt={projek.nama} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-400">
            Tidak ada foto
          </div>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-slate-100 mb-2 truncate">
          {projek.nama}
        </h3>
        <p className="text-sm text-slate-400 mb-4 flex-grow line-clamp-3">
          {projek.deskripsi}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold">
            {projek.bahasa}
          </span>
          <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium">
            Oleh: {projek.pembuat}
          </span>
          <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium">
            {formattedDate}
          </span>
        </div>
        {projek.tautanGithub && (
          <Link
            href={projek.tautanGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center space-x-2 px-4 py-2 text-white bg-slate-700 rounded-lg font-medium hover:bg-slate-600 transition-colors"
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
  );
}

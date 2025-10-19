import Navbar from "@/components/navbar";
import GlassCont from "@/components/glasscont";
import MapComponent from "@/components/map";
import HomeFooter from "@/components/homefooter";
import Image from "next/image";
import Link from "next/link";
import FloatingIconsBackground from "@/components/FloatingIcon";

// Fungsi untuk mengambil data struktur organisasi dari API
async function getStrukturOrganisasi() {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/struktur-organisasi`;

  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      console.error(`Gagal mengambil data struktur organisasi. Status: ${response.status}`);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Gagal fetch data struktur organisasi:", error.message);
    return [];
  }
}

export default async function Home() {
  const teamMembers = await getStrukturOrganisasi();

  return (
    <div className="bg-slate-900 text-slate-300 w-full">
      <Navbar />

      <main>
        <section className="relative">
          <FloatingIconsBackground />

          <div className="relative z-10">
            <GlassCont>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="text-center lg:text-left space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                      Selamat Datang di Laboratorium Komputer dan Jaringan
                    </h1>
                    <p className="text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0">
                      Pusat inovasi dan pembelajaran untuk mahasiswa dalam
                      menguasai teknologi jaringan, pengembangan perangkat
                      lunak, dan sistem komputer terkini.
                    </p>
                    <div className="flex justify-center lg:justify-start space-x-4 pt-4">
                      <Link
                        href="/praktikum"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 shadow-lg"
                      >
                        Mulai Praktikum
                      </Link>
                      <Link
                        href="/jadwal"
                        className="bg-slate-700/80 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105"
                      >
                        Lihat Jadwal
                      </Link>
                    </div>
                  </div>

                  {/* Kolom Gambar */}
                  <div className="flex justify-center items-center">
                    <div className="bg-slate-800/50 p-4 rounded-full shadow-2xl backdrop-blur-sm">
                      <Image
                        src="/lkj.png"
                        alt="Logo Laboratorium Komputer dan Jaringan"
                        width={250}
                        height={250}
                        priority
                        className="drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCont>
          </div>
        </section>

        {/* --- Visi & Misi Section --- */}
        <section className="bg-slate-800 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Visi & Misi Departemen</h2>
            <p className="mt-4 text-lg text-slate-400">
              Menjadi Program Studi Teknik Komputer yang terkemuka di bidang Rekayasa Sistem Tertanam di tingkat Global pada tahun 2028.
            </p>
            <ul className="mt-8 space-y-4 text-left">
              <li className="flex items-start p-4 bg-slate-700/50 rounded-lg border border-slate-700">
                <svg
                  className="w-6 h-6 text-cyan-400 mr-4 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Menyelenggarakan pendidikan berkualitas tinggi untuk menghasilkan lulusan yang profesional dan mampu memenuhi kebutuhan masyarakat, industri dan pemerintah.
                </span>
              </li>
              <li className="flex items-start p-4 bg-slate-700/50 rounded-lg border border-slate-700">
                <svg
                  className="w-6 h-6 text-cyan-400 mr-4 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Melaksanakan riset untuk pengembangan konsep dan ilmu yang berkelanjutan di bidang Teknik Komputer.
                </span>
              </li>
              <li className="flex items-start p-4 bg-slate-700/50 rounded-lg border border-slate-700">
                <svg
                  className="w-6 h-6 text-cyan-400 mr-4 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Melaksanakan pengabdian masyarakat dalam rangka penerapan ilmu teknik komputer.
                </span>
              </li>
            </ul>
          </div>
        </section>
        
        {/* --- Struktur Organisasi Section --- */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">
                Struktur Organisasi
              </h2>
              <p className="mt-4 text-slate-400">
                Tim kami yang berdedikasi untuk kemajuan laboratorium.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.nama}
                  className="text-center bg-slate-800 p-6 rounded-xl border border-slate-700 hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-slate-700">
                    <Image
                      src={member.fotoUrl || '/lkj.png'}
                      alt={`Foto ${member.nama}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">
                    {member.nama}
                  </h3>
                  <p className="text-cyan-400">{member.jabatan}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 group">
              <Image
                src="/glass.avif"
                alt="Suasana di dalam Laboratorium Komputer dan Jaringan"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  Tentang Laboratorium Komputer Jaringan
                </h2>
                <p className="mt-2 text-lg text-slate-300 max-w-2xl">
                  Lihat lebih dekat suasana dan fasilitas yang kami sediakan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Lokasi Section --- */}
        <section className="bg-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">Kunjungi Kami</h2>
              <p className="mt-4 text-slate-400">
                Temukan lokasi kami di kampus Unand
              </p>
            </div>
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-2 text-center lg:text-left">
                <h3 className="text-xl font-bold text-white">Alamat</h3>
                <p className="mt-2 text-slate-400">
                  Gedung Fakultas Teknologi Informasi, Lantai 2<br />
                  Universitas Andalas, Limau Manis<br />
                  Padang, Sumatera Barat
                </p>
                <h3 className="text-xl font-bold text-white mt-6">
                  Jam Operasional
                </h3>
                <p className="mt-2 text-slate-400">
                  Senin - Jumat<br />
                  08:00 - 16:00 WIB
                </p>
              </div>
              <div className="lg:col-span-3 h-80 lg:h-96 rounded-xl overflow-hidden border-2 border-slate-700">
                <MapComponent />
              </div>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}

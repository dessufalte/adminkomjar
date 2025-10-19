import Navbar from "@/components/navbar";
import ProjekList from "./_Components/ProjekList";

async function getProjekFromAPI() {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projek`;

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
    console.error("Gagal fetch data proyek:", error.message);
    return [];
  }
}

export default async function Projects() {
  const listProjek = await getProjekFromAPI();

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-bold text-3xl text-slate-100">Daftar Proyek</h1>
          <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
            Jelajahi berbagai proyek yang telah dikembangkan oleh tim laboratorium.
          </p>
        </div>

        <ProjekList initialData={listProjek} />
      </div>
    </div>
  );
}

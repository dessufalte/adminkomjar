// app/jadwal/page.js
import ListLayout from "@/components/listlayout";
import Navbar from "@/components/navbar";
import ThreeLayout from "@/components/threelayout";
import Timeline from "./_components/notion-timeline";
import { getTimelineData } from "@/lib/notion";

export default async function JadwalPage() {
  const items = await getTimelineData(process.env.NOTION_DATABASE_ID);

  return (
    <div className="">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <ThreeLayout>
          <div className="col-span-5">
            <h1 className="text-3xl font-bold mb-6">Timeline</h1>
            <Timeline items={items} />
          </div>
        </ThreeLayout>
      </div>
    </div>
  );
}

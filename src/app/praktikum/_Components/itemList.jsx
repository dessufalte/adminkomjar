import MainBtn from "@/app/_Components/mainbtn";
import Link from "next/link";
import ImageText from "./imgText";

const ItemList = ({ title, desc, url, img_url }) => {
  return (
    <div className="flex flex-col bg-slate-700  border border-slate-500 rounded-sm">
      <div className="bg-slate-600 h-12">
        <h1 className="p-2 text-sm font-semibold">{title}</h1>
      </div>
      <ImageText text={desc} imageUrl={img_url} />
      <div className="align-middle p-2">
        <Link href={url}>
          <MainBtn title="Lihat Praktikum" />
        </Link>
      </div>
    </div>
  );
};

export default ItemList;

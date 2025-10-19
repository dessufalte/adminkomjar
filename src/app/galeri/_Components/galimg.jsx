import Image from "next/image";

const GaleryImg = ({ img_url, title }) => {
  const img_urls = "/" + img_url;
  return (
    <div className="relative w-full aspect-square shadow-md group">
      <Image
        src={img_urls}
        alt={title || "Image"}
        fill
        className="object-cover rounded"
      />
      <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 text-white text-lg p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default GaleryImg;

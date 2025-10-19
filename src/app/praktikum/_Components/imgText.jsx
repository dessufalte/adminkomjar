function ImageText({ imageUrl, text }) {
  return (
    <div className="relative w-full h-60 overflow-hidden">
      <img src={imageUrl} alt="Background" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-white text-xl font-extralight">{text}</h1>
      </div>
    </div>
  );
}

export default ImageText;

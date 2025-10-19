// app/galeri/_Components/InstagramPostCard.js
import Image from "next/image";

export default function InstagramPostCard({ post }) {
  return (
    <a
      href={post.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full aspect-square bg-slate-800 rounded-lg overflow-hidden shadow-lg"
    >
      <Image
        src={post.imageUrl}
        alt={post.caption.substring(0, 50)} // Gunakan sebagian caption sebagai alt text
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=" // Placeholder blur sederhana
      />
      
      {/* Overlay yang muncul saat hover */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
        {/* Ikon di pojok */}
        <div className="flex justify-between">
            {post.isVideo && (
                <svg className="w-6 h-6 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5l-2-2H4zm6 6a2 2 0 100-4 2 2 0 000 4z" /></svg>
            )}
            <svg className="w-6 h-6 ml-auto drop-shadow-md" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
        </div>

        {/* Statistik di bagian bawah */}
        <div className="text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 1v8h12V6H4zm2 2h8v1H6V8zm0 2h8v1H6v-1z" /></svg>
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

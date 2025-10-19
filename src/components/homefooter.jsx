// app/_Components/homefooter.js
import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, YoutubeIcon, EmailIcon } from "./SocialIcons"; // Impor ikon SVG

const HomeFooter = () => {
  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/lkj.tekomua/', icon: <InstagramIcon /> },
    { name: 'YouTube', href: '#', icon: <YoutubeIcon /> },
    { name: 'Email', href: 'mailto:lkj@fti.unand.ac.id', icon: <EmailIcon /> },
  ];

  const navLinks = [
    { name: 'Praktikum', href: '/praktikum' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Jadwal', href: '/jadwal' },
    { name: 'Dokumen', href: '/dokumen' },
  ];

  return (
    <footer className="bg-slate-800 border-t border-slate-700 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Grid utama untuk layout responsif */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Kolom 1: Branding & Info Utama */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/lkj.png"
                alt="Logo LKJ"
                width={50}
                height={50}
              />
              <span className="text-xl font-bold text-white">LKJ Teknik Komputer Unand</span>
            </div>
            <p className="text-sm">
              Laboratorium Komputer dan Jaringan<br />
              Fakultas Teknologi Informasi<br />
              Universitas Andalas
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Navigasi</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Kontak</h3>
            <div className="mt-4 space-y-2">
              <p>Gedung FTI, Lantai 2<br/>Kampus Unand Limau Manis<br/>Padang, Sumatera Barat</p>
              <a href="mailto:lkj@fti.unand.ac.id" className="block hover:text-white transition-colors">lkj@fti.unand.ac.id</a>
            </div>
          </div>

          {/* Kolom 4: Ikuti Kami */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Ikuti Kami</h3>
            <div className="flex space-x-5 mt-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label={link.name}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bagian Copyright di Bawah */}
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Laboratorium Komputer dan Jaringan, FTI Unand. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default HomeFooter;

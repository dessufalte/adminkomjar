import "./globals.css";

export const metadata = {
  title: "LABKOMJAR",
  description: "Laboratorium Komputer & Jaringan",
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-700 overflow-y-auto">
        <div>{children}</div>
      </body>
    </html>
  );
}

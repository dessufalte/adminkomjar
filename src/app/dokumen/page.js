"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";

// --- Komponen Ikon untuk File ---
const FileIcon = ({ url }) => {
    const isPdf = url && url.endsWith('.pdf');
    // Default ke ikon Word jika bukan PDF
    return isPdf ? (
        <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v12H4V4zm4 2a1 1 0 100 2h4a1 1 0 100-2H8zm0 3a1 1 0 000 2h2a1 1 0 100-2H8zm0 3a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd" /></svg>
    ) : (
        <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2.5 2A1.5 1.5 0 001 3.5v13A1.5 1.5 0 002.5 18h15a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0017.5 2h-15zm5.97 4.97a.75.75 0 011.06 0l1.97 1.97 1.97-1.97a.75.75 0 111.06 1.06l-1.97 1.97 1.97 1.97a.75.75 0 11-1.06 1.06l-1.97-1.97-1.97 1.97a.75.75 0 010-1.06z" /></svg>
    );
};

// --- Komponen Accordion yang Didesain Ulang ---
const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full space-y-3">
            {items.map((item) => {
                const isOpen = openIndex === item.id;
                return (
                    <div key={item.id} className="bg-slate-800 rounded-lg border border-slate-700 transition-all duration-300">
                        <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full flex justify-between items-center p-5 text-left"
                        >
                            <h3 className="text-lg font-semibold text-slate-100">{item.name}</h3>
                            <svg
                                className={`w-6 h-6 text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out`}
                            style={{ maxHeight: isOpen ? `${item.dokumen.length * 60}px` : '0px' }}
                        >
                            <div className="border-t border-slate-700">
                                {item.dokumen.map((doc) => (
                                    <Link key={doc.id} href={doc.fileUrl} target="_blank" download>
                                        <div className="flex items-center space-x-4 px-5 py-4 hover:bg-slate-700/50 transition-colors cursor-pointer border-b border-slate-700 last:border-b-0">
                                            <FileIcon url={doc.fileUrl} />
                                            <span className="text-slate-300">{doc.nama}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// --- Komponen Halaman Utama ---
export default function DokumenPage() {
    const [groupedSurat, setGroupedSurat] = useState([]);

    const fetchSurat = async () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/surat`;
        try {
            const res = await fetch(apiUrl, { cache: 'no-store' });
            if (!res.ok) {
                console.error(`Gagal mengambil data dari API. Status: ${res.status}`);
                return [];
            }
            const data = await res.json();
            
            // Mengelompokkan data berdasarkan jenis surat
            const groups = data.reduce((acc, current) => {
                const groupName = current.jenis || 'Lain-lain';
                if (!acc[groupName]) {
                    acc[groupName] = {
                        id: groupName, // ID unik untuk setiap grup
                        name: groupName,
                        dokumen: []
                    };
                }
                acc[groupName].dokumen.push({
                    id: current.id,
                    nama: current.nama,
                    fileUrl: current.fileUrl
                });
                return acc;
            }, {});

            const formattedGroups = Object.values(groups).map((group, index) => ({
                ...group,
                id: index + 1 // Memberi ID unik pada setiap grup
            }));
            
            setGroupedSurat(formattedGroups);

        } catch (error) {
            console.error("Gagal fetch data surat:", error.message);
            return [];
        }
    };

    useEffect(() => {
        fetchSurat();
    }, []);

    return (
        <div className="bg-slate-900 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12">
                    <h1 className="font-bold text-4xl text-slate-100 tracking-tight">Arsip Dokumen</h1>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                        Temukan dan unduh template surat serta dokumen administrasi yang Anda butuhkan untuk keperluan laboratorium dan praktikum.
                    </p>
                </div>

                {groupedSurat && groupedSurat.length > 0 ? (
                    <Accordion items={groupedSurat} />
                ) : (
                    <div className="text-center py-12 bg-slate-800 rounded-lg text-slate-400">
                        <p>Tidak ada dokumen yang tersedia saat ini.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

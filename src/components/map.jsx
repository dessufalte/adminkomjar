"use client"

import { useEffect, useRef, useState } from 'react';

const locations = [
    { id: 1, name: 'Laboratorium Komputer Jaringan', lat: -0.9152498497080948, lng: 100.46107056722617 },
    { id: 2, name: 'Universitas Andalas', lat: -0.9149443299833259, lng: 100.45822176981787 },
];


const mapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },

];


export default function MapComponent() {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [activeLocationId, setActiveLocationId] = useState(locations[0].id);
    const infoWindowRef = useRef(null);

    // --- LOGIKA UTAMA UNTUK MEMUAT PETA ---
    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            console.error("Error: Kunci Google Maps API tidak ditemukan di .env.local");
            return;
        }

        const SCRIPT_ID = 'google-maps-script';
        const CALLBACK_NAME = 'initMapComponent'; // Nama callback unik

        // Fungsi yang akan dijalankan setelah skrip Google Maps siap
        const initMap = () => {
            if (!window.google || !mapRef.current) return;

            const mapInstance = new window.google.maps.Map(mapRef.current, {
                center: { lat: locations[0].lat, lng: locations[0].lng },
                zoom: 17,
                styles: mapStyles,
                disableDefaultUI: true,
                zoomControl: true,
            });
            setMap(mapInstance);

            // Buat satu InfoWindow yang akan digunakan kembali
            infoWindowRef.current = new window.google.maps.InfoWindow();

            // Buat marker untuk setiap lokasi
            locations.forEach((loc) => {
                const marker = new window.google.maps.Marker({
                    position: { lat: loc.lat, lng: loc.lng },
                    map: mapInstance,
                    title: loc.name,
                    icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: "#06b6d4",
                        fillOpacity: 1,
                        strokeWeight: 2,
                        strokeColor: "#ffffff",
                    },
                });

                marker.addListener("click", () => {
                    handleLocationClick(loc, mapInstance);
                });
            });
        };

        // --- LOGIKA PEMUATAN SKRIP YANG LEBIH AMAN ---
        // Jadikan fungsi initMap bisa diakses secara global untuk callback
        window[CALLBACK_NAME] = initMap;

        // 1. Cek apakah skrip SUDAH ADA di halaman
        const existingScript = document.getElementById(SCRIPT_ID);

        if (!existingScript) {
            // 2. Jika BELUM ADA, buat dan tambahkan skrip baru
            const script = document.createElement("script");
            script.id = SCRIPT_ID;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${CALLBACK_NAME}`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        } else if (window.google) {
            // 3. Jika skrip SUDAH ADA dan objek google siap, langsung inisialisasi peta
            initMap();
        }

        // Fungsi cleanup untuk menghapus callback global saat komponen dibongkar
        return () => {
            if (window[CALLBACK_NAME]) {
                delete window[CALLBACK_NAME];
            }
        };
    }, []); // Dependency array kosong agar efek ini hanya berjalan sekali

    const handleLocationClick = (location, mapInstance = map) => {
        if (mapInstance && infoWindowRef.current) {
            mapInstance.panTo({ lat: location.lat, lng: location.lng });
            mapInstance.setZoom(18);
            setActiveLocationId(location.id);

            // --- PERBAIKAN: Tampilkan InfoWindow tanpa membuat marker baru ---
            const infoWindow = infoWindowRef.current;
            infoWindow.setContent(`<div style="color: #333; font-weight: bold;">${location.name}</div>`);
            infoWindow.setPosition({ lat: location.lat, lng: location.lng });
            infoWindow.open(mapInstance);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-[600px] bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            {/* Daftar Lokasi (Sidebar) */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-slate-800/50 p-4 overflow-y-auto">
                <h3 className="text-lg font-bold text-white mb-4 px-2">Lokasi Penting</h3>
                <ul className="space-y-2">
                    {locations.map((location) => (
                        <li
                            key={location.id}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center space-x-3 ${
                                activeLocationId === location.id
                                    ? 'bg-cyan-500 text-white shadow-lg'
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                            onClick={() => handleLocationClick(location)}
                        >
                            <span className={`w-2 h-2 rounded-full ${activeLocationId === location.id ? 'bg-white' : 'bg-cyan-400'}`}></span>
                            <span className="font-medium">{location.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Elemen Peta */}
            <div ref={mapRef} className="w-full h-full"></div>
        </div>
    );
};

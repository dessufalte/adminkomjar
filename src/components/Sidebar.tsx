"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const menuItems = [
  {
    label: "Praktikum",
    route: "/dashboard/praktikum",
    icon: (
      <svg
        className="fill-current"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.75 2.25H2.25C1.55964 2.25 1 2.80964 1 3.5V14.5C1 15.1904 1.55964 15.75 2.25 15.75H15.75C16.4404 15.75 17 15.1904 17 14.5V3.5C17 2.80964 16.4404 2.25 15.75 2.25Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.25 5.75V11.25M7.75 5.75V11.25M5.25 5.75V11.25M12.75 5.75V11.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Project",
    route: "/dashboard/projek",
    icon: (
      <svg
        className="fill-current"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 13V15.5C16 16.0523 15.5523 16.5 15 16.5H3C2.44772 16.5 2 16.0523 2 15.5V5.5C2 4.94772 2.44772 4.5 3 4.5H8.5L10.5 6.5H15C15.5523 6.5 16 6.94772 16 7.5V13Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Surat",
    route: "/dashboard/surat",
    icon: (
      <svg
        className="fill-current"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 4L9 8.5L2.5 4M1 4.5V14.5C1 15.0523 1.44772 15.5 2 15.5H16C16.5523 15.5 17 15.0523 17 14.5V4.5M17 4.5L9 10L1 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Galeri",
    route: "/dashboard/galeri",
    icon: (
      <svg
        className="fill-current"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V15.5C1.5 16.0523 1.94772 16.5 2.5 16.5H15.5C16.0523 16.5 16.5 16.0523 16.5 15.5V2.5C16.5 1.94772 16.0523 1.5 15.5 1.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 5.5C10.5 6.60457 9.60457 7.5 8.5 7.5C7.39543 7.5 6.5 6.60457 6.5 5.5C6.5 4.39543 7.39543 3.5 8.5 3.5C9.60457 3.5 10.5 4.39543 10.5 5.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 12.5L10.5 8.5L5.5 13.5L3.5 11.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  }, {
    label: "Struktur Organisasi",
    route: "/dashboard/struktur-organisasi",
    icon: (
      <svg
        className="fill-current"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V15.5C1.5 16.0523 1.94772 16.5 2.5 16.5H15.5C16.0523 16.5 16.5 16.0523 16.5 15.5V2.5C16.5 1.94772 16.0523 1.5 15.5 1.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 5.5C10.5 6.60457 9.60457 7.5 8.5 7.5C7.39543 7.5 6.5 6.60457 6.5 5.5C6.5 4.39543 7.39543 3.5 8.5 3.5C9.60457 3.5 10.5 4.39543 10.5 5.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 12.5L10.5 8.5L5.5 13.5L3.5 11.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-screen w-72 bg-black text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo + Close button */}
      <div className="flex items-center justify-between px-6 py-5">
        <Link href="/">
          <Image
            src="/images/logo/logo.png"
            alt="Logo"
            width={176}
            height={32}
            priority
          />
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white"
        >
          ✕
        </button>
      </div>

      {/* Menu List */}
      <nav className="mt-4 px-4">
        <h3 className="text-sm mb-4 text-gray-400">MAIN MENU</h3>
        <ul className="flex flex-col gap-2">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.route}
                className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 transition ${
                  selected === item.route ? "bg-gray-700" : ""
                }`}
                onClick={() => setSelected(item.route)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

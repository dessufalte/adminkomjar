"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";

// Data dummy dari halaman lain untuk dihitung
const dummyPraktikum = [
  { id: 1, moduls: [{ id: 101 }, { id: 102 }] },
  { id: 2, moduls: [{ id: 201 }, { id: 202 }] },
];

const dummyProjects = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

const dummySurat = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

const totalModuls = dummyPraktikum.reduce(
  (sum, praktikum) => sum + praktikum.moduls.length,
  0,
);

const totalPraktikum = dummyPraktikum.length;
const totalProjects = dummyProjects.length;
const totalSurat = dummySurat.length;


const DashboardAnalytics = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Praktikum" total={totalPraktikum} rate="0" levelUp={false}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
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
              d="M10.25 5.75V11.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.75 5.75V11.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.25 5.75V11.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.75 5.75V11.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Modul" total={totalModuls} rate="0" levelUp={false}>
           <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4V4h4v16zm6 0h-4V4h4v16zm6 0h-4V4h4v16z"
              fill="currentColor"
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Proyek" total={totalProjects} rate="0" levelUp={false}>
           <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
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
        </CardDataStats>
        <CardDataStats title="Total Surat" total={totalSurat} rate="0" levelUp={false}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 4L9 8.5L2.5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 4.5V14.5C1 15.0523 1.44772 15.5 2 15.5H16C16.5523 15.5 17 15.0523 17 14.5V4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 4.5L9 10L1 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12">
          {/* Anda bisa menambahkan chart, tabel, atau komponen lain di sini */}
        </div>
      </div>
    </>
  );
};

export default DashboardAnalytics;

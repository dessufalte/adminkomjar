import DashboardAnalytics from "@/components/Dashboard/DashboardAnalytics";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata = {
  title: "Dashboard | Sistem Informasi Manajemen",
  description: "Halaman ringkasan statistik untuk sistem manajemen.",
};

export default function Home() {
  return (
    <DefaultLayout>
      <DashboardAnalytics />
    </DefaultLayout>
  );
}

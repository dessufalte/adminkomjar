import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const praktikum = await prisma.praktikum.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        moduls: true,
      },
    });

    if (!praktikum) {
      return NextResponse.json({ error: "Praktikum tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(praktikum);
  } catch (error) {
    console.error("Error fetching praktikum detail:", error);
    return NextResponse.json({ error: "Gagal mengambil data praktikum" }, { status: 500 });
  }
}

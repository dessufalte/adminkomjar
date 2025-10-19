import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const praktikumId = searchParams.get('praktikumId');

  try {
    const moduls = await prisma.modul.findMany({
      where: {
        praktikumId: parseInt(praktikumId),
      },
    });
    return NextResponse.json(moduls);
  } catch (error) {
    console.error("Error fetching moduls:", error);
    return NextResponse.json({ error: "Gagal mengambil data modul" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newModul = await prisma.modul.create({
      data: {
        nama: data.nama,
        kode: data.kode,
        fileUrl: data.fileUrl,
        praktikumId: parseInt(data.praktikumId),
      },
    });
    return NextResponse.json(newModul, { status: 201 });
  } catch (error) {
    console.error("Error creating modul:", error);
    return NextResponse.json({ error: "Gagal membuat modul baru" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const updatedModul = await prisma.modul.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
        nama: data.nama,
        kode: data.kode,
        fileUrl: data.fileUrl,
      },
    });
    return NextResponse.json(updatedModul);
  } catch (error) {
    console.error("Error updating modul:", error);
    return NextResponse.json({ error: "Gagal memperbarui modul" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.modul.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ message: "Modul berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting modul:", error);
    return NextResponse.json({ error: "Gagal menghapus modul" }, { status: 500 });
  }
}


import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const galeriItems = await prisma.galeri.findMany();
    return NextResponse.json(galeriItems);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json({ error: "Gagal mengambil data galeri" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newGaleriItem = await prisma.galeri.create({
      data: {
        judul: data.judul,
        deskripsi: data.deskripsi,
        tanggal: new Date(data.tanggal),
        fotoUrl: data.fotoUrl,
      },
    });
    return NextResponse.json(newGaleriItem, { status: 201 });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json({ error: "Gagal membuat item galeri baru" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const updatedGaleriItem = await prisma.galeri.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
        judul: data.judul,
        deskripsi: data.deskripsi,
        tanggal: new Date(data.tanggal),
        fotoUrl: data.fotoUrl,
      },
    });
    return NextResponse.json(updatedGaleriItem);
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json({ error: "Gagal memperbarui item galeri" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.galeri.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ message: "Item galeri berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json({ error: "Gagal menghapus item galeri" }, { status: 500 });
  }
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const praktikums = await prisma.praktikum.findMany({
      include: {
        moduls: true,
      },
    });
    return NextResponse.json(praktikums);
  } catch (error) {
    console.error("Error fetching praktikum:", error);
    return NextResponse.json({ error: "Gagal mengambil data praktikum" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newPraktikum = await prisma.praktikum.create({
      data: {
        nama: data.nama,
        kode: data.kode,
        deskripsi: data.deskripsi,
        fotoUrl: data.fotoUrl,
        linkPendaftaran: data.linkPendaftaran, // Menerima link pendaftaran
      },
    });
    return NextResponse.json(newPraktikum, { status: 201 });
  } catch (error) {
    console.error("Error creating praktikum:", error);
    return NextResponse.json({ error: "Gagal membuat praktikum baru" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const updatedPraktikum = await prisma.praktikum.update({
      where: {
        id: data.id,
      },
      data: {
        nama: data.nama,
        kode: data.kode,
        deskripsi: data.deskripsi,
        fotoUrl: data.fotoUrl,
        linkPendaftaran: data.linkPendaftaran, // Menerima link pendaftaran
      },
    });
    return NextResponse.json(updatedPraktikum);
  } catch (error) {
    console.error("Error updating praktikum:", error);
    return NextResponse.json({ error: "Gagal memperbarui praktikum" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await prisma.modul.deleteMany({
      where: {
        praktikumId: parseInt(id),
      },
    });

    await prisma.praktikum.delete({
      where: {
        id: parseInt(id),
      },
    });
    
    return NextResponse.json({ message: "Praktikum dan modul terkait berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting praktikum:", error);
    return NextResponse.json({ error: "Gagal menghapus praktikum" }, { status: 500 });
  }
}

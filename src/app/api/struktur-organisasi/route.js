import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const struktur = await prisma.strukturOrganisasi.findMany();
    return NextResponse.json(struktur);
  } catch (error) {
    console.error("Error fetching struktur organisasi:", error);
    return NextResponse.json({ error: "Gagal mengambil data struktur organisasi" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newAnggota = await prisma.strukturOrganisasi.create({
      data: {
        nama: data.nama,
        jabatan: data.jabatan,
        fotoUrl: data.fotoUrl,
      },
    });
    return NextResponse.json(newAnggota, { status: 201 });
  } catch (error) {
    console.error("Error creating struktur organisasi:", error);
    return NextResponse.json({ error: "Gagal membuat anggota baru" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const updatedAnggota = await prisma.strukturOrganisasi.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
        nama: data.nama,
        jabatan: data.jabatan,
        fotoUrl: data.fotoUrl,
      },
    });
    return NextResponse.json(updatedAnggota);
  } catch (error) {
    console.error("Error updating struktur organisasi:", error);
    return NextResponse.json({ error: "Gagal memperbarui anggota" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.strukturOrganisasi.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ message: "Anggota berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting struktur organisasi:", error);
    return NextResponse.json({ error: "Gagal menghapus anggota" }, { status: 500 });
  }
}

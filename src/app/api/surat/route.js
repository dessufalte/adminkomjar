import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const surats = await prisma.surat.findMany();
    return NextResponse.json(surats);
  } catch (error) {
    console.error("Error fetching surat:", error);
    return NextResponse.json({ error: "Gagal mengambil data surat" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newSurat = await prisma.surat.create({
      data: {
        nama: data.nama,
        jenis: data.jenis,
        tanggal: new Date(data.tanggal),
        fileUrl: data.fileUrl,
      },
    });
    return NextResponse.json(newSurat, { status: 201 });
  } catch (error) {
    console.error("Error creating surat:", error);
    return NextResponse.json({ error: "Gagal membuat surat baru" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const updatedSurat = await prisma.surat.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
        nama: data.nama,
        jenis: data.jenis,
        tanggal: new Date(data.tanggal),
        fileUrl: data.fileUrl,
      },
    });
    return NextResponse.json(updatedSurat);
  } catch (error) {
    console.error("Error updating surat:", error);
    return NextResponse.json({ error: "Gagal memperbarui surat" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.surat.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ message: "Surat berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting surat:", error);
    return NextResponse.json({ error: "Gagal menghapus surat" }, { status: 500 });
  }
}

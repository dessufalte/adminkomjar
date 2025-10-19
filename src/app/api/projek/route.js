import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Gagal mengambil data proyek" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newProject = await prisma.project.create({
      data: {
        nama: data.nama,
        pembuat: data.pembuat,
        bahasa: data.bahasa,
        tanggal: new Date(data.tanggal),
        deskripsi: data.deskripsi,
        fotoUrl: data.fotoUrl,
        tautanGithub: data.tautanGithub,
      },
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Gagal membuat proyek baru" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const updatedProject = await prisma.project.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
        nama: data.nama,
        pembuat: data.pembuat,
        bahasa: data.bahasa,
        tanggal: new Date(data.tanggal),
        deskripsi: data.deskripsi,
        fotoUrl: data.fotoUrl,
        tautanGithub: data.tautanGithub,
      },
    });
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Gagal memperbarui proyek" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.project.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ message: "Proyek berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Gagal menghapus proyek" }, { status: 500 });
  }
}

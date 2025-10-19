import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    // Memproses FormData dari request secara manual
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah' }, { status: 400 });
    }

    // Ubah file menjadi buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadDir = path.join(process.cwd(), 'public/uploads/modul');
    await fs.mkdir(uploadDir, { recursive: true });

    // Buat nama file unik
    const newFileName = `${Date.now()}-${file.name}`;
    const newPath = path.join(uploadDir, newFileName);

    // Simpan file
    await fs.writeFile(newPath, buffer);

    const fileUrl = `/uploads/modul/${newFileName}`;
    return NextResponse.json({ fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Gagal mengunggah file' }, { status: 500 });
  }
}

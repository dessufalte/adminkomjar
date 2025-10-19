-- CreateTable
CREATE TABLE "public"."Praktikum" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "deskripsi" TEXT,
    "fotoUrl" TEXT,
    "linkPendaftaran" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Praktikum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Modul" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "fileUrl" TEXT,
    "praktikumId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Modul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "pembuat" TEXT NOT NULL,
    "bahasa" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "deskripsi" TEXT,
    "fotoUrl" TEXT,
    "tautanGithub" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Surat" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Galeri" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "fotoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StrukturOrganisasi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "fotoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StrukturOrganisasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Praktikum_kode_key" ON "public"."Praktikum"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "Modul_kode_key" ON "public"."Modul"("kode");

-- AddForeignKey
ALTER TABLE "public"."Modul" ADD CONSTRAINT "Modul_praktikumId_fkey" FOREIGN KEY ("praktikumId") REFERENCES "public"."Praktikum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

"use client";

import React, { useState, useEffect } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";


// Komponen Modal
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5 w-full max-w-2xl transform transition-transform duration-300">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-black dark:text-white">
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 8.586L15.657 2.929C16.047 2.539 16.68 2.539 17.071 2.929L17.071 2.929C17.461 3.32 17.461 3.953 17.071 4.343L11.414 10L17.071 15.657C17.461 16.047 17.461 16.68 17.071 17.071L17.071 17.071C16.68 17.461 16.047 17.461 15.657 17.071L10 11.414L4.343 17.071C3.953 17.461 3.32 17.461 2.929 17.071L2.929 17.071C2.539 16.68 2.539 16.047 2.929 15.657L8.586 10L2.929 4.343C2.539 3.953 2.539 3.32 2.929 2.929L2.929 2.929C3.32 2.539 3.953 2.539 4.343 2.929L10 8.586Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const GaleriPage = () => {
  const [galeri, setGaleri] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFoto, setCurrentFoto] = useState(null);

  const fetchGaleri = async () => {
    try {
      const res = await fetch('/api/galeri');
      const data = await res.json();
      setGaleri(data);
    } catch (error) {
      console.error("Gagal mengambil data galeri:", error);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const openModal = (fotoData = null) => {
    setCurrentFoto(fotoData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFoto(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus foto ini?")) {
      try {
        await fetch('/api/galeri', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        alert("Foto berhasil dihapus!");
        fetchGaleri();
      } catch (error) {
        alert("Gagal menghapus foto.");
      }
    }
  };

  const handleFotoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let fotoUrl = currentFoto?.fotoUrl || null;
    const fotoFile = data.file;
    if (fotoFile && fotoFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', fotoFile);
      try {
        const uploadRes = await fetch('/api/galeri/upload-foto', {
          method: 'POST',
          body: uploadFormData,
        });
        const uploadResult = await uploadRes.json();
        fotoUrl = uploadResult.fileUrl;
      } catch (error) {
        alert("Gagal mengunggah foto.");
        return;
      }
    }
    
    const fotoData = {
      judul: data.judul,
      deskripsi: data.deskripsi,
      tanggal: data.tanggal,
      fotoUrl: fotoUrl,
    };

    try {
      if (currentFoto?.id) {
        await fetch('/api/galeri', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentFoto.id, ...fotoData }),
        });
        alert("Foto berhasil diperbarui!");
      } else {
        await fetch('/api/galeri', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fotoData),
        });
        alert("Foto berhasil ditambahkan!");
      }
      closeModal();
      fetchGaleri();
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const renderForm = () => {
    return (
      <div>
        <h3 className="font-medium text-black dark:text-white mb-4">
          {currentFoto ? "Edit Foto Galeri" : "Tambah Foto Galeri"}
        </h3>
        <form onSubmit={handleFotoSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Judul Foto
              </label>
              <input
                type="text"
                name="judul"
                placeholder="Masukkan judul foto"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                defaultValue={currentFoto?.judul || ""}
              />
            </div>
            
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Tanggal
              </label>
              <input
                type="date"
                name="tanggal"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                defaultValue={currentFoto?.tanggal ? new Date(currentFoto.tanggal).toISOString().split('T')[0] : ""}
              />
            </div>
            
            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Deskripsi
              </label>
              <textarea
                rows={4}
                name="deskripsi"
                placeholder="Masukkan deskripsi foto"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                defaultValue={currentFoto?.deskripsi || ""}
              ></textarea>
            </div>

            <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Unggah File Foto
                </label>
                <input
                    type="file"
                    name="file"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {currentFoto?.fotoUrl && (
                  <p className="text-sm text-gray-500 mt-2">Foto saat ini: <a href={currentFoto.fotoUrl} target="_blank" className="text-primary hover:underline">Lihat Foto</a></p>
                )}
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {currentFoto ? "Simpan Perubahan" : "Tambah Foto"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Galeri" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex justify-between items-center">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Daftar Foto Galeri
            </h4>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tambah Foto
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeri.map((foto) => (
              <div key={foto.id} className="rounded-md overflow-hidden shadow-md dark:bg-boxdark-2">
                <img
                  src={foto.fotoUrl}
                  alt={foto.judul}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-black dark:text-white">
                    {foto.judul}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(foto.tanggal).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-sm text-black dark:text-white">
                    {foto.deskripsi}
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => openModal(foto)}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(foto.id)}
                      className="text-meta-1 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {renderForm()}
      </Modal>
    </DefaultLayout>
  );
};

export default GaleriPage;

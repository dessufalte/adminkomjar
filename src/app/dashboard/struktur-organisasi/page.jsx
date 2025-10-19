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
              <path d="M10 8.586L15.657 2.929C16.047 2.539 16.68 2.539 17.071 2.929L17.071 2.929C17.461 3.32 17.461 3.953 17.071 4.343L11.414 10L17.071 15.657C17.461 16.047 17.461 16.68 17.071 17.071L17.071 17.071C16.68 17.461 16.047 17.461 15.657 17.071L10 11.414L4.343 17.071C3.953 17.461 3.32 17.461 2.929 17.071L2.929 17.071C2.539 16.68 2.539 16.047 2.929 15.657L8.586 10L2.929 4.343C2.539 3.953 2.539 3.32 2.929 2.929L2.929 2.929C3.32 2.539 3.953 2.539 4.343 2.929L10 8.586Z" fill="currentColor" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const StrukturOrganisasiPage = () => {
  const [struktur, setStruktur] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAnggota, setCurrentAnggota] = useState(null);

  const fetchStruktur = async () => {
    try {
      const res = await fetch('/api/struktur-organisasi');
      const data = await res.json();
      setStruktur(data);
    } catch (error) {
      console.error("Gagal mengambil data struktur organisasi:", error);
    }
  };

  useEffect(() => {
    fetchStruktur();
  }, []);

  const openModal = (anggotaData = null) => {
    setCurrentAnggota(anggotaData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAnggota(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      try {
        await fetch('/api/struktur-organisasi', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        alert("Anggota berhasil dihapus!");
        fetchStruktur();
      } catch (error) {
        alert("Gagal menghapus anggota.");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let fotoUrl = currentAnggota?.fotoUrl || null;
    const fotoFile = data.foto;
    if (fotoFile && fotoFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', fotoFile);
      try {
        const uploadRes = await fetch('/api/struktur-organisasi/upload-foto', {
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
    
    const anggotaData = {
      nama: data.nama,
      jabatan: data.jabatan,
      fotoUrl: fotoUrl,
    };

    try {
      if (currentAnggota?.id) {
        await fetch('/api/struktur-organisasi', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentAnggota.id, ...anggotaData }),
        });
        alert("Anggota berhasil diperbarui!");
      } else {
        await fetch('/api/struktur-organisasi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(anggotaData),
        });
        alert("Anggota berhasil ditambahkan!");
      }
      closeModal();
      fetchStruktur();
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const renderForm = () => {
    return (
      <div>
        <h3 className="font-medium text-black dark:text-white mb-4">
          {currentAnggota ? "Edit Anggota" : "Tambah Anggota"}
        </h3>
        <form onSubmit={handleFormSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Nama Anggota
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama anggota"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                defaultValue={currentAnggota?.nama || ""}
              />
            </div>
            
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Jabatan
              </label>
              <input
                type="text"
                name="jabatan"
                placeholder="Masukkan jabatan"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                defaultValue={currentAnggota?.jabatan || ""}
              />
            </div>
            
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Unggah Foto
              </label>
              <input
                type="file"
                name="foto"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {currentAnggota?.fotoUrl && (
                <p className="text-sm text-gray-500 mt-2">Foto saat ini: <a href={currentAnggota.fotoUrl} target="_blank" className="text-primary hover:underline">Lihat Foto</a></p>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {currentAnggota ? "Simpan Perubahan" : "Tambah Anggota"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Struktur Organisasi" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex justify-between items-center">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Daftar Anggota Struktur
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Anggota
            </button>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Nama
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Jabatan
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {struktur.map((anggota) => (
                  <tr key={anggota.id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <div className="flex items-center gap-3.5">
                        {anggota.fotoUrl && (
                          <img
                            src={anggota.fotoUrl}
                            alt={`Foto ${anggota.nama}`}
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                        )}
                        <div>
                          <p className="text-black dark:text-white font-medium">
                            {anggota.nama}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{anggota.jabatan}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => openModal(anggota)}
                          className="hover:text-primary"
                        >
                          <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.892 2.15802C16.5413 1.8073 16.0357 1.62402 15.508 1.62402C14.9804 1.62402 14.4747 1.8073 14.124 2.15802L13.124 3.15802L15.892 5.92602L16.892 4.92602C17.2427 4.5753 17.426 4.06967 17.426 3.54202C17.426 3.01437 17.2427 2.50874 16.892 2.15802ZM12.124 4.15802L2.62402 13.658L2.12402 16.158L4.62402 15.658L14.124 6.15802L12.124 4.15802Z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(anggota.id)}
                          className="hover:text-primary"
                        >
                          <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H14L13 15C13 15.5523 12.5523 16 12 16H6C5.44772 16 5 15.5523 5 15L4 6ZM16 3H12.5L11.75 1.5H6.25L5.5 3H2V4.5H16V3Z" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {renderForm()}
      </Modal>
    </DefaultLayout>
  );
};

export default StrukturOrganisasiPage;

"use client";

import React, { useState, useEffect } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";

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
                d="M10 8.586L15.657 2.929C16.047 2.539 16.68 2.539 17.071 2.929L17.071 2.929C17.461 3.32 17.461 3.953 17.071 4.343L11.414 10L17.071 15.657C17.461 16.047 17.461 16.68 17.071 17.071L17.071 17.071C16.68 17.461 16.047 17.461 15.657 17.071L10 11.414L4.343 17.071C2.539 3.953 2.539 3.32 2.929 2.929L2.929 2.929C3.32 2.539 3.953 2.539 4.343 2.929L10 8.586Z"
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

const PraktikumPage = () => {
  const [praktikums, setPraktikums] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [currentPraktikumId, setCurrentPraktikumId] = useState(null);
  const [currentData, setCurrentData] = useState({});
  const [expandedPraktikum, setExpandedPraktikum] = useState(null);

  const fetchPraktikums = async () => {
    try {
      const res = await fetch('/api/praktikum');
      const data = await res.json();
      setPraktikums(data);
    } catch (error) {
      console.error("Gagal mengambil data praktikum:", error);
    }
  };

  useEffect(() => {
    fetchPraktikums();
  }, []);

  const openModal = (type, data = null, praktikumId = null) => {
    setFormType(type);
    setCurrentData(data || {});
    setCurrentPraktikumId(praktikumId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormType(null);
    setCurrentData({});
    setCurrentPraktikumId(null);
  };

  const handlePraktikumSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let fotoUrl = currentData.fotoUrl || null;
    const fotoFile = data.foto;
    if (fotoFile && fotoFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', fotoFile);
      try {
        const uploadRes = await fetch('/api/praktikum/upload-foto', {
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

    const praktikumData = {
      nama: data.nama,
      kode: data.kode,
      deskripsi: data.deskripsi,
      fotoUrl: fotoUrl,
      linkPendaftaran: data.linkPendaftaran, // Tambahkan link pendaftaran di sini
    };

    try {
      if (currentData.id) {
        await fetch('/api/praktikum', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentData.id, ...praktikumData }),
        });
        alert("Praktikum berhasil diperbarui!");
      } else {
        await fetch('/api/praktikum', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(praktikumData),
        });
        alert("Praktikum berhasil ditambahkan!");
      }
      closeModal();
      fetchPraktikums();
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleModulSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let fileUrl = currentData.fileUrl || null;
    const modulFile = data.file;
    if (modulFile && modulFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', modulFile);
      try {
        const uploadRes = await fetch('/api/modul/upload-file', {
          method: 'POST',
          body: uploadFormData,
        });
        const uploadResult = await uploadRes.json();
        fileUrl = uploadResult.fileUrl;
      } catch (error) {
        alert("Gagal mengunggah file modul.");
        return;
      }
    }

    const modulData = {
      nama: data.nama,
      kode: data.kode,
      fileUrl: fileUrl,
      praktikumId: currentPraktikumId,
    };

    try {
      if (currentData.id) {
        await fetch('/api/modul', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentData.id, ...modulData }),
        });
        alert("Modul berhasil diperbarui!");
      } else {
        await fetch('/api/modul', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(modulData),
        });
        alert("Modul berhasil ditambahkan!");
      }
      closeModal();
      fetchPraktikums();
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDeletePraktikum = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus praktikum ini beserta semua modul di dalamnya?")) {
      try {
        await fetch('/api/praktikum', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        alert("Praktikum dan modul terkait berhasil dihapus!");
        fetchPraktikums();
      } catch (error) {
        alert("Gagal menghapus praktikum.");
      }
    }
  };

  const handleDeleteModul = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
      try {
        await fetch('/api/modul', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        alert("Modul berhasil dihapus!");
        fetchPraktikums();
      } catch (error) {
        alert("Gagal menghapus modul.");
      }
    }
  };

  const renderForm = () => {
    if (formType === "praktikum") {
      return (
        <div>
          <h3 className="font-medium text-black dark:text-white mb-4">
            {currentData.id ? "Edit Praktikum" : "Tambah Praktikum"}
          </h3>
          <form onSubmit={handlePraktikumSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nama Praktikum
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama praktikum"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={currentData.nama || ""}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Kode Praktikum
                </label>
                <input
                  type="text"
                  name="kode"
                  placeholder="Contoh: BD-001"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={currentData.kode || ""}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Unggah Foto Praktikum
                </label>
                <input
                  type="file"
                  name="foto"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {currentData.fotoUrl && (
                  <p className="text-sm text-gray-500 mt-2">File saat ini: <a href={currentData.fotoUrl} target="_blank" className="text-primary hover:underline">Lihat Foto</a></p>
                )}
              </div>
              
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Link Pendaftaran
                </label>
                <input
                  type="url"
                  name="linkPendaftaran"
                  placeholder="Contoh: https://forms.gle/..."
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={currentData.linkPendaftaran || ""}
                />
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Deskripsi
                </label>
                <textarea
                  rows={6}
                  name="deskripsi"
                  placeholder="Masukkan deskripsi praktikum"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={currentData.deskripsi || ""}
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                {currentData.id ? "Simpan Perubahan" : "Tambah Praktikum"}
              </button>
            </div>
          </form>
        </div>
      );
    }

    if (formType === "modul") {
      return (
        <div>
          <h3 className="font-medium text-black dark:text-white mb-4">
            {currentData.id ? "Edit Modul" : "Tambah Modul"}
          </h3>
          <form onSubmit={handleModulSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nama Modul
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama modul"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={currentData.nama || ""}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Kode Modul
                </label>
                <input
                  type="text"
                  name="kode"
                  placeholder="Contoh: MOD-BD-001"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={currentData.kode || ""}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Unggah File Modul
                </label>
                <input
                  type="file"
                  name="file"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {currentData.fileUrl && (
                  <p className="text-sm text-gray-500 mt-2">File saat ini: <a href={currentData.fileUrl} target="_blank" className="text-primary hover:underline">Lihat File</a></p>
                )}
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                {currentData.id ? "Simpan Perubahan" : "Tambah Modul"}
              </button>
            </div>
          </form>
        </div>
      );
    }
    return null;
  };

  const toggleModulView = (id) => {
    setExpandedPraktikum(expandedPraktikum === id ? null : id);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Praktikum" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex justify-between items-center">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Daftar Praktikum & Modul
            </h4>
            <button
              onClick={() => openModal("praktikum")}
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
              + Praktikum
            </button>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Nama Praktikum
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Kode
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {praktikums.map((praktikum) => (
                  <React.Fragment key={praktikum.id}>
                    <tr>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <div className="flex items-center gap-3.5">
                          {praktikum.fotoUrl && (
                            <img
                              src={praktikum.fotoUrl}
                              alt={`Foto Praktikum ${praktikum.nama}`}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                          )}
                          <div>
                            <p className="text-black dark:text-white font-medium">
                              {praktikum.nama}
                            </p>
                            <p className="text-sm">
                              {praktikum.deskripsi}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {praktikum.kode}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={() => openModal("praktikum", praktikum)}
                            className="hover:text-primary"
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M16.892 2.15802C16.5413 1.8073 16.0357 1.62402 15.508 1.62402C14.9804 1.62402 14.4747 1.8073 14.124 2.15802L13.124 3.15802L15.892 5.92602L16.892 4.92602C17.2427 4.5753 17.426 4.06967 17.426 3.54202C17.426 3.01437 17.2427 2.50874 16.892 2.15802ZM12.124 4.15802L2.62402 13.658L2.12402 16.158L4.62402 15.658L14.124 6.15802L12.124 4.15802Z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeletePraktikum(praktikum.id)}
                            className="hover:text-primary"
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 6H14L13 15C13 15.5523 12.5523 16 12 16H6C5.44772 16 5 15.5523 5 15L4 6ZM16 3H12.5L11.75 1.5H6.25L5.5 3H2V4.5H16V3Z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => toggleModulView(praktikum.id)}
                            className="inline-flex items-center justify-center rounded-md bg-meta-5 py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
                          >
                             {expandedPraktikum === praktikum.id ? "Sembunyikan Modul" : "Lihat Modul"}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedPraktikum === praktikum.id && (
                      <>
                        <tr className="bg-gray-1 dark:bg-meta-4">
                          <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                            <p className="font-bold">Daftar Modul</p>
                          </th>
                          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                            Kode
                          </th>
                           <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                            File Modul
                          </th>
                          <th className="px-4 py-4 font-medium text-black dark:text-white">
                            Aksi
                          </th>
                        </tr>
                        {praktikum.moduls?.map((modul) => (
                          <tr key={modul.id}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-11 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {modul.nama}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {modul.kode}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <a
                                  href={modul.fileUrl}
                                  download
                                  className="text-primary hover:underline"
                                >
                                    {modul.fileUrl ? modul.fileUrl.split('/').pop() : 'Tidak ada file'}
                                </a>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <div className="flex items-center space-x-3.5">
                                <button
                                  onClick={() => openModal("modul", modul, praktikum.id)}
                                  className="hover:text-primary"
                                >
                                  <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M16.892 2.15802C16.5413 1.8073 16.0357 1.62402 15.508 1.62402C14.9804 1.62402 14.4747 1.8073 14.124 2.15802L13.124 3.15802L15.892 5.92602L16.892 4.92602C17.2427 4.5753 17.426 4.06967 17.426 3.54202C17.426 3.01437 17.2427 2.50874 16.892 2.15802ZM12.124 4.15802L2.62402 13.658L2.12402 16.158L4.62402 15.658L14.124 6.15802L12.124 4.15802Z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteModul(modul.id)}
                                  className="hover:text-primary"
                                >
                                  <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M4 6H14L13 15C13 15.5523 12.5523 16 12 16H6C5.44772 16 5 15.5523 5 15L4 6ZM16 3H12.5L11.75 1.5H6.25L5.5 3H2V4.5H16V3Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                         <tr>
                            <td className="border-b border-[#eee] py-5 px-4 pl-11 dark:border-strokedark" colSpan="4">
                                <button
                                  onClick={() => openModal("modul", {}, praktikum.id)}
                                  className="inline-flex items-center justify-center rounded-md bg-meta-5 py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
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
                                  Tambah Modul
                                </button>
                            </td>
                          </tr>
                      </>
                    )}
                  </React.Fragment>
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

export default PraktikumPage;

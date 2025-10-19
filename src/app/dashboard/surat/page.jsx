"use client";

import React, { useState, useEffect } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";


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

const SuratPage = () => {
  const [surats, setSurats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSurat, setCurrentSurat] = useState(null);

  const fetchSurats = async () => {
    try {
      const res = await fetch('/api/surat');
      const data = await res.json();
      setSurats(data);
    } catch (error) {
      console.error("Gagal mengambil data surat:", error);
    }
  };

  useEffect(() => {
    fetchSurats();
  }, []);

  const openModal = (suratData = null) => {
    setCurrentSurat(suratData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSurat(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus surat ini?")) {
      try {
        await fetch('/api/surat', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        alert("Surat berhasil dihapus!");
        fetchSurats();
      } catch (error) {
        alert("Gagal menghapus surat.");
      }
    }
  };

  const handleSuratSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let fileUrl = currentSurat?.fileUrl || null;
    const suratFile = data.file;
    if (suratFile && suratFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', suratFile);
      try {
        const uploadRes = await fetch('/api/surat/upload-file', {
          method: 'POST',
          body: uploadFormData,
        });
        const uploadResult = await uploadRes.json();
        fileUrl = uploadResult.fileUrl;
      } catch (error) {
        alert("Gagal mengunggah file.");
        return;
      }
    }
    
    const suratData = {
      nama: data.nama,
      jenis: data.jenis,
      tanggal: data.tanggal,
      fileUrl: fileUrl,
    };

    try {
      if (currentSurat?.id) {
        await fetch('/api/surat', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentSurat.id, ...suratData }),
        });
        alert("Surat berhasil diperbarui!");
      } else {
        await fetch('/api/surat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(suratData),
        });
        alert("Surat berhasil ditambahkan!");
      }
      closeModal();
      fetchSurats();
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const renderForm = () => {
    return (
      <div>
        <h3 className="font-medium text-black dark:text-white mb-4">
          {currentSurat ? "Edit Surat" : "Tambah Surat"}
        </h3>
        <form onSubmit={handleSuratSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Nama Surat
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama surat"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                defaultValue={currentSurat?.nama || ""}
              />
            </div>
            
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Jenis Surat
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  name="jenis"
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={currentSurat?.jenis || ""}
                >
                  <option value="" disabled>Pilih Jenis Surat</option>
                  <option value="Internal">Internal</option>
                  <option value="Eksternal">Eksternal</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Tanggal
              </label>
              <input
                type="date"
                name="tanggal"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                defaultValue={currentSurat?.tanggal ? new Date(currentSurat.tanggal).toISOString().split('T')[0] : ""}
              />
            </div>
            
            <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Unggah File Surat
                </label>
                <input
                    type="file"
                    name="file"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {currentSurat?.fileUrl && (
                  <p className="text-sm text-gray-500 mt-2">File saat ini: <a href={currentSurat.fileUrl} target="_blank" className="text-primary hover:underline">Lihat File</a></p>
                )}
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {currentSurat ? "Simpan Perubahan" : "Tambah Surat"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Surat" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex justify-between items-center">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Daftar Surat
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
              Surat
            </button>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Nama Surat
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Jenis Surat
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Tanggal
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    File
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {surats.map((s) => (
                  <tr key={s.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white font-medium">
                        {s.nama}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{s.jenis}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{new Date(s.tanggal).toLocaleDateString()}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <a href={s.fileUrl} download className="text-primary hover:underline">
                        {s.fileUrl ? s.fileUrl.split('/').pop() : 'Tidak ada file'}
                      </a>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => openModal(s)}
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
                          onClick={() => handleDelete(s.id)}
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

export default SuratPage;

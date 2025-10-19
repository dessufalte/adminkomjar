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

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projek');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Gagal mengambil data proyek:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = (projectData = null) => {
    setCurrentProject(projectData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      try {
        await fetch('/api/projek', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        alert("Proyek berhasil dihapus!");
        fetchProjects();
      } catch (error) {
        alert("Gagal menghapus proyek.");
      }
    }
  };

  const handleProjekSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let fotoUrl = currentProject?.fotoUrl || null;
    const fotoFile = data.foto;
    if (fotoFile && fotoFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', fotoFile);
      try {
        const uploadRes = await fetch('/api/projek/upload-foto', {
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
    
    const projectData = {
      nama: data.nama,
      pembuat: data.pembuat,
      bahasa: data.bahasa,
      tanggal: data.tanggal,
      deskripsi: data.deskripsi,
      fotoUrl: fotoUrl,
      tautanGithub: data.tautanGithub,
    };

    try {
      if (currentProject?.id) {
        await fetch('/api/projek', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentProject.id, ...projectData }),
        });
        alert("Proyek berhasil diperbarui!");
      } else {
        await fetch('/api/projek', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
        alert("Proyek berhasil ditambahkan!");
      }
      closeModal();
      fetchProjects();
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const renderForm = () => {
    return (
      <div>
        <h3 className="font-medium text-black dark:text-white mb-4">
          {currentProject ? "Edit Proyek" : "Tambah Proyek"}
        </h3>
        <form onSubmit={handleProjekSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nama Proyek
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama proyek"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={currentProject?.nama || ""}
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Pembuat
                </label>
                <input
                  type="text"
                  name="pembuat"
                  placeholder="Nama pembuat"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={currentProject?.pembuat || ""}
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Bahasa Pemrograman
                </label>
                <input
                  type="text"
                  name="bahasa"
                  placeholder="Contoh: JavaScript"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={currentProject?.bahasa || ""}
                />
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
                defaultValue={currentProject?.tanggal ? new Date(currentProject.tanggal).toISOString().split('T')[0] : ""}
              />
            </div>
            
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Tautan GitHub
              </label>
              <input
                type="url"
                name="tautanGithub"
                placeholder="Contoh: https://github.com/user/repo"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                defaultValue={currentProject?.tautanGithub || ""}
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Unggah Foto Proyek
              </label>
              <input
                type="file"
                name="foto"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {currentProject?.fotoUrl && (
                <p className="text-sm text-gray-500 mt-2">Foto saat ini: <a href={currentProject.fotoUrl} target="_blank" className="text-primary hover:underline">Lihat Foto</a></p>
              )}
            </div>

            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Deskripsi
              </label>
              <textarea
                rows={6}
                name="deskripsi"
                placeholder="Masukkan deskripsi proyek"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                defaultValue={currentProject?.deskripsi || ""}
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {currentProject ? "Simpan Perubahan" : "Tambah Proyek"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Proyek" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex justify-between items-center">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Daftar Proyek
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
              Tambah Proyek
            </button>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Nama Proyek
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Pembuat
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Bahasa Pemrograman
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Tanggal
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    GitHub
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white font-medium">
                        {project.nama}
                      </p>
                      <p className="text-sm">{project.deskripsi}</p>
                      <img
                        src={project.fotoUrl}
                        alt={`Foto Proyek ${project.nama}`}
                        width={150}
                        height={100}
                        className="rounded-md mt-2"
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{project.pembuat}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{project.bahasa}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{new Date(project.tanggal).toLocaleDateString()}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {project.tautanGithub && (
                        <a
                          href={project.tautanGithub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-black dark:text-white"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387 0.599 0.111 0.793-0.261 0.793-0.577v-2.234c-3.338 0.726-4.033-1.416-4.033-1.416-0.546-1.387-1.333-1.756-1.333-1.756-1.089-0.745 0.083-0.729 0.083-0.729 1.205 0.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.49-0.002 0.109-0.729 0.42-1.305 0.762-1.604-2.665-0.305-5.467-1.334-5.467-2.964 0-1.305 0.469-2.388 1.236-3.221-0.124-0.305-0.535-1.524 0.117-3.176 0 0 1.008-0.322 3.301 1.23 2.809-0.777 5.497-0.777 8.306 0 2.293-1.552 3.297-1.23 3.297-1.23 0.653 1.653 0.242 2.871 0.118 3.176 0.766 0.833 1.235 1.916 1.235 3.221 0 1.63-2.808 2.637-5.476 2.962 0.43 0.372 0.823 1.102 0.823 2.222v3.293c0 0.319 0.192 0.694 0.801 0.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => openModal(project)}
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
                          onClick={() => handleDelete(project.id)}
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

export default ProjectPage;

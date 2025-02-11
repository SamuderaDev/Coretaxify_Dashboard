// import React from "react";
import React, { useState } from "react";
// import "../Pengguna/Mahasiswa/editMahasiswa.css";
import EditPopupMahasiswa from "../Pengguna/Mahasiswa/EditPopupMahasiswa";
import Swal from "sweetalert2";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

export default function Ujian() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [data, setData] = useState([
    {
      namaUjian: "Ujian Pajak Bumi Bangunan",
      kodeUjian: "xAE12",
      nilai: "98",
      tanggal: "25-Januari-2024",
    },
    {
      namaUjian: "Ujian Pajak Bumi Bangunan",
      kodeUjian: "xAE12",
      nilai: "98",
      tanggal: "25-Januari-2024",
    },
    {
      namaUjian: "Ujian Pajak Bumi Bangunan",
      kodeUjian: "xAE12",
      nilai: "98",
      tanggal: "25-Januari-2024",
    },
    {
      namaUjian: "Ujian Pajak Bumi Bangunan",
      kodeUjian: "xAE12",
      nilai: "98",
      tanggal: "25-Januari-2024",
    },
  ]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleEditClick = (index) => {
    setSelectedData(data[index]);
    setIsOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [formData, setFormData] = useState({
    namaUjian: "",
    kodeUjian: "",
    nilai: "",
    tanggal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Logic to save the data
    onClose();
  };
  const [file, setFile] = useState();
  function handleChangeFile(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Ujian</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Ujian   🔎"
          />
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="bg-blue-700 p-2 rounded-lg text-white ">
              + Tambah Ujian
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tambah Ujian</AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <div className="">
                  <form>
                    <div className="edit-form-group-kelas ">
                      <label>Judul Ujian:</label>
                      <input
                        type="text"
                        name="namaUjian"
                        value={formData.namaUjian}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="edit-form-group-kelas ">
                      <label>Kode Ujian:</label>
                      <input
                        className="text-black"
                        name="kodeUjian"
                        value={formData.kodeUjian}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="edit-form-group-kelas ">
                      <label>Tanggal Ujian:</label>
                      <input type="date" onChange={handleChangeFile} />
                    </div>
                  </form>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-red-600 text-white">
                Kembali
              </AlertDialogCancel>
              <AlertDialogAction className="bg-green-600">
                Simpan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("namaUjian")}>
                Judul Ujian{" "}
                {sortConfig.key === "namaUjian"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th>
              <th className="">Kode Ujian</th>
              <th className="">Tanggal Ujian</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.namaUjian}</td>
                <td className="max-w-5">
                  <p className="truncate">{item.kodeUjian}</p>
                </td>
                <td className="max-w-5">
                  <p className="">{item.tanggal}</p>
                </td>
                <td>
                  <AlertDialog>
                    <AlertDialogTrigger className="action-button edit">
                      Edit
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Edit Ujian</AlertDialogTitle>
                        <AlertDialogDescription className="w-full">
                          <div className="">
                            <form>
                              <div className="edit-form-group-mahasiswa ">
                                <label>Judul Ujian:</label>
                                <input
                                  type="text"
                                  name="namaUjian"
                                  value={formData.namaUjian}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Kode Ujian:</label>
                                <input
                                  className="text-black"
                                  name="kodeUjian"
                                  value={formData.kodeUjian}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Tanggal Ujian:</label>
                                <input
                                  type="date"
                                  onChange={handleChangeFile}
                                />
                              </div>
                            </form>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-red-600 text-white">
                          Kembali
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-green-600 ">
                          Simpan
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* <button
                    className="action-button edit"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </button> */}
                  <button
                    className="action-button delete"
                    onClick={() => {
                      Swal.fire({
                        title: "Hapus Ujian?",
                        text: "Ujian akan dihapus secara permanen!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus!",
                        cancelButtonText: "Batal",
                        dangerMode: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          const newData = data.filter(
                            (itemData) => itemData.id !== item.id
                          );
                          setData(newData);
                          Swal.fire(
                            "Berhasil!",
                            "Ujian berhasil dihapus!",
                            "success"
                          );
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="">
          <div className="pagination-info">
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              data.length
            )} of ${data.length} entries`}
          </div>

          <div className="pagination">
            <button
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className={`page-item ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <EditPopupMahasiswa
          onClose={() => setIsOpen(false)}
          data={selectedData}
        />
      )}
    </div>
  );
}

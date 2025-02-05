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
import { CookiesProvider, useCookies } from "react-cookie";

export default function PraktikumBackup() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);

  const [data, setData] = useState([
    {
      id: "1",
      namaPraktikum: "Praktikum Pajak Bumi Bangunan",
      kodePraktikum: "xAE12",
      nilai: "98",
      tanggal: "25-Januari-2024",
      isSelected: false,
    },
    {
      id: "2",
      namaPraktikum: "Praktikum Pajak Bumi Makanan",
      kodePraktikum: "xAE12",
      nilai: "98",
      tanggal: "25-Januari-2024",
      isSelected: false,
    },
    {
      id: "3",
      namaPraktikum: "Praktikum Pajak Bumi Bangunan",
      kodePraktikum: "xAE12",
      nilai: "98",
      tanggal: "25-Januari-2024",
      isSelected: false,
    },
    {
      id: "4",
      namaPraktikum: "Praktikum Pajak Bumi Bangunan",
      kodePraktikum: "xAE12",
      nilai: "98",
      tanggal: "25-Januari-2024",
      isSelected: false,
    },
  ]);
  const handleSelectAll = () => {
    setData((data) =>
      data.map((item) => ({ ...item, isSelected: !item.isSelected }))
    );
  };
  const toggleSelection = (kode) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === kode ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 - mahasiswa : 1;
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
    namaPraktikum: "",
    kodePraktikum: "",
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
  const [search, setSearch] = useState("");

  const processedData = data.map((item) => ({
    ...item,
    highlight:
      search &&
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      ),
  }));

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Praktikum - BACKUP</h2>
        {/* <p>{cookies.user ? cookies.user : "no user"}</p>
        {processedData.map((item) => (
          <li key={item.id} style={{ color: item.highlight ? "red" : "black" }}>
            {item.namaPraktikum}
          </li>
        ))} */}
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Praktikum   🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-700 p-2 rounded-md text-white"
          onClick={handleSelectAll}
        >
          Select All
        </button>
        {/* <AlertDialog>
          <AlertDialogTrigger>
            <div className="bg-blue-800 p-2 rounded-lg text-white">
              + Tambah Praktikum
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tambah Praktikum</AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <div className="">
                  <form>
                    <div className="edit-form-group-mahasiswa ">
                      <label>Judul Praktikum:</label>
                      <input
                        type="text"
                        name="namaPraktikum"
                        value={formData.namaPraktikum}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>Kode Praktikum:</label>
                      <input
                        className="text-black"
                        name="kodePraktikum"
                        value={formData.kodePraktikum}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>Tanggal Praktikum:</label>
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
        </AlertDialog> */}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("namaPraktikum")}>
                Judul Praktikum{" "}
                {sortConfig.key === "namaPraktikum"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th>
              <th className="">Kode Praktikum</th>
              <th className="">Tanggal Praktikum</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.namaPraktikum}</td>
                <td className="max-w-5">
                  <p className="truncate">{item.kodePraktikum}</p>
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
                        <AlertDialogTitle>Edit Praktikum</AlertDialogTitle>
                        <AlertDialogDescription className="w-full">
                          <div className="">
                            <form>
                              <div className="edit-form-group-mahasiswa ">
                                <label>Judul Praktikum:</label>
                                <input
                                  type="text"
                                  name="namaPraktikum"
                                  value={formData.namaPraktikum}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Kode Praktikum:</label>
                                <input
                                  className="text-black"
                                  name="kodePraktikum"
                                  value={formData.kodePraktikum}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Tanggal Praktikum:</label>
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
                        title: "Hapus Praktikum?",
                        text: "Praktikum akan dihapus secara permanen!",
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
                            "Praktikum berhasil dihapus!",
                            "success"
                          );
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleSelection(item.id)}
                    checked={item.isSelected}
                  />
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

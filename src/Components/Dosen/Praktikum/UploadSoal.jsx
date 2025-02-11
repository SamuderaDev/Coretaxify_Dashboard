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
} from "@/components/ui/alert-dialog";
import { CookiesProvider, useCookies } from "react-cookie";

export default function UploadSoal() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);

  const [data, setData] = useState([
    {
      namaSoal: "Soal Pajak Bumi Bangunan",
      kodeSoal: "xAE12",
      tanggal: "25-Januari-2024",
    },
    {
      namaSoal: "Soal Pajak Bumi Makanan",
      kodeSoal: "xAE12",
      tanggal: "25-Januari-2024",
    },
    {
      namaSoal: "Soal Pajak Bumi Bangunan",
      kodeSoal: "xAE12",
      tanggal: "25-Januari-2024",
    },
    {
      namaSoal: "Soal Pajak Bumi Bangunan",
      kodeSoal: "xAE12",
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
    namaSoal: "",
    kodeSoal: "",
    tanggal: "",
    file: "",
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
        <h2>Data Soal</h2>
        {/* <p>{cookies.user ? cookies.user : "no user"}</p>
        {processedData.map((item) => (
          <li key={item.id} style={{ color: item.highlight ? "red" : "black" }}>
            {item.namaSoal}
          </li>
        ))} */}
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Soal   🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="bg-blue-800 p-2 rounded-lg text-white">
              + Tambah Soal
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tambah Soal</AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <div className="">
                  <form>
                    <div className="edit-form-group-mahasiswa ">
                      <label>Judul Soal:</label>
                      <input
                        type="text"
                        name="namaSoal"
                        value={formData.namaSoal}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>Kode Soal:</label>
                      <input
                        className="text-black"
                        name="kodeSoal"
                        value={formData.kodeSoal}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>Tanggal Soal:</label>
                      <input type="date" onChange={handleChangeFile} />
                    </div>
                    <div className="edit-form-group-mahasiswa">
                      <label>File Soal:</label>
                      <input
                        type="file"
                        onChange={handleChangeFile}
                        accept="application/pdf,application/vnd.ms-excel"
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
              <th onClick={() => handleSort("namaSoal")}>
                Judul Soal{" "}
                {sortConfig.key === "namaSoal"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th>
              <th className="">Kode Soal</th>
              <th className="">Tanggal Soal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.namaSoal}</td>
                <td className="max-w-5">
                  <p className="truncate">{item.kodeSoal}</p>
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
                        <AlertDialogTitle>Edit Soal</AlertDialogTitle>
                        <AlertDialogDescription className="w-full">
                          <div className="">
                            <form>
                              <div className="edit-form-group-mahasiswa ">
                                <label>Judul Soal:</label>
                                <input
                                  type="text"
                                  name="namaSoal"
                                  value={formData.namaSoal}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Kode Soal:</label>
                                <input
                                  className="text-black"
                                  name="kodeSoal"
                                  value={formData.kodeSoal}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Tanggal Soal:</label>
                                <input type="date" onChange={handleChange} />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>File Soal:</label>
                                <input
                                  type="file"
                                  onChange={handleChangeFile}
                                  accept="application/pdf,application/vnd.ms-excel"
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
                        title: "Hapus Soal?",
                        text: "Soal akan dihapus secara permanen!",
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
                            "Soal berhasil dihapus!",
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

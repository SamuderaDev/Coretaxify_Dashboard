// import React from "react";
import React, { useState } from "react";
// import "../Pengguna/Mahasiswa/editMahasiswa.css";
// import EditPopupMahasiswa from "../Pengguna/Mahasiswa/EditPopupMahasiswa";
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

export default function MahasiswaUjian() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);

  const [data, setData] = useState([
    {
      namaUjian: "Ujian Pajak Bumi Bangunan",
      kodeUjian: "xAE12",
      file: "98",
      tanggal: "25-Januari-2024",
    },
    {
      namaUjian: "Ujian Pajak Bumi Makanan",
      kodeUjian: "xAE12",
      file: "98",
      tanggal: "25-Januari-2024",
    },
    {
      namaUjian: "Ujian Pajak Bumi Bangunan",
      kodeUjian: "xAE12",
      file: "98",
      tanggal: "25-Januari-2024",
    },
    {
      namaUjian: "Ujian Pajak Bumi Bangunan",
      kodeUjian: "xAE12",
      file: "98",
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
        <h2>Data Ujian</h2>
        {/* <p>{cookies.user ? cookies.user : "no user"}</p>
        {processedData.map((item) => (
          <li key={item.id} style={{ color: item.highlight ? "red" : "black" }}>
            {item.namaUjian}
          </li>
        ))} */}
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Ujian   🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="">No Ujian</th>
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
              <th className="">File Ujian</th>
              <th className="">Deadline Ujian</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.namaUjian}</td>
                <td className="max-w-5">
                  <p className="truncate">{item.kodeUjian}</p>
                </td>
                <td className="max-w-5">
                  Download
                  {/* <p className="">{item.tanggal}</p> */}
                </td>
                <td className="max-w-5">
                  <p className="">{item.tanggal}</p>
                </td>
                <td>
                  <button className="bg-green-500 text-white p-2 rounded-md">
                    Mulai
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

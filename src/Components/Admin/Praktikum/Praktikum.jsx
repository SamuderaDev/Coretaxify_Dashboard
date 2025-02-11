// import React from "react";
import React, { useEffect, useState } from "react";
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
import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import { RoutesApi } from "@/Routes";
import ClipLoader from "react-spinners/ClipLoader";

export default function Praktikum() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);


  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.tasksAdmin, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      })
      console.log(data.data)
      return data.data
    },
  })

  // const [data, setData] = useState([
  //   {
  //     namaPraktikum: "Praktikum Pajak Bumi Bangunan",
  //     kodePraktikum: "xAE12",
  //     nilai: "98",
  //     tanggal: "25-Januari-2024",
  //   },
  //   {
  //     namaPraktikum: "Praktikum Pajak Bumi Makanan",
  //     kodePraktikum: "xAE12",
  //     nilai: "98",
  //     tanggal: "25-Januari-2024",
  //   },
  //   {
  //     namaPraktikum: "Praktikum Pajak Bumi Bangunan",
  //     kodePraktikum: "xAE12",
  //     nilai: "98",
  //     tanggal: "25-Januari-2024",
  //   },
  //   {
  //     namaPraktikum: "Praktikum Pajak Bumi Bangunan",
  //     kodePraktikum: "xAE12",
  //     nilai: "98",
  //     tanggal: "25-Januari-2024",
  //   },
  // ]);

  useEffect(() => {
    console.log(data)
  }, [])

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
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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

  // const processedData = data.map((item) => ({
  //   ...item,
  //   highlight:
  //     search &&
  //     Object.values(item).some((value) =>
  //       String(value).toLowerCase().includes(search.toLowerCase())
  //     ),
  // }));

  if (isLoading) {
    return (

      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    )
  }

  return (

    <div className="kontrak-container">

      <div className="header">
        <h2>Data Praktikum</h2>
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
        <AlertDialog>
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
        </AlertDialog>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Judul Praktikum{" "}
                {sortConfig.key === "name"
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
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr >
                <td>{item.name}</td>
                <td className="max-w-5">
                  {/* <p className="truncate">{item.kodePraktikum}</p> */}
                  <p className="truncate">Xae12</p>
                </td>
                <td className="max-w-5">
                  <p className="">{item.updated_at = item.updated_at.split(" ")[0]}</p>
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
              </tr>
            ))}
          </tbody>
        </table>
        <div className="">
          {/* <div className="pagination-info">
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              data.length
            )} of ${data.length} entries`}
          </div> */}

          <div className="pagination">
            <button
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {/* {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""
                    }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )} */}
            {/* <button
              className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage)
                ? "disabled"
                : ""
                }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            >
              &gt;
            </button> */}
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

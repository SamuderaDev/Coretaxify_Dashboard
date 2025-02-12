import React, { useState } from "react";
import "./editKelas.css";
import EditPopupKelas from "./EditPopupKelas";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import ClipLoader from "react-spinners/ClipLoader";
import { CookiesProvider, useCookies } from "react-cookie";
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

const EditKelas = () => {
  const [url, setUrl] = useState(RoutesApi.classAdmin);
  const [cookies, setCookie] = useCookies(["token"]);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["classes", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log(data.data);
      return data;
    },
  });
  const mutation = useMutation({
    mutationFn: async (id) => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        // withCredentials: true,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookies.token);
      const data = await axios.put(
        RoutesApi.classAdmin + `/${id}`,
        {
          id: 1,
          name: formData.namaKelas,
          user_id: 2,
          qty_student: 1,
          start_period: "2025-02-12",
          end_period: "2026-02-12",
          spt: null,
          bupot: null,
          faktur: null,
          class_code: formData.kodeKelas,
          status: formData.status,
          // university_id: 1,
          //   contract_type: "LICENSE",
          //   qty_student: 1,
          //   start_period: "2025-02-10",
          //   end_period: "2026-02-10",
          //   spt: 5,
          //   bupot: 5,
          //   faktur: 5,
          //   contract_code: "L-0001",

          // university_id: parseInt(formData.instansi),
          // contract_type: formData.jenisKontrak,
          // qty_student: parseInt(formData.mahasiswa),
          // start_period: formData.periodeAwal,
          // end_period: formData.periodeAkhir,
          // spt: parseInt(formData.spt),
          // bupot: parseInt(formData.bupot),
          // faktur: parseInt(formData.faktur),
          // contract_code: formData.kodePembelian,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      window.location.reload();

      // window.location.href = "/" + role;
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    namaKelas: "",
    kodeKelas: "",
    status: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const [data, setData] = useState([
  //     {
  //       id: 1,
  //       kelas: "Abangkuh",
  //       instansi: "Poltek Jos",
  //       kodeRegistrasi: "L001",
  //       status: "Active",
  //     },
  //     {
  //       id: 2,
  //       kelas: "Abangkuh",
  //       instansi: "UB Jos",
  //       kodeRegistrasi: "U002",
  //       status: "Expired",
  //     },
  //     {
  //       id: 3,
  //       kelas: "Abangkuh",
  //       instansi: "UM Jos",
  //       kodeRegistrasi: "U003",
  //       status: "Active",
  //     },
  //   ]);

  const handleEdit = (kelas) => {
    setSelectedKelas(kelas);
    setIsOpen(true);
  };

  const handleUpdateKelas = (updatedKelas) => {
    setData(
      data.map((item) => (item.id === updatedKelas.id ? updatedKelas : item))
    );
    setIsOpen(false);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Kelas</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Data Kelas 🔎"
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("kelas")}>
                Kelas{" "}
                {sortConfig.key === "kelas"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              {/* <th>Instansi</th> */}
              {/* <th>Jumlah Mahasiswa</th> */}
              <th>Kode Kelas</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                {/* <td>{item.qty_student}</td> */}
                <td>{item.class_code}</td>
                <td>{item.status}</td>
                <td>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className="bg-green-500 p-[0.30rem] px-5  mr-2 rounded-md text-white">
                        Edit
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Edit Kelas</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className="">
                            <form>
                              <div className="edit-form-group-mahasiswa ">
                                <label>Nama Kelas:</label>
                                <input
                                  type="text"
                                  name="namaKelas"
                                  value={formData.namaKelas}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Kode Kelas:</label>
                                <input
                                  type="text"
                                  name="kodeKelas"
                                  value={formData.kodeKelas}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="edit-form-group-mahasiswa">
                                <label>Status:</label>
                                <select
                                  name="status"
                                  value={formData.status}
                                  onChange={handleChange}
                                  required
                                >
                                  <option value="">Pilih Status</option>
                                  <option value="ACTIVE">Active</option>
                                  <option value="INACTIVE">Expired</option>
                                </select>
                                {/* <img src={file} /> */}
                              </div>
                            </form>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-red-600 text-white">
                          Kembali
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => mutation.mutate(item.id)}
                          className="bg-green-600"
                        >
                          Simpan
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {/* <button
                    className="action-button edit"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button> */}
                  <button
                    className="action-button delete"
                    onClick={() => {
                      Swal.fire({
                        title: "Hapus Kelas?",
                        text: "Kelas akan dihapus secara permanen!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus!",
                        cancelButtonText: "Batal",
                        dangerMode: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          setData(
                            data.filter((itemData) => itemData.id !== item.id)
                          );
                          Swal.fire(
                            "Berhasil!",
                            "Kelas berhasil dihapus!",
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
        <div className="pagination-container">
          {/* <div className="pagination-info">
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
          </div> */}
        </div>
      </div>
      {isOpen && (
        <EditPopupKelas
          onClose={() => setIsOpen(false)}
          data={selectedKelas}
          onSave={handleUpdateKelas}
        />
      )}
    </div>
  );
};

export default EditKelas;

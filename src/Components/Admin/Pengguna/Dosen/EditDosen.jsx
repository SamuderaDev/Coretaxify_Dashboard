import React, { useState } from "react";
import "./editDosen.css";
import TambahDosen from "./TambahDosen";
import EditPopupDosen from "./EditPopupDosen";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { useCookies } from "react-cookie";

const EditDosen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(0);
  const [url, setUrl] = useState(RoutesApi.getDosenAdmin.url);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies, setCookie] = useCookies(["user"]);
  const itemsPerPage = 10;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["dosenadmin", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          intent: RoutesApi.getDosenAdmin.intent,
        },
      });
      console.log(data.data);
      return data;
    },
  });

  //   const [data, setData] = useState([
  //             { id: 1, namaDosen: "Hendra", instansi: "Poltek Jos", kuotaKelas: 50, kodeRegistrasi: "L001", jumlahSiswa: 50, kodePembelian: "L001", status: "Active" },
  //             { id: 2, namaDosen: "Udin", instansi: "UB Jos", kuotaKelas: 30, kodeRegistrasi: "U002", jumlahSiswa: 30, kodePembelian: "U002", status: "Expired" },
  //             { id: 3, namaDosen: "Galeh", instansi: "UM Jos", kuotaKelas: 70, kodeRegistrasi: "U003", jumlahSiswa: 70, kodePembelian: "U003", status: "Active" },
  //   ]);

  const handleData = (newData) => {
    setData([...data, { id: data.length + 1, ...newData }]);
  };

  const handleEdit = (dosen) => {
    setSelectedDosen(dosen);
    setEditPopupOpen(true);
  };

  const handleUpdateDosen = (updatedDosen) => {
    setData(
      data.map((item) => (item.id === updatedDosen.id ? updatedDosen : item))
    );
    setEditPopupOpen(false);
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
      const data = await axios.delete(
        RoutesApi.postAdmin.url + `/${id}`,
        // `http://127.0.0.1:8000/api/admin/users/${id}?intent=api.user.create.admin`,

        //   university_id: 1,
        //   contract_type: "LICENSE",
        //   qty_student: 1,
        //   start_period: "2025-02-10",
        //   end_period: "2026-02-10",
        //   spt: 5,
        //   bupot: 5,
        //   faktur: 5,
        //   contract_code: "L-0001"
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
          // params: {
          //   intent: RoutesApi.postAdmin.intent,
          // },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Data dosen berhasil dihapus!", "success");
      window.location.reload();
      // const role = data.data.user.roles[0].name;
      // setCookie("token", data.data.token, { path: "/" });
      // setCookie("role", role, { path: "/" });

      // window.location.href = "/" + role;
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }
  if (!data) {
    return "Data undefined !";
  }

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Dosen</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Cari Data Dosen 🔎"
          />
        </div>
        <button className="add-button" onClick={() => setIsOpen(true)}>
          + Tambah Dosen
        </button>
      </div>
      <TambahDosen
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleData}
      />
      <EditPopupDosen
        isOpen={editPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        dosen={selectedDosen}
        onSave={handleUpdateDosen}
        id={id}
      />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("namaDosen")}>
                Nama Dosen{" "}
                {sortConfig.key === "namaDosen"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("instansi")}>
                Email{" "}
                {sortConfig.key === "instansi"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              {/* <th>Kode Registrasi</th>

              <th>Kode Pembelian</th>
              <th>Status</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>

                {/* <td>{item.}</td>

                <td>{item.kodePembelian}</td>
                <td>{item.status}</td> */}
                <td>
                  <button
                    className="action-button"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => {
                      Swal.fire({
                        title: "Hapus Dosen?",
                        text: "Data dosen akan dihapus secara permanen!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus!",
                        cancelButtonText: "Batal",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          setId(item.id);
                          mutation.mutate(item.id);
                          // setData(data.filter((d) => d.id !== item.id));
                          // Swal.fire(
                          //   "Berhasil!",
                          //   "Data dosen berhasil dihapus!",
                          //   "success"
                          // );
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
          <div className="pagination-info">
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              data.length
            )} of ${data.length} entries`}
          </div>

          <div className="pagination">
            <button
              className={`page-item`}
              onClick={() => {
                setUrl(data.links.prev);
              }}
              disabled={data.meta.current_page === 1}
            >
              &lt;
            </button>
            <button className="page-item">{data.meta.current_page}</button>
            {/* {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                            <button key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        ))} */}
            <button
              className={`page-item ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() => {
                console.log(data.links.next);
                setUrl(data.links.next);
              }}
              disabled={data.links.next == null}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDosen;

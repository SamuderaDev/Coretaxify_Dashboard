import React, { useState } from "react";
import "./kontrak.css";
import TambahKontrak from "./TambahKontrak";
import Swal from "sweetalert2";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useQuery, useMutation } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/hooks/use-toast";

import EditKontrak from "./EditKontrak";

const Kontrak = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  const [url, setUrl] = useState(RoutesApi.contractAdmin);
  const { toast } = useToast();

  //   const { isLoading, isError, data, error } = useQuery({
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["contracts", url],
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
  const {
    isLoading: isLoadingUni,
    isError: isErrorUni,
    data: dataUni,
    error: errorUni,
  } = useQuery({
    queryKey: ["univerities"],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.uniAdmin, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log(data.data);
      return data.data;
    },
  });

  // const [data, setData] = useState([
  //     { jenisKontrak: "Lisensi", instansi: "Poltek Jos", mahasiswa: 50, periodeAwal: "2023-01-01", periodeAkhir: "2023-12-31", spt: "5", bupot: "5", faktur: "5", kodePembelian: "L001", status: "Active" },
  //     { jenisKontrak: "Unit", instansi: "UB Jos", mahasiswa: 30, periodeAwal: "2022-06-01", periodeAkhir: "2023-05-31", spt: "5", bupot: "5", faktur: "5", kodePembelian: "U002", status: "Expired" },
  //     { jenisKontrak: "Unit", instansi: "UM Jos", mahasiswa: 70, periodeAwal: "2023-03-01", periodeAkhir: "2024-02-29", spt: "5", bupot: "5", faktur: "5", kodePembelian: "U003", status: "Active" },
  //     { jenisKontrak: "Lisensi", instansi: "Poltek Jos", mahasiswa: 50, periodeAwal: "2023-01-01", periodeAkhir: "2023-12-31", spt: "5", bupot: "5", faktur: "5", kodePembelian: "L001", status: "Active" },
  //     { jenisKontrak: "Unit", instansi: "UB Jos", mahasiswa: 30, periodeAwal: "2022-06-01", periodeAkhir: "2023-05-31", spt: "5", bupot: "5", faktur: "5", kodePembelian: "U002", status: "Expired" },
  //     { jenisKontrak: "Unit", instansi: "UM Jos", mahasiswa: 70, periodeAwal: "2023-03-01", periodeAkhir: "2024-02-29", spt: "5", bupot: "5", faktur: "5", kodePembelian: "U003", status: "Active" },
  //     { jenisKontrak: "Lisensi", instansi: "Poltek Jos", mahasiswa: 50, periodeAwal: "2023-01-01", periodeAkhir: "2023-12-31", spt: "5", bupot: "5", faktur: "5", kodePembelian: "L001", status: "Active" },
  //     { jenisKontrak: "Unit", instansi: "UB Jos", mahasiswa: 30, periodeAwal: "2022-06-01", periodeAkhir: "2023-05-31", spt: "5", bupot: "5", faktur: "5", kodePembelian: "U002", status: "Expired" },
  //     { jenisKontrak: "Unit", instansi: "UM Jos", mahasiswa: 70, periodeAwal: "2023-03-01", periodeAkhir: "2024-02-29", spt: "5", bupot: "5", faktur: "5", kodePembelian: "U003", status: "Active" },
  //     { jenisKontrak: "Lisensi", instansi: "Poltek Jos", mahasiswa: 50, periodeAwal: "2023-01-01", periodeAkhir: "2023-12-31", spt: "5", bupot: "5", faktur: "5", kodePembelian: "L001", status: "Active" },
  //     { jenisKontrak: "Unit", instansi: "UB Jos", mahasiswa: 30, periodeAwal: "2022-06-01", periodeAkhir: "2023-05-31", spt: "5", bupot: "5", faktur: "5", kodePembelian: "U002", status: "Expired" },
  //     { jenisKontrak: "Unit", instansi: "UM Jos", mahasiswa: 70, periodeAwal: "2023-03-01", periodeAkhir: "2024-02-29", spt: "5", bupot: "5", faktur: "5", kodePembelian: "U003", status: "Active" },
  //     { jenisKontrak: "Lisensi", instansi: "Poltek Jos", mahasiswa: 50, periodeAwal: "2023-01-01", periodeAkhir: "2023-12-31", spt: "5", bupot: "5", faktur: "5", kodePembelian: "L001", status: "Active" },
  //     { jenisKontrak: "Unit", instansi: "UB Jos", mahasiswa: 30, periodeAwal: "2022-06-01", periodeAkhir: "2023-05-31", spt: "5", bupot: "5", faktur: "5", kodePembelian: "U002", status: "Expired" },
  //     { jenisKontrak: "Unit", instansi: "UM Jos", mahasiswa: 70, periodeAwal: "2023-03-01", periodeAkhir: "2024-02-29", spt: "5", bupot: "5", faktur: "5", kodePembelian: "U003", status: "Active" },

  // ]);
  const mutation = useMutation({
    mutationFn: async (id) => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
      const response = await axios.get(`${RoutesApi.url}/api/csrf-token`, {
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
        RoutesApi.contractAdmin + `/${id}`,

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
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      const role = data.data.user.roles[0].name;
      setCookie("token", data.data.token, { path: "/" });
      setCookie("role", role, { path: "/" });

      window.location.href = "/" + role;
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleData = (newData) => {
    setData([...data, newData]);
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
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }
  if (isLoadingUni) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="kontrak-container">
      <div className="header-kontrak">
        <h2>Data Kontrak Instansi</h2>
        {/* <button
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          alert
        </button> */}
      </div>
      <div className="search-add-container">
        <input
          type="text"
          className="search-input"
          placeholder="Cari Data Instansi 🔎"
        />
        <button className="add-button" onClick={() => setIsOpen(true)}>
          + Tambah Data Kontrak
        </button>
      </div>
      <TambahKontrak
        UniData={dataUni}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleData}
        setOpen={setIsOpen}
      />
      <EditKontrak
        UniData={dataUni}
        isOpen={isOpenEdit}
        id={idEdit}
        onClose={() => setIsOpenEdit(false)}
        onSave={handleData}
      ></EditKontrak>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("jenisKontrak")}>Jenis Kontrak</th>
              <th onClick={() => handleSort("instansi")}>Instansi</th>
              <th onClick={() => handleSort("mahasiswa")}>Jumlah Mahasiswa</th>
              <th>Periode Awal</th>
              <th>Periode Akhir</th>
              <th>SPT</th>
              <th>Bupot</th>
              <th>Faktur</th>
              <th>Kode Pembelian</th>
              {/* <th>Status</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td>{item.contract_type}</td>
                <td>{item.university.name}</td>
                <td>{item.qty_student}</td>
                <td>{item.start_period}</td>
                <td>{item.end_period}</td>
                <td>{item.spt}</td>
                <td>{item.bupot}</td>
                <td>{item.faktur}</td>
                <td>{item.contract_code}</td>
                {/* <td>{item.status}</td> */}
                <td>
                  <button
                    className="action-button"
                    onClick={() => {
                      setIdEdit(item.id);
                      setIsOpenEdit(true);
                    }}
                  >
                    Edit
                  </button>
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
                      }).then((result) => {
                        if (result.isConfirmed) {
                          mutation.mutate(item.id);
                          //   window.location.reload();
                          //   const newData = data.filter(
                          //     (itemData) =>
                          //       itemData.kodePembelian !== item.kodePembelian
                          //   );
                          //   setData(newData);
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

export default Kontrak;

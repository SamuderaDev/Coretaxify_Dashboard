import React, { useState } from "react";
import "./kontrak.css";
import TambahKontrak from "./TambahKontrak";
import Swal from "sweetalert2";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useQuery, useMutation } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";

const Kontrak = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.contractAdmin, {
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
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("jenisKontrak")}>Jenis Kontrak</th>
              {/* <th onClick={() => handleSort("instansi")}>Instansi</th> */}
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
                {/* <td>{item.instansi}</td> */}
                <td>{item.qty_student}</td>
                <td>{item.start_period}</td>
                <td>{item.end_period}</td>
                <td>{item.spt}</td>
                <td>{item.bupot}</td>
                <td>{item.faktur}</td>
                <td>{item.contract_code}</td>
                {/* <td>{item.status}</td> */}
                <td>
                  <button className="action-button">Edit</button>
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
                          const newData = data.filter(
                            (itemData) =>
                              itemData.kodePembelian !== item.kodePembelian
                          );
                          setData(newData);
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
              className={`page-item ${data.meta.currentPage === 1 ? "disabled" : ""}`}
            //   onClick={/)}
              disabled={data.meta.currentPage === 1}
            >
              &lt;
            </button>
            <button className="page-ite">{data.meta.current_page}</button>
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
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
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

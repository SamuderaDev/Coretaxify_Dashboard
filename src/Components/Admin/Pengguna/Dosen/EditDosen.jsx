import React, { useState } from "react";
import "./editDosen.css";
import TambahDosen from "./TambahDosen";
import EditPopupDosen from "./EditPopupDosen";
import Swal from "sweetalert2";

const EditDosen = () => {
          const [isOpen, setIsOpen] = useState(false);
          const [editPopupOpen, setEditPopupOpen] = useState(false);
          const [selectedDosen, setSelectedDosen] = useState(null);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
          const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 10;

          const [data, setData] = useState([
                    { id: 1, namaDosen: "Hendra", instansi: "Poltek Jos", kuotaKelas: 50, kodeRegistrasi: "L001", jumlahSiswa: 50, kodePembelian: "L001", status: "Active" },
                    { id: 2, namaDosen: "Udin", instansi: "UB Jos", kuotaKelas: 30, kodeRegistrasi: "U002", jumlahSiswa: 30, kodePembelian: "U002", status: "Expired" },
                    { id: 3, namaDosen: "Galeh", instansi: "UM Jos", kuotaKelas: 70, kodeRegistrasi: "U003", jumlahSiswa: 70, kodePembelian: "U003", status: "Active" },
          ]);

          const handleData = (newData) => {
                    setData([...data, { id: data.length + 1, ...newData }]);
          };

          const handleEdit = (dosen) => {
                    setSelectedDosen(dosen);
                    setEditPopupOpen(true);
          };

          const handleUpdateDosen = (updatedDosen) => {
                    setData(data.map((item) => (item.id === updatedDosen.id ? updatedDosen : item)));
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
          const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

          const paginate = (pageNumber) => setCurrentPage(pageNumber);

          return (
                    <div className="kontrak-container">
                              <div className="header">
                                        <h2>Data Dosen</h2>
                              </div>
                              <div className="search-add-container">
                                        <div className="search-input-container">
                                                  <input type="text" className="search-input" placeholder="Cari Data Dosen 🔎" />
                                        </div>
                                        <button className="add-button" onClick={() => setIsOpen(true)}>+ Tambah Dosen</button>
                              </div>
                              <TambahDosen isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleData} />
                              <EditPopupDosen isOpen={editPopupOpen} onClose={() => setEditPopupOpen(false)} dosen={selectedDosen} onSave={handleUpdateDosen} />
                              <div className="table-container">
                                        <table>
                                                  <thead>
                                                            <tr>
                                                                      <th onClick={() => handleSort("namaDosen")}>Nama Dosen {sortConfig.key === "namaDosen" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}</th>
                                                                      <th onClick={() => handleSort("instansi")}>Instansi {sortConfig.key === "instansi" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}</th>
                                                                      <th>Kode Registrasi</th>
                                                                     
                                                                      <th>Kode Pembelian</th>
                                                                      <th>Status</th>
                                                                      <th>Action</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {currentItems.map((item) => (
                                                                      <tr key={item.id}>
                                                                                <td>{item.namaDosen}</td>
                                                                                <td>{item.instansi}</td>
                                                            
                                                                                <td>{item.kodeRegistrasi}</td>
                                                            
                                                                                <td>{item.kodePembelian}</td>
                                                                                <td>{item.status}</td>
                                                                                <td>
                                                                                          <button className="action-button" onClick={() => handleEdit(item)}>Edit</button>
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
                                                                                                                                  setData(data.filter((d) => d.id !== item.id));
                                                                                                                                  Swal.fire("Berhasil!", "Data dosen berhasil dihapus!", "success");
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
                                                            {`Showing ${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, data.length)} of ${data.length} entries`}
                                                  </div>
                                                  <div className="pagination">
                                                            <button className={`page-item ${currentPage === 1 ? "disabled" : ""}`} onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                                                      &lt;
                                                            </button>
                                                            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                                                                      <button key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`} onClick={() => paginate(index + 1)}>
                                                                                {index + 1}
                                                                      </button>
                                                            ))}
                                                            <button className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? "disabled" : ""}`} onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
                                                                      &gt;
                                                            </button>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
};

export default EditDosen;

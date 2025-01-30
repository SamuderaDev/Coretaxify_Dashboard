import React, { useState } from "react";
import "./editAdmin.css";
import TambahDosen from "./TambahDosen";
const EditAdmin = () => {
          const [isOpen, setIsOpen] = useState(false);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
          const [data, setData] = useState([
                    { namaAdmin: "Hendra", email: "hendra@coretaxify.com", status: "Active" },
                    { namaAdmin: "Udin", email: "udin@coretaxify.com", status: "Expired" },
                    { namaAdmin: "Galeh", email: "galeh@coretaxify.com", status: "Active" },
          ]);
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

          return (

                    <div className="kontrak-container">
                              <div className="header">
                                        <h2>Data Dosen</h2>
                              </div>
                              <div className="search-add-container">
                                        <div className="search-input-container">
                                                  <input type="text" id="search" className="search-input" placeholder="Cari Data Dosen     🔎" />
                                        </div>
                                        <button className="add-button" onClick={() => setIsOpen(true)}>+ Tambah Dosen</button>
                              </div>
                              <TambahDosen isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleData} />
                              <div className="table-container">
                                        <table>
                                                  <thead>
                                                            <tr>
                                                                      <th onClick={() => handleSort("namaDosen")}>
                                                                                Nama Dosen {sortConfig.key === "namaDosen" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : (sortConfig.direction === "descending" ? "↓" : "↑")}
                                                                      </th>
                                                                      <th onClick={() => handleSort("instansi")}>
                                                                                Instansi {sortConfig.key === "instansi" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : (sortConfig.direction === "descending" ? "↓" : "↑")}
                                                                      </th>
                                                                      <th onClick={() => handleSort("mahasiswa")}>
                                                                                Kuota Kelas {sortConfig.key === "kuotaKelas" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : (sortConfig.direction === "descending" ? "↓" : "↑")}
                                                                      </th>
                                                                      <th>Kode Registrasi</th>
                                                                      <th>Jumlah Siswa</th>
                                                                      <th>Kode Pembelian</th>
                                                                      <th>Status</th>
                                                                      <th>Action</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {data.map((item, index) => (
                                                                      <tr key={index}>
                                                                                <td>{item.namaDosen}</td>
                                                                                <td>{item.instansi}</td>
                                                                                <td>{item.kuotaKelas}</td>
                                                                                <td>{item.kodeRegistrasi}</td>
                                                                                <td>{item.jumlahSiswa}</td>
                                                                                <td>{item.kodePembelian}</td>
                                                                                <td>{item.status}</td>
                                                                                <td>
                                                                                          <button className="action-button">Edit</button>
                                                                                          <button className="action-button delete">Delete</button>
                                                                                </td>
                                                                      </tr>
                                                            ))}
                                                  </tbody>
                                        </table>
                              </div>
                    </div>
          );
};

export default EditAdmin;

import React, { useState } from "react";
import "./editDosen.css";
import TambahDosen from "./TambahDosen";
const EditDosen = () => {
          const [isOpen, setIsOpen] = useState(false);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
          const [data, setData] = useState([
                    { namaDosen: "Hendra", instansi: "Poltek Jos", kuotaKelas: 50, kodeRegistrasi: "L001", jumlahSiswa: 50, kodePembelian: "L001", status: "Active" },
                    { namaDosen: "Udin", instansi: "UB Jos", kuotaKelas: 30, kodeRegistrasi: "U002", jumlahSiswa: 30, kodePembelian: "U002", status: "Expired" },
                    { namaDosen: "Galeh", instansi: "UM Jos", kuotaKelas: 70, kodeRegistrasi: "U003", jumlahSiswa: 70, kodePembelian: "U003", status: "Active" },
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

export default EditDosen;

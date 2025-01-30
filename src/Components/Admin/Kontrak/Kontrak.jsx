import React, { useState } from "react";
import "./kontrak.css";
import TambahKontrak from "./TambahKontrak";
const Kontrak = () => {
          const [isOpen, setIsOpen] = useState(false);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
          const [data, setData] = useState([
                    { jenisKontrak: "Lisensi", instansi: "Poltek Jos", mahasiswa: 50, periodeAwal: "2023-01-01", periodeAkhir: "2023-12-31", kodePembelian: "L001", status: "Active" },
                    { jenisKontrak: "Unit", instansi: "UB Jos", mahasiswa: 30, periodeAwal: "2022-06-01", periodeAkhir: "2023-05-31", kodePembelian: "U002", status: "Expired" },
                    { jenisKontrak: "Unit", instansi: "UM Jos", mahasiswa: 70, periodeAwal: "2023-03-01", periodeAkhir: "2024-02-29", kodePembelian: "U003", status: "Active" },
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
                                        <h2>Data Kontrak Instansi</h2>
                              </div>
                              <div className="search-add-container">
                                        <div className="search-input-container">
                                                  <input type="text" id="search" className="search-input" placeholder="Cari Data Instansi     🔎" />
                                        </div>
                                        <button className="add-button" onClick={() => setIsOpen(true)}>+ Tambah Data Kontrak</button>
                              </div>
                              <TambahKontrak isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleData} />
                              <div className="table-container">
                                        <table>
                                                  <thead>
                                                            <tr>
                                                                      <th onClick={() => handleSort("jenisKontrak")}>
                                                                                Jenis Kontrak {sortConfig.key === "jenisKontrak" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : (sortConfig.direction === "descending" ? "↓" : "↑")}
                                                                      </th>
                                                                      <th onClick={() => handleSort("instansi")}>
                                                                                Instansi {sortConfig.key === "instansi" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : (sortConfig.direction === "descending" ? "↓" : "↑")}
                                                                      </th>
                                                                      <th onClick={() => handleSort("mahasiswa")}>
                                                                                Jumlah Mahasiswa {sortConfig.key === "mahasiswa" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : (sortConfig.direction === "descending" ? "↓" : "↑")}
                                                                      </th>
                                                                      <th>Periode Awal</th>
                                                                      <th>Periode Akhir</th>
                                                                      <th>Kode Pembelian</th>
                                                                      <th>Status</th>
                                                                      <th>Action</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {data.map((item, index) => (
                                                                      <tr key={index}>
                                                                                <td>{item.jenisKontrak}</td>
                                                                                <td>{item.instansi}</td>
                                                                                <td>{item.mahasiswa}</td>
                                                                                <td>{item.periodeAwal}</td>
                                                                                <td>{item.periodeAkhir}</td>
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

export default Kontrak;

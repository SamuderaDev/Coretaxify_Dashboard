import React, { useState } from "react";
import "./editAdmin.css";
import Swal from "sweetalert2";

const EditAdmin = () => {
          const [isOpen, setIsOpen] = useState(false);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
          const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 10;

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
          
          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

          const paginate = (pageNumber) => setCurrentPage(pageNumber);

          return (

                    <div className="kontrak-container">
                              <div className="header">
                                        <h2>Data Admin</h2>
                              </div>
                              <div className="search-add-container">
                                        <div className="search-input-container">
                                                  <input type="text" id="search" className="search-input" placeholder="Cari Data Admin     🔎" />
                                        </div>
                                        <button className="add-button" onClick={() => setIsOpen(true)}>+ Tambah Admin</button>
                              </div>
                              {/* <TambahDosen isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleData} /> */}
                              <div className="table-container">
                                        <table>
                                                  <thead>
                                                            <tr>
                                                                      <th onClick={() => handleSort("namaDosen")}>
                                                                                Nama Admin {sortConfig.key === "namaDosen" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : (sortConfig.direction === "descending" ? "↓" : "↑")}
                                                                      </th>
                                                                      <th onClick={() => handleSort("instansi")}>
                                                                                Email {sortConfig.key === "instansi" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : (sortConfig.direction === "descending" ? "↓" : "↑")}
                                                                      </th>
                                                                      <th>Status</th>
                                                                      <th>Action</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {currentItems.map((item, index) =>  (
                                                                      <tr key={index}>
                                                                                <td>{item.namaAdmin}</td>
                                                                                <td>{item.email}</td>
                                                                                <td>{item.status}</td>
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
                                                                                                                        dangerMode: true,
                                                                                                              }).then((result) => {
                                                                                                                        if (result.isConfirmed) {
                                                                                                                                  const newData = data.filter((itemData) => itemData.id !== item.id);
                                                                                                                                  setData(newData);
                                                                                                                                  Swal.fire("Berhasil!", "Kelas berhasil dihapus!", "success");
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

export default EditAdmin;

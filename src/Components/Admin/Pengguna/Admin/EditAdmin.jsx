import React, { useState } from "react";
import "./editAdmin.css";
import TambahAdmin from "./TambahAdmin";
import Swal from "sweetalert2";
import EditPopupAdmin from "./EditPopupAdmin";

const EditAdmin = () => {
          const [isOpen, setIsOpen] = useState(false);
          const [editPopupOpen, setEditPopupOpen] = useState(false);
          const [selectedAdmin, setSelectedAdmin] = useState(null);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
          const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 10;

          const [data, setData] = useState([
                    { id: 1, namaAdmin: "Hendra", email: "hendra@coretaxify.com", status: "Active" },
                    { id: 2, namaAdmin: "Udin", email: "udin@coretaxify.com", status: "Expired" },
                    { id: 3, namaAdmin: "Galeh", email: "galeh@coretaxify.com", status: "Active" },
          ]);

          const handleData = (newData) => {
                    setData([...data, { id: data.length + 1, ...newData }]);
          };

          const handleEdit = (admin) => {
                    setSelectedAdmin(admin);
                    setEditPopupOpen(true);
          };

          const handleUpdateAdmin = (updatedAdmin) => {
                    setData(data.map((item) => (item.id === updatedAdmin.id ? updatedAdmin : item)));
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
                                        <h2>Data Admin</h2>
                              </div>
                              <div className="search-add-container">
                                        <div className="search-input-container">
                                                  <input type="text" id="search" className="search-input" placeholder="Cari Data Admin 🔎" />
                                        </div>
                                        <button className="add-button" onClick={() => setIsOpen(true)}>+ Tambah Admin</button>
                              </div>

                              <TambahAdmin isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleData} />

                              {editPopupOpen && <EditPopupAdmin isOpen={editPopupOpen} onClose={() => setEditPopupOpen(false)} admin={selectedAdmin} onSave={handleUpdateAdmin} />}

                              <div className="table-container">
                                        <table>
                                                  <thead>
                                                            <tr>
                                                                      <th onClick={() => handleSort("namaAdmin")}>
                                                                                Nama Admin {sortConfig.key === "namaAdmin" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                                                                      </th>
                                                                      <th onClick={() => handleSort("email")}>
                                                                                Email {sortConfig.key === "email" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                                                                      </th>
                                                                      <th>Status</th>
                                                                      <th>Action</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {currentItems.map((item, index) => (
                                                                      <tr key={index}>
                                                                                <td>{item.namaAdmin}</td>
                                                                                <td>{item.email}</td>
                                                                                <td>{item.status}</td>
                                                                                <td>
                                                                                          <button className="action-button" onClick={() => handleEdit(item)}>Edit</button>
                                                                                          <button
                                                                                                    className="action-button delete"
                                                                                                    onClick={() => {
                                                                                                              Swal.fire({
                                                                                                                        title: "Hapus Admin?",
                                                                                                                        text: "Admin akan dihapus secara permanen!",
                                                                                                                        icon: "warning",
                                                                                                                        showCancelButton: true,
                                                                                                                        confirmButtonText: "Ya, hapus!",
                                                                                                                        cancelButtonText: "Batal",
                                                                                                                        dangerMode: true,
                                                                                                              }).then((result) => {
                                                                                                                        if (result.isConfirmed) {
                                                                                                                                  const newData = data.filter((itemData) => itemData.id !== item.id);
                                                                                                                                  setData(newData);
                                                                                                                                  Swal.fire("Berhasil!", "Admin berhasil dihapus!", "success");
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

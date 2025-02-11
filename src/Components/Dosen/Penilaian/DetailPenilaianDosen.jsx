import React, { useState } from "react";
import Swal from "sweetalert2";
import { IoReload } from "react-icons/io5";
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
import { CookiesProvider, useCookies } from "react-cookie";

export default function DetailPenilaian() {
          const [isOpen, setIsOpen] = useState(false);
          const [isAddOpen, setIsAddOpen] = useState(false);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
          const [selectedData, setSelectedData] = useState(null);
          const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 10;
          const [cookies, setCookie] = useCookies(["user"]);

          const [data, setData] = useState([
                    {
                              id: "1",
                              namaMahasiswa: "Hendra",
                              namaPraktikum: "Ujian 1",
                              nilai: "80",
                              status: "Sudah Di Nilai",
                    },
                    {
                              id: "2",
                              namaMahasiswa: "Dika",
                              namaPraktikum: "Ujian 1",
                              nilai: "",
                              status: "Belum Di Nilai",
                    },
                    {
                              id: "3",
                              namaMahasiswa: "Udin",
                              namaPraktikum: "Ujian 1",
                              nilai: "80",
                              status: "Sudah Di Nilai",
                    },
                    {
                              id: "4",
                              namaMahasiswa: "Galeh",
                              namaPraktikum: "Ujian 1",
                              nilai: "",
                              status: "Belum Di Nilai",
                    },
          ]);

          const [formData, setFormData] = useState({
                    namaUjian: "",
                    kodeUjian: "",
                    supportingFile: null,
                    deadline: "",
          });

          const generateRandomCode = () => {
                    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    let result = "";
                    for (let i = 0; i < 5; i++) {
                              result += characters.charAt(Math.floor(Math.random() * characters.length));
                    }
                    return result;
          };

          const handleChange = (e) => {
                    const { name, value } = e.target;
                    setFormData({ ...formData, [name]: value });
          };

          const handleFileChange = (e) => {
                    const file = e.target.files[0];
                    setFormData({ ...formData, supportingFile: file });
          };

          const handleSave = () => {
                    if (!formData.namaUjian || !formData.kodeUjian || !formData.deadline) {
                              Swal.fire("Error", "Harap isi semua field yang diperlukan!", "error");
                              return;
                    }

                    const newTugas = {
                              id: String(data.length + 1),
                              namaUjian: formData.namaUjian,
                              kodeUjian: formData.kodeUjian,
                              supportingFile: formData.supportingFile ? formData.supportingFile.name : "No file",
                              deadline: formData.deadline,
                    };

                    setData([...data, newTugas]);
                    setIsAddOpen(false);
                    setFormData({ namaUjian: "", kodeUjian: "", supportingFile: null, deadline: "" });

                    Swal.fire("Berhasil!", "Ujian berhasil ditambahkan!", "success");
          };

          const handleReloadCode = () => {
                    setFormData({ ...formData, kodeUjian: generateRandomCode() });
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

          const handleEditClick = (index) => {
                    setSelectedData(data[index]);
                    setIsOpen(true);
          };

          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

          const paginate = (pageNumber) => setCurrentPage(pageNumber);

          const [search, setSearch] = useState("");

          const processedData = data.map((item) => ({
                    ...item,
                    highlight:
                              search &&
                              Object.values(item).some((value) =>
                                        String(value).toLowerCase().includes(search.toLowerCase())
                              ),
          }));

          return (
                    <div className="kontrak-container">
                              <div className="header">
                                        <h2>Detail Penilaian</h2>
                              </div>
                              <div className="search-add-container">
                                        <div className="search-input-container">
                                                  <input
                                                            type="text"
                                                            id="search"
                                                            className="search-input"
                                                            placeholder="Cari Ujian                       🔎"
                                                            onChange={(e) => setSearch(e.target.value)}
                                                  />
                                        </div>
                              </div>
                              <div className="table-container">
                                        <table>
                                                  <thead>
                                                            <tr>
                                                                      <th>No</th>
                                                                      <th onClick={() => handleSort("namaUjian ")}>
                                                                                Nama Mahasiswa{" "}
                                                                                {sortConfig.key === "namaUjian"
                                                                                          ? sortConfig.direction === "ascending"
                                                                                                    ? "↑"
                                                                                                    : "↓"
                                                                                          : sortConfig.direction === "descending"
                                                                                                    ? "↓"
                                                                                                    : "↑"}
                                                                      </th>
                                                                      <th>Nama Praktikum</th>
                                                                      <th>Nilai</th>
                                                                      <th>Status</th>
                                                                      <th>Action</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {currentItems.map((item, index) => (
                                                                      <tr key={item.id}>
                                                                                <td>{indexOfFirstItem + index + 1}</td>
                                                                                <td>{item.namaMahasiswa}</td>
                                                                                <td>{item.namaPraktikum}</td>
                                                                                <td>{item.nilai}</td>
                                                                                <td>{item.status}</td>
                                                                                <td>
                                                                                          <button
                                                                                                    className="action-button"
                                                                                                    onClick={() => handleEditClick(index)}
                                                                                          >
                                                                                                    Beri Nilai
                                                                                          </button>
                                                                                </td>
                                                                      </tr>
                                                            ))}
                                                  </tbody>
                                        </table>
                                        <div className="pagination-container sticky">
                                                  <div className="pagination-info">
                                                            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
                                                                      indexOfLastItem,
                                                                      data.length
                                                            )} of ${data.length} entries`}
                                                  </div>

                                                  <div className="pagination ">
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
                                                                                          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                                                                          onClick={() => paginate(index + 1)}
                                                                                >
                                                                                          {index + 1}
                                                                                </button>
                                                                      )
                                                            )}
                                                            <button
                                                                      className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? "disabled" : ""}`}
                                                                      onClick={() => paginate(currentPage + 1)}
                                                                      disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                                                            >
                                                                      &gt;
                                                            </button>
                                                  </div>
                                        </div>
                              </div>
                              {isOpen && (
                                        <EditPopupMahasiswa
                                                  onClose={() => setIsOpen(false)}
                                                  data={selectedData}
                                        />
                              )}
                    </div>
          );
}
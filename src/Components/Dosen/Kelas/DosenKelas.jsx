import React, { useState } from "react";
import Swal from "sweetalert2";
import { IoReload } from "react-icons/io5"; // Import ikon reload
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

export default function DosenKelas() {
          const [isOpen, setIsOpen] = useState(false);
          const [isAddOpen, setIsAddOpen] = useState(false); // State untuk popup tambah kelas
          const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
          const [selectedData, setSelectedData] = useState(null);
          const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 10;
          const [cookies, setCookie] = useCookies(["user"]);

          const [data, setData] = useState([
                    {
                              id: "1",
                              nama: "Kelas Poltek",
                              kodeKelas: "xAE12",
                              isSelected: false,
                    },
                    {
                              id: "2",
                              nama: "Kelas UB",
                              kodeKelas: "xAE12",
                              isSelected: false,
                    },
                    {
                              id: "3",
                              nama: "Kelas UM",
                              kodeKelas: "xAE12",
                              isSelected: false,
                    },
                    {
                              id: "4",
                              nama: "Kelas UGM",
                              kodeKelas: "xAE12",
                              isSelected: false,
                    },
          ]);

          const [formData, setFormData] = useState({
                    nama: "",
                    kodeKelas: "",
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

          const handleSave = () => {
                    const newKelas = {
                              id: String(data.length + 1),
                              nama: formData.nama,
                              kodeKelas: formData.kodeKelas,
                              isSelected: false,
                    };
                    setData([...data, newKelas]);
                    setIsAddOpen(false);
                    setFormData({ nama: "", kodeKelas: "" }); 
          };

          const handleReloadCode = () => {
                    setFormData({ ...formData, kodeKelas: generateRandomCode() });
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
                                        <h2>Data Kelas</h2>
                              </div>
                              <div className="search-add-container">
                                        <div className="search-input-container">
                                                  <input
                                                            type="text"
                                                            id="search"
                                                            className="search-input"
                                                            placeholder="Cari Kelas   🔎"
                                                            onChange={(e) => setSearch(e.target.value)}
                                                  />
                                        </div>
                                        <button
                                                  className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900"
                                                  onClick={() => {
                                                            setIsAddOpen(true);
                                                            setFormData({ ...formData, kodeKelas: generateRandomCode() }); 
                                                  }}
                                        >
                                                  Tambah Kelas
                                        </button>
                              </div>
                              <div className="table-container">
                                        <table>
                                                  <thead>
                                                            <tr>
                                                                      <th>No</th>
                                                                      <th onClick={() => handleSort("nama")}>
                                                                                Nama{" "}
                                                                                {sortConfig.key === "nama"
                                                                                          ? sortConfig.direction === "ascending"
                                                                                                    ? "↑"
                                                                                                    : "↓"
                                                                                          : sortConfig.direction === "descending"
                                                                                                    ? "↓"
                                                                                                    : "↑"}
                                                                      </th>
                                                                      <th>Kode Kelas</th>
                                                                      <th>Action</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {currentItems.map((item, index) => (
                                                                      <tr key={item.id}>
                                                                                <td>{indexOfFirstItem + index + 1}</td>
                                                                                <td>{item.nama}</td>
                                                                                <td>{item.kodeKelas}</td>
                                                                                <td>
                                                                                          <AlertDialog>
                                                                                                    <AlertDialogTrigger className="action-button edit">
                                                                                                              Edit
                                                                                                    </AlertDialogTrigger>
                                                                                                    <AlertDialogContent>
                                                                                                              <AlertDialogHeader>
                                                                                                                        <AlertDialogTitle>Edit Kelas</AlertDialogTitle>
                                                                                                                        <AlertDialogDescription className="w-full">
                                                                                                                                  <div className="">
                                                                                                                                            <form>
                                                                                                                                                      <div className="edit-form-group-mahasiswa ">
                                                                                                                                                                <label>Nama:</label>
                                                                                                                                                                <input
                                                                                                                                                                          type="text"
                                                                                                                                                                          name="nama"
                                                                                                                                                                          value={formData.nama}
                                                                                                                                                                          onChange={handleChange}
                                                                                                                                                                          required
                                                                                                                                                                />
                                                                                                                                                      </div>
                                                                                                                                                      <div className="edit-form-group-mahasiswa">
                                                                                                                                                                <label>Kode Kelas:</label>
                                                                                                                                                                <input
                                                                                                                                                                          className="text-black"
                                                                                                                                                                          name="kodeKelas"
                                                                                                                                                                          value={formData.kodeKelas}
                                                                                                                                                                          onChange={handleChange}
                                                                                                                                                                />
                                                                                                                                                      </div>
                                                                                                                                            </form>
                                                                                                                                  </div>
                                                                                                                        </AlertDialogDescription>
                                                                                                              </AlertDialogHeader>
                                                                                                              <AlertDialogFooter>
                                                                                                                        <AlertDialogCancel className="bg-red-600 text-white">
                                                                                                                                  Kembali
                                                                                                                        </AlertDialogCancel>
                                                                                                                        <AlertDialogAction className="bg-green-600 ">
                                                                                                                                  Simpan
                                                                                                                        </AlertDialogAction>
                                                                                                              </AlertDialogFooter>
                                                                                                    </AlertDialogContent>
                                                                                          </AlertDialog>

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
                                                                                                                                  const newData = data.filter(
                                                                                                                                            (itemData) => itemData.id !== item.id
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
                              <AlertDialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                                        <AlertDialogContent>
                                                  <AlertDialogHeader>
                                                            <AlertDialogTitle>Tambah Kelas</AlertDialogTitle>
                                                            <AlertDialogDescription className="w-full">
                                                                      <div className="">
                                                                                <form>
                                                                                          <div className="edit-form-group-mahasiswa ">
                                                                                                    <label>Nama:</label>
                                                                                                    <input
                                                                                                              type="text"
                                                                                                              name="nama"
                                                                                                              value={formData.nama}
                                                                                                              onChange={handleChange}
                                                                                                              required
                                                                                                    />
                                                                                          </div>
                                                                                          <div className="edit-form-group-mahasiswa">
                                                                                                    <label>Kode Kelas:</label>
                                                                                                    <div className="flex items-center gap-2">
                                                                                                              <input
                                                                                                                        className="text-black"
                                                                                                                        name="kodeKelas"
                                                                                                                        value={formData.kodeKelas}
                                                                                                                        onChange={handleChange}
                                                                                                                        readOnly
                                                                                                              />
                                                                                                              <button
                                                                                                                        type="button"
                                                                                                                        className="p-3 bg-purple-800 rounded-md hover:bg-purple-900"
                                                                                                                        onClick={handleReloadCode}
                                                                                                              >
                                                                                                                        <IoReload className="text-lg text-white " />
                                                                                                              </button>
                                                                                                    </div>
                                                                                          </div>
                                                                                </form>
                                                                      </div>
                                                            </AlertDialogDescription>
                                                  </AlertDialogHeader>
                                                  <AlertDialogFooter>
                                                            <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">
                                                                      Batal
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction className="bg-green-600" onClick={handleSave}>
                                                                      Simpan
                                                            </AlertDialogAction>
                                                  </AlertDialogFooter>
                                        </AlertDialogContent>
                              </AlertDialog>
                    </div>
          );
}
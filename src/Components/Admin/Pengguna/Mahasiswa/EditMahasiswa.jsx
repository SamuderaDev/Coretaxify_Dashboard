import React, { useState } from "react";
import "./editMahasiswa.css";
import EditPopupMahasiswa from "./EditPopupMahasiswa";
import Swal from "sweetalert2";

const EditMahasiswa = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [selectedData, setSelectedData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [data, setData] = useState([
        { namaMahasiswa: "Hendra", instansi: "Poltek Jos", email: "hendra@coretaxify.com", kelas: "Abangkuh", kodeRegistrasi: "L001", status: "Active" },
        { namaMahasiswa: "Udin", instansi: "UB Jos", email: "hendra@coretaxify.com", kelas: "Abangkuh", kodeRegistrasi: "U002", status: "Expired" },
        { namaMahasiswa: "Galeh", instansi: "UM Jos", email: "hendra@coretaxify.com", kelas: "Abangkuh", kodeRegistrasi: "U003", status: "Active" },
    ]);

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

    return (
        <div className="kontrak-container">
            <div className="header">
                <h2>Data Mahasiswa</h2>
            </div>
            <div className="search-add-container">
                <div className="search-input-container">
                    <input type="text" id="search" className="search-input" placeholder="Cari Data Mahasiswa   🔎" />
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("namaMahasiswa")}>
                                Nama Mahasiswa {sortConfig.key === "namaMahasiswa" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : (sortConfig.direction === "descending" ? "↓" : "↑")}</th>
                            <th>Email</th>
                            <th>Instansi</th>
                            <th>Kelas</th>
                            <th>Kode Registrasi</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.namaMahasiswa}</td>
                                <td>{item.email}</td>
                                <td>{item.instansi}</td>
                                <td>{item.kelas}</td>
                                <td>{item.kodeRegistrasi}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button className="action-button edit" onClick={() => handleEditClick(index)}>Edit</button>
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
            {isOpen && <EditPopupMahasiswa onClose={() => setIsOpen(false)} data={selectedData} />}
        </div>
    );
};

export default EditMahasiswa;

import React, { useState } from "react";
import "./editMahasiswa.css";
import EditPopupMahasiswa from "./EditPopupMahasiswa";

const EditMahasiswa = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [selectedData, setSelectedData] = useState(null);
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
                                    <button className="action-button delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isOpen && <EditPopupMahasiswa onClose={() => setIsOpen(false)} data={selectedData} />}
        </div>
    );
};

export default EditMahasiswa;

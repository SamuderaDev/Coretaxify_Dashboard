import React, { useState } from 'react';
import './editPopupMahasiswa.css';

const EditPopupMahasiswa = ({ onClose }) => {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        instansi: "",
        kelas: "",
        kodeRegistrasi: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        // Logic to save the data
        onClose();
    };

    return (
        <div className="edit-popup-container">
            <div className="edit-popup-content">
                <div className="edit-popup-header">
                    <h2>Edit Mahasiswa</h2>
                </div>
                <form>
                    <div className="edit-form-group">
                        <label>Nama:</label>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="edit-form-group">
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.instansi}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="edit-form-group">
                        <label>Instansi:</label>
                        <input
                            type="text"
                            name="instansi"
                            value={formData.instansi}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="edit-form-group">
                        <label>kelas:</label>
                        <input
                            type="text"
                            name="kelas"
                            value={formData.kuotaKelas}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="edit-form-group">
                        <label>Kode Registrasi:</label>
                        <input
                            type="text"
                            name="kodeRegistrasi"
                            value={formData.kodeRegistrasi}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="edit-form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih Status</option>
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </div>
                </form>
                <div className="edit-popup-actions">
                    <button className="edit-save-button" onClick={handleSave}>
                        Simpan
                    </button>
                    <button className="edit-cancel-button" onClick={onClose}>
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPopupMahasiswa;

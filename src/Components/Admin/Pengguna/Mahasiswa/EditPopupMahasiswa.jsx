import React, { useState, useEffect } from "react";
import "./editPopupMahasiswa.css";

const EditPopupMahasiswa = ({ onClose, data = {}, onSave }) => {
  const [formData, setFormData] = useState({
    namaMahasiswa: "",
    email: "",
    instansi: "",
    kelas: "",
    kodeRegistrasi: "",
    status: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        namaMahasiswa: data.namaMahasiswa || "",
        email: data.email || "",
        instansi: data.instansi || "",
        kelas: data.kelas || "",
        kodeRegistrasi: data.kodeRegistrasi || "",
        status: data.status || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.namaMahasiswa ||
      !formData.email ||
      !formData.instansi ||
      !formData.kelas ||
      !formData.kodeRegistrasi ||
      !formData.status
    ) {
      window.alert("Harap isi semua bidang!");
      return;
    }
    onSave({ ...data, ...formData });
    onClose();
  };

  return (
    <div className="edit-popup-container-mahasiswa">
      <div className="edit-popup-content-mahasiswa">
        <div className="edit-popup-header-mahasiswa">
          <h2>Edit Mahasiswa</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="edit-form-group-mahasiswa">
            <label>Nama Mahasiswa:</label>
            <input
              type="text"
              name="namaMahasiswa"
              value={formData.namaMahasiswa}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-mahasiswa">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-mahasiswa">
            <label>Instansi:</label>
            <input
              type="text"
              name="instansi"
              value={formData.instansi}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-mahasiswa">
            <label>Kelas:</label>
            <input
              type="text"
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-mahasiswa">
            <label>Kode Registrasi:</label>
            <input
              type="text"
              name="kodeRegistrasi"
              value={formData.kodeRegistrasi}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-mahasiswa">
            <label>Status:</label>
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
          <div className="edit-popup-actions-mahasiswa">
            <button className="edit-save-button" type="submit">
              Simpan
            </button>
            <button
              className="edit-cancel-button"
              type="button"
              onClick={onClose}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopupMahasiswa;

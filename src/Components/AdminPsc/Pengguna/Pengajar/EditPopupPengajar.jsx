import React, { useState, useEffect } from "react";
import "./editPopupDosen.css";

const EditPopupPengajar = ({ isOpen, onClose, dosen, onSave }) => {
  const [formData, setFormData] = useState({
    namaDosen: "",
    instansi: "",
    kuotaKelas: "",
    kodeRegistrasi: "",
    jumlahSiswa: "",
    kodePembelian: "",
    status: "",
  });

  useEffect(() => {
    if (dosen) {
      setFormData({
        namaDosen: dosen.namaDosen || "",
        instansi: dosen.instansi || "",
        kuotaKelas: dosen.kuotaKelas || "",
        kodeRegistrasi: dosen.kodeRegistrasi || "",
        jumlahSiswa: dosen.jumlahSiswa || "",
        kodePembelian: dosen.kodePembelian || "",
        status: dosen.status || "",
      });
    }
  }, [dosen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (
      formData.namaDosen &&
      formData.instansi &&
      formData.kuotaKelas &&
      formData.status
    ) {
      onSave({ ...dosen, ...formData });
      onClose();
    } else {
      alert("Harap isi semua bidang yang wajib!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-popup-container-dosen ">
      <div className="edit-popup-content-dosen">
        <div className="edit-popup-header-dosen">
          <h2>Edit Pengajar</h2>
        </div>
        <form>
          <div className="edit-form-group-dosen">
            <label>Nama Pengajar:</label>
            <input
              type="text"
              name="namaDosen"
              value={formData.namaDosen}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="edit-form-group-dosen">
            <label>Instansi:</label>
            <input
              type="text"
              name="instansi"
              value={formData.instansi}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="edit-form-group-dosen">
            <label>Kuota Kelas:</label>
            <input
              type="number"
              name="kuotaKelas"
              value={formData.kuotaKelas}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="edit-form-group-dosen">
            <label>Kode Registrasi:</label>
            <input
              type="text"
              name="kodeRegistrasi"
              value={formData.kodeRegistrasi}
              onChange={handleChange}
            />
          </div> */}
          <div className="edit-form-group-dosen">
            <label>Jumlah Siswa:</label>
            <input
              type="number"
              name="jumlahSiswa"
              value={formData.jumlahSiswa}
              onChange={handleChange}
            />
          </div>
          <div className="edit-form-group-dosen">
            <label>Kode Pembelian:</label>
            <input
              type="text"
              name="kodePembelian"
              value={formData.kodePembelian}
              onChange={handleChange}
            />
          </div>
          <div className="edit-form-group-dosen">
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
        </form>
        <div className="edit-popup-actions-dosen">
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

export default EditPopupPengajar;

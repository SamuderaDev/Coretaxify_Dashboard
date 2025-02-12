import React, { useState, useEffect } from "react";
import "./editPopupKelas.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const EditPopupMahasiswa = ({ onClose, data = {}, onSave }) => {
  const mutation = useMutation({
    mutationFn: async () => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        // withCredentials: true,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookies.token);
      const data = await axios.put(
        RoutesApi.contractAdmin + `/${id}`,
        {
          namaKelas: formData.namaKelas,
          kodeKelas: formData.kodeKelas,
          status: formData.status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      const role = data.data.user.roles[0].name;
      setCookie("token", data.data.token, { path: "/" });
      setCookie("role", role, { path: "/" });

      window.location.href = "/" + role;
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    user_id: 0,
    qty_student: 0,
    start_period: "2025-02-12",
    end_period: "2026-02-12",
    spt: null,
    bupot: null,
    faktur: null,
    class_code: "",
    status: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        namaKelas: data.namaKelas || "",
        kodeKelas: data.kodeKelas || "",
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
      !formData.id ||
      !formData.name ||
      !formData.user_id ||
      !formData.qty_student ||
      !formData.start_period ||
      !formData.end_period ||
      !formData.spt ||
      !formData.bupot ||
      !formData.faktur ||
      !formData.class_code ||
      !formData.status
    ) {
      window.alert("Harap isi semua bidang!");
      return;
    }
    // onSave({ ...data, ...formData });
    onClose();
  };

  return (
    <div className="edit-popup-container-mahasiswa">
      <div className="edit-popup-content-mahasiswa">
        <div className="edit-popup-header-mahasiswa">
          <h2>Edit Kelas</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="edit-form-group-mahasiswa">
            <label>Nama Kelas:</label>
            <input
              type="text"
              name="namaKelas"
              value={formData.namaKelas}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-mahasiswa">
            <label>Kode Kelas:</label>
            <input
              type="text"
              name="kodeKelas"
              value={formData.kodeKelas}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="edit-form-group-mahasiswa">
            <label>Status:</label>
            <input
              type="text"
              name="instansi"
              value={formData.instansi}
              onChange={handleChange}
              required
            />
          </div> */}
          {/* <div className="edit-form-group-mahasiswa">
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
          </div> */}
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

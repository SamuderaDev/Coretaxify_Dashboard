import React, { useState, useEffect } from "react";
import "./editPopupDosen.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";

const EditPopupDosen = ({ isOpen, onClose, dosen, onSave }) => {
  const [cookies, setCookie] = useCookies(["user"]);

  const [formData, setFormData] = useState({
    id: "",
    contractId: "",
    name: "",
    email: "",
    // instansi: "",
    // kuotaKelas: "",
    // kodeRegistrasi: "",
    // jumlahSiswa: "",
    // kodePembelian: "",
    // status: "",
  });

  useEffect(() => {
    if (dosen) {
      setFormData({
        id: dosen.id || "",
        contractId: dosen.contractId || "",
        name: dosen.name || "",
        email: dosen.email || "",
        // kuotaKelas: dosen.kuotaKelas || "",
        // kodeRegistrasi: dosen.kodeRegistrasi || "",
        // jumlahSiswa: dosen.jumlahSiswa || "",
        // kodePembelian: dosen.kodePembelian || "",
        // status: dosen.status || "",
      });
    }
  }, [dosen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (
      formData.name &&
      formData.email
      // formData.kuotaKelas &&
      // formData.status
    ) {
      // onSave({ ...dosen, ...formData });
      mutation.mutate();
      onClose();
    } else {
      alert("Harap isi semua bidang yang wajib!");
    }
  };
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
        RoutesApi.postAdmin.url + `/${dosen.id}`,
        // "http://127.0.0.1:8000/api/admin/users?intent=api.user.import.dosen",
        {
          contract_id: formData.contractId,
          name: formData.name,
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
          // params: {
          //   intent: RoutesApi.importDosenAdmin.intent,
          // },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      // window.location.reload();

      // window.location.href = "/" + role;
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="edit-popup-container-dosen">
      <div className="edit-popup-content-dosen">
        <div className="edit-popup-header-dosen">
          <h2>Edit Dosen</h2>
        </div>
        <form>
          <div className="edit-form-group-dosen">
            <label>Nama Dosen:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-dosen">
            <label>Instansi:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="edit-form-group-dosen">
            <label>Kuota Kelas:</label>
            <input
              type="number"
              name="kuotaKelas"
              value={formData.kuotaKelas}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-dosen">
            <label>Kode Registrasi:</label>
            <input
              type="text"
              name="kodeRegistrasi"
              value={formData.kodeRegistrasi}
              onChange={handleChange}
            />
          </div>
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
          </div> */}
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

export default EditPopupDosen;

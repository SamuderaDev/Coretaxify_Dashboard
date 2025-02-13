import React, { useState } from "react";
import "./tambahDosen.css";
import { IoMdDownload } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";

const TambahAdmin = ({ isOpen, onClose, onSave }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    mutation.mutate();
    // onSave(formData);
    // setFormData({
    //   nama: "",
    //   email: "",
    // });
    onClose();
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
      const data = await axios.post(
        RoutesApi.postAdmin.url,

        {
          name: formData.nama,
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: RoutesApi.postAdmin.intent,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      window.location.reload();

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
    <div className="kontrak-popup-overlay-admin">
      <div className="kontrak-popup-container-admin">
        <div className="kontrak-popup-header-admin">
          <h2>Tambah Data Admin</h2>
        </div>
        <form>
          <div className="kontrak-form-group-admin">
            <label>Nama Admin</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group-admin">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </form>
        <div className="kontrak-popup-actions-admin">
          <button className="kontrak-save-button-admin" onClick={handleSave}>
            Simpan
          </button>
          <button className="kontrak-cancel-button-admin" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahAdmin;

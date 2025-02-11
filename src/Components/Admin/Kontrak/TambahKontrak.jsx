import React, { useState } from "react";
import "./tambahKontrak.css";
import { IoReload } from "react-icons/io5";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { CookiesProvider, useCookies } from "react-cookie";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const TambahKontrak = ({ isOpen, onClose, onSave, UniData }) => {
  const [formData, setFormData] = useState({
    jenisKontrak: "",
    instansi: "",
    mahasiswa: "",
    periodeAwal: "",
    periodeAkhir: "",
    spt: "",
    bupot: "",
    faktur: "",
    kodePembelian: "",
    status: "",
  });
  const [cookies, setCookie] = useCookies(["user"]);

  const [lastNumbers, setLastNumbers] = useState({
    Lisensi: 0,
    Unit: 0,
    BNSP: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // onSave(formData);
    // setFormData({
    //   jenisKontrak: "",
    //   instansi: "",
    //   mahasiswa: "",
    //   periodeAwal: "",
    //   periodeAkhir: "",
    //   spt: "",
    //   bupot: "",
    //   faktur: "",
    //   kodePembelian: "",
    //   status: "",
    // });
    mutation.mutate();
    // onClose();
  };
  const mutation = useMutation({
    mutationFn: async () => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
      const response = await axios.get(`http://192.168.1.86/api/csrf-token`, {
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
        RoutesApi.contractAdmin,
        {
          //   university_id: 1,
          //   contract_type: "LICENSE",
          //   qty_student: 1,
          //   start_period: "2025-02-10",
          //   end_period: "2026-02-10",
          //   spt: 5,
          //   bupot: 5,
          //   faktur: 5,
          //   contract_code: "L-0001",

          university_id: parseInt(formData.instansi),
          contract_type: formData.jenisKontrak,
          qty_student: parseInt(formData.mahasiswa),
          start_period: formData.periodeAwal,
          end_period: formData.periodeAkhir,
          spt: parseInt(formData.spt),
          bupot: parseInt(formData.bupot),
          faktur: parseInt(formData.faktur),
          contract_code: formData.kodePembelian,
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

  const generateKodePembelian = () => {
    const jenis = formData.jenisKontrak;
    if (!jenis) {
      alert("Silakan pilih Jenis Kontrak terlebih dahulu.");
      return;
    }

    let prefix = "";
    switch (jenis) {
      case "Lisensi":
        prefix = "L";
        break;
      case "Unit":
        prefix = "U";
        break;
      case "BNSP":
        prefix = "BNSP";
        break;
      default:
        return;
    }

    const nextNumber = lastNumbers[jenis] + 1;
    const formattedNumber = String(nextNumber).padStart(4, "0");
    setLastNumbers({ ...lastNumbers, [jenis]: nextNumber });
    setFormData({ ...formData, kodePembelian: `${prefix}-${formattedNumber}` });
  };

  if (!isOpen) return null;

  return (
    <div className="kontrak-popup-overlay">
      <div className="kontrak-popup-container">
        <h2>Tambah Data Kontrak</h2>
        <form>
          <div className="kontrak-form-group">
            <label>Jenis Kontrak</label>
            <select
              name="jenisKontrak"
              value={formData.jenisKontrak}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Jenis Kontrak</option>
              <option value="LICENSE">Lisensi</option>
              <option value="UNIT">Unit</option>
              <option value="BNSP">BNSP</option>
            </select>
          </div>
          <div className="kontrak-form-group">
            <label>Instansi</label>
            <select
              name="instansi"
              value={formData.instansi}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Instansi</option>
              {UniData.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {/* <input type="text" name="instansi" value={formData.instansi} onChange={handleChange} required /> */}
          </div>
          <div className="kontrak-form-group">
            <label>Soal</label>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="" value="option-one" id="option-one" />
                <Label htmlFor="option-one">Ya</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Tidak</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="kontrak-form-group">
            <label>Jumlah Mahasiswa</label>
            <input
              type="number"
              name="mahasiswa"
              value={formData.mahasiswa}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group">
            <label>Periode Awal</label>
            <input
              type="date"
              name="periodeAwal"
              value={formData.periodeAwal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group">
            <label>Periode Akhir</label>
            <input
              type="date"
              name="periodeAkhir"
              value={formData.periodeAkhir}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group">
            <label>SPT</label>
            <input
              type="number"
              name="spt"
              value={formData.spt}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group">
            <label>Bupot</label>
            <input
              type="number"
              name="bupot"
              value={formData.bupot}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group">
            <label>Faktur</label>
            <input
              type="number"
              name="faktur"
              value={formData.faktur}
              onChange={handleChange}
              required
            />
          </div>

          {/* Kode Pembelian dengan Auto Generate */}
          <div className="kontrak-form-group">
            <label>Kode Pembelian</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                name="kodePembelian"
                value={formData.kodePembelian}
                onChange={handleChange}
                required
                readOnly
              />
              <button
                type="button"
                className="auto-generate-button"
                onClick={generateKodePembelian}
              >
                <IoReload />
              </button>
            </div>
          </div>

          <div className="kontrak-form-group">
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

        <div className="kontrak-popup-actions">
          <button className="kontrak-save-button" onClick={handleSave}>
            Simpan
          </button>
          <button className="kontrak-cancel-button" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahKontrak;

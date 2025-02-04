import React, { useState } from "react";
import "./tambahKontrak.css";
import { IoReload } from "react-icons/io5";

const TambahKontrak = ({ isOpen, onClose, onSave }) => {
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
                    onSave(formData);
                    setFormData({
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
                    onClose();
          };

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
                                                            <select name="jenisKontrak" value={formData.jenisKontrak} onChange={handleChange} required>
                                                                      <option value="">Pilih Jenis Kontrak</option>
                                                                      <option value="Lisensi">Lisensi</option>
                                                                      <option value="Unit">Unit</option>
                                                                      <option value="BNSP">BNSP</option>
                                                            </select>
                                                  </div>
                                                  <div className="kontrak-form-group">
                                                            <label>Instansi</label>
                                                            <input type="text" name="instansi" value={formData.instansi} onChange={handleChange} required />
                                                  </div>
                                                  <div className="kontrak-form-group">
                                                            <label>Jumlah Mahasiswa</label>
                                                            <input type="number" name="mahasiswa" value={formData.mahasiswa} onChange={handleChange} required />
                                                  </div>
                                                  <div className="kontrak-form-group">
                                                            <label>Periode Awal</label>
                                                            <input type="date" name="periodeAwal" value={formData.periodeAwal} onChange={handleChange} required />
                                                  </div>
                                                  <div className="kontrak-form-group">
                                                            <label>Periode Akhir</label>
                                                            <input type="date" name="periodeAkhir" value={formData.periodeAkhir} onChange={handleChange} required />
                                                  </div>
                                                  <div className="kontrak-form-group">
                                                            <label>SPT</label>
                                                            <input type="number" name="spt" value={formData.spt} onChange={handleChange} required />
                                                  </div>
                                                  <div className="kontrak-form-group">
                                                            <label>Bupot</label>
                                                            <input type="number" name="bupot" value={formData.bupot} onChange={handleChange} required />
                                                  </div>
                                                  <div className="kontrak-form-group">
                                                            <label>Faktur</label>
                                                            <input type="number" name="faktur" value={formData.faktur} onChange={handleChange} required />
                                                  </div>

                                                  {/* Kode Pembelian dengan Auto Generate */}
                                                  <div className="kontrak-form-group">
                                                            <label>Kode Pembelian</label>
                                                            <div style={{ display: "flex", gap: "10px" }}>
                                                                      <input type="text" name="kodePembelian" value={formData.kodePembelian} onChange={handleChange} required readOnly />
                                                                      <button type="button" className="auto-generate-button" onClick={generateKodePembelian}>
                                                                                <IoReload /> 
                                                                      </button>
                                                            </div>
                                                  </div>

                                                  <div className="kontrak-form-group">
                                                            <label>Status</label>
                                                            <select name="status" value={formData.status} onChange={handleChange} required>
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

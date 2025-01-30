import React, { useState } from "react";
import "./tambahKontrak.css";

const TambahKontrak = ({ isOpen, onClose, onSave }) => {
          const [formData, setFormData] = useState({
                    jenisKontrak: "",
                    instansi: "",
                    mahasiswa: "",
                    periodeAwal: "",
                    periodeAkhir: "",
                    kodePembelian: "",
                    status: "",
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
                              kodePembelian: "",
                              status: "",
                    });
                    onClose();
          };

          if (!isOpen) return null;

          return (
                    <div className="kontrak-popup-overlay">
                              <div className="kontrak-popup-container">
                                        <h2>Tambah Data Kontrak</h2>
                                        <form>
                                                  <div className="kontrak-form-group">
                                                            <label>Jenis Kontrak</label>
                                                            <input
                                                                      type="text"
                                                                      name="jenisKontrak"
                                                                      value={formData.jenisKontrak}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="kontrak-form-group">
                                                            <label>Instansi</label>
                                                            <input
                                                                      type="text"
                                                                      name="instansi"
                                                                      value={formData.instansi}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
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
                                                            <label>Kode Pembelian</label>
                                                            <input
                                                                      type="text"
                                                                      name="kodePembelian"
                                                                      value={formData.kodePembelian}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
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

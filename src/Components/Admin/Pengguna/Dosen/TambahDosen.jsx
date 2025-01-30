import React, { useState } from "react";
import "./tambahDosen.css";
import { IoMdDownload } from "react-icons/io";

const TambahDosen = ({ isOpen, onClose, onSave }) => {
          const [formData, setFormData] = useState({
                    namaDosen: "",
                    instansi: "",
                    kuotaKelas: "",
                    kodeRegistrasi: "",
                    jumlahSiswa: "",
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
                              namaDosen: "",
                              instansi: "",
                              kuotaKelas: "",
                              kodeRegistrasi: "",
                              jumlahSiswa: "",
                              kodePembelian: "",
                              status: "",
                    });
                    onClose();
          };

          if (!isOpen) return null;

          return (
                    <div className="kontrak-popup-overlay-dosen">
                              <div className="kontrak-popup-container-dosen">
                                        <div className="kontrak-popup-header-dosen">
                                                  <h2>Tambah Data Dosen</h2>
                                                  <div className="kontrak-popup-import-actions-dosen">
                                                            <button className="kontrak-import-button-dosen">
                                                                      <IoMdDownload className="kontrak-import-icon-dosen" />
                                                                      Import
                                                            </button>
                                                  </div>
                                        </div>
                                        <form>
                                                  <div className="kontrak-form-group-dosen">
                                                            <label>Nama Dosen</label>
                                                            <input
                                                                      type="text"
                                                                      name="namaDosen"
                                                                      value={formData.namaDosen}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="kontrak-form-group-dosen">
                                                            <label>Instansi</label>
                                                            <input
                                                                      type="text"
                                                                      name="instansi"
                                                                      value={formData.instansi}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="kontrak-form-group-dosen">
                                                            <label>Kuota Kelas</label>
                                                            <input
                                                                      type="number"
                                                                      name="kuotaKelas"
                                                                      value={formData.kuotaKelas}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="kontrak-form-group-dosen">
                                                            <label>Kode Registrasi</label>
                                                            <input
                                                                      type="text"
                                                                      name="kodeRegistrasi"
                                                                      value={formData.kodeRegistrasi}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="kontrak-form-group-dosen">
                                                            <label>Jumlah Siswa</label>
                                                            <input
                                                                      type="number"
                                                                      name="jumlahSiswa"
                                                                      value={formData.jumlahSiswa}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="kontrak-form-group-dosen">
                                                            <label>Kode Pembelian</label>
                                                            <input
                                                                      type="text"
                                                                      name="kodePembelian"
                                                                      value={formData.kodePembelian}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="kontrak-form-group-dosen">
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
                                        <div className="kontrak-popup-actions-dosen">
                                                  <button className="kontrak-save-button-dosen" onClick={handleSave}>
                                                            Simpan
                                                  </button>
                                                  <button className="kontrak-cancel-button-dosen" onClick={onClose}>
                                                            Batal
                                                  </button>
                                        </div>
                              </div>
                    </div>

          );

};

export default TambahDosen;

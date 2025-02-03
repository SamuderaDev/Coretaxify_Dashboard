import React, { useState, useEffect } from "react";
import "./editPopupKelas.css";

const EditPopupKelas = ({ isOpen, onClose, kelas, onSave }) => {
          const [formData, setFormData] = useState({
                    kelas: "",
                    instansi: "",
                    kodeRegistrasi: "",
                    status: "",
          });

          useEffect(() => {
                    if (kelas) {
                              setFormData({
                                        kelas: kelas.kelas || "",
                                        instansi: kelas.instansi || "",
                                        kodeRegistrasi: kelas.kodeRegistrasi || "",
                                        status: kelas.status || "",
                              });
                    }
          }, [kelas]);

          const handleChange = (e) => {
                    const { name, value } = e.target;
                    setFormData({ ...formData, [name]: value });
          };

          const handleSave = () => {
                    if (formData.kelas && formData.instansi && formData.kodeRegistrasi && formData.status) {
                              onSave({ ...kelas, ...formData }); 
                              onClose(); 
                    } else {
                              alert("Harap isi semua bidang!");
                    }
          };

          if (!isOpen) return null; 

          return (
                    <div className="edit-popup-container-kelas">
                              <div className="edit-popup-content-kelas">
                                        <div className="edit-popup-header-kelas">
                                                  <h2>Edit Kelas</h2>
                                        </div>
                                        <form>
                                                  <div className="edit-form-group-kelas">
                                                            <label>Kelas:</label>
                                                            <input
                                                                      type="text"
                                                                      name="kelas"
                                                                      value={formData.kelas}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="edit-form-group-kelas">
                                                            <label>Instansi</label>
                                                            <input
                                                                      type="text"
                                                                      name="instansi"
                                                                      value={formData.instansi}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="edit-form-group-kelas">
                                                            <label>Kode Registrasi:</label>
                                                            <input
                                                                      type="text"
                                                                      name="kodeRegistrasi"
                                                                      value={formData.kodeRegistrasi}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="edit-form-group-kelas">
                                                            <label>Status:</label>
                                                            <select name="status" value={formData.status} onChange={handleChange} required>
                                                                      <option value="">Pilih Status</option>
                                                                      <option value="Active">Active</option>
                                                                      <option value="Expired">Expired</option>
                                                            </select>
                                                  </div>
                                        </form>
                                        <div className="edit-popup-actions-admin">
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

export default EditPopupKelas;

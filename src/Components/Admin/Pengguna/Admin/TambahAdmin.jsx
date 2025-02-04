import React, { useState } from "react";
import "./tambahDosen.css";
import { IoMdDownload } from "react-icons/io";

const TambahAdmin = ({ isOpen, onClose, onSave }) => {
          const [formData, setFormData] = useState({
                    nama: "",
                    email: "",
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
                              email: "",
                              status: "",
                    });
                    onClose();
          };

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
                                                                      value={formData.namaDosen}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="kontrak-form-group-admin">
                                                            <label>Email</label>
                                                            <input
                                                                      type="text"
                                                                      name="email"
                                                                      value={formData.namaDosen}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="kontrak-form-group-admin">
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

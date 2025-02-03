import React, { useState, useEffect } from "react";
import "./editPopupAdmin.css";

const EditPopupAdmin = ({ isOpen, onClose, admin, onSave }) => {
          const [formData, setFormData] = useState({
                    namaAdmin: "",
                    email: "",
                    status: "",
          });

          useEffect(() => {
                    if (admin) {
                              setFormData({
                                        namaAdmin: admin.namaAdmin || "",
                                        email: admin.email || "",
                                        status: admin.status || "",
                              });
                    }
          }, [admin]);

          const handleChange = (e) => {
                    const { name, value } = e.target;
                    setFormData({ ...formData, [name]: value });
          };

          const handleSave = () => {
                    if (formData.namaAdmin && formData.email && formData.status) {
                              onSave({ ...admin, ...formData }); 
                              onClose(); 
                    } else {
                              alert("Harap isi semua bidang!");
                    }
          };

          if (!isOpen) return null; 

          return (
                    <div className="edit-popup-container-admin">
                              <div className="edit-popup-content-admin">
                                        <div className="edit-popup-header-admin">
                                                  <h2>Edit Admin</h2>
                                        </div>
                                        <form>
                                                  <div className="edit-form-group-admin">
                                                            <label>Nama Admin:</label>
                                                            <input
                                                                      type="text"
                                                                      name="namaAdmin"
                                                                      value={formData.namaAdmin}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="edit-form-group-admin">
                                                            <label>Email:</label>
                                                            <input
                                                                      type="email"
                                                                      name="email"
                                                                      value={formData.email}
                                                                      onChange={handleChange}
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="edit-form-group-admin">
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

export default EditPopupAdmin;

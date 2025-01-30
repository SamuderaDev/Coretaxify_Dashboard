import React, { useState } from 'react';
import './forgot_password.css';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import CTaxifyLogo from '../../Assets/image/1.png';

const ForgotPopup = ({ isOpen, onClose, openRegisterPopup }) => {
          const [showPassword, setShowPassword] = useState(false);

          if (!isOpen) return null;

          return (
                    <div className={`login-popup-overlay ${isOpen ? 'show' : ''}`}>
                              <div className={`login-popup ${isOpen ? 'show' : ''}`}>
                                        <img src={CTaxifyLogo} alt="CTaxify Logo" className="logo" />
                                        <p className="tagline">bergabunglah bersama kami untuk menjadi insan yang taat pajak</p>
                                        <form className="login-form">
                                                  <label htmlFor="email">Email Lupa Password</label>
                                                  <input type="text" id="email" placeholder="Enter your email" />
                                                  <button type="submit" className="login-button">Confirm</button>
                                        </form>
                                        <p className="register-text">
                                                  Belum Punya Akun ? <a href="#" onClick={openRegisterPopup}>Daftar Disini</a> {/* Menampilkan RegisterPopup */}
                                        </p>

                                        <button className="close-button" onClick={onClose}>
                                                  ✖
                                        </button>
                              </div>
                    </div>
          );
};

export default ForgotPopup;

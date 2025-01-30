import React, { useState } from 'react';
import './login.css';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import CTaxifyLogo from '../../Assets/image/1.png';
import ForgotPopup from '../Forgot_Password/Forgot_password';

const LoginPopup = ({ isOpen, onClose, openRegisterPopup }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPopup, setShowForgotPopup] = useState(false);

  const openForgotPopup = () => {
    setShowForgotPopup(true);
    setShowLoginPopup(false);
  };

  const openLoginPopup = () => {
    setShowLoginPopup(true);
    setShowForgotPopup(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={`login-popup-overlay ${isOpen ? 'show' : ''}`}>
        <div className={`login-popup ${isOpen ? 'show' : ''}`}>
          <img src={CTaxifyLogo} alt="CTaxify Logo" className="logo" />
          <p className="tagline">Mari gabung dengan kami menjadi masa depan sadar pajak</p>
          <form className="login-form">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" />

            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            <div className="forgot-password">
              <a href="#" onClick={openForgotPopup}>Forgot Password ?</a>
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="register-text">
            Belum Punya Akun ? <a href="#" onClick={openRegisterPopup}>Daftar Disini</a> {/* Menampilkan RegisterPopup */}
          </p>

          <button className="close-button" onClick={onClose}>
            ✖
          </button>
        </div>
      </div>
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} openF  orgotPopup={openForgotPopup} />
      {/* Pop-up Forgot Password */}
      <ForgotPopup isOpen={showForgotPopup} onClose={() => setShowForgotPopup(false)} openLoginPopup={openLoginPopup} />
    </>
  );
};

export default LoginPopup;

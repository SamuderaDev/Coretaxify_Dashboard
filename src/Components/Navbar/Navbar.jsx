import React, { useState, useEffect } from 'react';
import './navbar.css';
import { TbReceiptTax } from "react-icons/tb";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import IconLogo from '../../Assets/image/5.png';
import LoginPopup from '../Login/Login';
import RegisterPopup from '../Register/Register';
import ForgotPopup from '../Forgot_Password/Forgot_password';

const Navbar = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("navBar");
  const [transparent, setTransparent] = useState("header activeHeader");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showForgotPopup, setShowForgotPopup] = useState(false);

  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  const removeNav = () => {
    setActive("navBar");
  };

  useEffect(() => {
    const addBg = () => {
      setTransparent("header activeHeader");
    };
    window.addEventListener("scroll", addBg);

    return () => {
      window.removeEventListener("scroll", addBg);
    };
  }, []);

  // Fungsi untuk membuka register popup, dan menutup login popup
  const openRegisterPopup = () => {
    setShowRegisterPopup(true);
    setShowLoginPopup(false); 
    setShowForgotPopup(false); // Menutup LoginPopup jika RegisterPopup dibuka
  };

  // Fungsi untuk membuka login popup, dan menutup register popup
  const openLoginPopup = () => {
    setShowLoginPopup(true);
    setShowRegisterPopup(false);
    setShowForgotPopup(false);  // Menutup RegisterPopup jika LoginPopup dibuka
  };

  return (
    <>
      <section className="navBarSection">
        <div className={transparent}>
          <div className="logoDiv">
            <a href="/" className="logo">
              <h1 className="flex">
                <img src={IconLogo} alt="logo" className="icon" />
                Coretaxify
              </h1>
            </a>
          </div>

          <div className={active}>
            <ul className="navLists flex">
              <li className="navItem">
                <a href="/" className="navLink">
                  Home
                </a>
              </li>
              <li className="navItem">
                <a onClick={() => navigate("/categories")} className="navLink">
                  Produk
                </a>
              </li>
              <li className="navItem">
                <a onClick={() => navigate("/package")} className="navLink">
                  Fitur
                </a>
              </li>
              <li className="navItem">
                <a onClick={() => navigate("/benefit")} className="navLink">
                  Partnership
                </a>
              </li>
              <li className="navItem">
                <a onClick={() => navigate("/blog")} className="navLink">
                  Artikel
                </a>
              </li>
              <li className="navItem">
                <a onClick={() => navigate("/resource")} className="navLink">
                  Resource
                </a>
              </li>
              <li className="navItem navBtns">
                <button
                  className="signInBtn"
                  onClick={openLoginPopup} // Panggil fungsi untuk membuka login popup
                >
                  Login
                </button>
                <button 
                  className="signUpBtn"
                  onClick={openRegisterPopup} // Panggil fungsi untuk membuka register popup
                >
                  Register
                </button>
              </li>
            </ul>

            <div onClick={removeNav} className="closeNavbar">
              <AiFillCloseCircle className="icon" />
            </div>
          </div>

          <div onClick={showNav} className="toggleNavbar">
            <HiOutlineBars3 className="icon" />
          </div>
        </div>
      </section>

      {/* Pop-up Login */}
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} openRegisterPopup={openRegisterPopup} />
        
      {/* Pop-up Register */} 
      <RegisterPopup isOpen={showRegisterPopup} onClose={() => setShowRegisterPopup(false)} openLoginPopup={openLoginPopup}/>

      {/* Pop-up Forgot Password */}
      <ForgotPopup isOpen={showForgotPopup} onClose={() => setShowForgotPopup(false)} openLoginPopup={openLoginPopup} />
    </>
  );
};

export default Navbar;

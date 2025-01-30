import React from 'react';
import './footer.css';
import { FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" >
      <div className="footer-container">
        <div className="footer-left">
          <p>
            Alamat: Graha EMG Jl. Tumenggung Suryo No. 32-34, Lantai 3, Bunulrejo,<br /> 
            Kec. Blimbing, Kota Malang, Jawa Timur - 65123
          </p>
          <p>
            © 2024 Coretaxify by Cerdas Pajak. Seluruh Hak Dilindungi Undang-Undang
          </p>
        </div>
        <div className="footer-right">
          <h3>Sosial Media & Kontak</h3>
          <ul>
            <li>
              <FaInstagram className="icon" /> Kosongan
            </li>
            <li>
              <FaYoutube className="icon" /> Kosongan
            </li>
            <li>
              <FaWhatsapp className="icon" /> Kosongan
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

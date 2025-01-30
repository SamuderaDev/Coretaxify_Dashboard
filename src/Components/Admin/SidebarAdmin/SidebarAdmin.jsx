import React, { useState } from "react";
import "./sidebar.css";
import {
          FaBars,
          FaBox,
          FaUsers,
          FaLaptopCode,
          FaChevronDown,
          FaUserCircle,
} from "react-icons/fa";
import { GiPieChart } from "react-icons/gi";
import Logo from "../../../Assets/image/7.png"; // Pastikan ini menunjuk ke file logo Anda.
import ProfileIcon from "../../../Assets/image/wulan.png"; // Gambar untuk profile.

const SidebarAdmin = () => {
          const [isOpen, setIsOpen] = useState(true);
          const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk dropdown
          const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // State untuk profile dropdown

          const toggleSidebar = () => {
                    setIsOpen(!isOpen);
          };

          const toggleDropdown = () => {
                    setIsDropdownOpen(!isDropdownOpen);
          };

          const toggleProfileDropdown = () => {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
          };

          return (
                    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
                              <div className="admin-sidebar-header">
                                        {isOpen && <img src={Logo} alt="CTaxify Logo" className="sidebar-logo" />}
                                        <FaBars className="menu-toggle" onClick={toggleSidebar} />
                              </div>
                              <ul className="sidebar-menu">
                                        <li className="menu-item" onClick={() => { window.location.href = "/admin"; }}>
                                                  <GiPieChart className="menu-icon" />
                                                  {isOpen && <span>Dashboard</span>}
                                        </li>
                                        <li className="menu-item" onClick={() => { window.location.href = "/admin/kontrak"; }}>
                                                  <FaBox className="menu-icon" />
                                                  {isOpen && <span>Kontrak</span>}
                                        </li>
                                        <li className="menu-item">
                                                  <FaLaptopCode className="menu-icon" />
                                                  {isOpen && <span>Praktikum</span>}
                                        </li>
                                        <li className="menu-item dropdown">
                                                  <div className="dropdown-header" onClick={toggleDropdown}>
                                                  <FaUsers className="menu-icon" />
                                                  {isOpen && <>
                                                  <span>Data Pengguna</span>
                                                  <FaChevronDown className={`dropdown-icon ${isDropdownOpen ? "rotate" : ""}`} />
                                                  </>}
                                                  </div>
                                                  {isDropdownOpen && isOpen && (
                                                            <ul className="dropdown-menu" style={{ zIndex: "1" }}>
                                                                      <li className="dropdown-item" onClick={() => { window.location.href = "/admin/edit-mahasiswa"; }}>Mahasiswa</li>
                                                                      <li className="dropdown-item" onClick={() => { window.location.href = "/admin/edit-dosen"; }}>Dosen</li>
                                                                      <li className="dropdown-item" onClick={() => { window.location.href = "/admin/edit-admin"; }}>Admin</li>
                                                            </ul>
                                                  )}
                                        </li>
                                        <li className="menu-item dropdown">
                                                  <div className="dropdown-header" onClick={toggleDropdown}>
                                                            <FaLaptopCode className="menu-icon" />
                                                            {isOpen && (
                                                                      <>
                                                                                <span>Landing Page</span>
                                                                                <FaChevronDown className={`dropdown-icon ${isDropdownOpen ? "rotate" : ""}`} />
                                                                      </>
                                                            )}
                                                  </div>
                                                  {isDropdownOpen && isOpen && (
                                                            <ul className="dropdown-menu">
                                                                      <li className="dropdown-item">Artikel</li>
                                                                      <li className="dropdown-item">Testimoni</li>
                                                            </ul>
                                                  )}
                                        </li>
                              </ul>

                              {/* Profile Section */}
                              <div className="sidebar-profile">
                                        <div className="profile-header" onClick={toggleProfileDropdown}>
                                                  <img src={ProfileIcon} alt="Profile" className="profile-icon" />
                                                  {isOpen && (
                                                            <>
                                                                      <span>Profile</span>
                                                                      <FaChevronDown className={`dropdown-icon ${isProfileDropdownOpen ? "rotate" : ""}`} />
                                                            </>
                                                  )}
                                        </div>
                                        {isProfileDropdownOpen && isOpen && (
                                                  <ul className="profile-dropdown-menu">
                                                            <li className="dropdown-item" onClick={() => { window.location.href = "/edit-profile"; }}>Edit Profile</li>
                                                            <li className="dropdown-item" onClick={() => { window.location.href = "/logout"; }}>Logout</li>
                                                  </ul>
                                        )}
                              </div>
                    </div>
          );
};

export default SidebarAdmin;


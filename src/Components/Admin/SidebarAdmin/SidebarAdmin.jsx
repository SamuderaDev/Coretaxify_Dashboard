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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        {isOpen && (
          <img
            src={Logo}
            alt="CTaxify Logo"
            className="sidebar-logo"
            onClick={toggleSidebar}
          />
        )}
        <FaBars
          className={`menu-toggle w-full pr-6 mt-2 ${isOpen ? "hidden" : ""} `}
          onClick={toggleSidebar}
        />
      </div>
      <ul className="sidebar-menu">
        <li
          className="menu-item"
          onClick={() => {
            window.location.href = "/admin";
          }}
        >
          <GiPieChart className="menu-icon" />
          {isOpen && <span>Dashboard</span>}
        </li>
        <li
          className="menu-item"
          onClick={() => {
            window.location.href = "/admin/kontrak";
          }}
        >
          <FaBox className="menu-icon" />
          {isOpen && <span>Kontrak</span>}
        </li>
        <li className="menu-item">
          <FaLaptopCode className="menu-icon" />
          {isOpen && <span>Praktikum</span>}
        </li>
        <Accordion type="single" collapsible className="pl-4">
          <AccordionItem
            value="item-1"
            className="border-none hover:no-underline"
          >
            <AccordionTrigger className="w-full ">
              <div className="flex">
                <FaUsers className="menu-icon" />
                <span className={`text-[16px] ${isOpen ? "" : "hidden"}`}>
                  Data Pengguna
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className={`${isOpen ? "" : "hidden"}`}>
              <ul className="">
                <li
                  className="dropdown-item"
                  onClick={() => {
                    window.location.href = "/admin/edit-mahasiswa";
                  }}
                >
                  Mahasiswa
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    window.location.href = "/admin/edit-dosen";
                  }}
                >
                  Dosen
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    window.location.href = "/admin/edit-admin";
                  }}
                >
                  Admin
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="pl-4">
          <AccordionItem
            value="item-1"
            className="border-none hover:no-underline"
          >
            <AccordionTrigger className="w-full ">
              <div className="flex">
                <FaLaptopCode className="menu-icon" />
                <span className={`text-[16px] ${isOpen ? "" : "hidden "}`}>
                  Landing Page
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className={`${isOpen ? "" : "hidden"}`}>
              <ul className="">
                <li
                  className="dropdown-item"
                  onClick={() => {
                    window.location.href = "/admin/edit-artikel";
                  }}
                >
                  Edit Artikel
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    window.location.href = "/edit-profile";
                  }}
                >
                  Edit Profile
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    window.location.href = "/logout";
                  }}
                >
                  Logout
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ul>

      {/* Profile Section */}
      <div className="sidebar-profile">
        <div className="profile-header" onClick={toggleProfileDropdown}>
          <img src={ProfileIcon} alt="Profile" className="profile-icon" />
          {isOpen && (
            <>
              <span>Profile</span>
              <FaChevronDown
                className={`dropdown-icon ${
                  isProfileDropdownOpen ? "rotate" : ""
                }`}
              />
            </>
          )}
        </div>
        {isProfileDropdownOpen && isOpen && (
          <ul className="profile-dropdown-menu">
            <li
              className="dropdown-item"
              onClick={() => {
                window.location.href = "/edit-profile";
              }}
            >
              Edit Profile
            </li>
            <li
              className="dropdown-item"
              onClick={() => {
                window.location.href = "/logout";
              }}
            >
              Logout
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidebarAdmin;

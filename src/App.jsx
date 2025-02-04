import { useEffect, useState } from "react";
import "./App.css";
import SidebarAdmin from "./Components/Admin/SidebarAdmin/SidebarAdmin";
import DashboardAdmin from "./Components/Admin/Dashboard/DashboardAdmin";
import Kontrak from "./Components/Admin/Kontrak/Kontrak";
import EditDosen from "./Components/Admin/Pengguna/Dosen/EditDosen";
import EditMahasiswa from "./Components/Admin/Pengguna/Mahasiswa/EditMahasiswa";
import EditAdmin from "./Components/Admin/Pengguna/Admin/EditAdmin";
import EditKelas from "./Components/Admin/Pengguna/Kelas/EditKelas";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Artikel from "./Components/Admin/LandingPage/EditArtikel";
import EditArtikel from "./Components/Admin/LandingPage/EditArtikel";
import EditUlasan from "./Components/Admin/LandingPage/EditUlasan";
import Praktikum from "./Components/Admin/Praktikum/Praktikum";
import Ujian from "./Components/Admin/Praktikum/Ujian";
import UploadSoal from "./Components/Admin/Praktikum/UploadSoal";
import KontrakBackup from "./Components/Admin/Kontrak/KontrakBackup";
import PraktikumBackup from "./Components/Admin/Praktikum/PraktikumBackup";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return loading ? (
    <div className="loading">
      <ClipLoader color="#7502B5" size={50} />
    </div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DashboardAdmin />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/kontrak"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <Kontrak />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-dosen"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditDosen />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/upload-soal"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <UploadSoal></UploadSoal>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/ujian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <Ujian></Ujian>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-admin"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditAdmin />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-kelas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditKelas />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-mahasiswa"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditMahasiswa />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-artikel"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditArtikel></EditArtikel>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-ulasan"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditUlasan></EditUlasan>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/kontrak-backup"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <KontrakBackup></KontrakBackup>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/praktikum-backup"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <PraktikumBackup></PraktikumBackup>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

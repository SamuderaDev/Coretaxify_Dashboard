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
import Artikel from "./Components/Admin/LandingPage/Artikel";
import EditArtikel from "./Components/Admin/LandingPage/Artikel";

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
      </Routes>
    </Router>
  );
};

export default App;

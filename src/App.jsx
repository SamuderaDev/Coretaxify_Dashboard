import { useEffect, useState } from "react";
import "./App.css";
import SidebarAdmin from "./Components/Admin/SidebarAdmin/SidebarAdmin";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import ResetPassword from "./Components/Auth/ResetPassword/ResetPassword";
import DashboardAdmin from "./Components/Admin/Dashboard/DashboardAdmin";
import Kontrak from "./Components/Admin/Kontrak/Kontrak";
import DashboardDosen from "./Components/Dosen/Dashboard/DashboardDosen";
import DosenTugas from "./Components/Dosen/Kelas/DosenKelas";
import DosenCardKelas from "./Components/Dosen/Kelas/DosenCardKelas";
import UjianDosen from "./Components/Dosen/Ujian/UjianDosen";
import EditDosen from "./Components/Admin/Pengguna/Dosen/EditDosen";
import PenilaianDosen from "./Components/Dosen/Penilaian/PenilaianDosen";
import DetailPenilaian from "./Components/Dosen/Penilaian/DetailPenilaianDosen";
import DetailTugasPenilaianDosen from "./Components/Dosen/Penilaian/DetailTugasPenilaianDosen";
import EditMahasiswa from "./Components/Admin/Pengguna/Mahasiswa/EditMahasiswa";
import EditAdmin from "./Components/Admin/Pengguna/Admin/EditAdmin";
import EditKelas from "./Components/Admin/Pengguna/Kelas/EditKelas";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import EditArtikel from "./Components/Admin/LandingPage/EditArtikel";
import EditUlasan from "./Components/Admin/LandingPage/EditUlasan";
import Praktikum from "./Components/Admin/Praktikum/Praktikum";
import Ujian from "./Components/Admin/Praktikum/Ujian";
import UploadSoal from "./Components/Admin/Praktikum/UploadSoal";
import KontrakBackup from "./Components/Admin/Kontrak/KontrakBackup";
import PraktikumBackup from "./Components/Admin/Praktikum/PraktikumBackup";
import MahsiswaKelas from "./components/Mahasiswa/Kelas/MahasiswaKelas-backup";
import MahasiswaPraktikum from "./Components/Mahasiswa/Praktikum/MahasiswaPraktikum";
import MahasiswaUjian from "./Components/Mahasiswa/Praktikum/MahasiswaUjian";
import EditPengajar from "./Components/AdminPsc/Pengguna/Pengajar/EditPengajar";
import EditKelasPsc from "./Components/AdminPsc/Pengguna/Kelas/EditKelasPsc";
import UjianPsc from "./Components/AdminPsc/Pengguna/Praktikum/UjianPsc";
import EditMahasiswaPsc from "./Components/AdminPsc/Pengguna/Mahasiswa/EditMahasiswaPsc";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import DosenKelas from "./Components/Dosen/Kelas/DosenKelas";
import MahasiswaKelas from "./components/Mahasiswa/Kelas/MahasiswaKelas";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);
  return loading ? (
    <div className="loading">
      <ClipLoader color="#7502B5" size={50} />
    </div>
  ) : (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <div className="admin-layout">
                <SidebarAdmin />
                <div className="admin-content">
                  <DashboardAdmin />
                </div>
              </div>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/kontrak"
          element={
            <ProtectedRoutes>
              <div className="admin-layout">
                <SidebarAdmin />
                <div className="admin-content">
                  <Kontrak />
                </div>
              </div>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/edit-dosen"
          element={
            <ProtectedRoutes>
              <div className="admin-layout">
                <SidebarAdmin />
                <div className="admin-content">
                  <EditDosen />
                </div>
              </div>
            </ProtectedRoutes>
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
          path="/admin/praktikum"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <Praktikum></Praktikum>
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
        <Route
          path="/admin/praktikum"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <Praktikum></Praktikum>
              </div>
            </div>
          }
        />
        <Route
          path="/dosen"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DashboardDosen />
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/kelas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DosenKelas></DosenKelas>
                {/* <DosenCardKelas></DosenCardKelas> */}
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/kelas/tugas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DosenTugas />
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/penilaian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <PenilaianDosen></PenilaianDosen>
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/penilaian/detail-tugas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DetailTugasPenilaianDosen></DetailTugasPenilaianDosen>
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/penilaian/detail-tugas/detail-penilaian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DetailPenilaian></DetailPenilaian>
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/ujian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <UjianDosen></UjianDosen>
              </div>
            </div>
          }
        />
        <Route
          path="/mahasiswa/kelas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <MahasiswaKelas></MahasiswaKelas>
              </div>
            </div>
          }
        />
        <Route
          path="/mahasiswa"
          element={<Navigate to="/mahasiswa/kelas" replace />}
        />
        <Route
          path="/mahasiswa/praktikum"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <MahasiswaPraktikum></MahasiswaPraktikum>
              </div>
            </div>
          }
        />
        <Route
          path="/mahasiswa/ujian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <MahasiswaUjian></MahasiswaUjian>
              </div>
            </div>
          }
        />
        <Route
          path="/admin-psc/edit-pengajar"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditPengajar></EditPengajar>
              </div>
            </div>
          }
        />
        <Route
          path="/admin-psc/edit-kelas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditKelasPsc></EditKelasPsc>
              </div>
            </div>
          }
        />
        <Route
          path="/admin-psc/edit-ujian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <UjianPsc></UjianPsc>
              </div>
            </div>
          }
        />
        <Route
          path="/admin-psc/edit-mahasiswa"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditMahasiswaPsc></EditMahasiswaPsc>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

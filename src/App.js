import { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Fitur from './Components/Fitur/Fitur';
import Benefit from './Components/Benefit/Benefit';
import Articles from './Components/Articles/Articles';
import Partner from './Components/Partner/Partner';
import TotalUser from './Components/TotalUser/TotalUser';
import Testimoni from './Components/Testimoni/Testimoni';
import SidebarAdmin from './Components/Admin/SidebarAdmin/SidebarAdmin';
import DashboardAdmin from './Components/Admin/Dashboard/DashboardAdmin';
import Kontrak from './Components/Admin/Kontrak/Kontrak';
import EditDosen from './Components/Admin/Pengguna/Dosen/EditDosen';
import EditMahasiswa from './Components/Admin/Pengguna/Mahasiswa/EditMahasiswa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    loading ? <div className="loading"><ClipLoader color="#7502B5" size={50} /></div> :
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/fitur"
            element={
              <>
                <Navbar />
                <Fitur />
                <Footer />
              </>
            }
          />
          <Route
            path="/benefit"
            element={
              <>
                <Navbar />
                <Benefit />
                <Footer />
              </>
            }
          />
          <Route
            path="/articles"
            element={
              <>
                <Navbar />
                <Articles />
                <Footer />
              </>
            }
          />
          <Route
            path="/partner"
            element={
              <>
                <Navbar />
                <Partner />
                <Footer />
              </>
            }
          />
          <Route
            path="/totaluser"
            element={
              <>
                <Navbar />
                <TotalUser />
                <Footer />
              </>
            }
          />
          <Route
            path="/testimoni"
            element={
              <>
                <Navbar />
                <Testimoni />
                <Footer />
              </>
            }
          />
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
        </Routes>
      </Router>
  );
};

export default App;

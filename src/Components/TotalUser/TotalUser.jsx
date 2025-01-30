import {useEffect} from "react";
import "./totalUser.css";
import { FaChalkboardTeacher, FaUsers, FaSchool } from "react-icons/fa";
import Aos from "aos";



const TotalUser = () => {
          useEffect(() => {
                    Aos.init({ duration: 2000 });
          }, []);
          return (
                    <div className="total-user-section" data-aos="fade-up">
                              <h2>Jumlah User</h2>
                              <div className="total-user-container">
                                        <div className="total-user-card">
                                                  <FaSchool className="icon" />
                                                  <h3>1,000</h3>
                                                  <p>Kelas</p>
                                        </div>
                                        <div className="total-user-card">
                                                  <FaUsers className="icon" />
                                                  <h3>2,389</h3>
                                                  <p>Mahasiswa</p>
                                        </div>
                                        <div className="total-user-card">
                                                  <FaChalkboardTeacher className="icon" />
                                                  <h3>2,389</h3>
                                                  <p>Pengajar</p>
                                        </div>
                              </div>
                    </div>
          );
};

export default TotalUser;

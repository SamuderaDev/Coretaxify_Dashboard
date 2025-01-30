import { useEffect} from "react";
import "./articles.css";
import Aos from "aos";
import img1 from "../../Assets/image/1.png";
import img2 from "../../Assets/image/uniska-ssa-67887b15c925c422b87ea033.jpg";
const Articles = () => {
          useEffect(() => {
                    Aos.init({ duration: 2000 });
          }, []);
          return (
                    <div className="articles-section" data-aos="fade-up">
                              <h2>Artikel Terbaru</h2>
                              <p>Tetap Update dengan Wawasan Pajak</p>
                              <div className="articles-container">
                                        <div className="article-card">
                                                  <img src={img2} alt="Maksimalkan Potongan" />
                                                  <h3>Maksimalkan Potongan</h3>
                                                  <p>
                                                            Pelajari cara mengoptimalkan potongan Anda untuk penghematan pajak
                                                            maksimum.
                                                  </p>
                                        </div>
                                        <div className="article-card">
                                                  <img src={img2} alt="Tren Pajak 2022" />
                                                  <h3>Presentasi EduAkksa</h3>
                                                  <p>
                                                            Presentasi Website Praktikum Audit "EduAkksa" di Universitas Islam Kadiri.
                                                  </p>
                                        </div>
                              </div>
                    </div>
          );
};

export default Articles;

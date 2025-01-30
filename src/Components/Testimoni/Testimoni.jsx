import {useEffect} from "react";
import "./testimoni.css";
import { FaStar } from "react-icons/fa";
import Aos from "aos";

const Testimoni = () => {
          useEffect(() => {
                    Aos.init({ duration: 2000 });
          }, []);
          const testimonials = [
                    {
                              name: "Siti Rahayu",
                              text: "Saya tidak pernah menyangka betapa mudahnya memahami materi dengan Coretify.",
                              rating: 5,
                    },
                    {
                              name: "Andi Setiawan",
                              text: "Coretify membantu saya meningkatkan pengetahuan pajak saya secara signifikan.",
                              rating: 4,
                    },
          ];

          return (
                    <div className="testimoni-section" data-aos="fade-up">
                              <h2>Ulasan</h2>
                              <p>Lihat apa yang dikatakan pengguna kami</p>
                              <div className="testimoni-container">
                                        {testimonials.map((item, index) => (
                                                  <div className="testimoni-card" key={index}>
                                                            <h3>{item.name}</h3>
                                                            <p>{item.text}</p>
                                                            <div className="rating">
                                                                      {[...Array(item.rating)].map((_, i) => (
                                                                                <FaStar key={i} className="star" />
                                                                      ))}
                                                            </div>
                                                  </div>
                                        ))}
                              </div>
                    </div>
          );
};

export default Testimoni;

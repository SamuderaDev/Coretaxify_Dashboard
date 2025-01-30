import React, { useEffect } from 'react';
import './benefit.css';
import img1 from '../../Assets/image/taxes.png'
import img2 from '../../Assets/image/database-storage.png'
import img3 from '../../Assets/image/working-hours.png'
import img4 from '../../Assets/image/analysis.png'
import img5 from '../../Assets/image/personal.png'
import img6 from '../../Assets/image/certificate.png'


import Aos from 'aos'
import 'aos/dist/aos.css'

const Benefit = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <section className='about section'>
            <div className="secContainer">
                <div className="title">
                    <h2>Keunggulan Belajar Pajak Bersama Coretaxify</h2>
                </div>

                <div className="mainContent container grid">
                    <div data-aos="fade-up" data-aos-duration="2000" className="singleItem">
                        <img src={img1} alt="Image Name" />
                        <h3>Simulasi Perhitungan Pajak Secara Rill</h3>
                        <p>
                            Melakukan Pembelajaran Pajak Secara Rill melalui Platform Unggulan Kami.
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="2500" className="singleItem">
                        <img src={img2} alt="Image Name" />
                        <h3>Database Peraturan Pajak Terintegrasi</h3>
                        <p>
                            Pembelajaran pajak terintegrasi dengan peraturan pemerintah.
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
                        <img src={img3} alt="Image Name" />
                        <h3>Flexible dan Adaptif</h3>
                        <p>
                            Belajar Pajak Secara Flexibel Dan Adaptif.
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
                        <img src={img4} alt="Image Name" />
                        <h3>Latihan Soal Interaktif dan Up to date</h3>
                        <p>
                            Latihan Soal Yang Interaktif Dan Up To Date Sesuai Pajak.
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
                        <img src={img5} alt="Image Name" />
                        <h3>Update Kebijakan Pajak Real-Time</h3>
                        <p>
                            Update Kebijakan Pemerintah Atas Pajak 
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
                        <img src={img6} alt="Image Name" />
                        <h3>Gamifikasi Dan Sertifikasi</h3>
                        <p>
                            Aplikasi Dengan Model Permainan dan Akan Diberikan Sertifikasi.
                        </p>
                    </div>
                </div>

                {/* <div className="videoCard container">
                    <div className="cardContent grid">
                        <div className="cardText">
                            <h2>Wonderful House experience in there!</h2>
                            <p></p>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default Benefit
import React, { useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import Section from '../Section/Section';
import Fitur from '../Fitur/Fitur';
import Benefit from '../Benefit/Benefit';
import Articles from '../Articles/Articles';
import Partner from '../Partner/Partner';
import TotalUser from '../TotalUser/TotalUser';
import Testimoni from '../Testimoni/Testimoni'; 
import 'aos/dist/aos.css';

const handleClicked = () => {
    window.location.href = 'https://samudraedukasiteknologi.com/';
}
const Home = () => {
          const navigate = useNavigate()

          useEffect(() => {
                    Aos.init({ duration: 2000 });
          }, []);
    return (
          <>
        <section className='home'>
            <div className="secContainer">
                <div className="homeText">
                    <h1 data-aos="fade-up" className="title">
                        Selamat Datang di Coretaxify <br /> 
                    </h1>
                    <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
                        Coretaxfy adalah aplikasi praktikum perpajakan berbasis website yang dirancang khusus oleh generasi muda sebagai upaya untuk memberikan solusi tepat dan relevan dalam menunjang kebutuhan bidang edukasi serta praktisi perpajakan.    
                    </p>
                    <button data-aos="fade-up" data-aos-duration="3000" className='btn'>
                        <a onClick={handleClicked}>Mulai Sekarang</a>
                    </button>
                </div>
            </div>
        </section>
        <Section />
        <Fitur />
        <Benefit />
        <Articles />
        <Partner />
        <TotalUser />
        <Testimoni />
        </>
    );
}

export default Home;
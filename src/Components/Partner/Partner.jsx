import React, { useState, useEffect, useRef } from "react";
import "./partner.css";
import UTM from "../../Assets/image/UTM.png";
import PANCASILA from "../../Assets/image/pancasila.png";
import UNISILA from "../../Assets/image/UNISSULA.png";
import UMC from "../../Assets/image/LOGO UNIVERSITAS MERCU BUANA.png";
import ITB from "../../Assets/image/Logo-ITB-AAS.png";
import UDINUS from "../../Assets/image/UDINUS.png";
import UMJ from "../../Assets/image/UMJ.png";
import UNSA from "../../Assets/image/LOGO UNSA.png";
import UM from "../../Assets/image/Logo_Universitas_Madura.png";
import TSM from "../../Assets/image/tsm.png";
import UNCEN from "../../Assets/image/Emblem_of_Cenderawasih_University.png";

const Partner = () => {
          const [currentIndex, setCurrentIndex] = useState(1);
          const [isTransitioning, setIsTransitioning] = useState(false);
          const containerRef = useRef(null);
          const startX = useRef(0);
          const currentTranslate = useRef(0);
          const isDragging = useRef(false);

          const logos = [
                    { src: UTM, alt: "Universitas Trunojoyo Madura", name: "Universitas Trunojoyo Madura" },
                    { src: PANCASILA, alt: "Universitas Pancasila", name: "Universitas Pancasila" },
                    { src: UNISILA, alt: "Universitas Islam Sultan Agung", name: "Universitas Islam Sultan Agung" },
                    { src: UMC, alt: "Universitas Mercu Buana", name: "Universitas Mercu Buana" },
                    { src: ITB, alt: "Institut Teknologi Bandung", name: "Institut Teknologi Bandung" },
                    { src: UDINUS, alt: "UDINUS", name: "UDINUS" },
                    { src: UMJ, alt: "Universitas Muhammadiyah Jakarta", name: "Universitas Muhammadiyah Jakarta" },
                    { src: UNSA, alt: "Universitas Surakarta", name: "Universitas Surakarta" },
                    { src: UM, alt: "Universitas Madura", name: "Universitas Madura" },
                    { src: TSM, alt: "Universitas Trisakti", name: "Universitas Trisakti" },
                    { src: UNCEN, alt: "Universitas Cenderawasih", name: "Universitas Cenderawasih" },
                    { src: UTM, alt: "Universitas Trunojoyo Madura", name: "Universitas Trunojoyo Madura" },
                    { src: PANCASILA, alt: " Universitas Pancasila", name: "Universitas Pancasila" },
                    { src: UNISILA, alt: "Universitas Islam Sultan Agung", name: "Universitas Islam Sultan Agung" },
                    { src: UMC, alt: "Universitas Mercu Buana", name: "Universitas Mercu Buana" },
                    { src: ITB, alt: "Institut Teknologi Bandung", name: "Institut Teknologi Bandung" },
                    { src: UDINUS, alt: "UDINUS", name: "UDINUS" },
                    { src: UMJ, alt: "Universitas Muhammadiyah Jakarta", name: "Universitas Muhammadiyah Jakarta" },
          ];

          const clonedLogos = [logos[logos.length - 1], ...logos, logos[0]];

          useEffect(() => {
                    if (containerRef.current) {
                              containerRef.current.style.transition = "none";
                              containerRef.current.style.transform = `translateX(-${currentIndex * 160}px)`;
                    }
          }, []);

          const handleDragStart = (e) => {
                    isDragging.current = true;
                    startX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
                    currentTranslate.current = currentIndex * 160;
                    containerRef.current.style.transition = "none";
          };

          const handleDragMove = (e) => {
                    if (!isDragging.current) return;
                    const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
                    const deltaX = currentX - startX.current;
                    containerRef.current.style.transform = `translateX(-${currentTranslate.current - deltaX}px)`;
          };

          const handleDragEnd = (e) => {
                    if (!isDragging.current) return;
                    isDragging.current = false;
                    const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
                    const deltaX = endX - startX.current;

                    if (Math.abs(deltaX) > 50) {
                              // Geser ke kiri atau kanan
                              if (deltaX > 0) {
                                        handlePrev();
                              } else {
                                        handleNext();
                              }
                    } else {
                              // Kembali ke posisi awal jika drag tidak cukup panjang
                              containerRef.current.style.transition = "transform 0.6s ease";
                              containerRef.current.style.transform = `translateX(-${currentIndex * 160}px)`;
                    }
          };

          const handleNext = () => {
                    if (isTransitioning) return;
                    setIsTransitioning(true);
                    setCurrentIndex((prevIndex) => prevIndex + 1);
          };

          const handlePrev = () => {
                    if (isTransitioning) return;
                    setIsTransitioning(true);
                    setCurrentIndex((prevIndex) => prevIndex - 1);
          };

          useEffect(() => {
                    if (containerRef.current) {
                              containerRef.current.style.transition = "transform 0.6s ease";
                              containerRef.current.style.transform = `translateX(-${currentIndex * 160}px)`;
                    }

                    const handleTransitionEnd = () => {
                              setIsTransitioning(false);
                              if (currentIndex === 0) {
                                        setCurrentIndex(logos.length);
                                        containerRef.current.style.transition = "none";
                                        containerRef.current.style.transform = `translateX(-${logos.length * 160}px)`;
                              } else if (currentIndex === clonedLogos.length - 1) {
                                        setCurrentIndex(1);
                                        containerRef.current.style.transition = "none";
                                        containerRef.current.style.transform = `translateX(-160px)`;
                              }
                    };

                    containerRef.current.addEventListener("transitionend", handleTransitionEnd);
                    return () => {
                              containerRef.current.removeEventListener("transitionend", handleTransitionEnd);
                    };
          }, [currentIndex]);

          return (
                    <div className="partner-section">
                              <h2>Partner Kami</h2>
                              <div className="partner-carousel">
                                        <div
                                                  className="partner-container"
                                                  ref={containerRef}
                                                  onMouseDown={handleDragStart}
                                                  onMouseMove={handleDragMove}
                                                  onMouseUp={handleDragEnd}
                                                  onMouseLeave={handleDragEnd}
                                                  onTouchStart={handleDragStart}
                                                  onTouchMove={handleDragMove}
                                                  onTouchEnd={handleDragEnd}
                                        >
                                                  {clonedLogos.map((logo, index) => (
                                                            <div className="partner-logo" key={index}>
                                                                      <img src={logo.src} alt={logo.alt} />
                                                                      <p>{logo.name}</p>
                                                            </div>
                                                  ))}
                                        </div>
                              </div>
                    </div>
          );
};

export default Partner;

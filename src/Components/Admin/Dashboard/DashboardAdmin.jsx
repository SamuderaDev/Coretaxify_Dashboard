import React, { useState, useEffect } from "react";
import {
          Chart as ChartJS,
          CategoryScale,
          LinearScale,
          BarElement,
          Title,
          Tooltip,
          Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./dashboardAdmin.css";
import { FaUsers } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardAdmin = () => {
          const [chartData, setChartData] = useState({
                    labels: [],
                    datasets: [],
          });
          const [userData, setUserData] = useState({
                    totalPengguna: 0,
                    pembimbing: 0,
                    mahasiswa: 0,
          });
          const [selectedYear, setSelectedYear] = useState(2024); // Tambahkan state untuk tahun

          useEffect(() => {
                    const fetchData = async () => {
                              try {
                                        // Simulasi data berdasarkan tahun yang dipilih
                                        const dataFromApi = await new Promise((resolve) => {
                                                  setTimeout(() => {
                                                            const yearlyData = {
                                                                      2020: {
                                                                                labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                                                                                datasets: [
                                                                                          { label: "Total Pengguna", data: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650], backgroundColor: "skyblue" },
                                                                                          { label: "Pembimbing", data: [80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520], backgroundColor: "royalblue" },
                                                                                          { label: "Mahasiswa", data: [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130], backgroundColor: "mediumblue" },
                                                                                ],
                                                                      },
                                                                      2021: {
                                                                                labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                                                                                datasets: [
                                                                                          { label: "Total Pengguna", data: [150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700], backgroundColor: "skyblue" },
                                                                                          { label: "Pembimbing", data: [120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560], backgroundColor: "royalblue" },
                                                                                          { label: "Mahasiswa", data: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140], backgroundColor: "mediumblue" },
                                                                                ],
                                                                      },
                                                                      2022: {
                                                                                labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                                                                                datasets: [
                                                                                          { label: "Total Pengguna", data: [150, 200, 250, 300, 350, 200, 450, 500, 550, 600, 650, 700], backgroundColor: "skyblue" },
                                                                                          { label: "Pembimbing", data: [120, 160, 200, 240, 280, 320, 360, 500, 440, 480, 520, 560], backgroundColor: "royalblue" },
                                                                                          { label: "Mahasiswa", data: [30, 40, 50, 60, 70, 80, 90, 100, 110, 410, 130, 140], backgroundColor: "mediumblue" },
                                                                                ],
                                                                      },
                                                                      2023: {
                                                                                labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                                                                                datasets: [
                                                                                          { label: "Total Pengguna", data: [150, 200, 550, 300, 350, 200, 450, 500, 550, 600, 650, 700], backgroundColor: "skyblue" },
                                                                                          { label: "Pembimbing", data: [120, 160, 200, 290, 280, 320, 360, 500, 440, 480, 520, 560], backgroundColor: "royalblue" },
                                                                                          { label: "Mahasiswa", data: [30, 40, 50, 60, 270, 80, 90, 100, 110, 410, 130, 140], backgroundColor: "mediumblue" },
                                                                                ],
                                                                      },
                                                                      2024: {
                                                                                labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                                                                                datasets: [
                                                                                          { label: "Total Pengguna", data: [250, 280, 290, 310, 240, 200, 400, 300, 280, 250, 290, 200], backgroundColor: "skyblue" },
                                                                                          { label: "Pembimbing", data: [200, 250, 270, 290, 220, 180, 350, 280, 250, 220, 270, 180], backgroundColor: "royalblue" },
                                                                                          { label: "Mahasiswa", data: [300, 320, 350, 330, 280, 220, 450, 350, 300, 280, 320, 250], backgroundColor: "mediumblue" },
                                                                                ],
                                                                      },
                                                                      2025: {
                                                                                labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                                                                                datasets: [
                                                                                          { label: "Total Pengguna", data: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850], backgroundColor: "skyblue" },
                                                                                          { label: "Pembimbing", data: [250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800], backgroundColor: "royalblue" },
                                                                                          { label: "Mahasiswa", data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160], backgroundColor: "mediumblue" },
                                                                                ],
                                                                      },
                                                            };

                                                            resolve(yearlyData[selectedYear]);
                                                  }, 1000);
                                        });

                                        setChartData(dataFromApi);
                              } catch (error) {
                                        console.error("Error fetching data:", error);
                              }
                    };

                    const fetchUserData = async () => {
                              try {
                                        const userDataFromApi = await new Promise((resolve) => {
                                                  setTimeout(() => {
                                                            resolve({
                                                                      totalPengguna: 1000 + selectedYear * 10, // Simulasi data total pengguna
                                                                      pembimbing: 500 + selectedYear * 5, // Simulasi data pembimbing
                                                                      mahasiswa: 500 + selectedYear * 5, // Simulasi data mahasiswa
                                                            });
                                                  }, 500);
                                        });
                                        setUserData(userDataFromApi);
                              } catch (error) {
                                        console.error("Error fetching user data:", error);
                              }
                    };

                    fetchData();
                    fetchUserData();
          }, [selectedYear]); // Perbarui data ketika selectedYear berubah

          const options = {
                    responsive: true,
                    plugins: {
                              legend: {
                                        position: "bottom",
                              },
                              title: {
                                        display: true,
                                        text: `Statistik Pertumbuhan Data Tahun ${selectedYear}`,
                              },
                    },
                    scales: {
                              x: { stacked: true },
                              y: { stacked: true },
                    },
          };

          const handleYearChange = (e) => {
                    setSelectedYear(parseInt(e.target.value)); // Perbarui tahun berdasarkan pilihan
          };

          if (!chartData.labels.length) {
                    return (
                              <div className="loading">
                                        <ClipLoader color="#7502B5" size={50} />
                              </div>
                    );
          }

          return (
                    <div className="dashboard-container">
                              <div className="card-container">
                                        <div className="card">
                                                  <FaUsers className="card-icon" />
                                                  <h2>Total Pengguna</h2>
                                                  <p>{userData.totalPengguna}</p>
                                                  <p>Dari Sebelumnya 1000</p>
                                        </div>
                                        <div className="card">
                                                  <FaUsers className="card-icon" />
                                                  <h2>Pembimbing</h2>
                                                  <p>{userData.pembimbing}</p>
                                                  <p>Dari Sebelumnya 1000</p>
                                        </div>
                                        <div className="card">
                                                  <FaUsers className="card-icon" />
                                                  <h2>Mahasiswa</h2>
                                                  <p>{userData.mahasiswa}</p>
                                                  <p>Dari Sebelumnya 1000</p>
                                        </div>
                              </div>
                              <div className="filter-container">
                                        <label htmlFor="year-select">Pilih Tahun:</label>
                                        <select
                                                  id="year-select"
                                                  value={selectedYear}
                                                  onChange={handleYearChange}
                                                  className="year-dropdown"
                                        >
                                                  {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                                                            <option key={year} value={year}>
                                                                      {year}
                                                            </option>
                                                  ))}
                                        </select>
                              </div>
                              <div className="chart-container">
                                        <Bar options={options} data={chartData} />
                              </div>
                    </div>
          );
};

export default DashboardAdmin;

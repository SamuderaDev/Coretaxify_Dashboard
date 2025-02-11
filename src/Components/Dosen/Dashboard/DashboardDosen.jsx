import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
          Chart as ChartJS,
          CategoryScale,
          LinearScale,
          BarElement,
          Title,
          Tooltip,
          Legend,
} from "chart.js";
import { FaChalkboardTeacher, FaUsers, FaBook } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardDosen = () => {
          const [chartData, setChartData] = useState({ labels: [], datasets: [] });
          const [dosenData, setDosenData] = useState({
                    totalKelas: 0,
                    totalMahasiswa: 0,
                    tugasBelumDiperiksa: 0,
          });
          const [selectedYear, setSelectedYear] = useState(2024);

          useEffect(() => {
                    const fetchData = async () => {
                              try {
                                        const dataFromApi = await new Promise((resolve) => {
                                                  setTimeout(() => {
                                                            const yearlyData = {
                                                                      2023: {
                                                                                labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
                                                                                datasets: [
                                                                                          { label: "Mahasiswa", data: [50, 60, 70, 80, 90, 100], backgroundColor: "blue" },
                                                                                          { label: "Kelas", data: [5, 6, 7, 8, 9, 10], backgroundColor: "green" },
                                                                                          { label: "Tugas", data: [10, 12, 15, 18, 20, 25], backgroundColor: "red" },
                                                                                ],
                                                                      },
                                                                      2024: {
                                                                                labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
                                                                                datasets: [
                                                                                          { label: "Mahasiswa", data: [55, 65, 75, 85, 95, 110], backgroundColor: "blue" },
                                                                                          { label: "Kelas", data: [6, 7, 8, 9, 10, 12], backgroundColor: "green" },
                                                                                          { label: "Tugas", data: [12, 14, 16, 20, 22, 26], backgroundColor: "red" },
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

                    const fetchDosenData = async () => {
                              try {
                                        const dosenStats = await new Promise((resolve) => {
                                                  setTimeout(() => {
                                                            resolve({
                                                                      totalKelas: 10 + selectedYear % 3,
                                                                      totalMahasiswa: 150 + selectedYear % 50,
                                                                      tugasBelumDiperiksa: 20 + selectedYear % 10,
                                                            });
                                                  }, 500);
                                        });
                                        setDosenData(dosenStats);
                              } catch (error) {
                                        console.error("Error fetching dosen data:", error);
                              }
                    };

                    fetchData();
                    fetchDosenData();
          }, [selectedYear]);

          const options = {
                    responsive: true,
                    plugins: {
                              legend: { position: "bottom" },
                              title: { display: true, text: `Statistik Pengajaran Tahun ${selectedYear}` },
                    },
                    scales: { x: { stacked: true }, y: { stacked: true } },
          };

          return (
                    <div className="p-6 bg-gray-100 min-h-screen">
                              <div className="text-2xl font-bold text-gray-700 mb-4">Dashboard Dosen</div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center hover:transform hover:-translate-y-2 ">
                                                  <FaChalkboardTeacher className="text-blue-500 text-3xl mr-4" />
                                                  <div>
                                                            <p className="text-gray-500">Total Kelas</p>
                                                            <p className="text-lg font-bold">{dosenData.totalKelas}</p>
                                                  </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center hover:transform hover:-translate-y-2 ">
                                                  <FaUsers className="text-green-500 text-3xl mr-4" />
                                                  <div>
                                                            <p className="text-gray-500">Total Mahasiswa</p>
                                                            <p className="text-lg font-bold">{dosenData.totalMahasiswa}</p>
                                                  </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center hover:transform hover:-translate-y-2 ">
                                                  <FaBook className="text-red-500 text-3xl mr-4" />
                                                  <div>
                                                            <p className="text-gray-500">Tugas Belum Diperiksa</p>
                                                            <p className="text-lg font-bold">{dosenData.tugasBelumDiperiksa}</p>
                                                  </div>
                                        </div>
                              </div>

                              {/* Filter Tahun */}
                              <div className="mt-6">
                                        <label htmlFor="year-select" className="block text-gray-700 font-medium">
                                                  Pilih Tahun:
                                        </label>
                                        <select
                                                  id="year-select"
                                                  value={selectedYear}
                                                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                                  className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm"
                                        >
                                                  {[2023, 2024].map((year) => (
                                                            <option key={year} value={year}>
                                                                      {year}
                                                            </option>
                                                  ))}
                                        </select>
                              </div>

                              {/* Chart */}
                              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                                        {!chartData.labels.length ? (
                                                  <div className="flex justify-center items-center h-40">
                                                            <ClipLoader color="#4A90E2" size={50} />
                                                  </div>
                                        ) : (
                                                  <Bar options={options} data={chartData} />
                                        )}
                              </div>
                    </div>
          );
};

export default DashboardDosen;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import CTaxifyLogo from "../../../Assets/image/4.png";

const Login = () => {
          const [showPassword, setShowPassword] = useState(false);
          const [username, setUsername] = useState("");
          const [password, setPassword] = useState("");

          const togglePassword = () => {
                    setShowPassword(!showPassword);
          };

          const handleLogin = (e) => {
                    e.preventDefault();
                    console.log("Username:", username);
                    console.log("Password:", password);
                    alert("Login berhasil!");
          };

          return (
                    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                              <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                                        <img src={CTaxifyLogo} alt="CTaxify Logo" className="w-50 mx-auto mb-4" />
                                        <p className="text-center text-gray-600 mb-6">
                                                  Mari gabung dengan kami menjadi masa depan sadar pajak
                                        </p>
                                        <form className="space-y-4" onSubmit={handleLogin}>
                                                  <div>
                                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                      Username
                                                            </label>
                                                            <input
                                                                      type="text"
                                                                      id="username"
                                                                      className="mt-1 block w-full p-2 border rounded-md"
                                                                      placeholder="Masukkan username Anda"
                                                                      value={username}
                                                                      onChange={(e) => setUsername(e.target.value)}
                                                                      required
                                                            />
                                                  </div>

                                                  <div>
                                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                                      Password
                                                            </label>
                                                            <div className="relative">
                                                                      <input
                                                                                type={showPassword ? "text" : "password"}
                                                                                id="password"
                                                                                className="mt-1 block w-full p-2 border rounded-md"
                                                                                placeholder="Masukkan password Anda"
                                                                                value={password}
                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                required
                                                                      />
                                                                      <button
                                                                                type="button"
                                                                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                                                                                onClick={togglePassword}
                                                                      >
                                                                                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                                                                      </button>
                                                            </div>
                                                  </div>

                                                  <div className="text-right">
                                                            <Link to="/reset-password" className="font-medium text-purple-900 text-sm">
                                                                      Lupa Password?
                                                            </Link>
                                                  </div>

                                                  <button type="submit" className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950">
                                                            Login
                                                  </button>
                                        </form>

                                        <p className="text-center text-sm text-black-600 mt-4">
                                                  Belum punya akun?{" "}
                                                  <Link to="/register" className="font-semibold text-purple-900 hover:underline">
                                                            Daftar Disini
                                                  </Link>
                                        </p>
                              </div>
                    </div>
          );
};

export default Login;

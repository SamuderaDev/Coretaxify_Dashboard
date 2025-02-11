import React, { useState } from "react";
import CTaxifyLogo from "../../../Assets/image/4.png";
import { Link } from "react-router-dom";

const ResetPassword = ({ openRegister }) => {
          const [email, setEmail] = useState("");
          const [emailError, setEmailError] = useState("");

          const handleEmailChange = (event) => {
                    setEmail(event.target.value);
                    setEmailError("");
          };

          const handleSubmit = (event) => {
                    event.preventDefault();

                    if (!email.includes("@")) {
                              setEmailError("Email harus mengandung @");
                              return;
                    }

                    console.log("Reset password email sent to:", email);
          };

          return (
                    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                              <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                                        <img src={CTaxifyLogo} alt="CTaxify Logo" className="w-50 mx-auto mb-4" />
                                        <p className="text-center text-gray-600 mb-6">
                                                  Bergabunglah bersama kami untuk menjadi insan yang taat pajak
                                        </p>
                                        <form className="space-y-4" onSubmit={handleSubmit}>
                                                  <div>
                                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                                      Email Lupa Password
                                                            </label>
                                                            <input
                                                                      type="email"
                                                                      id="email"
                                                                      value={email}
                                                                      onChange={handleEmailChange}
                                                                      className="mt-1 block w-full p-2 border rounded-md"
                                                                      placeholder="Masukkan email Anda"
                                                            />
                                                            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                                                  </div>

                                                  <button type="submit" className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950">
                                                            Konfirmasi
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

export default ResetPassword;

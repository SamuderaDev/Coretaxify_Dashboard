import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import CTaxifyLogo from "../../../Assets/image/4.png";
import { Link } from "react-router-dom";

const Register = () => {
          const [showPassword, setShowPassword] = useState(false);
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("");
          const [repeatPassword, setRepeatPassword] = useState("");
          const [emailError, setEmailError] = useState("");
          const [passwordError, setPasswordError] = useState("");
          const [showRegistrationCode, setShowRegistrationCode] = useState(false);
          const [registrationCode, setRegistrationCode] = useState("");
          const [registrationCodeError, setRegistrationCodeError] = useState("");

          const handleEmailChange = (event) => {
                    setEmail(event.target.value);
                    setEmailError("");
          };

          const handlePasswordChange = (event) => {
                    setPassword(event.target.value);
                    setPasswordError("");
          };

          const handleRepeatPasswordChange = (event) => {
                    setRepeatPassword(event.target.value);
                    setPasswordError("");
          };

          const handleRegistrationCodeChange = (event) => {
                    setRegistrationCode(event.target.value);
                    setRegistrationCodeError("");
          };

          const handleSubmit = (event) => {
                    event.preventDefault();

                    if (!email.includes("@")) {
                              setEmailError("Email harus mengandung @");
                              return;
                    }

                    if (password !== repeatPassword) {
                              setPasswordError("Password tidak cocok");
                              return;
                    }

                    if (showRegistrationCode && registrationCode.trim() === "") {
                              setRegistrationCodeError("Kode registrasi wajib diisi");
                              return;
                    }

                    console.log("Form Submitted");
          };

          return (
                    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                              <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                                        <img src={CTaxifyLogo} alt="CTaxify Logo" className="w-50 mx-auto mb-4" />
                                        <p className="text-center text-gray-600 mb-6">
                                                  Mari gabung dengan kami menjadi masa depan sadar pajak
                                        </p>
                                        <form className="space-y-4" onSubmit={handleSubmit}>
                                                  <div>
                                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                      Username
                                                            </label>
                                                            <input type="text" id="username" className="mt-1 block w-full p-2 border rounded-md" placeholder="Masukkan username" required />
                                                  </div>

                                                  <div>
                                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                                      Email
                                                            </label>
                                                            <input type="email" id="email" value={email} onChange={handleEmailChange} className="mt-1 block w-full p-2 border rounded-md" placeholder="Masukkan email" required />
                                                            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                                                  </div>

                                                  <div>
                                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                                      Password
                                                            </label>
                                                            <div className="relative">
                                                                      <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={handlePasswordChange} className="mt-1 block w-full p-2 border rounded-md" placeholder="Masukkan password" required />
                                                                      <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                                                                                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                                                                      </button>
                                                            </div>
                                                  </div>

                                                  <div>
                                                            <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700">
                                                                      Ulangi Password
                                                            </label>
                                                            <div className="relative">
                                                                      <input type={showPassword ? "text" : "password"} id="repeat-password" value={repeatPassword} onChange={handleRepeatPasswordChange} className="mt-1 block w-full p-2 border rounded-md" placeholder="Ulangi password" required />
                                                                      <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                                                                                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                                                                      </button>
                                                            </div>
                                                  </div>

                                                  {!showRegistrationCode ? (
                                                            <div className="flex gap-4">
                                                                      <button type="button" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                                                                                Coba Gratis 14 Hari
                                                                      </button>
                                                                      <button type="button" className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950" onClick={() => setShowRegistrationCode(true)}>
                                                                                Premium
                                                                      </button>
                                                            </div>
                                                  ) : (
                                                            <div>
                                                                      <label htmlFor="registration-code" className="block text-sm font-medium text-gray-700">
                                                                                Kode Registrasi
                                                                      </label>
                                                                      <input type="text" id="registration-code" value={registrationCode} onChange={handleRegistrationCodeChange} className="mt-1 block w-full p-2 border rounded-md" placeholder="Masukkan Kode Registrasi" required />
                                                                      {registrationCodeError && <p className="text-red-500 text-sm">{registrationCodeError}</p>}
                                                                      <button type="submit" className="mt-4 w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950">
                                                                                Daftar Sekarang
                                                                      </button>
                                                            </div>
                                                  )}

                                                  {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                                        </form>
                                        <p className="text-center text-sm text-black-600 mt-4">
                                                  Memiliki akun?{" "}
                                                  <Link to="/login" className="font-semibold text-purple-900 hover:underline">
                                                            Silahkan Login
                                                  </Link>
                                        </p>
                              </div>
                    </div>
          );
};

export default Register;

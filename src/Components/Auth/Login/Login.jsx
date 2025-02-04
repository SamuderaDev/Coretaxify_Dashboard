import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
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
                    <>
                              <div className="login-container">
                                        <img src={CTaxifyLogo} alt="CTaxify Logo" className="logo" />
                                        <p className="tagline">Mari gabung dengan kami menjadi masa depan sadar pajak</p>
                                        <form className="login-form" onSubmit={handleLogin}>
                                                  <label htmlFor="username">Username</label>
                                                  <input
                                                            type="text"
                                                            id="username"
                                                            placeholder="Enter your username"
                                                            value={username}
                                                            onChange={(e) => setUsername(e.target.value)}
                                                            required
                                                  />

                                                  <label htmlFor="password">Password</label>
                                                  <div className="password-container">
                                                            <input
                                                                      type={showPassword ? "text" : "password"}
                                                                      id="password"
                                                                      placeholder="Enter your password"
                                                                      value={password}
                                                                      onChange={(e) => setPassword(e.target.value)}
                                                                      required
                                                            />
                                                            <button
                                                                      type="button"
                                                                      className="toggle-password"
                                                                      onClick={togglePassword}
                                                            >
                                                                      {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                                                            </button>
                                                  </div>

                                                  <div className="forgot-password">
                                                            <Link to="/forgot-password">Forgot Password?</Link>
                                                  </div>

                                                  <Link to="/admin">
                                                            <button type="submit" className="login-button">Login</button>
                                                  </Link>

                                        </form>
                                        <p className="register-text">
                                                  Belum Punya Akun ? <Link to="/register">Daftar Disini</Link>
                                        </p>
                              </div>
                    </>
          );
};

export default Login;

import React from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { Route, Link, Routes, useLocation } from "react-router-dom";
export default function ProtectedRoutes({ children }) {
  const [cookies, setCookie] = useCookies([""]);
  const getUrlRole = () => {
    const url = useLocation().pathname;
    const urlSplit = url.split("/");
    const role = urlSplit[1];
    return role;
  };
  // alert(getUrlRole()); 
  if (cookies.token == null) {
    window.location.href = "/login";
  }
  return children;
}

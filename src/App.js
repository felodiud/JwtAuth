import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Signup } from "./views/Signup";
import injectContext from "./store/context";
import { Private } from "./views/Private";
import { Navbar } from "./views/Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/private" element={<Private />} />
      </Routes>
    </BrowserRouter>
  );
}

export default injectContext(App);

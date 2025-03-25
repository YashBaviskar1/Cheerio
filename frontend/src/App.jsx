import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/Navbar";
import Login from "./components/Login"; 
import SignUp from "./components/SignUp";
import Sounds from "./components/Sounds";
import SoundsPlay from "./components/SoundsPlay";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import Chat from "./components/Chat";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <div className="h-screen bg-slate-800 justify-center items-center">
            <HomePage />
            <Testimonial />
            <Footer />
          </div>
        } />
        <Route path="/login" element={<Login />} /> 
        <Route path="/SignUp" element={<SignUp />} /> 
        <Route path="/sounds" element = {<Sounds />} />
        <Route path="/sound-play" element = {<SoundsPlay />} />
        <Route path="/chat" element = {<Chat />} />
      </Routes>

    </Router>
  );
}

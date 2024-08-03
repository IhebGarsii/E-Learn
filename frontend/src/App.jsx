import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./pages/courses/Courses";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Login from "./pages/login/Login";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <SideBar />
    </BrowserRouter>
  );
}

export default App;

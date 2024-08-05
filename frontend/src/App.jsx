import React from "react";

import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <SideBar />
    </BrowserRouter>
  );
}

export default App;

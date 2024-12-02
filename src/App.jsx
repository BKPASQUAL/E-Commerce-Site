import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css"
import Collection from "./pages/Collection";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";

function App() {

  return (
    <div>
      <div >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SingUp" element={<SingUp />} />
          <Route path="/" element={<Collection />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

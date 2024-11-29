import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css"
import Collection from "./pages/Collection";

function App() {

  return (
    <div>
      <div >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Collection />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

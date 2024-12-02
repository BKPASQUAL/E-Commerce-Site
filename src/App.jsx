// src/App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Collection from "./pages/Collection";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SingUp";
import "./index.css"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
              <Collection />
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;

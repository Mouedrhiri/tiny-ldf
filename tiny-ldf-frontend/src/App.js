import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLoginSuccess = (newToken) => {
    setToken(newToken); // Set token in state
    localStorage.setItem("token", newToken); // Save token to localStorage
  };

  const handleLogout = () => {
    setToken(null); // Clear token state
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/"
          element={
            token ? (
              <>
                <Navbar onLogout={handleLogout} />
                <HomePage token={token} />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Catch-all route: Redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

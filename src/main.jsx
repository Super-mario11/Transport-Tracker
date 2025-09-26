// super-mario11/transport-tracker/.../src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// 👇 NEW: Import BrowserRouter and AuthProvider
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 1. BrowserRouter must be the top-level wrapper */}
    <BrowserRouter>
      {/* 2. AuthProvider can now use all router hooks safely */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
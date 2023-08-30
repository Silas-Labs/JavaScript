import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import NavBar from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import AddEmployee from "./components/AddEmployee.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./bootstrap/css/bootstrap.css";
import JsonPlaceHolder from "./components/JsonPlaceHolder.tsx";
import ListGroup from "./components/ListGroup.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

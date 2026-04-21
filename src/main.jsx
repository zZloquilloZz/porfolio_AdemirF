import React from "react";
import ReactDOM from "react-dom/client";
import Portfolio from "./Portfolio.jsx";
import "./styles.css";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Portfolio />
    </React.StrictMode>,
  );
}

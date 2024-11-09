import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";

// Create root once and store it
const root = ReactDOM.createRoot(document.getElementById("root"));

// Remove unnecessary fragment since we're only rendering one component
root.render(<App />);

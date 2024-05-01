import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import ToasterProvider from "./components/utils/ToasterProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </BrowserRouter>
  </React.StrictMode>
);

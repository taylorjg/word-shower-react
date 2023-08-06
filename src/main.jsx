import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.jsx";
import { GlobalStyles } from "./Global.styles.js";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);

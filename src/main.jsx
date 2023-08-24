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

if (window.location.hostname === "taylorjg.github.io") {
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = "https://www.googletagmanager.com/gtag/js?id=G-LLWBCGS18Y";
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-LLWBCGS18Y');
  `;
  document.head.appendChild(script2);
}

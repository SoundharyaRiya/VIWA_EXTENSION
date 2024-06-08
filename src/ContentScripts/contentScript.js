import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ViwaContextProvider } from "./Store/context-api";

const body = document.querySelector("body");
const app = document.createElement("div");

app.id = "viwa-root";

if (body) {
  body.appendChild(app);
}

const container = document.getElementById("viwa-root");

const isChromeExtensionPopupTarget = document.querySelector(
  "#root-viwa-extension"
);

chrome.runtime.sendMessage(
  {
    type: "currentUser",
    token: "Bearer " + JSON.parse(localStorage.getItem("token")),
  },
  (response) => {
    if (response?.statusCode >= 400) {
      localStorage.removeItem("viwa_auth_token");
    } else {
      if (!isChromeExtensionPopupTarget) {
        const root = createRoot(container);
        root.render(
          <ViwaContextProvider>
            <App />
          </ViwaContextProvider>
        );
      }
    }
  }
);

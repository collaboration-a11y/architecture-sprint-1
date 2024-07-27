import App from "./App.jsx";
import React from "react";
import { createRoot } from "react-dom/client";

import { ApplicationProvider } from "main-app/store";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApplicationProvider>
      <App />
    </ApplicationProvider>
  </React.StrictMode>
);

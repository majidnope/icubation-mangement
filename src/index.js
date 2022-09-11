import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StoreProvider from "./utils/userStore/Store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);

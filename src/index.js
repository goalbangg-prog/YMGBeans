import React from "react";
import "./index.css";
import "./App.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL === "." ? "/" : process.env.PUBLIC_URL || "/"}><App /></BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

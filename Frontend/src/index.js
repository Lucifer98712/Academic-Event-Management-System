import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { App as AntdProvider, ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AntdProvider>
      <ConfigProvider theme={{ primaryColor: "#1574EF" }}>
        <App />
      </ConfigProvider>
    </AntdProvider>
  </React.StrictMode>
);

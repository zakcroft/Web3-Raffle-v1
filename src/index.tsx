import React from "react";
import ReactDOM from "react-dom";
import Root from "./App";

const container = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

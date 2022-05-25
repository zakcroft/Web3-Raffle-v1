import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./App";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

const container = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={(provider) => new Web3(provider)}>
      <Root />
    </Web3ReactProvider>
  </React.StrictMode>
);

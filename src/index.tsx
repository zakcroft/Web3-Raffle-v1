import React from "react";
import ReactDOM from "react-dom/client";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";

import Root from "./App";

const container = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={(provider) => new Web3(provider)}>
      <Root />
    </Web3ReactProvider>
  </React.StrictMode>
);

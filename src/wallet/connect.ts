import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";

import { IS_Wallet_Connected_KEY } from "../constants";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337],
});

export function useConnectWallet() {
  const navigate = useNavigate();
  const { activate, deactivate, library } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem(IS_Wallet_Connected_KEY, "true");
      navigate("home");
    } catch (ex) {
      //console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem(IS_Wallet_Connected_KEY, "false");
      navigate("/");
    } catch (ex) {
      //console.log(ex);
    }
  }

  const isWalletConnected = () => {
    return localStorage.getItem(IS_Wallet_Connected_KEY) === "true";
  };

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem(IS_Wallet_Connected_KEY) === "true") {
        try {
          await activate(injected);
          navigate("/home");
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return { connect, disconnect, isWalletConnected };
}

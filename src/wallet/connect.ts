import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";

import { IS_Wallet_Connected_KEY } from "../constants";

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337, 11155111],
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
    if (library) {
      const { currentProvider } = library;

      const handleAccountsChanged = (accounts: string[]) => {
        console.log("accountsChanged");
        if (accounts.length > 0) {
          console.log("reactivate");
          activate(injected, undefined, true).catch((error) => {
            // eat errors
            console.error("Failed to activate after accounts changed", error);
          });
        } else {
          disconnect().then(() => navigate("/"));
        }
      };

      // Subscribe to accounts change
      currentProvider.on("accountsChanged", handleAccountsChanged);

      // Subscribe to chainId change
      currentProvider.on("chainChanged", (chainId: number) => {
        console.log("chainChanged");
        console.log(chainId);
      });

      // Subscribe to provider connection
      currentProvider.on("connect", (info: { chainId: number }) => {
        console.log("connect");
        console.log(info);
      });

      // Subscribe to provider disconnection
      currentProvider.on(
        "disconnect",
        (error: { code: number; message: string }) => {
          console.log("disconnect");
          console.log(error);
        }
      );
    }
    return () => library?.currentProvider.removeAllListeners();
  }, [library]);

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

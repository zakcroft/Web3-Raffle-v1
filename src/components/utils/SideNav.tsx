import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";

import { useConnectWallet } from "../../wallet/connect";
import { RootState } from "../../store";

export function SideNav() {
  const { account } = useWeb3React();
  const { connect, isWalletConnected } = useConnectWallet();
  const balance = useSelector((state: RootState) => state.balance.value);
  console.log(balance);
  return (
    <>
      <nav className={"p-4 border-solid border-r-2 basis-1/6 self-start"}>
        {isWalletConnected() ? (
          <>
            <div className="w-60 h-24 border-2 rounded-md mx-auto">
              <div className="flex flex-row items-center h-full justify-center space-x-5">
                <div className="bg-green-200 w-14  h-14 rounded-full font-bold text-gray-700 rounded-full bg-white flex items-center justify-center ">
                  Lotto
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="w-36 rounded-md bg-green-200 border-green-600 text-green-600 pl-2">
                    Connected
                  </div>
                  <div
                    className="w-36 rounded-md bg-green-200 border-green-600 text-green-600 pl-2"
                    title={account!}
                  >
                    {account?.substring(0, 6)}...{account?.substring(38)}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-60 h-24 border-2 rounded-md mx-auto mt-4">
              <div
                className="flex bg-grey-200 text-white-600 items-center h-full justify-center text-3xl"
                title={account!}
              >
                {balance} ETH
              </div>
            </div>
          </>
        ) : (
          <NavLink
            className={({ isActive }) => {
              return `block m-5 hover:text-amber-300 hover:underline ${
                isActive ? "text-white" : "text-yellow-400"
              }`;
            }}
            to={`./`}
          >
            <button
              type="button"
              onClick={connect}
              className="block bg-indigo-500 p-2 font-semibold rounded hover:bg-indigo-700"
            >
              Connect Wallet
            </button>
          </NavLink>
        )}
      </nav>
    </>
  );
}

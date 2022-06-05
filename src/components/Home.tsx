import { useEffect, useState } from "react";
import { useBuyTokens } from "../wallet/buy";
import { useContracts } from "../wallet/contracts";
import { useWeb3React } from "@web3-react/core";

export function Home() {
  const { buyTokens, tx } = useBuyTokens();
  const { account, library } = useWeb3React();
  const { Lottery, LotteryToken } = useContracts();

  const [walletEthBalance, setWalletEthBalance] = useState();
  const [lotterySalesBalance, setLotterySalesBalance] = useState();
  const [accountTokenBalance, setAccountTokenBalance] = useState();
  const [lastBoughtTokenAmount, setLastBoughtTokenAmount] = useState("");

  useEffect(() => {
    (async () => {
      if (LotteryToken) {
        Lottery.BuyTokens(() => {
          setLastBoughtTokenAmount("You have just bought tokens");
          debugger;
        });
      }
    })();
  }, [Lottery]);

  console.log("RENDER", tx);
  useEffect(() => {
    (async () => {
      if (LotteryToken) {
        // wallet calls
        // get account address eth balance
        const walletBalance = await library.eth.getBalance(account);
        setWalletEthBalance(library?.utils.fromWei(walletBalance, "ether"));

        //ERC20 calls
        // get token balance for Lottery from ERC20 LotteryToken
        setLotterySalesBalance(
          (await LotteryToken.balanceOf(Lottery.address)).toString()
        );

        // get token balance for selected account from ERC20 LotteryToken
        setAccountTokenBalance(
          (await LotteryToken.balanceOf(account)).toString()
        );
      }
    })();
  }, [LotteryToken, library, account, tx]);

  return (
    <>
      <div className={"text-white-200 mb-8"}>
        ETH wallet address: {account}
        <div>Balance: {walletEthBalance}</div>
      </div>
      <div className={"text-white-200 mb-8"}>
        Lottery balance for sale: {lotterySalesBalance}
      </div>
      <div className={"text-white-200 mb-8"}>
        Last Bought Token Amount: {lastBoughtTokenAmount}
      </div>
      <div className={"text-white-200 mb-8"}>Lottery</div>
      <div className={"text-white-200 mb-8"}>
        Your Lottery Token Balance: <span>{accountTokenBalance}</span>
      </div>
      <button
        className="block bg-indigo-500 p-2 text-white font-semibold rounded hover:bg-indigo-700"
        onClick={buyTokens}
      >
        Buy 100 Lottery Tokens
      </button>
      <button className="block bg-indigo-500 mt-10 p-2 text-white font-semibold rounded hover:bg-indigo-700 ">
        Enter 100 Lottery tokens
      </button>
      <button className="block bg-indigo-500 mt-10 p-2 text-white font-semibold rounded hover:bg-indigo-700 ">
        Pick winner
      </button>
      <div className={"text-white-200 mt-10 "}>The winner is: {"0x....."}</div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useBuyTokens } from "../wallet/buy";
import { useWeb3React } from "@web3-react/core";
import { useContracts, useDrizzleContext } from "../drizzle";
import {
  newContextComponents,
} from "@drizzle/react-components";

export function Home() {
  const { buyTokens, tx } = useBuyTokens();
  const { account } = useWeb3React();
  const ctx = useDrizzleContext();
  const { LotteryToken, Lottery } = useContracts();

  const [lotteryTokenBalance, setLotteryTokenBalance] = useState();

  const { AccountData, ContractData } = newContextComponents;

  useEffect(() => {
    if (ctx.initialized) {
      (async () => {
        const balance = await LotteryToken.methods.balanceOf(account).call();

          // dataKey: this.contracts[this.props.contract].methods[
          //     this.props.method
          //     ].cacheCall(...methodArgs),
        setLotteryTokenBalance(balance);
      })();
    }
  }, [ctx]);

    console.log(ctx.drizzleState);

    return (
    <>
      <div className={"text-white-200 mb-8"}>
        ETH wallet address and Balance
        {ctx.drizzleState && (
          <AccountData
            accountIndex={0}
            units="ether"
            precision={2}
            drizzle={ctx.drizzle}
            drizzleState={ctx.drizzleState}
          />
        )}
      </div>
      <div className={"text-white-200 mb-8"}>
        Lottery balance for sale:{" "}
        {ctx.drizzleState && (
          <ContractData
            contract="LotteryToken"
            method="balanceOf"
            methodArgs={[Lottery.address]}
            drizzle={ctx.drizzle}
            drizzleState={ctx.drizzleState}
          />
        )}
      </div>

      <div className={"text-white-200 mb-8"}>Lottery</div>
      <div className={"text-white-200 mb-8"}>
        Your Lottery Token Balance: <span>{lotteryTokenBalance}</span>
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

import { useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useContracts } from "./contracts";

export function useBuyTokens(ethValue: string = "0.1", quantity: number = 100) {
  const { library, account } = useWeb3React();
  const [buyTokensTx, setTx] = useState<object>({});
  const { Lottery } = useContracts();

  const buyTokens = useCallback(async () => {
    const tx = await Lottery.buyLotteryTokens({
      from: account,
      value: library?.utils.toWei(ethValue, "ether"),
      gasLimit: 85000,
    });
    setTx(tx);
  }, [Lottery]);

  return { buyTokens, buyTokensTx };
}

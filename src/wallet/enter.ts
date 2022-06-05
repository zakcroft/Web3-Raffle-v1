import { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useContracts } from "./contracts";

export function useBuyTokens(ethValue: string = "0.1", quantity: number = 100) {
  const { library, account } = useWeb3React();
  const [tx, setTx] = useState<object>({});
  const { Lottery } = useContracts();

  const enterLottery = useCallback(async () => {
    const tx = await Lottery.buyLotteryTokens({
      from: account,
      value: library?.utils.toWei(ethValue, "ether"),
      gasLimit: 85000,
    });
    setTx(tx);
  }, [Lottery]);

  return { enterLottery, tx };
}

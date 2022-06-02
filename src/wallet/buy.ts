import { useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDrizzleContext, useContracts } from "../drizzle";

export function useBuyTokens(ethValue: string = "0.1", quantity: number = 100) {
  const { library, account } = useWeb3React();
  const { Lottery } = useContracts();
  const ctx = useDrizzleContext();
  const [tx, setTx] = useState<object>({});

  console.log(ctx);

  const buyTokens = useCallback(async () => {
    if (ctx.initialized) {
      const tx = await Lottery.methods.buyLotteryTokens().send({
        from: account,
        value: library?.utils.toWei(ethValue, "ether"),
        gasLimit: 85000
      });
      setTx(tx)
    }
  }, [ctx.initialized]);

  return { buyTokens, tx };
}

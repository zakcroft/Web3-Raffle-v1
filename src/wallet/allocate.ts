import { useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useContracts } from "./contracts";

export function useAllocateTokens(quantity: number = 1000) {
  const { account } = useWeb3React();
  const [allocateTokensTx, setTx] = useState<object>({});
  const { Lottery, LotteryToken } = useContracts();

  const allocateTokens = useCallback(async () => {
    const tx = await LotteryToken.transfer(Lottery.address, quantity, {
      from: account,
    });
    setTx(tx);
  }, [Lottery, LotteryToken, account, quantity]);

  return { allocateTokens, allocateTokensTx };
}

import { useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useContracts } from "./contracts";

export function useApproveTokens(quantity: number = 100) {
  const { account } = useWeb3React();
  const [approveTx, setTx] = useState<object>({});
  const { Lottery, LotteryToken } = useContracts();

  // lotteryToken.approve(lottery.address, "100", { from:accounts[1] });
  const approveTokens = useCallback(async () => {
    const tx = await LotteryToken.increaseAllowance(Lottery.address, quantity, {
      from: account,
    });

    setTx(tx);
  }, [Lottery, LotteryToken, account, quantity]);

  return { approveTokens, approveTx };
}

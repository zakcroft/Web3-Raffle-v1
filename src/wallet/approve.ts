import { useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useContracts } from "./contracts";

export function useApproveTokens(
  ethValue: string = "0.1",
  quantity: number = 100
) {
  const { library, account } = useWeb3React();
  const [approveTx, setTx] = useState<object>({});
  const { Lottery, LotteryToken } = useContracts();

  // lotteryToken.approve(lottery.address, "100", { from:accounts[1] });
  const approveTokens = useCallback(async () => {
    const tx = await LotteryToken.approve(Lottery.address, quantity, {
      from: account,
      gasLimit: 85000,
    });
    setTx(tx);
  }, [Lottery, LotteryToken]);

  return { approveTokens, approveTx };
}

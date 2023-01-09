import { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useContracts } from "./contracts";

export function useEnterLottery(quantity: number = 100) {
  const { account } = useWeb3React();
  const [enterLotteryTx, setTx] = useState<object>({});
  const [err, setErr] = useState("");
  const { Lottery } = useContracts();

  //lottery.enterLottery("100", { from:accounts[1] })
  const enterLottery = useCallback(async () => {
    try {
      const tx = await Lottery.enterLottery(quantity, {
        from: account,
        gasLimit: 850000,
      });
      setTx(tx);
    } catch (ex: any) {
      setErr(ex.message);
    }
  }, [Lottery, account, quantity]);

  return { enterLottery, enterLotteryTx, err };
}

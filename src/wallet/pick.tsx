import { useCallback, useState } from "react";
import { useContracts } from "./contracts";
import { useWeb3React } from "@web3-react/core";

export function usePickWinner() {
  const { account } = useWeb3React();

  const [pickWinnerTx, setTx] = useState<object>({});
  const [err, setErr] = useState("");
  const { Lottery } = useContracts();

  //lottery.enterLottery("100", { from:accounts[1] })
  const pickWinner = useCallback(async () => {
    try {
      const tx = await Lottery.pickWinner({
        from: account,
        gasLimit: 85000,
      });
      setTx(tx);
    } catch (ex: any) {
      setErr(ex.message);
      //debugger
    }
  }, [Lottery]);

  return { pickWinner, pickWinnerTx, err };
}

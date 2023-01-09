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
    console.log(await Lottery.owner());
    try {
      const tx = await Lottery.pickWinner({
        from: account,
      });
      setTx(tx);
    } catch (ex: any) {
      setErr(ex.message);
    }
  }, [Lottery, account]);

  return { pickWinner, pickWinnerTx, err };
}

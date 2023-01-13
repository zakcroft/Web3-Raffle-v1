import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

import lotteryArtifact from "../../src/artifacts/Lottery.json";
import lotteryTokenArtifact from "../../src/artifacts/LotteryToken.json";

const contract = require("@truffle/contract");

export function useContracts() {
  const { library } = useWeb3React();
  const [contracts, setContracts] = useState<any>({});
  const [isContractsLoaded, setIsContractsLoaded] = useState(false);

  let Lottery = contract(lotteryArtifact);
  let LotteryToken = contract(lotteryTokenArtifact);

  useEffect(() => {
    (async () => {
      console.log("library===", library);
      if (library) {
        //console.log("RUN===");
        const provider = library.currentProvider;

        Lottery.setProvider(provider);
        LotteryToken.setProvider(provider);

        try {
          Lottery = await Lottery.deployed();
          LotteryToken = await LotteryToken.deployed();
          setContracts({
            Lottery,
            LotteryToken,
          });
          setIsContractsLoaded(true);
        } catch (e) {
          console.log("You are connected to the wrong network");
        }
      }
    })();

    //return () => setContracts({});
  }, [library]);

  //console.log("isContractsLoaded===", isContractsLoaded);
  // console.log("contracts in contracts===", contracts);
  return { ...contracts, isContractsLoaded };
}

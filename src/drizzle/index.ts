import { useContext } from "react";
import { Drizzle, generateStore } from "@drizzle/store";
import { DrizzleContext, drizzleReactHooks } from "@drizzle/react-plugin";
import logger from "redux-logger";

import Lottery from "../../src/artifacts/Lottery.json";
import LotteryToken from "../../src/artifacts/LotteryToken.json";

const drizzleOptions = {
  contracts: [Lottery, LotteryToken],
  events: {
    SimpleStorage: ["DataChanged"],
  },
};

const store = generateStore({
  // @ts-ignore
  drizzleOptions,
  //appMiddlewares: [logger],
});

const drizzle = new Drizzle(drizzleOptions as any, store);

function useDrizzleContext() {
  return useContext(DrizzleContext.Context) as any;
}
function useContracts() {
  return useDrizzleContext().drizzle.contracts;
}

export {
  DrizzleContext,
  drizzle,
  useDrizzleContext,
  drizzleReactHooks,
  useContracts,
};

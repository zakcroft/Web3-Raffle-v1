import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

import { provider } from "web3-core";

export async function getWeb3() {
  // @ts-ignore
  const provider = (await detectEthereumProvider()) as provider;
  //return new Web3(provider);

  //const contracts = await loadContract("Faucet", provider);

  //const web3 = new Web3(provider);

  //return web3;
}

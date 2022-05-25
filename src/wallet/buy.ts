import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import web3 from "web3";

export async function useBuyTokens() {
  const { account, library } = useWeb3React();
  //const [buying, setBuying] = useState(false);

  function

 // setBuying(true);
  const myAccount = "0x391EC0c94451e924C76a2B1ffc08268823f094e5"; //Account to receive payment
  const price = "0.1"; // This is the price in ETH for 100 tokens

  let obj = {
    to: myAccount,
    from: account,
    value: web3.utils.toWei(price, "ether"), // Needs to be converted to Wei units
    gas: 85000, // Eth ⛽ price
    gasLimit: "100000",
  };

 // !buying &&
    return (await library.eth.sendTransaction(obj, async (e, tx) => {
      if (e) {
        alert(`Something went wrong! Try switching accounts - ${e}`);
        // console.log("ERROR->", e);
        //setBuying(false);
      } else {
        //setBuying(false);
      }
    }));
}

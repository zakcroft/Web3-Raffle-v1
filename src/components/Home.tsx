import { useEffect } from "react";
import { useBuyTokens } from "../wallet/buy";

export function Home() {
  useEffect(() => {
    useBuyTokens()
      .then((res) => {
        debugger;
      })
      .catch((e) => {
        //console.log(e.message);
      });
  }, []);

  return (
    <>
      <div className={"text-white-200 mb-8"}>Lottery</div>

      <div className={"text-white-200 mb-8"}>
        Your Token Balance: <span>{20000}</span>
      </div>

      <button
        className="block bg-indigo-500 p-2 text-white font-semibold rounded hover:bg-indigo-700"
        onClick={buyTokens}
      >
        Buy 100 Lottery Tokens
      </button>

      <button className="block bg-indigo-500 mt-10 p-2 text-white font-semibold rounded hover:bg-indigo-700 ">
        Enter 100 Lottery tokens
      </button>

      <button className="block bg-indigo-500 mt-10 p-2 text-white font-semibold rounded hover:bg-indigo-700 ">
        Pick winner
      </button>

      <div className={"text-white-200 mt-10 "}>The winner is: {"0x....."}</div>
    </>
  );
}

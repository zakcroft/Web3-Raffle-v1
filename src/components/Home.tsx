import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useBuyTokens } from "../wallet/buy";
import { useEnterLottery } from "../wallet/enter";
import { useContracts } from "../wallet/contracts";
import { useApproveTokens } from "../wallet/approve";
import { usePickWinner } from "../wallet/pick";

export function Home() {
  const { buyTokens, buyTokensTx } = useBuyTokens();
  const { enterLottery, enterLotteryTx } = useEnterLottery();
  const { approveTokens, approveTx } = useApproveTokens();
  const { pickWinner, pickWinnerTx } = usePickWinner();
  const { account, library } = useWeb3React();
  const { Lottery, LotteryToken } = useContracts();

  const [walletEthBalance, setWalletEthBalance] = useState();
  const [lotterySalesBalance, setLotterySalesBalance] = useState();
  const [accountTokenBalance, setAccountTokenBalance] = useState();
  const [successBuyingEvent, setSuccessBuyingEvent] = useState(false);
  const [lotteryAllowance, setLotteryAllowance] = useState(0);
  const [lotteryEntered, setLotteryEntered] = useState<{
    addr?: string;
    amount?: number;
  }>({});

  //console.log(LotteryToken);
  useEffect(() => {
    (async () => {
      if (LotteryToken) {
        // listen to contract events
        Lottery.BuyTokens(() => {
          setSuccessBuyingEvent(true);
        });

        Lottery.Log((e: any, msg: any) => {
          const { args } = msg;
          if (args.msg === "Lottery Entered") {
            const addr = args.addr;
            const amount = args.amount;
            setLotteryEntered({
              addr,
              amount: amount.toString(),
            });
          }
          console.log(msg);
        });
      }
    })();
  }, [Lottery]);

  //console.log("RENDER", tx);

  useEffect(() => {
    (async () => {
      if (LotteryToken) {
        // wallet calls
        // get account address eth balance
        const walletBalance = await library.eth.getBalance(account);
        setWalletEthBalance(library?.utils.fromWei(walletBalance, "ether"));

        //ERC20 calls
        // get token balance for Lottery from ERC20 LotteryToken
        setLotterySalesBalance(
          (await LotteryToken.balanceOf(Lottery.address)).toString()
        );

        // get token balance for selected account from ERC20 LotteryToken
        setAccountTokenBalance(
          (await LotteryToken.balanceOf(account)).toString()
        );

        //lotteryToken.allowance(accounts[1], lottery.address)
        setLotteryAllowance(
          (await LotteryToken.allowance(account, Lottery.address)).toString()
        );
      }
    })();
  }, [LotteryToken, library, account, buyTokensTx, enterLotteryTx, approveTx, pickWinnerTx]);

  return (
    <>
      <div className={"text-white-200 mb-8"}>
        ETH wallet address: {account}
        <div>Balance: {walletEthBalance}</div>
      </div>
      <div className={"text-white-200 mb-8"}>
        Lottery balance for sale: {lotterySalesBalance}
      </div>

      <div className={"text-white-200 mb-8"}>Lottery</div>
      <div className={"text-white-200 mb-8"}>
        Your Lottery Token Balance: <span>{accountTokenBalance}</span>
      </div>

      <button
        className="block bg-indigo-500 p-2 text-white font-semibold rounded hover:bg-indigo-700"
        onClick={() => {
          setSuccessBuyingEvent(false);
          buyTokens();
        }}
      >
        Buy 100 Lottery Tokens
      </button>
      <div className={"text-white-200 mb-8"}>
        {successBuyingEvent ? "Token Bought OK." : " "}
      </div>

      <button
        className="block bg-indigo-500 mt-10 p-2 text-white font-semibold rounded hover:bg-indigo-700"
        onClick={approveTokens}
      >
        Approve Lottery Tokens
      </button>
      <div className={"text-white-200 mb-8"}>
        You have approved: <span>{lotteryAllowance}</span> tokens for the
        lottery contract to spend.
      </div>

      <button
        className="block bg-indigo-500 mt-10 p-2 text-white font-semibold rounded hover:bg-indigo-700"
        onClick={enterLottery}
      >
        Enter 100 Lottery tokens
      </button>
      <div className={"text-white-200 mb-8"}>
        {lotteryEntered.addr && (
          <p>
            Your address: {lotteryEntered.addr} has entered the lottery with{" "}
            {lotteryEntered.amount} tokens
          </p>
        )}
      </div>

      <button
        className="block bg-indigo-500 mt-10 p-2 text-white font-semibold rounded hover:bg-indigo-700"
        onClick={pickWinner}
      >
        Pick winner
      </button>
      <div className={"text-white-200 mt-10 "}>The winner is: {"0x....."}</div>
    </>
  );
}

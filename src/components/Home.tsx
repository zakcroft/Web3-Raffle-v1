import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";

import { useBuyTokens } from "../wallet/buy";
import { useEnterLottery } from "../wallet/enter";
import { useContracts } from "../wallet/contracts";
import { useApproveTokens } from "../wallet/approve";
import { usePickWinner } from "../wallet/pick";
import { useOpenLottery } from "../wallet/openLottery";
import { useAllocateTokens } from "../wallet/allocate";

import { updateEthBalance } from "../store/ethBalance";

export function Home() {
  const dispatch = useDispatch();
  const { buyTokens, buyTokensTx } = useBuyTokens();
  const { enterLottery, enterLotteryTx } = useEnterLottery();
  const { approveTokens, approveTx } = useApproveTokens();
  const { pickWinner, pickWinnerTx } = usePickWinner();
  const { openLottery, openLotteryTx } = useOpenLottery();
  const { allocateTokens, allocateTokensTx } = useAllocateTokens();
  const { account, library } = useWeb3React();
  const { Lottery, LotteryToken } = useContracts();

  const [lotteryOwner, setLotteryOwner] = useState();
  const [jackpot, setJackpot] = useState();
  const [lotterySalesBalance, setLotterySalesBalance] = useState();
  const [accountTokenBalance, setAccountTokenBalance] = useState();
  const [successBuyingEvent, setSuccessBuyingEvent] = useState(false);
  const [lotteryAllowance, setLotteryAllowance] = useState(0);
  const [lotteryEntered, setLotteryEntered] = useState<{
    addr?: string;
    amount?: number;
  }>({});
  const [winner, setWinner] = useState<{
    winner?: string;
    winnings?: number;
  }>({});

  const adminView = lotteryOwner === account;
  const jackpotCut = 0.9;
  const ownerCut = 0.1;

  useEffect(() => {
    (async () => {
      const walletBalance = await library?.eth.getBalance(account);
      const eth = library?.utils.fromWei(walletBalance, "ether");
      dispatch(updateEthBalance(Number(eth).toPrecision(4)));
    })();
  }, [library, account, buyTokensTx, dispatch]);

  useEffect(() => {
    (async () => {
      if (Lottery) {
        setLotteryOwner(await Lottery.owner());
      }
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

        Lottery.WinnerDeclared((e: any, msg: any) => {
          const { args } = msg;
          console.log(msg);
          setWinner({ ...args });
        });
      }
    })();
  }, [Lottery, LotteryToken]);

  useEffect(() => {
    (async () => {
      //console.log("RENDER 2");
      if (LotteryToken) {
        const lotteryEth = await library.eth.getBalance(Lottery.address);
        //console.log("str===", library.utils.toBN(lotteryEth).dividedBy(2));

        setJackpot(library.utils.fromWei(lotteryEth, "ether"));
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
  }, [
    LotteryToken,
    library,
    account,
    buyTokensTx,
    enterLotteryTx,
    approveTx,
    pickWinnerTx,
    openLotteryTx,
    allocateTokensTx,
  ]);
  //console.log("log", lotteryEntered);
  return (
    <>
      <div className="w-100 font-bold rounded-md bg-gradient-to-tr-200 border-green-600 text-red-600 ml-3">
        Jackpot ETH: {jackpot}
      </div>
      <div className="h-24 border-2 rounded-md mx-auto mt-4">
        <div
          className="flex bg-grey-200 text-white-600 items-center h-full justify-center text-3xl"
          title={account!}
        >
          Lottery tokens for sale:{" "}
          <div className="text-blue-600 pl-2">{lotterySalesBalance} </div>
        </div>
      </div>
      <div className="flex flex-col h-26 border-2 rounded-md mx-auto mt-4 justify-start justify-self-center pt-2">
        {!adminView && (
          <button
            className="block bg-indigo-500 p-2 text-white font-semibold rounded hover:bg-indigo-700 self-center"
            onClick={() => {
              setSuccessBuyingEvent(false);
              buyTokens();
            }}
          >
            Buy 100 Lottery Tokens
          </button>
        )}
        {adminView && (
          <button
            className="block bg-indigo-500 p-2 text-white font-semibold rounded hover:bg-indigo-700 self-center"
            onClick={() => {
              allocateTokens();
            }}
          >
            Allocate 1000 tokens to lottery
          </button>
        )}
        <div
          className="bg-grey-200 text-white-600 items-center h-full text-3xl self-center mt-2 "
          title={account!}
        >
          {adminView ? "Owners tokens" : "Your Lottery Token Balance:"}
          <span className="text-green-600 pl-2">{accountTokenBalance}</span>
        </div>
        <div className={"text-white-200 my-2 self-center"}>
          {successBuyingEvent ? "Token Bought OK." : " "}
        </div>
      </div>
      {!adminView ? (
        <>
          <div className="flex flex-col h-26 border-2 rounded-md mx-auto mt-4 justify-start justify-self-center pt-2">
            <button
              className="block bg-indigo-500 p-2 text-white font-semibold rounded hover:bg-indigo-700 self-center"
              onClick={approveTokens}
            >
              Approve Lottery Tokens
            </button>
            <div className={"text-white-200 my-2 self-center "}>
              You have approved:
              <span className="text-green-600 pl-2">
                {lotteryAllowance}
              </span>{" "}
              tokens for the lottery contract to spend.
            </div>
          </div>
          <div className="flex flex-col h-26 border-2 rounded-md mx-auto mt-4 justify-start justify-self-center pt-2">
            <button
              className="block bg-indigo-500 p-2 text-white font-semibold rounded hover:bg-indigo-700 self-center "
              onClick={enterLottery}
            >
              Enter 100 Lottery tokens
            </button>
            <div className={"text-white-200 my-2 self-center"}>
              <p>
                {lotteryEntered.addr ? (
                  <span>
                    You entered the lottery with{" "}
                    <span className="text-green-600">
                      {lotteryEntered.amount}
                    </span>{" "}
                    tokens
                  </span>
                ) : (
                  `You have not entered the lottery yet`
                )}
              </p>
            </div>
          </div>
        </>
      ) : null}
      <div className="flex flex-col h-26 border-2 rounded-md mx-auto mt-4 justify-start justify-self-center pt-2">
        {adminView ? (
          <button
            className="block bg-indigo-500 mt-2 p-2 text-white font-semibold rounded hover:bg-indigo-700 self-center "
            onClick={pickWinner}
          >
            Pick winner
          </button>
        ) : null}

        <div className={"text-white-200 my-2 self-center"}>
          <p>
            {winner?.winner
              ? `The winner is: ${winner.winner} with ${library?.utils.fromWei(
                  winner.winnings,
                  "ether"
                )} `
              : `Draw pending`}
          </p>
        </div>
        {/*<button*/}
        {/*  className="block bg-indigo-500 mt-2 p-2 text-white font-semibold rounded hover:bg-indigo-700 self-center "*/}
        {/*  onClick={openLottery}*/}
        {/*>*/}
        {/*  Open Lottery*/}
        {/*</button>*/}
      </div>
    </>
  );
}

export function Landing() {
  return (
    <>
      <h1 className={"ml-20 my-10 text-3xl"}>
        {" "}
        ERC20 token Simple lottery on Seploia network
      </h1>

      <p
        className={"ml-20 my-10 italic"}
      >{`Connect your wallet to the Sepolia network to start playing the Lottery`}</p>
      <span className={"ml-20"}>
        Sepolia INFO :{" "}
        <a href={"https://sepolia.dev/"} className={"text-green-600"}>
          https://sepolia.dev/
        </a>
      </span>

      <h1 className={"ml-20 my-10"}>
        {" "}
        Get some test ETH - Some faucets to use some work sometime and some not
        other times.
      </h1>
      <div className={"flex flex-col space-y-5"}>
        <a
          href={"https://sepoliafaucet.net/"}
          className={"ml-20 text-green-600"}
        >
          https://sepoliafaucet.net/
        </a>

        <a
          href={"https://sepolia-faucet.pk910.de/"}
          className={"ml-20 text-green-600"}
        >
          https://sepolia-faucet.pk910.de/
        </a>

        <a
          href={" https://faucet.sepolia.dev/"}
          className={"ml-20 text-green-600"}
        >
          https://faucet.sepolia.dev/
        </a>
      </div>
    </>
  );
}

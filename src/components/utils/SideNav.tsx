import { NavLink } from "react-router-dom";
import { useConnectWallet } from "../../wallet/connect";

export function SideNav() {
  const { connect, disconnect, isWalletConnected } = useConnectWallet();

  return (
    <>
      <nav className={"p-4 border-solid border-r-2"}>
        <NavLink
          className={({ isActive }) => {
            return `block m-5 hover:text-amber-300 hover:underline ${
              isActive ? "text-white" : "text-yellow-400"
            }`;
          }}
          to={`./`}
        >
          {isWalletConnected() ? (
            <>
              <button
                className="block bg-indigo-500 p-2 font-semibold rounded hover:bg-indigo-700"
                onClick={disconnect}
              >
                Disconnect Wallet
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={connect}
              className="block bg-indigo-500 p-2 font-semibold rounded hover:bg-indigo-700"
            >
              Connect Wallet
            </button>
          )}
        </NavLink>
      </nav>
    </>
  );
}

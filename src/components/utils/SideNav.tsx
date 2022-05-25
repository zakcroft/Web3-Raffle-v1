import { NavLink } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../wallet/Connector";
import web3 from "web3";

export function SideNav() {
  const { active, account, library, activate, deactivate } = useWeb3React();
  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      // console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      //console.log(ex);
    }
  }
  return (
    <>
      <nav className={"p-4 border-solid border-r-2"}>
        <NavLink
          className={({ isActive }) => {
            return `block m-5 hover:text-amber-300 hover:underline ${
              isActive ? "text-yellow-400" : "text-white"
            }`;
          }}
          to={`./side-nav`}
        >
          {active ? (
            <>
              Wallet connected
              <button
                className="block bg-indigo-500 p-2 text-white font-semibold rounded hover:bg-indigo-700"
                onClick={disconnect}
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={connect}
              className="block bg-indigo-500 p-2 text-white font-semibold rounded hover:bg-indigo-700"
            >
              Connect Wallet
            </button>
          )}
        </NavLink>
      </nav>
    </>
  );
}

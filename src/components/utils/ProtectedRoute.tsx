import { Navigate, Outlet } from "react-router-dom";
import { useConnectWallet } from "../../wallet/connect";
import { useContracts } from "../../wallet/contracts";

// @ts-ignore
export const ProtectedRoutes = () => {
  const { isWalletConnected } = useConnectWallet();
  const contracts = useContracts();
  console.log("1", contracts.isContractsLoaded);
  console.log("2", contracts);
  if (!isWalletConnected()) {
    console.log("isWalletConnected", isWalletConnected());

    return <Navigate to={"/"} replace />;
  }

  // TODO
  return contracts.isContractsLoaded && <Outlet />;
};

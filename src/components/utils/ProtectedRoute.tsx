import { Navigate, Outlet } from "react-router-dom";
import { useConnectWallet } from "../../wallet/connect";
import { useContracts } from "../../wallet/contracts";

// @ts-ignore
export const ProtectedRoutes = () => {
  const { isWalletConnected } = useConnectWallet();
  const { isContractsLoaded } = useContracts();

  if (!(isWalletConnected() || isContractsLoaded)) {
    return <Navigate to={"/"} replace />;
  }

  return isContractsLoaded ? <Outlet /> : <div>Loading</div>;
};

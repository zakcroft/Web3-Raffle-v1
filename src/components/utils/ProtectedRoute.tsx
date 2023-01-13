import { Navigate, Outlet } from "react-router-dom";
import { useConnectWallet } from "../../wallet/connect";
import { useContracts } from "../../wallet/contracts";

// @ts-ignore
// TODO startTransition
export const ProtectedRoutes = () => {
  const { isWalletConnected } = useConnectWallet();
  const { isContractsLoaded } = useContracts();

  console.log("isContractsLoaded", isContractsLoaded);
  //console.log(!(isWalletConnected() || isContractsLoaded));
  if (!(isWalletConnected() || isContractsLoaded)) {
    return <Navigate to={"/"} replace />;
  }

  return isContractsLoaded ? <Outlet /> : <div>Loading</div>;
};

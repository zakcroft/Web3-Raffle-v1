import { Navigate, Outlet } from "react-router-dom";
import { useConnectWallet } from "../../wallet/connect";


export const ProtectedRoutes = () => {
    const { isWalletConnected } = useConnectWallet();
    if (!isWalletConnected()) {
        return <Navigate to={"/"} replace />;
    }
    return <Outlet />;
};

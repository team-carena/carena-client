import { Navigate, Outlet } from "react-router";
import { ROUTE_PATH } from "./paths";

export const ProtectedRoute = () => {
	const isAuthenticated = true; // TODO: 임시, 추후 로그인 로직과 연동해 사용자가 인증되었는지 확인 필요

	if (!isAuthenticated) {
		return <Navigate to={ROUTE_PATH.LOGIN} replace={true} />;
	}

	return <Outlet />;
};

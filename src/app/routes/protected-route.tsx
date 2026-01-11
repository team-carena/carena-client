import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
	const isAuthenticated = true; // 임시, 추후 로그인 로직과 연동해 사용자가 인증되었는지 확인 필요

	if (!isAuthenticated) {
		return <Navigate to="/login" replace={true} />;
	}

	return <Outlet />;
};

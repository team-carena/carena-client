import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/shared/store/auth-store";
import { ROUTE_PATH } from "./paths";

export const ProtectedRoute = () => {
	const { isAuthenticated, isAuthCheckLoading } = useAuthStore();

	if (isAuthCheckLoading) {
		return null; // TODO: 로더 컴포넌트로 대체
	}

	if (!isAuthenticated) {
		return <Navigate to={ROUTE_PATH.LOGIN} replace />;
	}

	return <Outlet />;
};

import Lottie from "react-lottie-player";
import { Navigate, Outlet } from "react-router";
import LoadingGraphic from "@/shared/assets/lottie/spinner.json";
import { useAuthStore } from "@/shared/store/auth-store";
import { ROUTE_PATH } from "./paths";

export const ProtectedRoute = () => {
	const { isAuthenticated, isAuthCheckLoading } = useAuthStore();

	if (isAuthCheckLoading) {
		return (
			<div className="flex min-h-dvh items-center justify-center">
				<Lottie
					animationData={LoadingGraphic}
					aria-hidden="true"
					tabIndex={-1}
					speed={0.57}
					loop
					play
					className="h-[22rem] w-[20rem]"
				/>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to={ROUTE_PATH.LOGIN} replace />;
	}

	return <Outlet />;
};

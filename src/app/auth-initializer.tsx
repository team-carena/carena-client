import { type ReactNode, useEffect } from "react";
import { useAuthStore } from "@/shared/store/auth-store";

type AuthInitializerProps = {
	children: ReactNode;
};

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
	const { setAccessToken, setAuthenticated, setAuthCheckLoading } =
		useAuthStore();

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				//const res = await apiClient.post("/auth/refresh");
				setAccessToken("");
				setAuthenticated(true); // 성공
			} catch {
				setAuthenticated(false); // 실패
			} finally {
				setAuthCheckLoading(false); // 확정
			}
		};

		void initializeAuth();
	}, [setAccessToken, setAuthenticated, setAuthCheckLoading]);

	return <>{children}</>;
};

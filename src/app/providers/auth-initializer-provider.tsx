import { type ReactNode, useEffect } from "react";
import { postRefreshToken } from "@/shared/apis/auth/post-refresh-token";
import { useAuthStore } from "@/shared/store/auth-store";

type AuthInitializerProps = {
	children: ReactNode;
};

export const AuthInitializerProvider = ({ children }: AuthInitializerProps) => {
	const { setAccessToken, setAuthenticated, setAuthCheckLoading } =
		useAuthStore();

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const response = await postRefreshToken();
				setAccessToken(response.headers["authorization"]);
				setAuthenticated(true);
			} catch {
				setAuthenticated(false);
			} finally {
				setAuthCheckLoading(false);
			}
		};

		void initializeAuth();
	}, [setAccessToken, setAuthenticated, setAuthCheckLoading]);

	return <>{children}</>;
};

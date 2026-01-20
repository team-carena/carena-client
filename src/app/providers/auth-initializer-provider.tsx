import { type ReactNode, useEffect } from "react";
import { postRefreshAccessToken } from "@/shared/apis/auth/post-refresh-token";
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
				const response = await postRefreshAccessToken();

				const authorization = response.headers["authorization"];

				if (!authorization) {
					console.error("[AuthInit] Authorization 헤더 누락");
					throw new Error("Authorization header missing.");
				}

				const accessToken = authorization.replace(/^Bearer\s+/i, "");

				setAccessToken(accessToken);
				setAuthenticated(true);
			} catch (error) {
				setAuthenticated(false);
			} finally {
				setAuthCheckLoading(false);
			}
		};

		void initializeAuth();
	}, [setAccessToken, setAuthenticated, setAuthCheckLoading]);

	return <>{children}</>;
};

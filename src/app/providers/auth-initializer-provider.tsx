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
				const authorization = response.headers["authorization"];
				if (authorization) {
					setAccessToken(authorization.replace(/^Bearer\s+/i, ""));
				} else {
					throw new Error("Authorization header missing.");
				}
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

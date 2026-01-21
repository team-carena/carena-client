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
				const storedToken = localStorage.getItem("accessToken");
				if (storedToken) {
					const accessToken = storedToken.replace(/^Bearer\s+/i, "");
					setAccessToken(accessToken);
					setAuthenticated(true);
					return;
				}

				const response = await postRefreshAccessToken();

				const authorization = response.headers.authorization;

				if (!authorization) {
					throw new Error("Authorization header missing.");
				}

				const accessToken = authorization.replace(/^Bearer\s+/i, "");

				setAccessToken(accessToken);
				setAuthenticated(true);
			} catch (_error) {
				setAuthenticated(false);
			} finally {
				setAuthCheckLoading(false);
			}
		};

		void initializeAuth();
	}, [setAccessToken, setAuthenticated, setAuthCheckLoading]);

	return <>{children}</>;
};

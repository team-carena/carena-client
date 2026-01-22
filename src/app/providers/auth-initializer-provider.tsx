import { type ReactNode, useEffect } from "react";
import { postRefreshAccessToken } from "@/shared/apis/auth/use-refresh-token";
import { useAuthStore } from "@/shared/store/auth-store";

type AuthInitializerProps = {
	children: ReactNode;
};

export const AuthInitializerProvider = ({ children }: AuthInitializerProps) => {
	const { setAccessToken, setAuthenticated, setAuthCheckLoading } =
		useAuthStore();

	useEffect(() => {
		const initializeAuth = async () => {
			// 첫 로그인이라 OauthCallback에서 이미 accessToken 인증이 완료된 경우 accessToken refresh 스킵
			const { isAuthenticated } = useAuthStore.getState();
			if (isAuthenticated) {
				return;
			}

			try {
				// AuthInitializer는 앱 시작 시 한 번 호출되며, UI 상태가 불필요하므로 굳이 useMutation 사용 불필요
				const response = await postRefreshAccessToken();

				const authorization = response.headers.authorization;

				if (!authorization) {
					throw new Error("Authorization header missing.");
				}

				const accessToken = authorization.replace(/^Bearer\s+/i, "");

				setAccessToken(accessToken);
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

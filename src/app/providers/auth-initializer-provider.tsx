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
			console.info("[AuthInit] 인증 초기화 시작");

			try {
				console.info("[AuthInit] refresh token 요청");

				const response = await postRefreshToken();

				console.info("[AuthInit] refresh token 응답 수신");

				const authorization = response.headers["authorization"];

				if (!authorization) {
					console.error("[AuthInit] Authorization 헤더 누락");
					throw new Error("Authorization header missing.");
				}

				const accessToken = authorization.replace(/^Bearer\s+/i, "");

				console.info("[AuthInit] access token 설정");

				setAccessToken(accessToken);
				setAuthenticated(true);

				console.info("[AuthInit] 인증 상태: 로그인됨");
			} catch (error) {
				console.warn("[AuthInit] 인증 실패", error);
				setAuthenticated(false);
			} finally {
				setAuthCheckLoading(false);
				console.info("[AuthInit] 인증 체크 종료");
			}
		};

		void initializeAuth();
	}, [setAccessToken, setAuthenticated, setAuthCheckLoading]);

	return <>{children}</>;
};

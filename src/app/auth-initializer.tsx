import { useEffect } from "react";
import { apiClient } from "@/shared/apis/api-client";
import { useAuthStore } from "@/shared/store/auth-store";

export const AuthInitializer = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { setAccessToken, setAuthenticated, setAuthCheckLoading } =
		useAuthStore();

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const res = await apiClient.post("/auth/refresh"); // TODO: 임시, 추후 api 함수로 대체
				setAccessToken(res.data.accessToken);
				setAuthenticated(true); // 성공
			} catch {
				setAuthenticated(false); // 실패
			} finally {
				setAuthCheckLoading(false); // 확정 (결과 나옴)
			}
		};

		void initializeAuth();
	}, [setAccessToken, setAuthenticated, setAuthCheckLoading]);

	return <div>{children}</div>;
};

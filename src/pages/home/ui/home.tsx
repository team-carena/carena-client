import { useEffect } from "react";
import { useAuthStore } from "@/shared/store/auth-store";
import { Tabs } from "@/shared/ui/tabs/tabs";
import { postAccessToken } from "../api/post-access-token";
import UserInfo from "../health-info/components/user-info";
import HealthInfoPage from "../health-info/health-info";

export const HomePage = () => {
	const { setAccessToken, setAuthenticated, setAuthCheckLoading, logout } =
		useAuthStore();

	useEffect(() => {
		const initAuth = async () => {
			try {
				const response = await postAccessToken();
				const authHeader = response.headers["authorization"];

				if (!authHeader) {
					throw new Error("Authorization header not found");
				}

				const accessToken = authHeader.replace("Bearer ", "");

				setAccessToken(accessToken);
				setAuthenticated(true);
			} catch (error) {
				// refresh 실패 or 비로그인 상태
				logout();
			} finally {
				setAuthCheckLoading(false);
			}
		};

		void initAuth();
	}, [setAccessToken, setAuthenticated, setAuthCheckLoading, logout]);

	return (
		<div className="flex w-full flex-col">
			<UserInfo />
			<Tabs defaultTab="health-info">
				<Tabs.List>
					<Tabs.Trigger value="health-info">건강정보</Tabs.Trigger>
					<Tabs.Trigger value="health-tips">검진결과분석</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="health-info">
					<HealthInfoPage />
				</Tabs.Content>
				<Tabs.Content value="health-tips">
					<div>검진결과분석 내용입니다.</div>
				</Tabs.Content>
			</Tabs>
		</div>
	);
};

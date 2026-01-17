import { Tabs } from "@/shared/ui/tabs/tabs";
import UserInfo from "../health-info/components/user-info";
import HealthInfoPage from "../health-info/health-info";

export const HomePage = () => {
	return (
		<div className="flex flex-col w-full">
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

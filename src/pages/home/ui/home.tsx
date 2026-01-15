import { Tabs } from "@/shared/ui/tabs/tabs";

export const HomePage = () => {
	return (
		<Tabs defaultTab="health-info">
			<Tabs.List>
				<Tabs.Trigger value="health-info">건강정보</Tabs.Trigger>
				<Tabs.Trigger value="health-tips">검진결과분석</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="health-info">
				<div className="p-[1.6rem]">건강 정보 내용입니다.</div>
			</Tabs.Content>
			<Tabs.Content value="health-tips">
				<div className="p-[1.6rem]">검진결과분석 내용입니다.</div>
			</Tabs.Content>
		</Tabs>
	);
};

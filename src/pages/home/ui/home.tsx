import { Tabs } from "@/shared/ui/tabs/tabs";

export const HomePage = () => {
	return (
		<Tabs defaultTab="health-info">
			<Tabs.List>
				<Tabs.Trigger value="health-info">건강정보</Tabs.Trigger>
				<Tabs.Trigger value="health-tips">검진결과분석</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="health-info">
				<div className="flex flex-col gap-[1.6rem] p-[1.6rem]">
					{Array.from({ length: 30 }, (_, i) => (
						<div
							key={`health-${i + 1}`}
							className="rounded-[0.8rem] bg-white p-[1.6rem]"
						>
							건강 정보 카드 {i + 1}
						</div>
					))}
				</div>
			</Tabs.Content>
			<Tabs.Content value="health-tips">
				<div className="flex flex-col gap-[1.6rem] p-[1.6rem]">
					{Array.from({ length: 30 }, (_, i) => (
						<div
							key={`tips-${i + 1}`}
							className="rounded-[0.8rem] bg-white p-[1.6rem]"
						>
							검진결과분석 카드 {i + 1}
						</div>
					))}
				</div>
			</Tabs.Content>
		</Tabs>
	);
};

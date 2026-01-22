import { Tabs } from "@shared/ui/tabs/tabs";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Tabs> = {
	title: "tabs/tabs",
	component: Tabs,
	tags: ["autodocs"],
	argTypes: {
		defaultTab: {
			control: "text",
			description: "기본 선택 탭 값",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	render: () => (
		<Tabs defaultTab="tab1">
			<Tabs.List>
				<Tabs.Trigger value="tab1">탭 1</Tabs.Trigger>
				<Tabs.Trigger value="tab2">탭 2</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="tab1">
				<div className="p-[1.6rem]">탭 1 내용입니다.</div>
			</Tabs.Content>
			<Tabs.Content value="tab2">
				<div className="p-[1.6rem]">탭 2 내용입니다.</div>
			</Tabs.Content>
		</Tabs>
	),
};

export const ThreeTabs: Story = {
	render: () => (
		<Tabs defaultTab="health-info">
			<Tabs.List>
				<Tabs.Trigger value="health-info">건강정보</Tabs.Trigger>
				<Tabs.Trigger value="health-analysis">검진결과분석</Tabs.Trigger>
				<Tabs.Trigger value="my-record">나의 기록</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="health-info">
				<div className="p-[1.6rem]">건강 정보 내용입니다.</div>
			</Tabs.Content>
			<Tabs.Content value="health-analysis">
				<div className="p-[1.6rem]">검진결과분석 내용입니다.</div>
			</Tabs.Content>
			<Tabs.Content value="my-record">
				<div className="p-[1.6rem]">나의 기록 내용입니다.</div>
			</Tabs.Content>
		</Tabs>
	),
};

export const WithLongContent: Story = {
	render: () => (
		<div className="h-[300px] overflow-auto">
			<Tabs defaultTab="tab1">
				<Tabs.List>
					<Tabs.Trigger value="tab1">탭 1</Tabs.Trigger>
					<Tabs.Trigger value="tab2">탭 2</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="tab1">
					<div className="p-[1.6rem]">
						{Array.from({ length: 20 }, (_, i) => (
							<p key={`${i + 1}`} className="mb-[1rem]">
								스크롤 테스트를 위한 긴 내용 {i + 1}
							</p>
						))}
					</div>
				</Tabs.Content>
				<Tabs.Content value="tab2">
					<div className="p-[1.6rem]">탭 2 내용입니다.</div>
				</Tabs.Content>
			</Tabs>
		</div>
	),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "@/shared/ui/overlays/tooltip/tooltip";

const meta: Meta<typeof Tooltip> = {
	title: "overlays/tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	args: {
		children:
			"본 서비스의 검진결과 해석 및 종합판단은 보건복지부가 고시한 국가건강검진 판정 기준을 참고하여 제공됩니다.",
	},
	argTypes: {
		side: {
			control: "select",
			options: ["top", "bottom", "left", "right"],
			description: "툴팁이 표시되는 방향",
		},
		align: {
			control: "select",
			options: ["start", "center", "end"],
			description: "툴팁 정렬 위치",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
	args: { side: "top" },
	decorators: [
		(Story) => (
			<div className="flex min-h-[300px] items-center justify-center pt-[200px]">
				<Story />
			</div>
		),
	],
};

export const Bottom: Story = {
	args: { side: "bottom" },
	decorators: [
		(Story) => (
			<div className="flex min-h-[300px] items-center justify-center pb-[200px]">
				<Story />
			</div>
		),
	],
};

export const Left: Story = {
	args: { side: "left" },
	decorators: [
		(Story) => (
			<div className="flex min-h-[200px] items-center justify-end pr-[50px]">
				<Story />
			</div>
		),
	],
};

export const Right: Story = {
	args: { side: "right" },
	decorators: [
		(Story) => (
			<div className="flex min-h-[200px] items-center justify-start pl-[50px]">
				<Story />
			</div>
		),
	],
};

export const AllDirections: Story = {
	render: () => (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-[100px] py-[150px]">
			<div className="flex items-center gap-2">
				<span className="body05-r-12 text-gray-600">Top:</span>
				<Tooltip side="top">위쪽에 표시되는 툴팁입니다.</Tooltip>
			</div>
			<div className="flex items-center gap-2">
				<span className="body05-r-12 text-gray-600">Bottom:</span>
				<Tooltip side="bottom">아래쪽에 표시되는 툴팁입니다.</Tooltip>
			</div>
			<div className="flex items-center gap-2 self-end pr-[300px]">
				<span className="body05-r-12 text-gray-600">Left:</span>
				<Tooltip side="left">왼쪽에 표시되는 툴팁입니다.</Tooltip>
			</div>
			<div className="flex items-center gap-2 self-start pl-[300px]">
				<span className="body05-r-12 text-gray-600">Right:</span>
				<Tooltip side="right">오른쪽에 표시되는 툴팁입니다.</Tooltip>
			</div>
		</div>
	),
};

export const LongContent: Story = {
	args: {
		side: "top",
		children: `본 서비스의 검진결과 해석 및 종합판단은 보건복지부가 고시한 국가건강검진 판정 기준을 참고하여 제공됩니다. 단, 병원 및 검사기관에 따라 적용 기준이나 참고 범위가 일부 다를 수 있습니다.

<구분 기준>
정상 A: 모든 검진 항목이 정상 범위에 해당하는 경우
정상 B(경계): 하나 이상의 검진 항목이 경계 범위에 해당하는 경우
의심: 하나 이상의 검진 항목에서 질환이 의심되는 소견이 확인된 경우`,
	},
	decorators: [
		(Story) => (
			<div className="flex min-h-[400px] items-center justify-center pt-[300px]">
				<Story />
			</div>
		),
	],
};

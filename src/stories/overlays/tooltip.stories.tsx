import { Tooltip } from "@shared/ui/overlays/tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
			<div className="flex items-center justify-center min-h-[300px] pt-[200px]">
				<Story />
			</div>
		),
	],
};

export const Bottom: Story = {
	args: { side: "bottom" },
	decorators: [
		(Story) => (
			<div className="flex items-center justify-center min-h-[300px] pb-[200px]">
				<Story />
			</div>
		),
	],
};

export const Left: Story = {
	args: { side: "left" },
	decorators: [
		(Story) => (
			<div className="flex items-center justify-end min-h-[200px] pr-[50px]">
				<Story />
			</div>
		),
	],
};

export const Right: Story = {
	args: { side: "right" },
	decorators: [
		(Story) => (
			<div className="flex items-center justify-start min-h-[200px] pl-[50px]">
				<Story />
			</div>
		),
	],
};

export const AllDirections: Story = {
	render: () => (
		<div className="flex flex-col items-center justify-center min-h-[500px] gap-[100px] py-[150px]">
			<div className="flex items-center gap-2">
				<span className="text-gray-600 body05-r-12">Top:</span>
				<Tooltip side="top">위쪽에 표시되는 툴팁입니다.</Tooltip>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-gray-600 body05-r-12">Bottom:</span>
				<Tooltip side="bottom">아래쪽에 표시되는 툴팁입니다.</Tooltip>
			</div>
			<div className="flex items-center gap-2 self-end pr-[300px]">
				<span className="text-gray-600 body05-r-12">Left:</span>
				<Tooltip side="left">왼쪽에 표시되는 툴팁입니다.</Tooltip>
			</div>
			<div className="flex items-center gap-2 self-start pl-[300px]">
				<span className="text-gray-600 body05-r-12">Right:</span>
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
			<div className="flex items-center justify-center min-h-[400px] pt-[300px]">
				<Story />
			</div>
		),
	],
};

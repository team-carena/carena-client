import { CardTable } from "@shared/ui/card/card-table";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CardTable> = {
	title: "card/CardTable",
	component: CardTable,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="w-[375px]">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof CardTable>;

const defaultRows = [
	{ id: "row-1", label: "text", value: "text, text, text" },
	{ id: "row-2", label: "text", value: "text, text, text" },
	{ id: "row-3", label: "text", value: "text, text, text, text, text, text" },
] as const;

export const Default: Story = {
	render: () => (
		<CardTable headerLeft="권장 식품" headerRight="요리" rows={defaultRows} />
	),
};

export const LongText: Story = {
	render: () => (
		<CardTable
			headerLeft="항목"
			headerRight="메모"
			rows={[
				{
					id: "long-text-1",
					label: "식단 관리 팁",
					value: (
						<>
							하루 동안의 섭취량을 체크하세요.
							{"\n"}물 섭취도 잊지 마세요.
						</>
					),
				},
				{
					id: "long-text-2",
					label: "당질",
					value: "균형 있게 섭취하기",
				},
				{
					id: "long-text-3",
					label: "나트륨",
					value: "하루 2,000mg 이하",
				},
			]}
		/>
	),
};

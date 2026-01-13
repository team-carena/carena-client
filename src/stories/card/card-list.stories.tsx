import CardList from "@shared/ui/card/card-list";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CardList> = {
	title: "card/CardList",
	component: CardList,
	tags: ["autodocs"],
	args: {
		children: "당뇨식",
	},
	argTypes: {
		more: {
			control: "boolean",
			description: "더보기 아이콘 표시 여부 (active 스타일 적용)",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-[375px]">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof CardList>;

export const Default: Story = {
	args: { more: false },
};

export const WithMore: Story = {
	args: { more: true },
};

export const Multiple: Story = {
	render: () => (
		<div className="flex flex-col">
			<CardList more={true}>당뇨식</CardList>
			<CardList more={true}>고혈압식</CardList>
			<CardList>일반식</CardList>
		</div>
	),
};

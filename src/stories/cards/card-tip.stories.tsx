import type { Meta, StoryObj } from "@storybook/react-vite";
import CardTip from "@/shared/ui/cards/card-tip";

const meta: Meta<typeof CardTip> = {
	title: "card/CardTip",
	component: CardTip,
	tags: ["autodocs"],
	args: {
		children: "어쩌고 저쩌고 하나요?",
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
type Story = StoryObj<typeof CardTip>;

export const Default: Story = {
	args: { more: false },
};

export const WithMore: Story = {
	args: { more: true },
};

export const MultiLine: Story = {
	args: {
		children:
			"두 줄로 표시되는 긴 텍스트를 테스트합니다. 이렇게 길어지면 어떻게 보일까요?",
		more: true,
	},
};

export const Multiple: Story = {
	render: () => (
		<div className="flex flex-col gap-[0.8rem]">
			<CardTip more={true}>어쩌고 저쩌고 하나요?</CardTip>
			<CardTip more={true}>이건 어떻게 하나요?</CardTip>
			<CardTip>클릭 안되는 팁</CardTip>
		</div>
	),
};

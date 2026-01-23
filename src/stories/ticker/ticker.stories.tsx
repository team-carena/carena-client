import type { Meta, StoryObj } from "@storybook/react-vite";
import { Ticker } from "@/shared/ui/ticker/ticker";

const meta: Meta<typeof Ticker> = {
	title: "Components/Ticker",
	component: Ticker,
	parameters: {
		layout: "centered",
	},
};

export default meta;

type Story = StoryObj<typeof Ticker>;

export const Default: Story = {
	args: {
		tips: [
			{ id: "1", title: "하루 2리터 이상 물을 마셔주세요" },
			{ id: "2", title: "규칙적인 수면은 면역력을 높입니다" },
			{ id: "3", title: "스트레칭은 혈액순환에 좋아요" },
		],
	},
};

export const SingleTip: Story = {
	args: {
		tips: [{ id: "1", title: "가벼운 산책만으로도 건강에 도움이 됩니다" }],
	},
};

export const Empty: Story = {
	args: {
		tips: [],
	},
};

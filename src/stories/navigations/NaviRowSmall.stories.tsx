import { NaviRowSmall } from "@shared/ui/navigations/NaviRowSmall";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof NaviRowSmall> = {
	title: "shared/navigations/NaviRowSmall",
	component: NaviRowSmall,
	tags: ["autodocs"],
	argTypes: {
		label: {
			control: "text",
			description: "좌측에 표시되는 텍스트",
		},
		actionLabel: {
			control: "text",
			description: "우측 액션 텍스트",
		},
		state: {
			control: "radio",
			options: ["default", "pressing"],
			description: "Row의 선택/강조 상태",
		},
	},
};

export default meta;
type Story = StoryObj<typeof NaviRowSmall>;

export const Default: Story = {
	args: {
		label: "텍스트",
		actionLabel: "더보기",
		state: "default",
	},
};

export const Pressing: Story = {
	args: {
		label: "텍스트",
		actionLabel: "더보기",
		state: "pressing",
	},
};

// 모바일 웹에서 터치 중(active) 상태를 확인하기 위한 스토리
export const Active: Story = {
	args: {
		label: "텍스트",
		actionLabel: "더보기",
		state: "default",
	},
	parameters: {
		pseudo: { active: true },
	},
};

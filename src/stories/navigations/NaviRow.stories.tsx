import { NaviRow } from "@shared/ui/navigations/NaviRow";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof NaviRow> = {
	title: "shared/navigations/NaviRow",
	component: NaviRow,
	tags: ["autodocs"],
	argTypes: {
		label: {
			control: "text",
			description: "navi_row에 표시되는 텍스트",
		},
		state: {
			control: "radio",
			options: ["default", "pressing"],
			description: "선택된 상태를 나타냅니다.",
		},
		onClick: {
			action: "clicked",
		},
	},
};

export default meta;
type Story = StoryObj<typeof NaviRow>;

export const Default: Story = {
	args: {
		label: "Text",
		state: "default",
	},
};

export const Pressing: Story = {
	args: {
		label: "Text",
		state: "pressing",
	},
};

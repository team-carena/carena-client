import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/shared/ui/button";

const meta: Meta<typeof Button> = {
	title: "Common/Button",
	component: Button,
	tags: ["autodocs"],
	args: {
		children: "Button",
		disabled: false,
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "secondary", "outline", "destructive"],
			description: "버튼 스타일",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "버튼 크기",
		},
		disabled: {
			control: "boolean",
			description: "비활성화 여부",
		},
		onClick: {
			action: "clicked",
			description: "버튼 클릭 이벤트",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		variant: "default",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/shared/ui/buttons/button";

const meta: Meta<typeof Button> = {
	title: "Shared/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		size: {
			control: "radio",
			options: ["sm", "lg"],
		},
		disabled: {
			control: "boolean",
		},
		children: {
			control: "text",
		},
		onClick: { action: "clicked" },
	},
	args: {
		children: "Button",
		size: "lg",
		disabled: false,
	},
};

export default meta;
type Story = StoryObj<typeof Button>;
export const Default: Story = {};

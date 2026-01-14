import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddButton } from "@/shared/ui/buttons/add-button";

const meta: Meta<typeof AddButton> = {
	title: "Shared/Button/AddButton",
	component: AddButton,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		onClick: { action: "clicked" },
		disabled: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof AddButton>;
export const Default: Story = {};

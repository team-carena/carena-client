import { SelectList } from "@shared/ui/navigations/SelectList";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof SelectList> = {
	title: "shared/navigations/SelectList",
	component: SelectList,
	tags: ["autodocs"],
	argTypes: {
		label: {
			control: "text",
			description: "리스트에 표시되는 텍스트",
		},
		onClick: {
			action: "clicked",
		},
	},
};

export default meta;
type Story = StoryObj<typeof SelectList>;

export const Default: Story = {
	args: {
		label: "텍스트",
	},
};

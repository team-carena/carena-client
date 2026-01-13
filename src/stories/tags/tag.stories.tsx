import Tag from "@shared/ui/tags/tag";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Tag> = {
	title: "tags/tag",
	component: Tag,
	tags: ["autodocs"],
	args: {
		children: "#태그",
	},
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
	args: { children: "#태그" },
};

export const Multiple: Story = {
	render: () => (
		<div className="flex gap-[0.8rem]">
			<Tag>#건강</Tag>
			<Tag>#운동</Tag>
			<Tag>#식단</Tag>
		</div>
	),
};

import { SmallBadge } from "@shared/ui/badges/small-badge";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof SmallBadge> = {
	title: "badges/small-badge",
	component: SmallBadge,
	tags: ["autodocs"],
	args: {
		children: "정상",
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["normal", "borderline", "suspicious"],
			description: "뱃지 상태",
		},
	},
};

export default meta;
type Story = StoryObj<typeof SmallBadge>;

export const Normal: Story = {
	args: { variant: "normal", children: "정상" },
};

export const Borderline: Story = {
	args: { variant: "borderline", children: "경계" },
};

export const Suspicious: Story = {
	args: { variant: "suspicious", children: "의심" },
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex gap-[0.8rem]">
			<SmallBadge variant="normal">정상</SmallBadge>
			<SmallBadge variant="borderline">경계</SmallBadge>
			<SmallBadge variant="suspicious">의심</SmallBadge>
		</div>
	),
};

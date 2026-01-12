import { LargeBadge } from "@shared/ui/badges/large-badge";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof LargeBadge> = {
	title: "badges/large-badge",
	component: LargeBadge,
	tags: ["autodocs"],
	args: {
		children: "정상A",
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
type Story = StoryObj<typeof LargeBadge>;

export const Normal: Story = {
	args: { variant: "normal", children: "정상A" },
};

export const Borderline: Story = {
	args: { variant: "borderline", children: "정상B" },
};

export const Suspicious: Story = {
	args: { variant: "suspicious", children: "의심" },
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex gap-[0.8rem]">
			<LargeBadge variant="normal">정상A</LargeBadge>
			<LargeBadge variant="borderline">정상B</LargeBadge>
			<LargeBadge variant="suspicious">의심</LargeBadge>
		</div>
	),
};

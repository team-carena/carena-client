import Chip from "@shared/ui/chips/chip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta: Meta<typeof Chip> = {
	title: "chips/chip",
	component: Chip,
	tags: ["autodocs"],
	args: {
		children: "생활습관",
	},
	argTypes: {
		status: {
			control: "select",
			options: ["on", "off"],
			description: "칩 상태",
		},
		onClick: {
			action: "clicked",
			description: "클릭 이벤트",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const On: Story = {
	args: { status: "on", children: "전체" },
};

export const Off: Story = {
	args: { status: "off", children: "겨울" },
};

export const AllStatus: Story = {
	render: () => (
		<div className="flex gap-[0.8rem]">
			<Chip status="on">전체</Chip>
			<Chip status="off">겨울</Chip>
			<Chip status="off">20대</Chip>
		</div>
	),
};

export const Interactive: Story = {
	render: () => {
		const [selected, setSelected] = useState("전체");
		const labels = ["전체", "겨울", "20대", "생활습관", "건강목표"];

		return (
			<div className="flex gap-[0.8rem]">
				{labels.map((label) => (
					<Chip
						key={label}
						status={selected === label ? "on" : "off"}
						onClick={() => setSelected(label)}
					>
						{label}
					</Chip>
				))}
			</div>
		);
	},
};

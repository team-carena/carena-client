import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DropDown } from "@/shared/ui/drop-down/drop-down";

const meta: Meta<typeof DropDown> = {
	title: "Components/DropDown",
	component: DropDown,
	argTypes: {
		onValueChange: { action: "value changed" },
	},
};

export default meta;

type Story = StoryObj<typeof DropDown>;

const options = [
	{
		value: "2025-11-02",
		label: "2025년 11월 02일",
		subLabel: "서울 아산 대구 병원",
	},
	{
		value: "2025-11-31",
		label: "2025년 11월 31일",
		subLabel: "부산 병원",
	},
	{
		value: "2025-12-22",
		label: "2025년 12월 22일",
		subLabel: "대구 병원",
	},
];

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState(args.value);

		return (
			<DropDown
				{...args}
				value={value}
				onValueChange={(v) => {
					setValue(v);
					args.onValueChange?.(v);
				}}
			/>
		);
	},
	args: {
		value: "2025-11-02",
		options,
	},
};

export const SingleOptionDisabled: Story = {
	args: {
		value: "2025-11-02",
		options: [
			{
				value: "2025-11-02",
				label: "2025년 11월 02일",
				subLabel: "서울 아산 병원",
			},
		],
	},
};

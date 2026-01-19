import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { InputSmall } from "@/shared/ui/inputs/input-small";

/* 모바일 웹 레이아웃 wrapper */
const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="w-full min-w-[37.5rem] max-w-[44rem] px-[1.6rem]">
		{children}
	</div>
);

const meta: Meta<typeof InputSmall> = {
	title: "input/InputSmall",
	component: InputSmall,
	decorators: [
		(Story) => (
			<MobileWrapper>
				<Story />
			</MobileWrapper>
		),
	],
};

export default meta;
type Story = StoryObj<typeof InputSmall>;

// Default
export const Default: Story = {
	render: () => {
		const [left, setLeft] = React.useState("");
		const [right, setRight] = React.useState("");

		return (
			<InputSmall
				left={{
					label: "키",
					unit: "cm",
					value: left,
					onChange: (e) => setLeft(e.target.value),
				}}
				right={{
					label: "몸무게",
					unit: "kg",
					value: right,
					onChange: (e) => setRight(e.target.value),
				}}
			/>
		);
	},
};

// Completed
export const Completed: Story = {
	render: () => {
		const [left, setLeft] = React.useState("170");
		const [right, setRight] = React.useState("60");

		return (
			<InputSmall
				left={{
					label: "키",
					unit: "cm",
					value: left,
					onChange: (e) => setLeft(e.target.value),
				}}
				right={{
					label: "몸무게",
					unit: "kg",
					value: right,
					onChange: (e) => setRight(e.target.value),
				}}
			/>
		);
	},
};

// Error
export const ErrorState: Story = {
	render: () => {
		const [left, setLeft] = React.useState("170");
		const [right, setRight] = React.useState("999");

		return (
			<InputSmall
				left={{
					label: "키",
					unit: "cm",
					value: left,
					onChange: (e) => setLeft(e.target.value),
				}}
				right={{
					label: "몸무게",
					unit: "kg",
					value: right,
					onChange: (e) => setRight(e.target.value),
				}}
				errorMessage="수치를 다시 한 번 확인해 주세요."
			/>
		);
	},
};

// Disabled
export const Disabled: Story = {
	render: () => (
		<InputSmall
			left={{
				label: "키",
				unit: "cm",
				value: "170",
				disabled: true,
				onChange: () => {},
			}}
			right={{
				label: "몸무게",
				unit: "kg",
				value: "60",
				disabled: true,
				onChange: () => {},
			}}
		/>
	),
};

// ReadOnly
export const ReadOnly: Story = {
	render: () => (
		<InputSmall
			left={{
				label: "키",
				unit: "cm",
				value: "170",
				readOnly: true,
				onChange: () => {},
			}}
			right={{
				label: "몸무게",
				unit: "kg",
				value: "60",
				readOnly: true,
				onChange: () => {},
			}}
		/>
	),
};

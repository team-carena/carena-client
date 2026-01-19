import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { DateInput } from "@/shared/ui/inputs/date-input";

/* 모바일 웹 레이아웃 wrapper */
const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="w-full min-w-[37.5rem] max-w-[44rem] px-[1.6rem]">
		{children}
	</div>
);

const meta: Meta<typeof DateInput> = {
	title: "input/DateInput",
	component: DateInput,
	decorators: [
		(Story) => (
			<MobileWrapper>
				<Story />
			</MobileWrapper>
		),
	],
};

export default meta;
type Story = StoryObj<typeof DateInput>;

// Default
export const Default: Story = {
	render: () => {
		const [year, setYear] = React.useState("");
		const [month, setMonth] = React.useState("");
		const [day, setDay] = React.useState("");

		return (
			<DateInput
				year={{
					placeholder: "YYYY",
					value: year,
					onChange: (e) => setYear(e.target.value),
				}}
				month={{
					placeholder: "MM",
					value: month,
					onChange: (e) => setMonth(e.target.value),
				}}
				day={{
					placeholder: "DD",
					value: day,
					onChange: (e) => setDay(e.target.value),
				}}
			/>
		);
	},
};

// Filled
export const Filled: Story = {
	render: () => {
		const [year, setYear] = React.useState("1999");
		const [month, setMonth] = React.useState("12");
		const [day, setDay] = React.useState("31");

		return (
			<DateInput
				year={{
					placeholder: "YYYY",
					value: year,
					onChange: (e) => setYear(e.target.value),
				}}
				month={{
					placeholder: "MM",
					value: month,
					onChange: (e) => setMonth(e.target.value),
				}}
				day={{
					placeholder: "DD",
					value: day,
					onChange: (e) => setDay(e.target.value),
				}}
			/>
		);
	},
};

// Error
export const ErrorState: Story = {
	render: () => {
		const [year, setYear] = React.useState("2025");
		const [month, setMonth] = React.useState("13");
		const [day, setDay] = React.useState("40");

		return (
			<DateInput
				year={{
					placeholder: "YYYY",
					value: year,
					onChange: (e) => setYear(e.target.value),
				}}
				month={{
					placeholder: "MM",
					value: month,
					onChange: (e) => setMonth(e.target.value),
				}}
				day={{
					placeholder: "DD",
					value: day,
					onChange: (e) => setDay(e.target.value),
				}}
				errorMessage="수치를 다시 한 번 확인해 주세요."
			/>
		);
	},
};

// Disabled
export const Disabled: Story = {
	render: () => (
		<DateInput
			year={{
				placeholder: "YYYY",
				value: "1999",
				disabled: true,
				onChange: () => {},
			}}
			month={{
				placeholder: "MM",
				value: "12",
				disabled: true,
				onChange: () => {},
			}}
			day={{
				placeholder: "DD",
				value: "31",
				disabled: true,
				onChange: () => {},
			}}
		/>
	),
};

// ReadOnly
export const ReadOnly: Story = {
	render: () => (
		<DateInput
			year={{
				placeholder: "YYYY",
				value: "1999",
				readOnly: true,
				onChange: () => {},
			}}
			month={{
				placeholder: "MM",
				value: "12",
				readOnly: true,
				onChange: () => {},
			}}
			day={{
				placeholder: "DD",
				value: "31",
				readOnly: true,
				onChange: () => {},
			}}
		/>
	),
};

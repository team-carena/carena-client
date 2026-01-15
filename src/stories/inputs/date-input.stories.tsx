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
	argTypes: {
		isError: {
			control: "boolean",
			description: "에러 상태 여부",
		},
		errorMessage: {
			control: "text",
			description: "에러 메시지",
		},
		isDisabled: {
			control: "boolean",
			description: "비활성화 상태",
		},
		isReadOnly: {
			control: "boolean",
			description: "읽기 전용 상태",
		},
	},
};

export default meta;
type Story = StoryObj<typeof DateInput>;

// Default
export const Default: Story = {
	render: (args) => {
		const [year, setYear] = React.useState("");
		const [month, setMonth] = React.useState("");
		const [day, setDay] = React.useState("");

		return (
			<DateInput
				{...args}
				year={year}
				month={month}
				day={day}
				onChangeYear={setYear}
				onChangeMonth={setMonth}
				onChangeDay={setDay}
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
				year={year}
				month={month}
				day={day}
				onChangeYear={setYear}
				onChangeMonth={setMonth}
				onChangeDay={setDay}
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
				year={year}
				month={month}
				day={day}
				isError
				errorMessage="수치를 다시 한 번 확인해 주세요."
				onChangeYear={setYear}
				onChangeMonth={setMonth}
				onChangeDay={setDay}
			/>
		);
	},
};

// Disabled
export const Disabled: Story = {
	args: {
		year: "1999",
		month: "12",
		day: "31",
		isDisabled: true,
		onChangeYear: () => {},
		onChangeMonth: () => {},
		onChangeDay: () => {},
	},
};

// ReadOnly
export const ReadOnly: Story = {
	args: {
		year: "1999",
		month: "12",
		day: "31",
		isReadOnly: true,
		onChangeYear: () => {},
		onChangeMonth: () => {},
		onChangeDay: () => {},
	},
};

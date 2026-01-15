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
	title: "Shared/Input/DateInput",
	component: DateInput,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<MobileWrapper>
				<Story />
			</MobileWrapper>
		),
	],
	argTypes: {
		isError: { control: "boolean" },
		errorMessage: { control: "text" },
		isDisabled: { control: "boolean" },
		isView: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof DateInput>;

/* =========================
   기본
========================= */
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

/* =========================
   값 입력 완료
========================= */
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

/* =========================
   에러 상태
========================= */
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

/* =========================
   Disabled
========================= */
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

/* =========================
   View (읽기 전용)
========================= */
export const View: Story = {
	args: {
		year: "1999",
		month: "12",
		day: "31",
		isView: true,
		onChangeYear: () => {},
		onChangeMonth: () => {},
		onChangeDay: () => {},
	},
};

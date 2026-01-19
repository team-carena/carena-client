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

// Default (빈 상태)
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

// Focused (포커스 상태 - 직접 클릭해서 확인)
export const Focused: Story = {
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

// Completed (값이 입력된 상태)
export const Completed: Story = {
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

// Partial Completed (일부만 입력된 상태)
export const PartialCompleted: Story = {
	render: () => {
		const [year, setYear] = React.useState("1999");
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

// Error - Invalid Year (연도 범위 에러)
export const ErrorInvalidYear: Story = {
	render: () => {
		const [year, setYear] = React.useState("2030");
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
				errorMessage="1960년부터 2007년 사이의 연도를 입력해 주세요."
			/>
		);
	},
};

// Error - Invalid Date (존재하지 않는 날짜)
export const ErrorInvalidDate: Story = {
	render: () => {
		const [year, setYear] = React.useState("2000");
		const [month, setMonth] = React.useState("02");
		const [day, setDay] = React.useState("30");

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
				errorMessage="올바른 날짜를 입력해 주세요."
			/>
		);
	},
};

// Disabled (비활성화)
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

// ReadOnly (읽기 전용)
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

// All States (모든 상태 비교)
export const AllStates: Story = {
	render: () => {
		const [defaultYear, setDefaultYear] = React.useState("");
		const [defaultMonth, setDefaultMonth] = React.useState("");
		const [defaultDay, setDefaultDay] = React.useState("");

		const [completedYear, setCompletedYear] = React.useState("1999");
		const [completedMonth, setCompletedMonth] = React.useState("12");
		const [completedDay, setCompletedDay] = React.useState("31");

		const [errorYear, setErrorYear] = React.useState("2000");
		const [errorMonth, setErrorMonth] = React.useState("02");
		const [errorDay, setErrorDay] = React.useState("30");

		return (
			<div className="flex flex-col gap-[2rem]">
				<div>
					<p className="mb-[0.8rem] text-gray-500">Default</p>
					<DateInput
						year={{
							placeholder: "YYYY",
							value: defaultYear,
							onChange: (e) => setDefaultYear(e.target.value),
						}}
						month={{
							placeholder: "MM",
							value: defaultMonth,
							onChange: (e) => setDefaultMonth(e.target.value),
						}}
						day={{
							placeholder: "DD",
							value: defaultDay,
							onChange: (e) => setDefaultDay(e.target.value),
						}}
					/>
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">Completed</p>
					<DateInput
						year={{
							placeholder: "YYYY",
							value: completedYear,
							onChange: (e) => setCompletedYear(e.target.value),
						}}
						month={{
							placeholder: "MM",
							value: completedMonth,
							onChange: (e) => setCompletedMonth(e.target.value),
						}}
						day={{
							placeholder: "DD",
							value: completedDay,
							onChange: (e) => setCompletedDay(e.target.value),
						}}
					/>
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">Error</p>
					<DateInput
						year={{
							placeholder: "YYYY",
							value: errorYear,
							onChange: (e) => setErrorYear(e.target.value),
						}}
						month={{
							placeholder: "MM",
							value: errorMonth,
							onChange: (e) => setErrorMonth(e.target.value),
						}}
						day={{
							placeholder: "DD",
							value: errorDay,
							onChange: (e) => setErrorDay(e.target.value),
						}}
						errorMessage="올바른 날짜를 입력해 주세요."
					/>
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">Disabled</p>
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
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">ReadOnly</p>
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
				</div>
			</div>
		);
	},
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { InputMedium } from "@/shared/ui/inputs/input-medium";

/* 모바일 웹 레이아웃 wrapper */
const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="w-full min-w-[37.5rem] max-w-[44rem] px-[1.6rem]">
		{children}
	</div>
);

const meta: Meta<typeof InputMedium> = {
	title: "input/InputMedium",
	component: InputMedium,
	decorators: [
		(Story) => (
			<MobileWrapper>
				<Story />
			</MobileWrapper>
		),
	],
};

export default meta;
type Story = StoryObj<typeof InputMedium>;

// Default (빈 상태)
export const Default: Story = {
	render: () => {
		const [value, setValue] = React.useState("");

		return (
			<InputMedium
				label="항목"
				placeholder="placeholder"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};

// Focused (포커스 상태 - 직접 클릭해서 확인)
export const Focused: Story = {
	render: () => {
		const [value, setValue] = React.useState("");

		return (
			<InputMedium
				label="항목"
				placeholder="클릭해서 포커스 확인"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};

// Completed (값이 입력된 상태)
export const Completed: Story = {
	render: () => {
		const [value, setValue] = React.useState("값이 입력된 상태");

		return (
			<InputMedium
				label="항목"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};

// Required (필수 입력)
export const Required: Story = {
	render: () => {
		const [value, setValue] = React.useState("");

		return (
			<InputMedium
				label="항목"
				required
				placeholder="필수 입력"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};

// With Unit (단위 표시)
export const WithUnit: Story = {
	render: () => {
		const [value, setValue] = React.useState("");

		return (
			<InputMedium
				label="키"
				unit="cm"
				numeric
				placeholder="170"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};

// Numeric (숫자 입력)
export const Numeric: Story = {
	render: () => {
		const [value, setValue] = React.useState("");

		return (
			<InputMedium
				label="나이"
				unit="세"
				numeric
				placeholder="25"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};

// Error (에러 상태)
export const ErrorState: Story = {
	render: () => {
		const [value, setValue] = React.useState("999");

		return (
			<InputMedium
				label="키"
				unit="cm"
				numeric
				errorMessage="키는 100~250 사이의 값을 입력해 주세요."
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		);
	},
};

// Disabled (비활성화)
export const Disabled: Story = {
	render: () => (
		<InputMedium
			label="항목"
			unit="단위"
			value="123"
			disabled
			onChange={() => {}}
		/>
	),
};

// ReadOnly (읽기 전용)
export const ReadOnly: Story = {
	render: () => (
		<InputMedium
			label="항목"
			unit="단위"
			value="123"
			readOnly
			onChange={() => {}}
		/>
	),
};

// All States (모든 상태 비교)
export const AllStates: Story = {
	render: () => {
		const [defaultVal, setDefaultVal] = React.useState("");
		const [completedVal, setCompletedVal] = React.useState("170");
		const [errorVal, setErrorVal] = React.useState("999");

		return (
			<div className="flex flex-col gap-[2rem]">
				<InputMedium
					label="Default"
					unit="cm"
					placeholder="빈 상태"
					value={defaultVal}
					onChange={(e) => setDefaultVal(e.target.value)}
				/>
				<InputMedium
					label="Completed"
					unit="cm"
					value={completedVal}
					onChange={(e) => setCompletedVal(e.target.value)}
				/>
				<InputMedium
					label="Error"
					unit="cm"
					errorMessage="에러 메시지"
					value={errorVal}
					onChange={(e) => setErrorVal(e.target.value)}
				/>
				<InputMedium
					label="Disabled"
					unit="cm"
					value="170"
					disabled
					onChange={() => {}}
				/>
				<InputMedium
					label="ReadOnly"
					unit="cm"
					value="170"
					readOnly
					onChange={() => {}}
				/>
			</div>
		);
	},
};

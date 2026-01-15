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
	argTypes: {
		label: {
			control: "text",
			description: "좌측 라벨 텍스트",
		},
		isRequired: {
			control: "boolean",
			description: "필수 입력 여부",
		},
		unit: {
			control: "text",
			description: "입력 단위 (예: cm)",
		},
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
		isNumeric: {
			control: "boolean",
			description: "숫자 입력 전용 여부",
		},
	},
};

export default meta;
type Story = StoryObj<typeof InputMedium>;

// Default
export const Default: Story = {
	render: (args) => {
		const [value, setValue] = React.useState("");

		return (
			<InputMedium
				{...args}
				label="항목"
				placeholder="placeholder"
				value={value}
				onChange={setValue}
			/>
		);
	},
};

// Completed
export const Completed: Story = {
	render: (args) => {
		const [value, setValue] = React.useState("값이 입력된 상태");

		return (
			<InputMedium {...args} label="항목" value={value} onChange={setValue} />
		);
	},
};

// Required
export const Required: Story = {
	render: (args) => {
		const [value, setValue] = React.useState("");

		return (
			<InputMedium
				{...args}
				label="항목"
				isRequired
				value={value}
				onChange={setValue}
			/>
		);
	},
};

// With Unit
export const WithUnit: Story = {
	render: (args) => {
		const [value, setValue] = React.useState("");

		return (
			<InputMedium
				{...args}
				label="항목"
				unit="단위"
				value={value}
				onChange={setValue}
			/>
		);
	},
};

// Error
export const ErrorState: Story = {
	render: (args) => {
		const [value, setValue] = React.useState("123");

		return (
			<InputMedium
				{...args}
				label="항목"
				isError
				errorMessage="에러메시지"
				unit="단위"
				value={value}
				onChange={setValue}
			/>
		);
	},
};

// Disabled
export const Disabled: Story = {
	args: {
		label: "항목",
		value: "123",
		unit: "단위",
		isDisabled: true,
		onChange: () => {},
	},
};

// ReadOnly
export const ReadOnly: Story = {
	args: {
		label: "항목",
		value: "123",
		unit: "단위",
		isReadOnly: true,
		onChange: () => {},
	},
};

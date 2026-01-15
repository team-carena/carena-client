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
	argTypes: {
		labelLeft: {
			control: "text",
			description: "좌측 라벨 텍스트",
		},
		labelRight: {
			control: "text",
			description: "우측 라벨 텍스트",
		},
		unitLeft: {
			control: "text",
			description: "좌측 단위",
		},
		unitRight: {
			control: "text",
			description: "우측 단위",
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
	},
};

export default meta;
type Story = StoryObj<typeof InputSmall>;

// Default
export const Default: Story = {
	render: (args) => {
		const [left, setLeft] = React.useState("");
		const [right, setRight] = React.useState("");

		return (
			<InputSmall
				{...args}
				labelLeft="키"
				labelRight="몸무게"
				unitLeft="cm"
				unitRight="kg"
				valueLeft={left}
				valueRight={right}
				onChangeLeft={setLeft}
				onChangeRight={setRight}
			/>
		);
	},
};

// Completed
export const Completed: Story = {
	render: (args) => {
		const [left, setLeft] = React.useState("170");
		const [right, setRight] = React.useState("60");

		return (
			<InputSmall
				{...args}
				labelLeft="키"
				labelRight="몸무게"
				unitLeft="cm"
				unitRight="kg"
				valueLeft={left}
				valueRight={right}
				onChangeLeft={setLeft}
				onChangeRight={setRight}
			/>
		);
	},
};

// Error
export const ErrorState: Story = {
	render: (args) => {
		const [left, setLeft] = React.useState("170");
		const [right, setRight] = React.useState("999");

		return (
			<InputSmall
				{...args}
				labelLeft="키"
				labelRight="몸무게"
				unitLeft="cm"
				unitRight="kg"
				isError
				errorMessage="수치를 다시 한 번 확인해 주세요."
				valueLeft={left}
				valueRight={right}
				onChangeLeft={setLeft}
				onChangeRight={setRight}
			/>
		);
	},
};

// Disabled
export const Disabled: Story = {
	args: {
		labelLeft: "키",
		labelRight: "몸무게",
		unitLeft: "cm",
		unitRight: "kg",
		valueLeft: "170",
		valueRight: "60",
		isDisabled: true,
		onChangeLeft: () => {},
		onChangeRight: () => {},
	},
};

// ReadOnly
export const ReadOnly: Story = {
	args: {
		labelLeft: "키",
		labelRight: "몸무게",
		unitLeft: "cm",
		unitRight: "kg",
		valueLeft: "170",
		valueRight: "60",
		isReadOnly: true,
		onChangeLeft: () => {},
		onChangeRight: () => {},
	},
};

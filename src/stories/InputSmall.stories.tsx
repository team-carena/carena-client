import { InputSmall } from "@shared/ui/inputs/InputSmall";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta: Meta<typeof InputSmall> = {
	title: "Shared/Input/InputSmall",
	component: InputSmall,
	parameters: {
		layout: "centered",
	},
	args: {
		labelLeft: "키",
		labelRight: "몸무게",
		placeholderLeft: "입력",
		placeholderRight: "입력",
		unitLeft: "cm",
		unitRight: "kg",
		isError: false,
		isDisabled: false,
		isReadOnly: false,
	},
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
			description: "읽기 전용(View) 상태",
		},
	},
};

export default meta;
type Story = StoryObj<typeof InputSmall>;

const Template = (args: React.ComponentProps<typeof InputSmall>) => {
	const [left, setLeft] = useState("");
	const [right, setRight] = useState("");

	return (
		<div className="w-full min-w-[32rem] max-w-[36rem]">
			<InputSmall
				{...args}
				valueLeft={left}
				valueRight={right}
				onChangeLeft={setLeft}
				onChangeRight={setRight}
			/>
		</div>
	);
};

export const Default: Story = {
	render: Template,
};

export const Focused: Story = {
	render: Template,
};

export const Completed: Story = {
	render: (args) => {
		const [left, setLeft] = useState("170");
		const [right, setRight] = useState("60");

		return (
			<div className="w-full min-w-[32rem] max-w-[36rem]">
				<InputSmall
					{...args}
					valueLeft={left}
					valueRight={right}
					onChangeLeft={setLeft}
					onChangeRight={setRight}
				/>
			</div>
		);
	},
};

export const ErrorState: Story = {
	render: Template,
	args: {
		isError: true,
		errorMessage: "수치를 다시 한 번 확인해 주세요.",
	},
};

export const Disabled: Story = {
	render: Template,
	args: {
		isDisabled: true,
	},
};

export const ReadOnly: Story = {
	render: Template,
	args: {
		isReadOnly: true,
	},
};

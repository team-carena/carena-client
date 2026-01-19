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

// Default (빈 상태)
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

// Focused (포커스 상태 - 직접 클릭해서 확인)
export const Focused: Story = {
	render: () => {
		const [left, setLeft] = React.useState("");
		const [right, setRight] = React.useState("");

		return (
			<InputSmall
				left={{
					label: "키",
					unit: "cm",
					placeholder: "클릭",
					value: left,
					onChange: (e) => setLeft(e.target.value),
				}}
				right={{
					label: "몸무게",
					unit: "kg",
					placeholder: "클릭",
					value: right,
					onChange: (e) => setRight(e.target.value),
				}}
			/>
		);
	},
};

// Completed (값이 입력된 상태)
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

// Partial Completed (한쪽만 입력된 상태)
export const PartialCompleted: Story = {
	render: () => {
		const [left, setLeft] = React.useState("170");
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
					placeholder: "입력",
					value: right,
					onChange: (e) => setRight(e.target.value),
				}}
			/>
		);
	},
};

// Error (에러 상태)
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

// Disabled (비활성화)
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

// ReadOnly (읽기 전용)
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

// Mixed States (혼합 상태 - 왼쪽 disabled, 오른쪽 editable)
export const MixedStates: Story = {
	render: () => {
		const [right, setRight] = React.useState("");

		return (
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
					placeholder: "입력",
					value: right,
					onChange: (e) => setRight(e.target.value),
				}}
			/>
		);
	},
};

// All States (모든 상태 비교)
export const AllStates: Story = {
	render: () => {
		const [defaultLeft, setDefaultLeft] = React.useState("");
		const [defaultRight, setDefaultRight] = React.useState("");
		const [completedLeft, setCompletedLeft] = React.useState("170");
		const [completedRight, setCompletedRight] = React.useState("60");
		const [errorLeft, setErrorLeft] = React.useState("170");
		const [errorRight, setErrorRight] = React.useState("999");

		return (
			<div className="flex flex-col gap-[2rem]">
				<div>
					<p className="mb-[0.8rem] text-gray-500">Default</p>
					<InputSmall
						left={{
							label: "키",
							unit: "cm",
							value: defaultLeft,
							onChange: (e) => setDefaultLeft(e.target.value),
						}}
						right={{
							label: "몸무게",
							unit: "kg",
							value: defaultRight,
							onChange: (e) => setDefaultRight(e.target.value),
						}}
					/>
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">Completed</p>
					<InputSmall
						left={{
							label: "키",
							unit: "cm",
							value: completedLeft,
							onChange: (e) => setCompletedLeft(e.target.value),
						}}
						right={{
							label: "몸무게",
							unit: "kg",
							value: completedRight,
							onChange: (e) => setCompletedRight(e.target.value),
						}}
					/>
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">Error</p>
					<InputSmall
						left={{
							label: "키",
							unit: "cm",
							value: errorLeft,
							onChange: (e) => setErrorLeft(e.target.value),
						}}
						right={{
							label: "몸무게",
							unit: "kg",
							value: errorRight,
							onChange: (e) => setErrorRight(e.target.value),
						}}
						errorMessage="수치를 다시 한 번 확인해 주세요."
					/>
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">Disabled</p>
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
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">ReadOnly</p>
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
				</div>
			</div>
		);
	},
};

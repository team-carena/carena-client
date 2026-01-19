import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { RadioButton } from "@/shared/ui/radio/radio";

/* 모바일 웹 레이아웃 wrapper */
const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="w-full min-w-[37.5rem] max-w-[44rem] px-[1.6rem]">
		{children}
	</div>
);

const meta: Meta<typeof RadioButton> = {
	title: "input/RadioButton",
	component: RadioButton,
	decorators: [
		(Story) => (
			<MobileWrapper>
				<Story />
			</MobileWrapper>
		),
	],
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

// Default (선택되지 않은 상태)
export const Default: Story = {
	render: () => {
		const [selected, setSelected] = React.useState("");

		return (
			<RadioButton
				name="default"
				value="option1"
				text="선택 항목"
				checked={selected === "option1"}
				onChange={setSelected}
			/>
		);
	},
};

// Checked (선택된 상태)
export const Checked: Story = {
	render: () => {
		const [selected, setSelected] = React.useState("option1");

		return (
			<RadioButton
				name="checked"
				value="option1"
				text="선택된 항목"
				checked={selected === "option1"}
				onChange={setSelected}
			/>
		);
	},
};

// Without Text (텍스트 없이)
export const WithoutText: Story = {
	render: () => {
		const [selected, setSelected] = React.useState("");

		return (
			<div className="flex gap-[1.6rem]">
				<RadioButton
					name="no-text"
					value="option1"
					checked={selected === "option1"}
					onChange={setSelected}
				/>
				<RadioButton
					name="no-text"
					value="option2"
					checked={selected === "option2"}
					onChange={setSelected}
				/>
			</div>
		);
	},
};

// Disabled Unchecked (비활성화 - 선택 안됨)
export const DisabledUnchecked: Story = {
	render: () => (
		<RadioButton
			name="disabled-unchecked"
			value="option1"
			text="비활성화 (선택 안됨)"
			checked={false}
			disabled
			onChange={() => {}}
		/>
	),
};

// Disabled Checked (비활성화 - 선택됨)
export const DisabledChecked: Story = {
	render: () => (
		<RadioButton
			name="disabled-checked"
			value="option1"
			text="비활성화 (선택됨)"
			checked={true}
			disabled
			onChange={() => {}}
		/>
	),
};

// Radio Group (라디오 그룹)
export const RadioGroup: Story = {
	render: () => {
		const [selected, setSelected] = React.useState("option1");

		return (
			<div className="flex flex-col">
				<RadioButton
					name="group"
					value="option1"
					text="옵션 1"
					checked={selected === "option1"}
					onChange={setSelected}
				/>
				<RadioButton
					name="group"
					value="option2"
					text="옵션 2"
					checked={selected === "option2"}
					onChange={setSelected}
				/>
				<RadioButton
					name="group"
					value="option3"
					text="옵션 3"
					checked={selected === "option3"}
					onChange={setSelected}
				/>
			</div>
		);
	},
};

// Horizontal Radio Group (가로 라디오 그룹)
export const HorizontalRadioGroup: Story = {
	render: () => {
		const [selected, setSelected] = React.useState("MALE");

		return (
			<div className="flex gap-[2rem]">
				<RadioButton
					name="gender"
					value="MALE"
					text="남성"
					checked={selected === "MALE"}
					onChange={setSelected}
				/>
				<RadioButton
					name="gender"
					value="FEMALE"
					text="여성"
					checked={selected === "FEMALE"}
					onChange={setSelected}
				/>
			</div>
		);
	},
};

// All States (모든 상태 비교)
export const AllStates: Story = {
	render: () => {
		const [selected, setSelected] = React.useState("checked");

		return (
			<div className="flex flex-col gap-[1.6rem]">
				<div>
					<p className="mb-[0.8rem] text-gray-500">Default (Unchecked)</p>
					<RadioButton
						name="all-states"
						value="unchecked"
						text="선택되지 않은 항목"
						checked={selected === "unchecked"}
						onChange={setSelected}
					/>
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">Checked</p>
					<RadioButton
						name="all-states"
						value="checked"
						text="선택된 항목"
						checked={selected === "checked"}
						onChange={setSelected}
					/>
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">Disabled (Unchecked)</p>
					<RadioButton
						name="disabled-states"
						value="disabled-unchecked"
						text="비활성화 (선택 안됨)"
						checked={false}
						disabled
						onChange={() => {}}
					/>
				</div>
				<div>
					<p className="mb-[0.8rem] text-gray-500">Disabled (Checked)</p>
					<RadioButton
						name="disabled-states"
						value="disabled-checked"
						text="비활성화 (선택됨)"
						checked={true}
						disabled
						onChange={() => {}}
					/>
				</div>
			</div>
		);
	},
};

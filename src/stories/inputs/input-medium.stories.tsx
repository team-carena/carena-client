import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { InputMedium } from "@/shared/ui/inputs/input-medium";

const meta: Meta<typeof InputMedium> = {
	title: "Shared/Input/InputMedium",
	component: InputMedium,
	parameters: {
		layout: "centered",
	},
	args: {
		label: "항목",
		placeholder: "placeholder",
		isRequired: false,
		isError: false,
		isDisabled: false,
		isReadOnly: false,
		unit: undefined,
	},
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
			description: "읽기 전용(View) 상태",
		},
		onChange: {
			action: "change",
			description: "입력 값 변경 이벤트",
		},
	},
};

export default meta;
type Story = StoryObj<typeof InputMedium>;

/* 모바일 웹 레이아웃 wrapper */
const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="w-full min-w-[37.5rem] max-w-[44rem] px-[1.6rem]">
		{children}
	</div>
);

/* 공통 Template (controlled input) */
const Template = (args: React.ComponentProps<typeof InputMedium>) => {
	const [value, setValue] = useState("");

	return (
		<MobileWrapper>
			<InputMedium {...args} value={value} onChange={setValue} />
		</MobileWrapper>
	);
};

/* Default */
export const Default: Story = {
	render: Template,
};

/* Required */
export const Required: Story = {
	render: Template,
	args: {
		isRequired: true,
	},
};

/* Focused
 * - 스토리 화면에서 직접 input 클릭해서 확인
 */
export const Focused: Story = {
	render: Template,
};

/* Completed (값 존재) */
export const Completed: Story = {
	render: (args) => {
		const [value, setValue] = useState("값이 입력된 상태");

		return (
			<MobileWrapper>
				<InputMedium {...args} value={value} onChange={setValue} />
			</MobileWrapper>
		);
	},
};

/* With Unit */
export const WithUnit: Story = {
	render: Template,
	args: {
		unit: "단위",
	},
};

/* Without Unit
 * - unit 유무와 관계없이 레이아웃 동일한지 확인
 */
export const WithoutUnit: Story = {
	render: Template,
	args: {
		unit: undefined,
	},
};

/* Error */
export const ErrorState: Story = {
	render: Template,
	args: {
		isError: true,
		errorMessage: "에러메시지",
		unit: "단위",
	},
};

/* Disabled */
export const Disabled: Story = {
	render: Template,
	args: {
		isDisabled: true,
		unit: "단위",
	},
};

/* ReadOnly (View) */
export const ReadOnly: Story = {
	render: Template,
	args: {
		isReadOnly: true,
		unit: "단위",
	},
};

/* Long Label (레이아웃 검증용) */
export const LongLabel: Story = {
	render: Template,
	args: {
		label: "아주아주 긴 라벨",
		unit: "단위",
	},
};

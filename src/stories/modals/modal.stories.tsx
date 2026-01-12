// Modal.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Modal, type ModalProps } from "@/shared/ui/modals/modal";

const meta: Meta<typeof Modal> = {
	title: "Common/Modal",
	component: Modal,
	tags: ["autodocs"],
	args: {
		open: true,
		size: "lg",
		title: "모달 타이틀",
		description: "모달 설명입니다.\n여러 줄도 지원합니다.",
		primaryAction: {
			label: "확인",
			onClick: () => undefined,
		},
		onClose: () => undefined,
	},
	argTypes: {
		open: {
			control: "boolean",
			description: "모달 표시 여부",
		},
		size: {
			control: "select",
			options: ["sm", "lg"],
			description: "모달 사이즈",
		},
		title: {
			control: "text",
			description: "모달 제목(ReactNode)",
		},
		description: {
			control: "text",
			description: "모달 설명(ReactNode)",
		},
		onClose: {
			action: "closed",
			description: "닫기(오버레이 클릭/ESC) 이벤트",
		},
		primaryAction: {
			control: "object",
			description: "Primary 버튼 액션",
		},
		secondaryAction: {
			control: "object",
			description: "Secondary 버튼 액션(옵션)",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {};

export const Small: Story = {
	args: {
		size: "sm",
		title: undefined,
		description: "타이틀 없이 설명만 있는 sm 모달입니다.",
		secondaryAction: undefined,
	},
};

export const SmallWithSecondary: Story = {
	args: {
		size: "sm",
		title: undefined,
		description: "모달 + 취소 버튼이 추가된 small 모달입니다.",
		secondaryAction: {
			label: "취소",
			onClick: () => undefined,
		},
	},
};

export const OneButton: Story = {
	args: {
		secondaryAction: undefined,
		primaryAction: {
			label: "확인",
			onClick: () => undefined,
		},
	},
};

export const DestructivePrimary: Story = {
	args: {
		primaryAction: {
			label: "삭제",
			onClick: () => undefined,
		},
		secondaryAction: {
			label: "취소",
			onClick: () => undefined,
		},
	},
};

export const Closed: Story = {
	args: {
		open: false,
	},
};

export const Interactive: Story = {
	render: (args: ModalProps) => {
		const [open, setOpen] = React.useState(true);

		return (
			<Modal
				{...args}
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				primaryAction={{
					...args.primaryAction,
					onClick: () => setOpen(false),
				}}
				secondaryAction={
					args.secondaryAction
						? {
								...args.secondaryAction,
								onClick: () => setOpen(false),
							}
						: undefined
				}
			/>
		);
	},
	args: {
		open: true,
	},
};

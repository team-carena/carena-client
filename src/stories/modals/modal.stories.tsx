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

export const LargeTwoButtons: Story = {
	args: {
		size: "lg",
		title: "모달 타이틀",
		description: "모달 설명입니다.\n여러 줄도 지원합니다.",
		primaryAction: {
			label: "확인",
			onClick: () => undefined,
		},
		secondaryAction: {
			label: "취소",
			onClick: () => undefined,
		},
	},
};

export const LargeOneButton: Story = {
	args: {
		size: "lg",
		title: "알림",
		description: "저장이 완료되었습니다.",
		primaryAction: {
			label: "확인",
			onClick: () => undefined,
		},
		secondaryAction: undefined,
	},
};

export const SmallTwoButtons: Story = {
	args: {
		size: "sm",
		title: undefined,
		description: "정말 삭제하시겠습니까?",
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

export const SmallOneButton: Story = {
	args: {
		size: "sm",
		title: undefined,
		description: "처리가 완료되었습니다.",
		primaryAction: {
			label: "확인",
			onClick: () => undefined,
		},
		secondaryAction: undefined,
	},
};

export const LongText: Story = {
	args: {
		size: "lg",
		title: "개인정보 수집·이용 내용",
		description: `건강점수 제공을 위해 검진 정보를 수집·이용합니다.
보관기간은 최대 3년이며, 언제든 삭제할 수 있습니다.

1. 수집·이용 목적
• 건강검진 결과의 해석 및 건강점수 제공
• 과거 검진 결과와의 비교 분석
• 개인 맞춤형 건강 정보 제공

2. 수집 항목
• 계정 정보
  • 카카오 로그인 정보(고유 식별자)
  • 사용자 기본정보: 이름, 생년월일, 성별
  • 개인정보 수집·이용 동의 일시

• 건강검진 정보
  • 신체계측, 혈압, 혈액검사 수치 등
  • 사용자가 직접 입력하거나 OCR로 추출 후 저장한 검진 결과

3. 보유 및 이용 기간
• 서비스 제공 목적 달성 시까지 보관하며, 마지막 로그인 후 3년 경과 시 자동 삭제됩니다.`,
		primaryAction: {
			label: "확인",
			onClick: () => undefined,
		},
		secondaryAction: undefined,
	},
};

export const LongTextWithTwoButtons: Story = {
	args: {
		size: "lg",
		title: "OCR 사용 동의서",
		description: `• OCR 기능은 검진 결과 입력을 돕기 위한 텍스트 추출 용도로만 사용됩니다.

• 이미지는 추출 즉시 폐기되며, 추출된 텍스트는 저장 시에만 분석 목적으로 이용됩니다.

• 일부 수치는 정확하지 않을 수 있으니 저장 전 확인해 주세요.

• 원활한 인식을 위해 검진 결과서 2페이지를 캡처하여 등록해 주세요.`,
		primaryAction: {
			label: "동의",
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
			<>
				<button
					type="button"
					className="bg-blue-500 text-white px-4 py-2 rounded"
					onClick={() => setOpen(true)}
				>
					모달 열기
				</button>
				<Modal
					{...args}
					open={open}
					onClose={() => setOpen(false)}
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
			</>
		);
	},
	args: {
		open: true,
		secondaryAction: {
			label: "취소",
			onClick: () => undefined,
		},
	},
};

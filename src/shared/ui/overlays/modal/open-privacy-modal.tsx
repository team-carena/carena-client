import { overlay } from "overlay-kit";
import { useState } from "react";
import { Modal, type ModalProps } from "./modal";

type PrivacyModalProps = Omit<
	ModalProps,
	"open" | "onClose" | "onScrollEnd" | "size"
>;

// 스크롤 상태 관리를 위한 래퍼 컴포넌트
const PrivacyModalContent = ({
	isOpen,
	close,
	...props
}: PrivacyModalProps & { isOpen: boolean; close: () => void }) => {
	const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

	return (
		<Modal
			{...props}
			open={isOpen}
			onClose={close}
			size="lg" // scroll 가능한 모달은 무조건 'lg' 타입
			onScrollEnd={() => setIsScrolledToEnd(true)}
			primaryAction={{
				...props.primaryAction,
				onClick: () => {
					if (isScrolledToEnd) {
						props.primaryAction.onClick();
					}
					close();
				},
			}}
			secondaryAction={
				props.secondaryAction
					? {
							...props.secondaryAction,
							onClick: () => {
								props.secondaryAction?.onClick();
								close();
							},
						}
					: undefined
			}
		/>
	);
};

// 스크롤 끝 도달 시에만 primaryAction.onClick이 실행되는 모달
export const openPrivacyModal = (props: PrivacyModalProps) => {
	return overlay.open(({ isOpen, close }) => (
		<PrivacyModalContent {...props} isOpen={isOpen} close={close} />
	));
};

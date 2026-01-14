import { overlay } from "overlay-kit";
import { Modal, type ModalProps } from "./modal";

// overlay 래퍼 함수
export const openModal = (props: Omit<ModalProps, "open" | "onClose">) => {
	return overlay.open(({ isOpen, close }) => (
		<Modal
			{...props}
			open={isOpen}
			onClose={close}
			primaryAction={{
				...props.primaryAction,
				onClick: () => {
					props.primaryAction.onClick();
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
	));
};

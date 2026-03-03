import { overlay } from "overlay-kit";
import { BottomSheet, type BottomSheetProps } from "./bottom-sheet";

export const openBottomSheet = (
	props: Omit<BottomSheetProps, "open" | "onClose">,
) => {
	return overlay.open(({ isOpen, close }) => (
		<BottomSheet {...props} open={isOpen} onClose={close} />
	));
};

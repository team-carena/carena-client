import type { Meta, StoryObj } from "@storybook/react-vite";
import { OcrButton } from "@/shared/ui/buttons/ocr-button";

const meta: Meta<typeof OcrButton> = {
	title: "Feature/OCR/OcrButton",
	component: OcrButton,
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof OcrButton>;
export const Default: Story = {};

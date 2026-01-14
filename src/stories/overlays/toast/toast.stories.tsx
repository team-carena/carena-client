import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import {
	MainToaster,
	notify,
	notifyError,
} from "@/shared/ui/overlays/toast/toast";

const meta: Meta = {
	title: "Common/Toast",
};

export default meta;
type Story = StoryObj;

const Button = ({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: () => void;
}) => (
	<button
		type="button"
		onClick={onClick}
		className="rounded-[999px] border border-white/10 bg-black/80 px-6 py-3 text-white hover:bg-black"
	>
		{children}
	</button>
);

export const Default: Story = {
	render: () => (
		<section className="flex flex-col items-center gap-4">
			<MainToaster />
			<Button onClick={() => notify("토스트 메시지를 입력하세요.")}>
				Show toast
			</Button>
			<Button onClick={() => notifyError("토스트 메시지를 입력하세요.")}>
				Show error toast
			</Button>
		</section>
	),
};

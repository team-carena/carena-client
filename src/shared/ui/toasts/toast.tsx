import type { CSSProperties } from "react";
import { Toaster, toast } from "sonner";
import { Alert } from "@/shared/assets/svg";

const toastBaseClasses =
	"flex h-[3.7rem] w-[33.5rem] items-center gap-[1.2rem] rounded-[12px] border border-white/10 bg-[var(--grayscale-gray800,#313132)] px-[1.2rem] py-[0.8rem] text-white ";

const toastTextClasses = "label05-r-14 text-white ";

const toastIconWrapper =
	"flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full";

export const toasterProps = {
	position: "top-center" as const,
	gutter: 16,
	richColors: false,
	toastOptions: {
		className: toastBaseClasses,
		duration: 4000,
		style: {
			"--normal-bg": "var(--grayscale-gray800,#313132)",
			"--normal-text": "var(--color-white,#ffffff)",
			"--normal-border": "rgba(255,255,255,0.1)",
			"--border-radius": "12px",
		} as CSSProperties,
	},
};

export const MainToaster = () => <Toaster {...toasterProps} />;

export const notify = (message: string) => {
	toast(message);
};

export const notifyError = (message: string) => {
	toast.error(
		<div className="flex items-center gap-[0.4rem]">
			<div className={toastIconWrapper}>
				<Alert className="h-[2rem] w-[2rem]" />
			</div>
			<span className={toastTextClasses}>{message}</span>
		</div>,
		{ icon: null },
	);
};

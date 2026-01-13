import { Toaster, toast } from "sonner";
import { Alert } from "@/shared/assets/svg";

export const toasterProps = {
	position: "bottom-center" as const,
	toastOptions: {
		unstyled: true, // sooner 기본 스타일 제거
		className:
			"flex w-[calc(100vw-4rem)] items-center gap-[0.4rem] rounded-[12px] bg-gray-800 px-[1.2rem] py-[0.8rem] text-white",
		duration: 3000,
	},
	style: {
		bottom: "84px",
	} as React.CSSProperties,
};

export const MainToaster = () => <Toaster {...toasterProps} />;

// 일반 toast
export const notify = (message: string) => {
	toast(<span className="label05-r-14 text-white">{message}</span>);
};

// toast.error wrapper 함수(커스텀 error UI 사용)
export const notifyError = (message: string) => {
	toast.error(
		<div className="flex items-center gap-[0.4rem]">
			<Alert />
			<span className="label05-r-14 text-white">{message}</span>
		</div>,
		{ icon: null },
	);
};

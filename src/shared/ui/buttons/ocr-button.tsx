import type * as React from "react";
import { Scan } from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";

type OcrButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const OcrButton = ({ className, ...props }: OcrButtonProps) => {
	return (
		<button
			type="button"
			{...props}
			className={cn(
				"flex w-[23.6rem] items-center justify-center gap-[1.2rem] rounded-[8px] border border-primary-600 bg-primary-50 px-[1.6rem] py-[1.2rem] transition-default active:bg-primary-100",
				className,
			)}
		>
			<Scan aria-hidden="true" />
			<span className="label03-m-12 text-primary-600">
				검진 결과지 스캔하고 자동 입력받기
			</span>
		</button>
	);
};

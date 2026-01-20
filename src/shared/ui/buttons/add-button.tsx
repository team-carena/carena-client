import type * as React from "react";
import { Plus } from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";

interface AddButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AddButton = ({ className, ...props }: AddButtonProps) => {
	return (
		<button
			type="button"
			{...props}
			className={cn(
				"flex w-fit items-center justify-center gap-[0.4rem] rounded-[4px] bg-white px-[0.8rem] py-[0.4rem] transition-default active:bg-gray-200",
				className,
			)}
		>
			<span className="label06-r-12 text-gray-900">검진결과추가</span>
			<Plus aria-hidden="true" />
		</button>
	);
};

import { ChevronSRight } from "@shared/assets/svg";
import { cn } from "@shared/libs/cn";
import { cva } from "class-variance-authority";
import * as React from "react";

const selectListVariants = cva(
	[
		"flex items-center justify-between",
		"w-[29.5rem] h-[2.8rem]",
		"px-0 py-[0.4rem]",
		"cursor-pointer",
		"text-gray-900",
	].join(" "),
);

export interface SelectListProps extends React.HTMLAttributes<HTMLDivElement> {
	label: string;
}

export const SelectList = React.forwardRef<HTMLDivElement, SelectListProps>(
	({ label, className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(selectListVariants(), className)} {...props}>
				{/* text */}
				<span className="flex-[1_0_0] body04-r-14">{label}</span>

				{/* icon */}
				<ChevronSRight className="shrink-0" aria-hidden />
			</div>
		);
	},
);

SelectList.displayName = "SelectList";

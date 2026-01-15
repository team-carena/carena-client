import { ChevronSRight } from "@shared/assets/svg";
import { cn } from "@shared/libs/cn";
import * as React from "react";

export interface SelectListProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
}

export const SelectList = React.forwardRef<HTMLButtonElement, SelectListProps>(
	({ label, className, ...props }, ref) => {
		return (
			<button
				ref={ref}
				type="button"
				className={cn(
					`
          flex items-center justify-between
          w-full h-[2.8rem]
          px-0 py-[0.4rem]
          text-gray-900
        `,
					className,
				)}
				{...props}
			>
				{/* text */}
				<span className="flex-[1_0_0] body04-r-14 text-left">{label}</span>

				{/* icon */}
				<ChevronSRight className="shrink-0" aria-hidden />
			</button>
		);
	},
);

SelectList.displayName = "SelectList";

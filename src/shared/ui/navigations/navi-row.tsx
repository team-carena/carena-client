import { ChevronMRight } from "@shared/assets/svg";
import { cn } from "@shared/libs/cn";
import * as React from "react";

export interface NaviRowProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
}

export const NaviRow = React.forwardRef<HTMLButtonElement, NaviRowProps>(
	({ label, className, ...props }, ref) => {
		return (
			<button
				ref={ref}
				type="button"
				className={cn(
					`
            flex items-center justify-between
            w-full
            px-[0.8rem] py-[0.4rem]
            rounded-[8px]
            text-gray-900
            transition-default
            active:bg-gray-100
          `,
					className,
				)}
				{...props}
			>
				{/* text */}
				<span className="flex-[1_0_0] head03-sb-16 text-left">{label}</span>

				{/* icon */}
				<ChevronMRight className="shrink-0" aria-hidden />
			</button>
		);
	},
);

NaviRow.displayName = "NaviRow";

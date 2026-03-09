import { ChevronSRight, Link } from "@shared/assets/svg";
import { cn } from "@shared/libs/cn";
import * as React from "react";

export interface SelectListProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	link?: boolean;
}

export const SelectList = React.forwardRef<HTMLButtonElement, SelectListProps>(
	({ label, link, className, ...props }, ref) => {
		return (
			<button
				ref={ref}
				type="button"
				className={cn(
					`flex h-[2.8rem] w-full items-center justify-between py-[0.4rem] text-gray-900`,
					className,
				)}
				{...props}
			>
				{/* text */}
				<span className="body04-r-14 flex-[1_0_0] text-left">{label}</span>

				{/* icon */}
				{link ? (
					<Link className="shrink-0" aria-hidden />
				) : (
					<ChevronSRight className="shrink-0" aria-hidden />
				)}
			</button>
		);
	},
);

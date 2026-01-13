import { cn } from "@shared/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const naviRowSmallVariants = cva(
	[
		"flex items-center justify-between",
		"w-[33.5rem]",
		"px-[0.8rem] py-[0.4rem]",
		"rounded-[0.4rem]",
		"cursor-pointer",
		"text-gray-600",
		"transition-default",
		"active:bg-gray-100 active:text-gray-900",
	].join(" "),
	{
		variants: {
			state: {
				default: "",
				pressing: "bg-gray-100 text-gray-900",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

export interface NaviRowSmallProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof naviRowSmallVariants> {
	label: string;
	actionLabel?: string;
}

export const NaviRowSmall = React.forwardRef<HTMLDivElement, NaviRowSmallProps>(
	({ label, actionLabel = "더보기", state, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(naviRowSmallVariants({ state }), className)}
				{...props}
			>
				{/* left text */}
				<span className="flex-[1_0_0] body04-r-14">{label}</span>

				{/* right text */}
				<span className="shrink-0 label06-r-12">{actionLabel}</span>
			</div>
		);
	},
);

NaviRowSmall.displayName = "NaviRowSmall";

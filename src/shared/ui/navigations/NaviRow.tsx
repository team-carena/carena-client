import { ChevronSRight } from "@shared/assets/svg";
import { cn } from "@shared/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const naviRowVariants = cva(
	[
		"flex items-center justify-between",
		"w-[31.1rem]",
		"px-[0.8rem] py-[0.4rem]",
		"rounded-[0.8rem]",
		"cursor-pointer",
		"text-gray-900",
		"transition-default",
		"active:bg-gray-100",
	].join(" "),
	{
		variants: {
			state: {
				default: "",
				pressing: "bg-gray-100",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

export interface NaviRowProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof naviRowVariants> {
	label: string;
}

export const NaviRow = React.forwardRef<HTMLDivElement, NaviRowProps>(
	({ label, state, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(naviRowVariants({ state }), className)}
				{...props}
			>
				{/* text */}
				<span className="flex-[1_0_0] head03-sb-16">{label}</span>

				{/* icon */}
				<ChevronSRight
					className="shrink-0 text-gray-900"
					width={24}
					height={24}
					aria-hidden
				/>
			</div>
		);
	},
);

NaviRow.displayName = "NaviRow";

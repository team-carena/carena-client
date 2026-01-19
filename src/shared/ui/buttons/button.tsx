import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/shared/libs/cn";

const buttonVariants = cva(
	`flex w-full items-center justify-center
	bg-primary-400 text-white active:bg-primary-600 transition-default
	disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed`,
	{
		variants: {
			size: {
				sm: "label05-r-14 h-[3.2rem] min-w-[6rem] rounded-[4px] px-[1rem]",
				lg: "label04-r-16 h-[5.2rem] min-w-[8.4rem] rounded-[8px] px-[2rem]",
			},
		},
		defaultVariants: {
			size: "lg",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, size, type = "button", ...props }, ref) => {
		return (
			<button
				ref={ref}
				type={type}
				className={cn(buttonVariants({ size }), className)}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";

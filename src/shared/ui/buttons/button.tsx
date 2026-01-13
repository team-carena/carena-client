import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/shared/libs/cn";

const buttonVariants = cva(
	[
		"flex w-full items-center justify-center",
		"bg-primary-400 text-white",
		"active:bg-primary-600",
		"disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed",
	].join(" "),
	{
		variants: {
			size: {
				sm: "h-[3.2rem] min-w-[6rem] px-[1rem] rounded-[0.4rem] label05-r-14",
				lg: "h-[5.2rem] min-w-[8.4rem] px-[2rem] rounded-[0.8rem] label04-r-16",
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

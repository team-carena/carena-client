import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/shared/libs/cn";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md font-medium transition-colors \
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 \
   disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-black text-white hover:bg-black/90 focus-visible:ring-black",
				secondary:
					"bg-blue-700 text-white hover:bg-blue-600 focus-visible:ring-blue-400",
				outline:
					"border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-400",
				destructive:
					"bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
			},
			size: {
				sm: "h-8 px-3 text-sm",
				md: "h-9 px-4 text-sm",
				lg: "h-10 px-6 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, type = "button", ...props }, ref) => {
		return (
			<button
				ref={ref}
				type={type}
				className={cn(buttonVariants({ variant, size }), className)}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";

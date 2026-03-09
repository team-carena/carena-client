import { cn } from "@shared/libs/cn";
import SystemDangerIcon from "@svg/system-danger.svg?react";
import { cva } from "class-variance-authority";
import * as React from "react";

const inputLargeVariants = cva(
	"flex items-center rounded-[8px] border px-[1.6rem] py-[0.8rem] transition-colors",
	{
		variants: {
			state: {
				default: "border-gray-200",
				focused: "border-primary-500",
				completed: "border-gray-900",
				error: "border-red-500",
				readonly: "border-gray-500 bg-gray-100",
				disabled: "border-gray-200 bg-gray-100",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

const inputFieldVariants = cva(
	"label04-r-16 w-full bg-transparent outline-none placeholder:text-gray-500",
	{
		variants: {
			state: {
				default: "text-gray-900",
				readonly: "cursor-default text-gray-900",
				disabled: "cursor-not-allowed text-gray-500",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

interface InputLargeProps extends React.InputHTMLAttributes<HTMLInputElement> {
	errorMessage?: string;
}

export const InputLarge = ({
	errorMessage,
	readOnly,
	disabled,
	value,
	onFocus,
	onBlur,
	...props
}: InputLargeProps) => {
	const [isFocused, setIsFocused] = React.useState(false);

	const hasError = !!errorMessage;

	const wrapperState = (() => {
		if (disabled) return "disabled";
		if (readOnly) return "readonly";
		if (hasError) return "error";
		if (isFocused) return "focused";
		if (value) return "completed";
		return "default";
	})();

	const fieldState = (() => {
		if (disabled) return "disabled";
		if (readOnly) return "readonly";
		return "default";
	})();

	return (
		<div className="flex min-w-[33.5rem] flex-col">
			<div className={cn(inputLargeVariants({ state: wrapperState }))}>
				<input
					type="text"
					value={value}
					readOnly={readOnly}
					disabled={disabled}
					aria-invalid={hasError}
					onFocus={(e) => {
						if (!readOnly && !disabled) setIsFocused(true);
						onFocus?.(e);
					}}
					onBlur={(e) => {
						setIsFocused(false);
						onBlur?.(e);
					}}
					className={cn(inputFieldVariants({ state: fieldState }))}
					{...props}
				/>
			</div>

			{hasError && (
				<div
					className="label06-r-12 mt-[0.2rem] flex items-center gap-[0.4rem] text-red-500"
					role="alert"
				>
					<SystemDangerIcon className="shrink-0" aria-hidden />
					<span>{errorMessage}</span>
				</div>
			)}
		</div>
	);
};

InputLarge.displayName = "InputLarge";

import { cn } from "@shared/libs/cn";
import SystemDangerIcon from "@svg/system-danger.svg?react";
import { cva } from "class-variance-authority";
import * as React from "react";

const inputMediumVariants = cva(
	"flex items-center justify-between rounded-[6px] border px-[1.6rem] py-[0.8rem] transition-colors",
	{
		variants: {
			state: {
				default: "border-gray-200",
				focused: "border-primary-500",
				completed: "border-gray-900",
				error: "border-red-500",
				disabled: "border-gray-500 bg-gray-100",
				readonly: "border-gray-500 bg-gray-100",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

const inputFieldVariants = cva(
	"label04-r-16 min-w-0 flex-1 bg-transparent placeholder-gray-500 outline-none",
	{
		variants: {
			state: {
				default: "text-gray-900",
				disabled: "cursor-not-allowed text-gray-500",
				readonly: "cursor-default text-gray-900",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

interface InputMediumProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	required?: boolean;
	unit?: string;
	errorMessage?: string;
	numeric?: boolean;
}

export const InputMedium = ({
	label,
	required = false,
	unit,
	errorMessage,
	numeric = false,
	disabled,
	readOnly,
	value,
	onFocus,
	onBlur,
	...props
}: InputMediumProps) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const inputId = React.useId();

	const hasError = !!errorMessage;

	const wrapperState = (() => {
		if (disabled) return "disabled";
		if (readOnly) return "readonly";
		if (hasError) return "error";
		if (isFocused) return "focused";
		if (value) return "completed";
		return "default";
	})();

	const fieldState = disabled ? "disabled" : readOnly ? "readonly" : "default";

	return (
		<div className="flex items-start justify-between">
			{/* label */}
			<label htmlFor={inputId} className="body03-r-16 shrink-0 text-black">
				{label}
				{required && (
					<span className="ml-[0.2rem]" aria-hidden="true">
						*
					</span>
				)}
			</label>

			{/* input + error wrapper */}
			<div className="flex w-[22.2rem] shrink-0 flex-col">
				<div className={cn(inputMediumVariants({ state: wrapperState }))}>
					<input
						id={inputId}
						type="text"
						inputMode={numeric ? "decimal" : undefined}
						aria-required={required}
						aria-invalid={hasError}
						value={value}
						disabled={disabled}
						readOnly={readOnly}
						onFocus={(e) => {
							if (!disabled && !readOnly) setIsFocused(true);
							onFocus?.(e);
						}}
						onBlur={(e) => {
							setIsFocused(false);
							onBlur?.(e);
						}}
						className={cn(inputFieldVariants({ state: fieldState }))}
						{...props}
					/>

					{/* unit */}
					<span
						className={cn(
							"label02-m-14 shrink-0 text-right",
							unit ? "visible" : "invisible",
							disabled ? "text-gray-500" : "text-gray-900",
						)}
					>
						{unit ?? ""}
					</span>
				</div>

				{/* error message */}
				{hasError && (
					<div
						className="label06-r-12 mt-[0.2rem] flex items-center gap-[0.4rem] text-red-500"
						role="alert"
					>
						<SystemDangerIcon
							width={24}
							height={24}
							fill="currentColor"
							title="error"
						/>
						<span>{errorMessage}</span>
					</div>
				)}
			</div>
		</div>
	);
};

InputMedium.displayName = "InputMedium";

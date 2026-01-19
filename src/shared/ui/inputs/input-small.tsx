import { cn } from "@shared/libs/cn";
import SystemDangerIcon from "@svg/system-danger.svg?react";
import { cva } from "class-variance-authority";
import * as React from "react";

const inputSmallVariants = cva(
	"flex items-center gap-[1rem] rounded-[6px] border px-[1.2rem] py-[0.6rem] transition-colors",
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
	"label04-r-16 h-full min-w-0 flex-1 bg-transparent outline-none",
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

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	unit: string;
}

interface InputSmallProps {
	left: InputFieldProps;
	right: InputFieldProps;
	errorMessage?: string;
}

export const InputSmall = ({ left, right, errorMessage }: InputSmallProps) => {
	const [focused, setFocused] = React.useState<"left" | "right" | null>(null);

	const leftInputId = React.useId();
	const rightInputId = React.useId();

	const hasError = !!errorMessage;

	const getState = (
		value: string | number | readonly string[] | undefined,
		isFocused: boolean,
		disabled?: boolean,
		readOnly?: boolean,
	) => {
		if (disabled) return "disabled";
		if (readOnly) return "readonly";
		if (hasError) return "error";
		if (isFocused) return "focused";
		if (value) return "completed";
		return "default";
	};

	const getFieldState = (disabled?: boolean, readOnly?: boolean) =>
		disabled ? "disabled" : readOnly ? "readonly" : "default";

	const renderInput = (
		field: InputFieldProps,
		side: "left" | "right",
		inputId: string,
		showError: boolean,
	) => {
		const {
			label,
			unit,
			disabled,
			readOnly,
			value,
			onFocus,
			onBlur,
			...inputProps
		} = field;

		return (
			<div className="flex-1">
				<div className="flex items-start justify-between">
					<label htmlFor={inputId} className="body03-r-16 shrink-0 text-black">
						{label}
					</label>

					<div className="flex w-[10.4rem] shrink-0 flex-col">
						<div
							className={cn(
								inputSmallVariants({
									state: getState(value, focused === side, disabled, readOnly),
								}),
							)}
						>
							<input
								id={inputId}
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
								value={value}
								disabled={disabled}
								readOnly={readOnly}
								onFocus={(e) => {
									if (!disabled && !readOnly) setFocused(side);
									onFocus?.(e);
								}}
								onBlur={(e) => {
									setFocused(null);
									onBlur?.(e);
								}}
								className={cn(
									inputFieldVariants({
										state: getFieldState(disabled, readOnly),
									}),
								)}
								{...inputProps}
							/>
							<span className="label03-m-12 shrink-0">{unit}</span>
						</div>

						{showError && hasError && (
							<div
								className="label06-r-12 mt-[0.2rem] flex items-center gap-[0.4rem] whitespace-nowrap text-red-500"
								role="alert"
							>
								<SystemDangerIcon className="shrink-0" aria-hidden />
								<span>{errorMessage}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="w-full">
			<div className="flex items-start gap-[1.6rem]">
				{renderInput(left, "left", leftInputId, true)}
				{renderInput(right, "right", rightInputId, false)}
			</div>
		</div>
	);
};

InputSmall.displayName = "InputSmall";

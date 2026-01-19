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

interface InputMediumProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	label: string;
	isRequired?: boolean;

	value: string;
	unit?: string;

	isError?: boolean;
	errorMessage?: string;

	isDisabled?: boolean;
	isReadOnly?: boolean;

	isNumeric?: boolean;

	onChange: (value: string) => void;
}

export const InputMedium = ({
	label,
	isRequired = false,
	value,
	placeholder,
	unit,
	isError = false,
	errorMessage,
	isDisabled = false,
	isReadOnly = false,
	onChange,
	isNumeric = false,
	...props
}: InputMediumProps) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const inputId = React.useId();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	const wrapperState = (() => {
		if (isDisabled) return "disabled";
		if (isReadOnly) return "readonly";
		if (isError) return "error";
		if (isFocused) return "focused";
		if (value) return "completed";
		return "default";
	})();

	const fieldState = isDisabled
		? "disabled"
		: isReadOnly
			? "readonly"
			: "default";

	return (
		<div className="flex items-start justify-between">
			{/* label */}
			<label htmlFor={inputId} className="body03-r-16 shrink-0 text-black">
				{label}
				{isRequired && (
					<span className="ml-[0.2rem]" aria-hidden="true">
						*
					</span>
				)}
			</label>

			{/* input wrapper */}
			<div className="w-[22.2rem] shrink-0">
				<div className={cn(inputMediumVariants({ state: wrapperState }))}>
					<input
						id={inputId}
						type="text"
						inputMode={isNumeric ? "numeric" : undefined}
						pattern={isNumeric ? "[0-9]*" : undefined}
						aria-required={isRequired}
						aria-invalid={isError}
						value={value}
						placeholder={placeholder}
						disabled={isDisabled}
						readOnly={isReadOnly}
						onChange={handleChange}
						onFocus={() => {
							if (!isDisabled && !isReadOnly) setIsFocused(true);
						}}
						onBlur={() => setIsFocused(false)}
						className={cn(inputFieldVariants({ state: fieldState }))}
						{...props}
					/>

					{/* unit */}
					<span
						className={cn(
							"label02-m-14 shrink-0 text-right",
							unit ? "visible" : "invisible",
							isDisabled ? "text-gray-500" : "text-gray-900",
						)}
					>
						{unit ?? ""}
					</span>
				</div>

				{/* error message */}
				{isError && errorMessage && (
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

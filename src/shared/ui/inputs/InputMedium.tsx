import { cn } from "@shared/libs/cn";
import SystemDangerIcon from "@svg/system-danger.svg?react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const inputMediumVariants = cva(
	"flex items-center justify-between rounded-[6px] border transition-colors px-[1.6rem] py-[0.8rem]",
	{
		variants: {
			state: {
				default: "border-gray-200",
				focused: "border-primary-500",
				completed: "border-gray-900",
				error: "border-red-500",
				disabled: "border-gray-500 bg-gray-100",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

const inputFieldVariants = cva(
	"flex-1 min-w-0 bg-transparent outline-none placeholder-gray-500 label04-r-16",
	{
		variants: {
			state: {
				default: "text-gray-900",
				disabled: "text-gray-500 cursor-not-allowed",
				readonly: "text-gray-900 cursor-default",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

interface InputMediumProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">,
		VariantProps<typeof inputMediumVariants> {
	label: string;
	isRequired?: boolean;

	value: string;
	unit?: string;

	isError?: boolean;
	errorMessage?: string;

	isDisabled?: boolean;
	isReadOnly?: boolean;

	onChange: (value: string) => void;
}

export const InputMedium = React.forwardRef<HTMLInputElement, InputMediumProps>(
	(
		{
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
			className,
			...props
		},
		ref,
	) => {
		const [isFocused, setIsFocused] = React.useState(false);

		const inputId = React.useId();

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			onChange(event.target.value);
		};

		const wrapperState = (() => {
			if (isDisabled || isReadOnly) return "disabled";
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
				<label htmlFor={inputId} className="shrink-0 body03-r-16 text-black">
					{label}
					{isRequired && <span className="ml-[0.2rem]">*</span>}
				</label>

				{/* input wrapper */}
				<div className="w-[22.2rem] shrink-0">
					<div
						className={cn(
							inputMediumVariants({ state: wrapperState }),
							className,
						)}
					>
						<input
							id={inputId}
							ref={ref}
							type="text"
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
								"shrink-0 text-right label02-m-14",
								unit ? "visible" : "invisible",
								isDisabled ? "text-gray-500" : "text-gray-900",
							)}
						>
							{unit ?? ""}
						</span>
					</div>

					{/* error message */}
					{isError && errorMessage && (
						<div className="mt-[0.2rem] flex items-center gap-[0.4rem] text-red-500 label06-r-12">
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
	},
);

InputMedium.displayName = "InputMedium";

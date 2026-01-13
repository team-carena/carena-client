import { cn } from "@shared/libs/cn";
import SystemDangerIcon from "@svg/system-danger.svg?react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const inputSmallVariants = cva(
	"flex items-center justify-between rounded-[0.6rem] border transition-colors px-[1.2rem] py-[0.8rem]",
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

interface InputSmallProps extends VariantProps<typeof inputSmallVariants> {
	labelLeft: string;
	labelRight: string;

	valueLeft: string;
	valueRight: string;

	placeholderLeft?: string;
	placeholderRight?: string;

	unitLeft: string;
	unitRight: string;

	isError?: boolean;
	errorMessage?: string;

	isDisabled?: boolean;
	isReadOnly?: boolean;

	onChangeLeft: (value: string) => void;
	onChangeRight: (value: string) => void;
}

export const InputSmall = ({
	labelLeft,
	labelRight,
	valueLeft,
	valueRight,
	placeholderLeft,
	placeholderRight,
	unitLeft,
	unitRight,
	isError = false,
	errorMessage,
	isDisabled = false,
	isReadOnly = false,
	onChangeLeft,
	onChangeRight,
}: InputSmallProps) => {
	const [focused, setFocused] = React.useState<"left" | "right" | null>(null);

	const leftInputId = React.useId();
	const rightInputId = React.useId();

	const getState = (value: string, isFocused: boolean) => {
		if (isDisabled || isReadOnly) return "disabled";
		if (isError) return "error";
		if (isFocused) return "focused";
		if (value) return "completed";
		return "default";
	};

	const fieldState = isDisabled
		? "disabled"
		: isReadOnly
			? "readonly"
			: "default";

	return (
		<div className="w-full">
			<div className="flex items-start gap-[1.6rem]">
				{/* left */}
				<div className="flex-1">
					<div className="flex items-start justify-between">
						<label
							htmlFor={leftInputId}
							className="body03-r-16 text-black shrink-0"
						>
							{labelLeft}
						</label>

						{/* input + error */}
						<div className="flex flex-col w-[10.4rem] shrink-0">
							<div
								className={cn(
									inputSmallVariants({
										state: getState(valueLeft, focused === "left"),
									}),
								)}
							>
								<input
									id={leftInputId}
									value={valueLeft}
									placeholder={placeholderLeft}
									disabled={isDisabled}
									readOnly={isReadOnly}
									onChange={(e) => onChangeLeft(e.target.value)}
									onFocus={() =>
										!isDisabled && !isReadOnly && setFocused("left")
									}
									onBlur={() => setFocused(null)}
									className={cn(inputFieldVariants({ state: fieldState }))}
								/>
								<span className="shrink-0 label03-m-12">{unitLeft}</span>
							</div>

							{/* error message */}
							{isError && errorMessage && (
								<div
									className="mt-[0.2rem] flex items-center gap-[0.4rem] text-red-500 label06-r-12 whitespace-nowrap"
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
				</div>

				{/* right */}
				<div className="flex-1">
					<div className="flex items-start justify-between">
						<label
							htmlFor={rightInputId}
							className="body03-r-16 text-black shrink-0"
						>
							{labelRight}
						</label>

						<div className="w-[10.4rem] shrink-0">
							<div
								className={cn(
									inputSmallVariants({
										state: getState(valueRight, focused === "right"),
									}),
								)}
							>
								<input
									id={rightInputId}
									value={valueRight}
									placeholder={placeholderRight}
									disabled={isDisabled}
									readOnly={isReadOnly}
									onChange={(e) => onChangeRight(e.target.value)}
									onFocus={() =>
										!isDisabled && !isReadOnly && setFocused("right")
									}
									onBlur={() => setFocused(null)}
									className={cn(inputFieldVariants({ state: fieldState }))}
								/>
								<span className="shrink-0 label03-m-12">{unitRight}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

InputSmall.displayName = "InputSmall";

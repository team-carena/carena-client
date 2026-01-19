import { cn } from "@shared/libs/cn";
import SystemDangerIcon from "@svg/system-danger.svg?react";
import { cva } from "class-variance-authority";
import * as React from "react";

// label-input wrapper
const inputWrapperVariants = cva(
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

// input필드
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

	const getWrapperState = (
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

	const getTextState = (disabled?: boolean, readOnly?: boolean) =>
		disabled ? "disabled" : readOnly ? "readonly" : "default";

	// left/right 필드의 반복되는 렌더링 로직을 함수로 추출, 컴포넌트 반환
	const renderInput = (
		field: InputFieldProps,
		side: "left" | "right",
		inputId: string,
	) => {
		const {
			label,
			unit,
			disabled,
			readOnly,
			value,
			onFocus,
			onBlur,
			...inputProps // 나머지 input태그 props는 inputProps에 담음
		} = field;

		return (
			<div className="flex flex-1 items-center justify-between">
				<label htmlFor={inputId} className="body03-r-16 shrink-0 text-black">
					{label}
				</label>

				<div
					className={cn(
						"w-[10.4rem] shrink-0",
						inputWrapperVariants({
							state: getWrapperState(
								value,
								focused === side,
								disabled,
								readOnly,
							),
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
							// input focus 상태에 따라 wrapper 스타일 결정
							if (!disabled && !readOnly) setFocused(side);
							// register가 내려준 react-hook-form의 onFocus -> react-hook-form의 onFocus 추적
							onFocus?.(e);
						}}
						onBlur={(e) => {
							setFocused(null);
							onBlur?.(e);
						}}
						className={cn(
							inputFieldVariants({
								state: getTextState(disabled, readOnly),
							}),
						)}
						{...inputProps}
					/>
					<span className="label03-m-12 shrink-0">{unit}</span>
				</div>
			</div>
		);
	};

	return (
		<div className="flex w-full flex-col">
			{/* label + input row */}
			<div className="flex items-center gap-[1.6rem]">
				{renderInput(left, "left", leftInputId)}
				{renderInput(right, "right", rightInputId)}
			</div>

			{/* error message */}
			{hasError && (
				<div
					className="label06-r-12 mt-[0.2rem] flex items-center gap-[0.4rem] whitespace-nowrap text-red-500"
					role="alert"
				>
					<SystemDangerIcon className="shrink-0" aria-hidden />
					<span>{errorMessage}</span>
				</div>
			)}
		</div>
	);
};

InputSmall.displayName = "InputSmall";

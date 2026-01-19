import { cn } from "@shared/libs/cn";
import SystemDangerIcon from "@svg/system-danger.svg?react";
import { cva } from "class-variance-authority";
import * as React from "react";

// input wrapper 스타일
const dateInputWrapperVariants = cva(
	"flex items-center rounded-[6px] border px-[1.6rem] py-[0.8rem] transition-colors",
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

// input 텍스트 스타일
const dateInputTextVariants = cva(
	"label04-r-16 w-full bg-transparent placeholder-gray-500 outline-none",
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

interface DateFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
}

interface DateInputProps {
	year: DateFieldProps;
	month: DateFieldProps;
	day: DateFieldProps;
	errorMessage?: string;
}

export const DateInput = ({
	year,
	month,
	day,
	errorMessage,
}: DateInputProps) => {
	const [focused, setFocused] = React.useState<"year" | "month" | "day" | null>(
		null,
	);

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

	// year/month/day 필드의 반복되는 렌더링 로직을 함수로 추출
	const renderInput = (
		field: DateFieldProps,
		fieldName: "year" | "month" | "day",
		minWidth: string,
	) => {
		const {
			placeholder,
			disabled,
			readOnly,
			value,
			onFocus,
			onBlur,
			onChange,
			...inputProps
		} = field;

		return (
			<div
				className={cn(
					"w-full",
					minWidth,
					dateInputWrapperVariants({
						state: getWrapperState(
							value,
							focused === fieldName,
							disabled,
							readOnly,
						),
					}),
				)}
			>
				<input
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					placeholder={placeholder}
					aria-label={
						fieldName === "year" ? "연도" : fieldName === "month" ? "월" : "일"
					}
					value={value}
					disabled={disabled}
					readOnly={readOnly}
					onFocus={(e) => {
						if (!disabled && !readOnly) setFocused(fieldName);
						onFocus?.(e);
					}}
					onBlur={(e) => {
						setFocused(null);
						onBlur?.(e);
					}}
					onChange={(e) => {
						// 숫자만 허용
						// DateInput은 날짜 전용 컴포넌트 -> 숫자만 허용하는 로직 넣어도 컴포넌트의 책임 범위 안
						e.target.value = e.target.value.replace(/[^0-9]/g, "");
						onChange?.(e);
					}}
					className={cn(
						dateInputTextVariants({ state: getTextState(disabled, readOnly) }),
					)}
					{...inputProps}
				/>
			</div>
		);
	};

	return (
		<div className="w-full">
			{/* input row */}
			<div className="flex items-center gap-[0.4rem]">
				{renderInput(year, "year", "min-w-[12.5rem]")}
				{renderInput(month, "month", "min-w-[10.1rem]")}
				{renderInput(day, "day", "min-w-[10.1rem]")}
			</div>

			{/* error message */}
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

DateInput.displayName = "DateInput";

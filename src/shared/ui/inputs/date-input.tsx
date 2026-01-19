import { cn } from "@shared/libs/cn";
import SystemDangerIcon from "@svg/system-danger.svg?react";
import { cva } from "class-variance-authority";
import * as React from "react";

const dateInputVariants = cva(
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

const inputFieldVariants = cva(
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

const filterNumeric = (value: string) => value.replace(/[^0-9]/g, "");

interface DateInputProps {
	year: string;
	month: string;
	day: string;

	isError?: boolean;
	errorMessage?: string;

	isDisabled?: boolean;
	isReadOnly?: boolean;

	onChangeYear: (value: string) => void;
	onChangeMonth: (value: string) => void;
	onChangeDay: (value: string) => void;
}

export const DateInput = ({
	year,
	month,
	day,
	isError = false,
	errorMessage,
	isDisabled = false,
	isReadOnly = false,
	onChangeYear,
	onChangeMonth,
	onChangeDay,
}: DateInputProps) => {
	const [focused, setFocused] = React.useState<"year" | "month" | "day" | null>(
		null,
	);

	const getState = (value: string, isFocused: boolean) => {
		if (isDisabled) return "disabled";
		if (isReadOnly) return "readonly";
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
			{/* input row */}
			<div className="flex items-center gap-[0.4rem]">
				{/* year */}
				<div
					className={cn(
						"w-full min-w-[12.5rem]",
						dateInputVariants({
							state: getState(year, focused === "year"),
						}),
					)}
				>
					<input
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						value={year}
						placeholder="YYYY"
						aria-label="연도"
						disabled={isDisabled}
						readOnly={isReadOnly}
						onChange={(e) => onChangeYear(filterNumeric(e.target.value))}
						onFocus={() => !isDisabled && !isReadOnly && setFocused("year")}
						onBlur={() => setFocused(null)}
						className={cn(inputFieldVariants({ state: fieldState }))}
					/>
				</div>

				{/* month */}
				<div
					className={cn(
						"w-full min-w-[10.1rem]",
						dateInputVariants({
							state: getState(month, focused === "month"),
						}),
					)}
				>
					<input
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						value={month}
						placeholder="MM"
						aria-label="월"
						disabled={isDisabled}
						readOnly={isReadOnly}
						onChange={(e) => onChangeMonth(filterNumeric(e.target.value))}
						onFocus={() => !isDisabled && !isReadOnly && setFocused("month")}
						onBlur={() => setFocused(null)}
						className={cn(inputFieldVariants({ state: fieldState }))}
					/>
				</div>

				{/* day */}
				<div
					className={cn(
						"w-full min-w-[10.1rem]",
						dateInputVariants({
							state: getState(day, focused === "day"),
						}),
					)}
				>
					<input
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						value={day}
						placeholder="DD"
						aria-label="일"
						disabled={isDisabled}
						readOnly={isReadOnly}
						onChange={(e) => onChangeDay(filterNumeric(e.target.value))}
						onFocus={() => !isDisabled && !isReadOnly && setFocused("day")}
						onBlur={() => setFocused(null)}
						className={cn(inputFieldVariants({ state: fieldState }))}
					/>
				</div>
			</div>

			{/* error message */}
			{isError && errorMessage && (
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

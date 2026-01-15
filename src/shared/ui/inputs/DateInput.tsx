import { cn } from "@shared/libs/cn";
import SystemDangerIcon from "@svg/system-danger.svg?react";
import { cva } from "class-variance-authority";
import * as React from "react";

const dateInputVariants = cva(
	"flex items-center rounded-[6px] border transition-colors px-[1.6rem] py-[0.8rem]",
	{
		variants: {
			state: {
				default: "border-gray-200",
				focused: "border-primary-500",
				completed: "border-gray-900",
				error: "border-red-500",
				disabled: "border-gray-500 bg-gray-100",
				view: "border-gray-500 bg-gray-100",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

const inputFieldVariants = cva(
	"w-full bg-transparent outline-none placeholder-gray-500 label04-r-16",
	{
		variants: {
			state: {
				default: "text-gray-900",
				disabled: "text-gray-500 cursor-not-allowed",
				view: "cursor-default",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

interface DateInputProps {
	year: string;
	month: string;
	day: string;

	isError?: boolean;
	errorMessage?: string;

	isDisabled?: boolean;
	isView?: boolean;

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
	isView = false,
	onChangeYear,
	onChangeMonth,
	onChangeDay,
}: DateInputProps) => {
	const [focused, setFocused] = React.useState<"year" | "month" | "day" | null>(
		null,
	);

	const getState = (value: string, isFocused: boolean) => {
		if (isDisabled) return "disabled";
		if (isView) return "view";
		if (isError) return "error";
		if (isFocused) return "focused";
		if (value) return "completed";
		return "default";
	};

	const fieldState = isDisabled ? "disabled" : isView ? "view" : "default";

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
						disabled={isDisabled}
						readOnly={isView}
						onChange={(e) => onChangeYear(e.target.value)}
						onFocus={() => !isDisabled && !isView && setFocused("year")}
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
						value={month}
						placeholder="MM"
						disabled={isDisabled}
						readOnly={isView}
						onChange={(e) => onChangeMonth(e.target.value)}
						onFocus={() => !isDisabled && !isView && setFocused("month")}
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
						value={day}
						placeholder="DD"
						disabled={isDisabled}
						readOnly={isView}
						onChange={(e) => onChangeDay(e.target.value)}
						onFocus={() => !isDisabled && !isView && setFocused("day")}
						onBlur={() => setFocused(null)}
						className={cn(inputFieldVariants({ state: fieldState }))}
					/>
				</div>
			</div>

			{/* error message */}
			{isError && errorMessage && (
				<div className="mt-[0.2rem] flex items-center gap-[0.4rem] text-red-500 label06-r-12">
					<SystemDangerIcon className="shrink-0" aria-hidden />
					<span>{errorMessage}</span>
				</div>
			)}
		</div>
	);
};

DateInput.displayName = "DateInput";

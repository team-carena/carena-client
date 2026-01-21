import type * as React from "react";
import { CheckW } from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";

interface CheckBoxProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"type" | "onChange"
	> {
	checked: boolean;
	onChange: (checked: boolean) => void;
	disabled?: boolean;
}

export const CheckBox = ({ checked, onChange, disabled }: CheckBoxProps) => {
	return (
		<label
			className={cn(
				"relative inline-flex items-center",
				disabled ? "cursor-not-allowed" : "cursor-pointer",
			)}
		>
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				disabled={disabled}
				className="peer sr-only"
			/>

			<span
				className={cn(
					"flex h-[2rem] w-[2rem] items-center justify-center rounded-[4px] border transition-default [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100",
					disabled
						? "border-gray-500 bg-gray-200"
						: "border-gray-900 peer-checked:bg-primary-500",
				)}
			>
				<CheckW />
			</span>
		</label>
	);
};

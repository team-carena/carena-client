import type * as React from "react";
import { CheckW } from "@/shared/assets/svg";

interface CheckBoxProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"type" | "onChange"
	> {
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export const CheckBox = ({ checked, onChange }: CheckBoxProps) => {
	return (
		<label className="relative inline-flex cursor-pointer items-center">
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				className="peer sr-only"
			/>

			<span className="flex h-[2rem] w-[2rem] items-center justify-center rounded-[4px] border border-gray-900 transition-default peer-checked:bg-primary-500 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
				<CheckW />
			</span>
		</label>
	);
};

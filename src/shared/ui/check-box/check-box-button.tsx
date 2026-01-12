import { CheckW } from "@/shared/assets/svg";

interface CheckBoxProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export const CheckBox = ({ checked, onChange }: CheckBoxProps) => {
	return (
		<label className="relative inline-flex items-center cursor-pointer">
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				className="peer sr-only"
			/>

			<span
				className="
          w-[2rem] h-[2rem]
          border border-gray-900 rounded-[0.4rem]
          flex items-center justify-center
          peer-checked:bg-primary-500
          [&>svg]:opacity-0
          peer-checked:[&>svg]:opacity-100
        "
			>
				<CheckW />
			</span>
		</label>
	);
};

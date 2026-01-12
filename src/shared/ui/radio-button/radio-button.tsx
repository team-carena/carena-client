import { clsx } from "clsx";

interface RadioButtonProps {
	text?: string;
	checked: boolean;
	onChange: () => void;
	name: string;
	disabled?: boolean;
}

export const RadioButton = ({
	text,
	checked,
	onChange,
	name,
	disabled,
}: RadioButtonProps) => {
	return (
		<label
			className={clsx(
				"w-fit flex items-center cursor-pointer",
				text && "gap-[1.2rem] py-[1.2rem] pl-[1.2rem]",
			)}
		>
			<input
				type="radio"
				name={name}
				checked={checked}
				disabled={disabled}
				onChange={onChange}
				className="peer sr-only"
			/>

			<span
				data-disabled={disabled}
				className="
					w-[2rem] h-[2rem] rounded-full flex items-center justify-center flex-shrink-0
					border border-gray-700
					peer-checked:border-primary-500 
					peer-disabled:border-gray-500 peer-disabled:bg-gray-200 peer-disabled:cursor-not-allowed
					peer-checked:peer-disabled:border-gray-500
					peer-checked:peer-disabled:bg-gray-100
					[&>span]:opacity-0 peer-checked:[&>span]:opacity-100
					data-[disabled=true]:[&>span]:bg-gray-500
				"
			>
				<span className="w-[1rem] h-[1rem] rounded-full bg-primary-500" />
			</span>

			{text && <span className="label04-r-16 text-black">{text}</span>}
		</label>
	);
};

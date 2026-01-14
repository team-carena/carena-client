import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

interface DropDownOption {
	value: string; // ex) "2025-11-02"
	label: string; // ex) "2025년 11월 02일"
	subLabel: string; // ex) 병원명
}

interface DropDownProps {
	value: string;
	onValueChange: (value: string) => void;
	options: DropDownOption[];
}

export const DropDown = ({ value, onValueChange, options }: DropDownProps) => {
	const selectedOption = options.find((o) => o.value === value);
	const excludeSelectedOptions = options.filter((o) => o.value !== value);

	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger disabled={options.length <= 1}>
				<span>{selectedOption?.label}</span>
				<span className="flex-1 text-left ml-[2rem] body04-r-14">
					{selectedOption?.subLabel}
				</span>
			</SelectTrigger>

			<SelectContent>
				{excludeSelectedOptions.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						<span className="w-[12.5rem]">{option.label}</span>
						<span className="ml-[1rem] body05-r-12">{option.subLabel}</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

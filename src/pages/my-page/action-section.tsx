import { SelectList } from "@/shared/ui/navigations/select-list";

interface ActionSectionProps {
	title: string;
	label: string;
	onClick: () => void;
}
export const ActionSection = ({
	title,
	label,
	onClick,
}: ActionSectionProps) => {
	return (
		<section className="flex flex-col p-[2rem] gap-[2rem] rounded-[1.2rem] bg-gray-50">
			<span className="head03-sb-16">{title}</span>
			<SelectList label={label} onClick={onClick} />
		</section>
	);
};

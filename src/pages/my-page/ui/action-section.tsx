import { SelectList } from "@/shared/ui/navigations/select-list";

interface ActionItem {
	label: string;
	onClick: () => void;
}

interface ActionSectionProps {
	title: string;
	items: ActionItem[];
}

export const ActionSection = ({ title, items }: ActionSectionProps) => {
	return (
		<section className="flex flex-col gap-[2rem] rounded-[12px] bg-gray-50 p-[2rem]">
			<span className="head02-b-16">{title}</span>

			<div className="flex flex-col gap-[2rem]">
				{items.map((item) => (
					<SelectList
						key={item.label}
						label={item.label}
						onClick={item.onClick}
						link={title === "약관 및 정책"}
					/>
				))}
			</div>
		</section>
	);
};

interface ActionSectionProps {
	title: string;
	navLabel: string;
	onClick: () => void;
}
export const ActionSection = ({
	title,
	navLabel,
	onClick,
}: ActionSectionProps) => {
	// TODO: navLabel button을 공컴 navi_row_small로 대체

	return (
		<section className="flex flex-col p-[2rem] gap-[2rem] rounded-[1.2rem] bg-gray-50">
			<span className="head03-sb-16">{title}</span>
			<button onClick={onClick} className="flex body04-r-14">
				{navLabel}
			</button>
		</section>
	);
};

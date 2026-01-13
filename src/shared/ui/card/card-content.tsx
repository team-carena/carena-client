import Tag from "@shared/ui/tags/tag";

export type ContentCardProps = {
	subtitle?: string;
	content: string;
	tags: string[];
	className?: string;
};

const ContentCard = ({
	subtitle,
	content,
	tags,
	className,
}: ContentCardProps) => {
	return (
		<div
			className={[
				"w-full rounded-[12px] border border-gray-100 bg-white",
				"px-[20px] py-[24px]",
				className,
			].join(" ")}
		>
			{subtitle ? (
				<h3 className="head04-m-16 mb-[8px] text-gray-900">{subtitle}</h3>
			) : null}

			<p className="body03-r-16 text-gray-900">{content}</p>

			<div className="mt-[20px] flex flex-wrap gap-[8px]">
				{tags.map((tag) => (
					<Tag key={tag}>{tag}</Tag>
				))}
			</div>
		</div>
	);
};

export default ContentCard;

import Tag from "@shared/ui/tags/tag";

export type ContentCardProps = {
	subtitle?: string;
	content: string;
	tags: string[];
};

const ContentCard = ({ subtitle, content, tags }: ContentCardProps) => {
	return (
		<div className="w-full rounded-[1.2rem] border border-gray-100 bg-white px-[2rem] py-[2.4rem]">
			{subtitle ? (
				<h3 className="head04-m-16 mb-[0.8rem] text-gray-900">{subtitle}</h3>
			) : null}

			<p className="body03-r-16 text-gray-900">{content}</p>

			<div className="mt-[2rem] flex flex-wrap gap-[0.8rem]">
				{tags.map((tag) => (
					<Tag key={tag}>{tag}</Tag>
				))}
			</div>
		</div>
	);
};

export default ContentCard;

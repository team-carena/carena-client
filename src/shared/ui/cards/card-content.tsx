import { createContext, useContext } from "react";
import { cn } from "@/shared/libs/cn";
import Tag from "@/shared/ui/tags/tag";

type ContentCardVariant = "default" | "muted";

const ContentCardVariantContext = createContext<ContentCardVariant>("default");

interface ContentCardRootProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: ContentCardVariant;
}

interface ContentCardTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}

interface ContentCardContentProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}

interface ContentCardTagsProps extends React.HTMLAttributes<HTMLDivElement> {
	tags: string[];
}

const Root = ({
	variant = "default",
	className,
	...props
}: ContentCardRootProps) => {
	return (
		<ContentCardVariantContext.Provider value={variant}>
			<div
				className={cn(
					"rounded-[12px] border border-gray-100 bg-white",
					variant === "default" && "w-full px-[2rem] py-[2.4rem]",
					variant === "muted" && "min-w-[34.3rem] p-[1.2rem]",
					className,
				)}
				{...props}
			/>
		</ContentCardVariantContext.Provider>
	);
};

const Title = ({ className, ...props }: ContentCardTitleProps) => {
	return (
		<h3
			className={cn("head04-m-16 mb-[0.8rem] text-gray-900", className)}
			{...props}
		/>
	);
};

const Content = ({ className, ...props }: ContentCardContentProps) => {
	const variant = useContext(ContentCardVariantContext);

	return (
		<div
			className={cn(
				variant === "muted" ? "body05-r-12" : "body04-r-14",
				"text-gray-900",
				className,
			)}
			{...props}
		/>
	);
};

const Tags = ({ tags, className, ...props }: ContentCardTagsProps) => {
	if (tags.length === 0) return null;

	return (
		<div
			className={cn("mt-[4rem] flex flex-wrap gap-[0.8rem]", className)}
			{...props}
		>
			{tags.map((tag) => (
				<Tag key={tag}>{tag}</Tag>
			))}
		</div>
	);
};

export const ContentCard = Object.assign(Root, {
	Root,
	Title,
	Content,
	Tags,
});

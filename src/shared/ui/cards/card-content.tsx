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
					"w-full rounded-[12px] border",
					variant === "default" &&
						"border-gray-100 bg-white px-[2rem] py-[2.4rem]",
					variant === "muted" && "border-gray-300 bg-gray-50 p-[1.2rem]",
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
				variant === "muted" ? "body05-r-12" : "body03-r-16",
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
			className={cn("mt-[2rem] flex flex-wrap gap-[0.8rem]", className)}
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

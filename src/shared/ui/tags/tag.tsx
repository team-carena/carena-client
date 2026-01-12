import { cn } from "@/shared/libs/cn";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode;
}

const Tag = ({ className, children, ...props }: TagProps) => {
	return (
		<span
			className={cn(
				"inline-flex items-center justify-center px-[0.8rem] py-[0.4rem] w-fit rounded-[8px] label06-r-12 text-gray-900 bg-primary-50",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
};

export default Tag;

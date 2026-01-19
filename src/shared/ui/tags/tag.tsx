import { cn } from "@/shared/libs/cn";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode;
}

const Tag = ({ className, children, ...props }: TagProps) => {
	return (
		<span
			className={cn(
				"label06-r-12 inline-flex w-fit items-center justify-center rounded-[8px] bg-primary-50 px-[0.8rem] py-[0.4rem] text-gray-900",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
};

export default Tag;

import { cn } from "@/shared/libs/cn";

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode;
}

const Label = ({ className, children, ...props }: LabelProps) => {
	return (
		<span
			className={cn(
				"head05-r-14 inline-flex w-fit items-center justify-center rounded-[4px] bg-primary-50 px-[0.8rem] py-[0.4rem] text-gray-900",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
};

export default Label;

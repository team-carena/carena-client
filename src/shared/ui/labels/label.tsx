import { cn } from "@/shared/libs/cn";

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode;
}

const Label = ({ className, children, ...props }: LabelProps) => {
	return (
		<span
			className={cn(
				"inline-flex items-center justify-center px-[0.8rem] py-[0.4rem] w-fit rounded-[4px] head05-r-14 text-gray-900 bg-primary-50",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
};

export default Label;

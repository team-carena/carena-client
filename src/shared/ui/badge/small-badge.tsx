import { cn } from "@shared/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";

const smallBadgeVariants = cva(
	"inline-flex items-center justify-center w-fit px-[0.8rem] py-[0.4rem] label01-sb-14 rounded-full text-white",
	{
		variants: {
			variant: {
				normal: "bg-green-500",
				borderline: "bg-blue-500",
				suspicious: "bg-red-500",
			},
		},
		defaultVariants: {
			variant: "normal",
		},
	},
);

export interface SmallBadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof smallBadgeVariants> {
	children: React.ReactNode;
}

export const SmallBadge = ({
	className,
	variant,
	children,
}: SmallBadgeProps) => {
	return (
		<span className={cn(smallBadgeVariants({ variant }), className)}>
			{children}
		</span>
	);
};

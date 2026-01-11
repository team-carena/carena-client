import { cn } from "@shared/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";

const largeBadgeVariants = cva(
	"inline-flex items-center justify-center w-fit p-[1.2rem] label01-sb-14 rounded-[8px] border text-gray-900",
	{
		variants: {
			variant: {
				normal: "bg-green-100 border-green-500",
				borderline: "bg-blue-100 border-blue-500",
				suspicious: "bg-red-100 border-red-500",
			},
		},
		defaultVariants: {
			variant: "normal",
		},
	},
);

export interface LargeBadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof largeBadgeVariants> {
	children: React.ReactNode;
}

export const LargeBadge = ({
	className,
	variant,
	children,
}: LargeBadgeProps) => {
	return (
		<span className={cn(largeBadgeVariants({ variant }), className)}>
			{children}
		</span>
	);
};

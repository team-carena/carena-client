import { cn } from "@shared/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";

const largeBadgeVariants = cva(
	"label01-sb-14 inline-flex w-fit items-center justify-center rounded-[8px] border p-[1.2rem] text-gray-900",
	{
		variants: {
			variant: {
				normal: "border-green-500 bg-green-100",
				borderline: "border-blue-500 bg-blue-100",
				suspicious: "border-red-500 bg-red-100",
			},
		},
		defaultVariants: {
			variant: "normal",
		},
	},
);

// LargeBadgeProps['variant'] == "normal" | "borderline" | "suspicious" | null
export interface LargeBadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof largeBadgeVariants> {
	children: React.ReactNode;
}

export const LargeBadge = ({
	className,
	variant,
	children,
	...props
}: LargeBadgeProps) => {
	return (
		<span className={cn(largeBadgeVariants({ variant }), className)} {...props}>
			{children}
		</span>
	);
};

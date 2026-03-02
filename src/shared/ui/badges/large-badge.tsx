import { cn } from "@shared/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";

const largeBadgeVariants = cva(
	"label01-sb-14 inline-flex w-fit items-center justify-center rounded-[8px] border px-[1.2rem] py-[0.8rem]",
	{
		variants: {
			variant: {
				normal: "border-green-500 bg-green-100 text-green-500",
				borderline: "border-orange-500 bg-orange-100 text-orange-500",
				suspicious: "border-red-500 bg-red-100 text-red-500",
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

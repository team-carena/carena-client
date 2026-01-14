import { ChevronSRight, Q } from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";

export interface CardTipProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	more?: boolean;
}

// 부모 컨테이너에서 너비 설정 (CardTip은 w-full)
const CardTip = ({
	className,
	children,
	more = false,
	...props
}: CardTipProps) => {
	return (
		<button
			type="button"
			className={cn(
				"flex justify-between items-center bg-white w-full px-[2rem] py-[2.4rem] rounded-[12px] border border-transparent transition-default",
				more
					? "cursor-pointer active:bg-gray-100 active:border-gray-300"
					: "cursor-default",
				className,
			)}
			disabled={!more}
			{...props}
		>
			<div className="flex items-center">
				<Q className="mr-[0.8rem] shrink-0" />
				<span className="head01-b-18 text-gray-900 text-left line-clamp-2">
					{children}
				</span>
			</div>
			{more && <ChevronSRight className="ml-[0.8rem] shrink-0" />}
		</button>
	);
};

export default CardTip;

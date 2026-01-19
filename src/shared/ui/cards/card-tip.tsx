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
				"flex w-full items-center justify-between rounded-[12px] border border-transparent bg-white px-[2rem] py-[2.4rem] transition-default",
				more
					? "cursor-pointer active:border-gray-300 active:bg-gray-100"
					: "cursor-default",
				className,
			)}
			disabled={!more}
			{...props}
		>
			<div className="flex items-center">
				<Q className="mr-[0.8rem] shrink-0" />
				<span className="head01-b-18 line-clamp-2 text-left text-gray-900">
					{children}
				</span>
			</div>
			{more && <ChevronSRight className="ml-[0.8rem] shrink-0" />}
		</button>
	);
};

export default CardTip;

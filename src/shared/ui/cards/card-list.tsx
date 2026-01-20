import { ChevronSRight } from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";

/**
 * @param more - true일 때만 onClick이 동작합니다
 */
export interface CardListProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	more?: boolean;
}

// 부모 컨테이너에서 너비 설정 (CardList는 w-full)
const CardList = ({
	className,
	children,
	more = false,
	...props
}: CardListProps) => {
	return (
		<button
			type="button"
			className={cn(
				"flex w-full items-center justify-between rounded-[12px] border border-transparent bg-white px-[2rem] py-[1.6rem] transition-default",
				more
					? "cursor-pointer active:border-gray-300 active:bg-gray-100"
					: "cursor-default",
				className,
			)}
			disabled={!more}
			{...props}
		>
			<span className="head04-m-16 text-gray-900">{children}</span>
			{more && <ChevronSRight className="ml-[1rem] shrink-0" />}
		</button>
	);
};

export default CardList;

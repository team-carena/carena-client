import { ChevronSRight } from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";

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
				"flex justify-between items-center bg-white w-full px-[2rem] py-[1.6rem] rounded-[12px] border border-transparent",
				more
					? "cursor-pointer active:bg-gray-100 active:border-gray-300"
					: "cursor-default",
				className,
			)}
			disabled={!more}
			{...props}
		>
			<span className="head04-m-16 text-gray-900">{children}</span>
			{more && <ChevronSRight className="ml-[1rem]" />}
		</button>
	);
};

export default CardList;

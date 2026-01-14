import { CarenaLogo, ChevronMLeft, My } from "@shared/assets/svg";
import { cn } from "@shared/libs/cn";
import * as React from "react";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
	title?: string;
	showBack?: boolean;
	showMy?: boolean;
	onBackClick?: () => void;
	onMyClick?: () => void;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
	(
		{
			title,
			showBack = false,
			showMy = false,
			onBackClick,
			onMyClick,
			className,
			...props
		},
		ref,
	) => {
		return (
			<header
				ref={ref}
				className={cn(
					[
						// 📌 fixed header
						"fixed top-0 left-0 right-0 z-50",

						// layout
						"flex items-center justify-between",
						"w-full",
						"px-[2rem] py-[1.6rem]",
						"bg-white",
					].join(" "),
					className,
				)}
				{...props}
			>
				{/* Left */}
				<div className="flex items-center z-10">
					{showBack ? (
						<button
							type="button"
							onClick={onBackClick}
							aria-label="뒤로가기"
							className="flex items-center justify-center"
						>
							<ChevronMLeft />
						</button>
					) : (
						<CarenaLogo />
					)}
				</div>

				{/* Title (항상 중앙 고정) */}
				{title && (
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						<span className="head04-m-16 text-gray-900">{title}</span>
					</div>
				)}

				{/* Right */}
				<div className="flex items-center z-10">
					{showMy && (
						<button
							type="button"
							onClick={onMyClick}
							aria-label="마이페이지"
							className="flex items-center justify-center"
						>
							<My />
						</button>
					)}
				</div>
			</header>
		);
	},
);

Header.displayName = "Header";

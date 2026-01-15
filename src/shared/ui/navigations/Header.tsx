import { ROUTE_PATH } from "@app/routes/paths";
import { CarenaLogo, ChevronMLeft, My } from "@shared/assets/svg";
import { cn } from "@shared/libs/cn";
import * as React from "react";
import { useNavigate } from "react-router";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
	title?: string;
	isBackVisible?: boolean;
	isMyVisible?: boolean;
	onBackClick?: () => void;
	onMyClick?: () => void;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
	(
		{
			title,
			isBackVisible = false,
			isMyVisible = false,
			onBackClick,
			onMyClick,
			className,
			...props
		},
		ref,
	) => {
		const navigate = useNavigate();

		return (
			<header
				ref={ref}
				className={cn(
					`
            fixed top-0 left-0 right-0 z-50
            flex items-center justify-between
            w-full
            px-[2rem] py-[1.6rem]
            bg-white
          `,
					className,
				)}
				{...props}
			>
				{/* Left */}
				<div className="flex items-center z-10">
					{isBackVisible ? (
						<button
							type="button"
							onClick={onBackClick ?? (() => navigate(-1))}
							aria-label="뒤로가기"
							className="flex items-center justify-center"
						>
							<ChevronMLeft className="shrink-0" aria-hidden />
						</button>
					) : (
						<CarenaLogo className="shrink-0" aria-hidden />
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
					{isMyVisible && (
						<button
							type="button"
							onClick={onMyClick ?? (() => navigate(ROUTE_PATH.MY_PAGE))}
							aria-label="마이페이지"
							className="flex items-center justify-center"
						>
							<My className="shrink-0" aria-hidden />
						</button>
					)}
				</div>
			</header>
		);
	},
);

Header.displayName = "Header";

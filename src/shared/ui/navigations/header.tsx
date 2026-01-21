import { ROUTE_PATH } from "@app/routes/paths";
import { CarenaLogo, ChevronMLeft, My } from "@shared/assets/svg";
import { cn } from "@shared/libs/cn";
import type * as React from "react";
import { useNavigate } from "react-router";

/**
 * 헤더 종류
 * - "main": 메인 페이지용 (로고 + 마이페이지 아이콘)
 * - "back": 서브 페이지용 (뒤로가기 + 타이틀)
 * - "signup": 회원가입 페이지용 (로고 + 타이틀)
 * - "none": 헤더 숨김
 */
export type HeaderVariant = "main" | "back" | "signup" | "none";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
	variant?: HeaderVariant;
	title?: string; // 헤더 중앙에 표시될 타이틀
	onBackClick?: () => void; // 뒤로가기 버튼 클릭 핸들러 (기본: navigate(-1))
	onMyClick?: () => void; // 마이페이지 버튼 클릭 핸들러 (기본: 마이페이지 이동)
}

export const Header = ({
	variant = "main",
	title,
	onBackClick,
	onMyClick,
	className,
	...props
}: HeaderProps) => {
	const navigate = useNavigate();

	// variant가 "none"이면 헤더를 렌더링하지 않음
	if (variant === "none") return null;

	// variant에 따라 어떤 요소를 보여줄지 결정
	const showBackButton = variant === "back";
	const showLogo = variant === "main" || variant === "signup";
	const showMyButton = variant === "main";

	return (
		<header
			className={cn(
				`fixed top-0 left-1/2 z-50 flex w-full min-w-[var(--app-min-width)] max-w-[var(--app-max-width)] -translate-x-1/2 items-center justify-between bg-white px-[2rem] py-[1.6rem]`,
				className,
			)}
			{...props}
		>
			{/* Left: 뒤로가기 버튼 또는 로고 */}
			<div className="flex items-center">
				{showBackButton && (
					<button
						type="button"
						onClick={onBackClick ?? (() => navigate(-1))}
						aria-label="뒤로가기"
						className="flex items-center justify-center"
					>
						<ChevronMLeft className="shrink-0" aria-hidden />
					</button>
				)}
				{showLogo && <CarenaLogo className="shrink-0" aria-hidden />}
			</div>

			{/* Center: 타이틀 */}
			{title && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<span className="head04-m-16 text-gray-900">{title}</span>
				</div>
			)}

			{/* Right: 마이페이지 버튼 또는 빈 공간 (signup에서 대칭용) */}
			<div className="flex items-center">
				{showMyButton && (
					<button
						type="button"
						onClick={onMyClick ?? (() => navigate(ROUTE_PATH.MY_PAGE))}
						aria-label="마이페이지"
						className="flex items-center justify-center"
					>
						<My className="shrink-0" aria-hidden />
					</button>
				)}
				{variant === "signup" && <div className="w-[2.4rem]" />}
			</div>
		</header>
	);
};

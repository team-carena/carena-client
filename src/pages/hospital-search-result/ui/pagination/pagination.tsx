import type { HTMLAttributes } from "react";
import {
	ChevronDoubleLeft,
	ChevronDoubleLeftGray,
	ChevronDoubleRight,
	ChevronDoubleRightGray,
	ChevronMLeft,
	ChevronMLeftGray,
	ChevronMRight,
	ChevronMRightGray,
} from "@/shared/assets/svg";
import { cn } from "@/shared/libs/cn";
import { ArrowButton } from "../buttons/arrow-button";
import { PaginationItem } from "../buttons/pagination-item";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
	pages: number[];
	currentPage: number;

	showFirst?: boolean;
	showLast?: boolean;

	isFirstDisabled?: boolean;
	isPrevDisabled?: boolean;
	isNextDisabled?: boolean;
	isLastDisabled?: boolean;

	onFirstClick?: () => void;
	onPrevClick?: () => void;
	onPageClick?: (page: number) => void;
	onNextClick?: () => void;
	onLastClick?: () => void;
}

const Pagination = ({
	className,
	pages,
	currentPage,
	showFirst = false,
	showLast = false,
	isFirstDisabled = false,
	isPrevDisabled = false,
	isNextDisabled = false,
	isLastDisabled = false,
	onFirstClick,
	onPrevClick,
	onPageClick,
	onNextClick,
	onLastClick,
	...props
}: PaginationProps) => {
	return (
		<nav
			aria-label="pagination"
			className={cn("flex items-center justify-center gap-[0.8rem]", className)}
			{...props}
		>
			{showFirst && (
				<ArrowButton
					type="button"
					aria-label="첫 페이지로 이동"
					icon={ChevronDoubleLeft}
					disabledIcon={ChevronDoubleLeftGray}
					disabled={isFirstDisabled}
					onClick={onFirstClick}
				/>
			)}

			<ArrowButton
				type="button"
				aria-label="이전 페이지로 이동"
				icon={ChevronMLeft}
				disabledIcon={ChevronMLeftGray}
				disabled={isPrevDisabled}
				onClick={onPrevClick}
			/>

			<div className="flex items-center gap-[0.8rem]">
				{pages.map((page) => (
					<PaginationItem
						key={page}
						isActive={page === currentPage}
						onClick={() => onPageClick?.(page)}
					>
						{page}
					</PaginationItem>
				))}
			</div>

			<ArrowButton
				type="button"
				aria-label="다음 페이지로 이동"
				icon={ChevronMRight}
				disabledIcon={ChevronMRightGray}
				disabled={isNextDisabled}
				onClick={onNextClick}
			/>

			{showLast && (
				<ArrowButton
					type="button"
					aria-label="마지막 페이지로 이동"
					icon={ChevronDoubleRight}
					disabledIcon={ChevronDoubleRightGray}
					disabled={isLastDisabled}
					onClick={onLastClick}
				/>
			)}
		</nav>
	);
};

export { Pagination };

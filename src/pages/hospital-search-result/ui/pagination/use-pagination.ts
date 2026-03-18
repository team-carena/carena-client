import { useCallback, useEffect, useMemo, useState } from "react";

interface UsePaginationParams {
	totalCount: number;
	itemsPerPage?: number;
	initialPage?: number;
	storageKey?: string; // 새로고침 시 페이지 유지를 위한 storage key
	controlledPage?: number; // 외부에서 페이지를 제어할 때 사용하는 값
}

interface UsePaginationReturn {
	currentPage: number;
	totalPages: number;
	pages: number[];

	showFirst: boolean;
	showLast: boolean;

	isFirstDisabled: boolean;
	isPrevDisabled: boolean;
	isNextDisabled: boolean;
	isLastDisabled: boolean;

	goToPage: (page: number) => void;
	goToFirstPage: () => void;
	goToPrevPage: () => void;
	goToNextPage: () => void;
	goToLastPage: () => void;
}

const PAGE_GROUP_SIZE = 5; // 한 번에 보여지는 페이지 수
const DEFAULT_ITEMS_PER_PAGE = 10;

const usePagination = ({
	totalCount,
	itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
	initialPage = 1,
	storageKey,
	controlledPage,
}: UsePaginationParams): UsePaginationReturn => {
	const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
	const isControlled = controlledPage !== undefined;

	const [internalPage, setInternalPage] = useState(() => {
		if (isControlled) {
			return clampPage(controlledPage, totalPages);
		}

		if (!storageKey || typeof window === "undefined") {
			return clampPage(initialPage, totalPages);
		}

		const savedPage = window.sessionStorage.getItem(storageKey);
		const parsedPage = Number(savedPage);

		if (!savedPage || Number.isNaN(parsedPage)) {
			return clampPage(initialPage, totalPages);
		}

		return clampPage(parsedPage, totalPages);
	});

	const currentPage = isControlled
		? clampPage(controlledPage, totalPages)
		: internalPage;

	useEffect(() => {
		if (isControlled) {
			return;
		}

		setInternalPage((prevPage) => clampPage(prevPage, totalPages));
	}, [isControlled, totalPages]);

	useEffect(() => {
		if (isControlled) {
			return;
		}

		if (!storageKey || typeof window === "undefined") {
			return;
		}

		window.sessionStorage.setItem(storageKey, String(currentPage));
	}, [currentPage, isControlled, storageKey]);

	const currentGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);
	const lastGroup = Math.ceil(totalPages / PAGE_GROUP_SIZE);

	const pages = useMemo(() => {
		const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
		const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

		return createPageRange(startPage, endPage);
	}, [currentGroup, totalPages]);

	const shouldShowDoubleArrow = totalPages > PAGE_GROUP_SIZE;

	const showFirst = shouldShowDoubleArrow;
	const showLast = shouldShowDoubleArrow;

	const isFirstDisabled = currentGroup === 1;
	const isLastDisabled = currentGroup === lastGroup;

	const isPrevDisabled = currentPage === 1;
	const isNextDisabled = currentPage === totalPages;

	const setPage = useCallback(
		(page: number) => {
			if (isControlled) {
				return;
			}

			setInternalPage(clampPage(page, totalPages));
		},
		[isControlled, totalPages],
	);

	const goToPage = useCallback(
		(page: number) => {
			setPage(page);
		},
		[setPage],
	);

	const goToFirstPage = useCallback(() => {
		setPage(1);
	}, [setPage]);

	const goToPrevPage = useCallback(() => {
		setPage(currentPage - 1);
	}, [currentPage, setPage]);

	const goToNextPage = useCallback(() => {
		setPage(currentPage + 1);
	}, [currentPage, setPage]);

	const goToLastPage = useCallback(() => {
		setPage(totalPages);
	}, [setPage, totalPages]);

	return {
		currentPage,
		totalPages,
		pages,
		showFirst,
		showLast,
		isFirstDisabled,
		isPrevDisabled,
		isNextDisabled,
		isLastDisabled,
		goToPage,
		goToFirstPage,
		goToPrevPage,
		goToNextPage,
		goToLastPage,
	};
};

const clampPage = (page: number, totalPages: number) => {
	return Math.min(Math.max(page, 1), totalPages);
};

const createPageRange = (startPage: number, endPage: number) => {
	return Array.from(
		{ length: endPage - startPage + 1 },
		(_, index) => startPage + index,
	);
};

export { usePagination };

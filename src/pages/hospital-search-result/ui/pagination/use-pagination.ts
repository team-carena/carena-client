import { useCallback, useEffect, useMemo, useState } from "react";

interface UsePaginationParams {
	totalCount: number;
	itemsPerPage?: number;
	initialPage?: number;
	storageKey?: string; // 새로고침 시 페이지 유지를 위한 storage key
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
}: UsePaginationParams): UsePaginationReturn => {
	// 전체 페이지 수 계산
	const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

	// 현재 페이지 상태
	// - storageKey가 있을 경우 sessionStorage에서 페이지 복원
	// - 없으면 initialPage로 시작
	const [currentPage, setCurrentPage] = useState(() => {
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

	// totalPages 변경 시 현재 페이지 범위 조정
	useEffect(() => {
		setCurrentPage((prevPage) => clampPage(prevPage, totalPages));
	}, [totalPages]);

	// 페이지 변경 시 sessionStorage에 저장
	useEffect(() => {
		if (!storageKey || typeof window === "undefined") return;

		window.sessionStorage.setItem(storageKey, String(currentPage));
	}, [currentPage, storageKey]);

	// 현재 페이지가 속한 그룹 계산
	const currentGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);
	// 마지막 페이지 그룹 계산
	const lastGroup = Math.ceil(totalPages / PAGE_GROUP_SIZE);

	const pages = useMemo(() => {
		const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
		const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

		return createPageRange(startPage, endPage);
	}, [currentGroup, totalPages]);

	// 페이지 수가 5페이지보다 많을 때만 쌍꺽쇠 표시
	const shouldShowDoubleArrow = totalPages > PAGE_GROUP_SIZE;

	const showFirst = shouldShowDoubleArrow;
	const showLast = shouldShowDoubleArrow;

	// 쌍꺽쇠 비활성화 조건
	// - 첫 그룹일 때 << 비활성화
	// - 마지막 그룹일 때 >> 비활성화
	const isFirstDisabled = currentGroup === 1;
	const isLastDisabled = currentGroup === lastGroup;

	// 홑꺽쇠 비활성화 조건
	// - 첫 페이지일 때 < 비활성화
	// - 마지막 페이지일 때 > 비활성화
	const isPrevDisabled = currentPage === 1;
	const isNextDisabled = currentPage === totalPages;

	// 특정 페이지로 이동
	const goToPage = useCallback(
		(page: number) => {
			setCurrentPage(clampPage(page, totalPages));
		},
		[totalPages],
	);

	// 첫 페이지로 이동 (<<)
	const goToFirstPage = useCallback(() => {
		setCurrentPage(1);
	}, []);

	// 이전 페이지 (<)
	const goToPrevPage = useCallback(() => {
		setCurrentPage((prevPage) => clampPage(prevPage - 1, totalPages));
	}, [totalPages]);

	// 다음 페이지 (>)
	const goToNextPage = useCallback(() => {
		setCurrentPage((prevPage) => clampPage(prevPage + 1, totalPages));
	}, [totalPages]);

	// 마지막 페이지로 이동 (>>)
	const goToLastPage = useCallback(() => {
		setCurrentPage(totalPages);
	}, [totalPages]);

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

// 페이지 범위를 1 ~ totalPages 사이로 제한
const clampPage = (page: number, totalPages: number) => {
	return Math.min(Math.max(page, 1), totalPages);
};

// 페이지 배열 생성
const createPageRange = (startPage: number, endPage: number) => {
	return Array.from(
		{ length: endPage - startPage + 1 },
		(_, index) => startPage + index,
	);
};

export { usePagination };

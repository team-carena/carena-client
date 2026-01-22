import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
	fetchNextPage: () => void;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
}

export const useInfiniteScroll = ({
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}: UseInfiniteScrollOptions) => {
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const hasNextPageRef = useRef(hasNextPage);
	const isFetchingNextPageRef = useRef(isFetchingNextPage);

	useEffect(() => {
		hasNextPageRef.current = hasNextPage;
	}, [hasNextPage]);

	useEffect(() => {
		isFetchingNextPageRef.current = isFetchingNextPage;
	}, [isFetchingNextPage]);

	useEffect(() => {
		const bottom = bottomRef.current;
		if (!bottom) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const first = entries[0];
				if (!first?.isIntersecting) return;
				if (!hasNextPageRef.current) return;
				if (isFetchingNextPageRef.current) return;
				void fetchNextPage();
			},
			{ root: null, rootMargin: "0px", threshold: 1 },
		);

		observer.observe(bottom);
		return () => observer.disconnect();
	}, [fetchNextPage]);

	return bottomRef;
};

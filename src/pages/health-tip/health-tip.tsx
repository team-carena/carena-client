import { useEffect, useMemo, useRef, useState } from "react";
import { Outlet } from "react-router";
import CardTip from "@/shared/ui/cards/card-tip";
import Chip from "@/shared/ui/chips/chip";

const chips = [
	"전체",
	"만성질환",
	"복약",
	"식단",
	"운동",
	"생활습관",
	"검진",
] as const;

type ChipValue = (typeof chips)[number];

const PAGE_SIZE = 10;

// 임시 예시 데이터
const tipData = Array.from({ length: 30 }, (_, index) => ({
	id: index + 1,
	title: `팁 제목 ${index + 1}`,
	category: "만성질환" as ChipValue,
}));

export const HealthTipPage = () => {
	const [selectedChip, setSelectedChip] = useState<ChipValue>("전체");
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

	// 리스트만 스크롤 되게 만드는 컨테이너
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	// 바닥 감지용 트리거
	const bottomRef = useRef<HTMLDivElement | null>(null);

	//선택된 칩에 따라서 데이터 필터링
	const filteredTips = useMemo(() => {
		if (selectedChip === "전체") return tipData;
		return tipData.filter((tip) => tip.category === selectedChip);
	}, [selectedChip]);

	const hasMore = visibleCount < filteredTips.length;

	const hasMoreRef = useRef(hasMore);
	const filteredLengthRef = useRef(filteredTips.length);

	useEffect(() => {
		hasMoreRef.current = hasMore;
		filteredLengthRef.current = filteredTips.length;
	}, [hasMore, filteredTips.length]);

	const observerRef = useRef<IntersectionObserver | null>(null);

	const handleChipClick = (value: ChipValue) => {
		setSelectedChip(value);
		setVisibleCount(PAGE_SIZE);
	};

	// 무한스크롤
	useEffect(() => {
		const root = scrollContainerRef.current;
		const bottom = bottomRef.current;

		if (!root || !bottom) return;

		if (!observerRef.current) {
			observerRef.current = new IntersectionObserver(
				(entries) => {
					const first = entries[0];
					if (!first?.isIntersecting) return;
					if (!hasMoreRef.current) return;

					setVisibleCount((prev) =>
						Math.min(prev + PAGE_SIZE, filteredLengthRef.current),
					);
				},
				{
					root, // 내부 스크롤 컨테이너 기준으로 감지
					rootMargin: "200px",
					threshold: 0,
				},
			);
		}

		const observer = observerRef.current;
		observer.observe(bottom);
		return () => observer.unobserve(bottom);
	}, []);

	useEffect(() => {
		return () => observerRef.current?.disconnect();
	}, []);

	return (
		<div className="h-dvh bg-white flex flex-col overflow-hidden">
			<Outlet />

			<main
				ref={scrollContainerRef}
				className="flex-1 bg-gray-50 overflow-y-auto"
			>
				<section className="overflow-x-auto scrollbar-hide px-[2rem] py-[1.2rem]">
					<div className="flex w-max gap-[0.8rem]">
						{chips.map((label) => (
							<Chip
								key={label}
								status={selectedChip === label ? "on" : "off"}
								onClick={() => handleChipClick(label)}
							>
								{label}
							</Chip>
						))}
					</div>
				</section>

				<section className="px-[2rem] py-[1.2rem]">
					<ul className="flex flex-col gap-[1.2rem]">
						{filteredTips.slice(0, visibleCount).map((tip) => (
							<li key={tip.id}>
								<CardTip more>{tip.title}</CardTip>
							</li>
						))}

						<li aria-hidden="true">
							<div ref={bottomRef} className={hasMore ? "h-px" : "h-0"} />
						</li>
					</ul>
				</section>
			</main>
		</div>
	);
};

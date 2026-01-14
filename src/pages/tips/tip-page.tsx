import CardTip from "@shared/ui/card/card-tip";
import Chip from "@shared/ui/chips/chip";
import { useEffect, useMemo, useRef, useState } from "react";

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

export const TipPage = () => {
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

	const handleChipClick = (value: ChipValue) => {
		setSelectedChip(value);
	};

	// 무한스크롤
	useEffect(() => {
		const bottom = bottomRef.current;
		const root = scrollContainerRef.current;

		if (!bottom || !root) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const first = entries[0];
				if (!first?.isIntersecting) return;
				if (!hasMore) return;

				setVisibleCount((prev) =>
					Math.min(prev + PAGE_SIZE, filteredTips.length),
				);
			},
			{
				root, // 내부 스크롤 컨테이너 기준으로 감지
				rootMargin: "200px",
				threshold: 0,
			},
		);

		observer.observe(bottom);
		return () => observer.disconnect();
	}, [filteredTips.length, hasMore]);

	return (
		<div className="w-[37.5rem] h-[81.2rem] bg-white border border-gray-200 flex flex-col overflow-hidden">
			<div className="h-[5.6rem] w-full border-b border-gray-200" />

			{/* 칩 + 리스트 같이 스크롤 */}
			<div
				ref={scrollContainerRef}
				className="flex-1 bg-gray-50 overflow-y-auto"
			>
				<div className="overflow-x-auto scrollbar-hide px-[2rem] py-[1.2rem]">
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
				</div>

				<div className="px-[2rem] py-[1.2rem]">
					<div className="flex flex-col gap-[1.2rem]">
						{filteredTips.slice(0, visibleCount).map((tip) => (
							<CardTip key={tip.id} more>
								{tip.title}
							</CardTip>
						))}
					</div>
					{hasMore ? <div ref={bottomRef} className="h-px" /> : null}
				</div>
			</div>
		</div>
	);
};

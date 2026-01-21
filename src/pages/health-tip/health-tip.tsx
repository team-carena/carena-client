import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteHealthTipList } from "@/shared/apis/queries/use-get-health-tip-list";
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

interface HealthTipListProps {
	selectedChip: ChipValue;
}

const HealthTipList = ({ selectedChip }: HealthTipListProps) => {
	const hashtagName = selectedChip === "전체" ? undefined : selectedChip;
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteHealthTipList({ hashtagName });

	const tips = useMemo(
		() => (data?.pages ?? []).flatMap((pageData) => pageData.result ?? []),
		[data],
	);

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
			{
				root: null,
				rootMargin: "0px",
				threshold: 1,
			},
		);

		observer.observe(bottom);
		return () => observer.disconnect();
	}, [fetchNextPage]);

	return (
		<section className="px-[2rem] py-[1.2rem]">
			<ul className="flex flex-col gap-[1.2rem]">
				{tips.map((tip) => (
					<li key={tip.id}>
						<CardTip more>{tip.title}</CardTip>
					</li>
				))}

				<li aria-hidden="true">
					<div ref={bottomRef} className={hasNextPage ? "h-px" : "h-0"} />
				</li>
			</ul>
		</section>
	);
};

export const HealthTipPage = () => {
	const [selectedChip, setSelectedChip] = useState<ChipValue>("전체");

	const handleChipClick = (value: ChipValue) => {
		setSelectedChip(value);
	};

	return (
		<main>
			<section className="scrollbar-hide overflow-x-auto px-[2rem] py-[1.2rem]">
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

            // TODO: 로딩 스켈레톤 추가 
			<Suspense fallback={null}>
				<HealthTipList selectedChip={selectedChip} />
			</Suspense>
		</main>
	);
};

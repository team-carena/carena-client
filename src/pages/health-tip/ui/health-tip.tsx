import { Suspense, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { useHealthTipList } from "@/pages/health-tip/apis/queries/use-health-tip-list";
import { useInfiniteScroll } from "@/shared/libs/use-infinite-scroll";
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
	const navigate = useNavigate();
	const hashtagName = selectedChip === "전체" ? undefined : selectedChip;
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useHealthTipList({ hashtagName });

	const bottomRef = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	});

	const tips = useMemo(
		() => (data?.pages ?? []).flatMap((pageData) => pageData.result ?? []),
		[data],
	);

	return (
		<section className="px-[2rem] py-[1.2rem]">
			<ul className="flex flex-col gap-[1.2rem]">
				{tips.map((tip) => {
					const healthTipId = tip.id ?? "";

					return (
						<li key={healthTipId}>
							<CardTip
								more={true}
								onClick={() =>
									navigate(
										`${ROUTE_PATH.HEALTH_TIP_DETAIL.replace(
											":healthTipId",
											healthTipId,
										)}`,
									)
								}
							>
								{tip.title}
							</CardTip>
						</li>
					);
				})}

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

			<Suspense fallback={null}>
				<HealthTipList selectedChip={selectedChip} />
			</Suspense>
		</main>
	);
};

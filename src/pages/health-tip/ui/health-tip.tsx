import { Suspense, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { useHealthTipList } from "@/pages/health-tip/apis/queries/use-health-tip-list";
import { useMyInfo } from "@/shared/apis/member/use-my-info";
import { useInfiniteScroll } from "@/shared/libs/use-infinite-scroll";
import CardTip from "@/shared/ui/cards/card-tip";
import Chip from "@/shared/ui/chips/chip";

const getAgeGroup = (age: number | undefined): string => {
	if (!age) return "20대";

	const ageGroup = Math.floor(age / 10) * 10;
	return `${ageGroup}대`;
};

interface HealthTipListProps {
	selectedChip: string;
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
	const { data: myInfo } = useMyInfo();
	const ageGroup = getAgeGroup(myInfo?.age);

	const chips = useMemo(
		() =>
			[
				"전체",
				"겨울",
				ageGroup,
				"생활습관",
				"건강목표",
				"검진 전",
				"검진 후",
			] as const,
		[ageGroup],
	);

	const [selectedChip, setSelectedChip] = useState<string>("전체");

	const handleChipClick = (value: string) => {
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

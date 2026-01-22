import cardDietBg from "@img/card-diet-bg.png";
import { Suspense } from "react";
import { ROUTE_PATH } from "@/app/routes/paths";
import type { MemberInfoResponse } from "@/shared/apis/generated/data-contracts";
import { HealthTipBackground } from "@/shared/assets/svg";
import { NaviRow } from "@/shared/ui/navigations/navi-row";
import { NaviRowSmall } from "@/shared/ui/navigations/navi-row-small";
import { Ticker } from "@/shared/ui/ticker/ticker";
import { useRecommendedMeal } from "../apis/queries/use-recommended-meals";
import { useTicker } from "../apis/queries/use-ticker";

interface HealthInfoPageProps {
	userInfo: MemberInfoResponse | undefined;
	isPending: boolean;
}

const HealthTipTicker = () => {
	const { data } = useTicker();

	const tips =
		data?.result?.map((item) => ({
			id: Number(item.id),
			title: item.title ?? "",
		})) ?? [];

	return <Ticker tips={tips} />;
};

const HealthInfoPage = ({ userInfo, isPending }: HealthInfoPageProps) => {
	const displayName = isPending ? "-" : (userInfo?.name ?? "-");
	const hasHealthReport = userInfo?.score !== 0;
	const { data: mealData, isPending: isMealPending } = useRecommendedMeal();

	return (
		<div className="flex w-full flex-col gap-[2rem] px-[2rem] pt-[2.4rem]">
			{/* 생활 속 건강 팁 */}
			<article className="overflow-hidden rounded-[12px] bg-white">
				<div className="p-[1.2rem_1.2rem_0.4rem_1.2rem]">
					{/* TODO: 건강팁 라우팅 적용 */}
					<NaviRow label="생활 속 건강 팁" to="" />
				</div>
				<div className="relative p-[1.2rem_0.8rem_4.2rem_0.8rem]">
					<HealthTipBackground className="absolute inset-0 z-0 h-full w-full" />
					<div className="relative z-10">
						{/* useSuspenseQuery로 데이터 로딩 중에는 Suspense fallback이 표시됨 -> Layout Shift 방지를 위해 폴백에 Ticker와 동일한 높이 명시 */}
						<Suspense fallback={<div className="h-[3.5rem]" />}>
							<HealthTipTicker />
						</Suspense>
					</div>
				</div>
			</article>

			{/* 건강 식단 */}
			<article className="rounded-[12px] bg-white">
				<div className="p-[1.2rem_1.2rem_0.4rem_1.2rem]">
					{/* TODO: 건강 식단 라우팅 적용 */}
					<NaviRow label="건강 식단" to={ROUTE_PATH.HEALTH_TIP} />
				</div>

				<div className="relative">
					<img
						src={cardDietBg}
						alt="식단 이미지"
						className="absolute inset-0 z-0 h-full w-full"
					/>
					<div className="relative z-10 p-[2rem]">
						{!hasHealthReport ? (
							<>
								<p className="head04-m-16 mt-[0.8rem] text-gray-900">
									검진결과를 추가하고
								</p>
								<p className="head04-m-16 mt-[0.8rem] text-gray-900">
									맞춤 식단을 추천 받아보세요!
								</p>
							</>
						) : (
							<>
								<p className="body01-sb-12 text-gray-700">
									{displayName}님 맞춤 식단
								</p>
								{isMealPending ? (
									<p className="head04-m-16 mt-[0.8rem] text-shimmer">
										AI가 요리를 찾는 중이에요
									</p>
								) : (
									<p className="head04-m-16 mt-[0.8rem] text-gray-900">
										{mealData?.meal ?? "-"}
									</p>
								)}
							</>
						)}
					</div>
				</div>

				<div className="p-[1rem]">
					<NaviRowSmall
						label={mealData?.baseDietTitle ?? "-"}
						to={ROUTE_PATH.HEALTH_DIET_DETAIL.replace(
							":healthDietId",
							String(mealData?.baseDietDocument ?? ""),
						)}
					/>
				</div>
			</article>
		</div>
	);
};

export default HealthInfoPage;

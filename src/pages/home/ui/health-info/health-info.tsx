import cardDietBg from "@img/card-diet-bg.png";
import { Suspense } from "react";
import { useSearchParams } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import type { MemberInfoResponse } from "@/shared/apis/generated/data-contracts";
import { NaviRow } from "@/shared/ui/navigations/navi-row";
import { NaviRowSmall } from "@/shared/ui/navigations/navi-row-small";
import { Ticker } from "@/shared/ui/ticker/ticker";
import { useRecommendedMeal } from "../../apis/queries/use-recommended-meals";
import { useTicker } from "../../apis/queries/use-ticker";

interface HealthInfoPageProps {
	userInfo: MemberInfoResponse | undefined;
	isPending: boolean;
}

const HealthTipTicker = () => {
	const { data } = useTicker();

	const tips =
		data?.result?.map((item) => ({
			id: item.id,
			title: item.title ?? "",
		})) ?? [];

	return <Ticker tips={tips} />;
};

const DEFAULT_DIET_TITLE = "열량조절식";
const DEFAULT_DIET_ID = "821008910660919821";

const LoadingDietCard = () => {
	return (
		<article className="rounded-[12px] bg-white">
			<div className="p-[1.2rem_1.2rem_0.4rem_1.2rem]">
				<NaviRow label="건강 식단" to={ROUTE_PATH.HEALTH_DIET} />
			</div>

			<div className="relative">
				<img
					src={cardDietBg}
					alt="식단 이미지"
					className="absolute inset-0 z-0 h-full w-full"
				/>
				<div className="relative z-10 p-[2rem]">
					<p className="body01-sb-12 text-gray-700">
						맞춤 식단을 준비 중이에요
					</p>
					<p className="head04-m-16 mt-[0.8rem] text-shimmer">
						건강 상태를 확인하고 있어요
					</p>
				</div>
			</div>

			<div className="p-[1rem]">
				<div className="flex w-full items-center justify-between rounded-[0.4rem] px-[0.8rem] py-[0.4rem] text-gray-600">
					<span className="body04-r-14 text-left">
						추천 식단 정보를 불러오는 중이에요
					</span>
				</div>
			</div>
		</article>
	);
};

const HealthInfoPage = ({ userInfo, isPending }: HealthInfoPageProps) => {
	// polling 파라미터 읽기 (새로운 검진결과생성 후 /home에 접근했을 때만 true)
	const [searchParams] = useSearchParams();
	const polling = searchParams.get("polling") === "true";
	const displayName = isPending ? "-" : (userInfo?.name ?? "-");
	const hasHealthReport = userInfo?.score != null && userInfo.score !== 0;
	const { data: mealData, pollingStatus } = useRecommendedMeal({
		enabled: hasHealthReport,
		polling,
	});

	// 검진결과 있음 + mealData 있음: 실제 데이터 표시
	// 검진결과 있음 + mealData 없음 (gpt 에러 등으로 에러/빈 응답): 기본 식단 표시
	// 검진결과 없음: 기본 식단 표시
	const dietLabel = hasHealthReport
		? (mealData?.baseDietTitle ?? DEFAULT_DIET_TITLE)
		: DEFAULT_DIET_TITLE;
	const dietId = hasHealthReport
		? (mealData?.baseDietDocumentId ?? DEFAULT_DIET_ID)
		: DEFAULT_DIET_ID;

	return (
		<div className="flex w-full flex-col gap-[2rem] px-[2rem] pt-[2.4rem]">
			{/* 건강 식단 */}
			{/* userInfo API의 로딩 상태 */}
			{isPending ? (
				<LoadingDietCard />
			) : (
				<article className="rounded-[12px] bg-white">
					<div className="p-[1.2rem_1.2rem_0.4rem_1.2rem]">
						<NaviRow label="건강 식단" to={ROUTE_PATH.HEALTH_DIET} />
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
									{/* 추천식단 폴링 상태 */}
									{pollingStatus === "loading" && (
										<p className="head04-m-16 mt-[0.8rem] text-shimmer">
											AI가 요리를 찾는 중이에요
										</p>
									)}
									{pollingStatus === "timeout" && (
										<p className="head04-m-16 mt-[0.8rem] text-gray-900">
											건강식단을 생성하지 못했어요.
										</p>
									)}
									{pollingStatus === "success" && (
										<p className="head04-m-16 mt-[0.8rem] text-gray-900">
											{mealData?.meal}
										</p>
									)}
								</>
							)}
						</div>
					</div>

					<div className="p-[1rem]">
						<NaviRowSmall
							label={dietLabel}
							to={ROUTE_PATH.HEALTH_DIET_DETAIL.replace(
								":healthDietId",
								dietId,
							)}
						/>
					</div>
				</article>
			)}

			{/* 생활 속 건강 팁 */}
			<article className="overflow-hidden rounded-[12px] bg-white">
				<div className="p-[1.2rem_1.2rem_0.4rem_1.2rem]">
					<NaviRow label="생활 속 건강 팁" to={ROUTE_PATH.HEALTH_TIP} />
				</div>
				<div className="p-[0.8rem_0.8rem_2rem_0.8rem]">
					{/* useSuspenseQuery로 데이터 로딩 중에는 Suspense fallback이 표시됨 -> Layout Shift 방지를 위해 폴백에 Ticker와 동일한 높이 명시 */}
					<Suspense fallback={<div className="h-[3.5rem]" />}>
						<HealthTipTicker />
					</Suspense>
				</div>
			</article>
		</div>
	);
};

export default HealthInfoPage;

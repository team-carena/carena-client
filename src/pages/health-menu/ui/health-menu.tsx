import MenuBg from "@shared/assets/img/menu-bg.png";
import { Ai } from "@shared/assets/svg";
import CardList from "@shared/ui/cards/card-list";
import { Suspense } from "react";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { useDietList } from "@/pages/health-menu/apis/queries/use-diet-list.ts";
import CardAiDietRecommendation from "@/pages/health-menu/ui/card-ai-diet-recommendation";
import { useRecommendedMeal } from "@/pages/home/apis/queries/use-recommended-meals";
import { useInfiniteScroll } from "@/shared/libs/use-infinite-scroll";

const DietListContent = () => {
	const navigate = useNavigate();
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useDietList();

	const bottomRef = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	});

	const allDiets = data.pages.flatMap((page) => page.diets ?? []);

	const handleMenuClick = (dietId: string) => {
		void navigate(
			ROUTE_PATH.HEALTH_DIET_DETAIL.replace(":healthDietId", dietId),
		);
	};

	return (
		<ul className="flex flex-col gap-[1.2rem]">
			{allDiets.map((diet) => (
				<li key={diet.dietInformationId}>
					<CardList
						more
						onClick={() => handleMenuClick(diet.dietInformationId ?? "")}
						aria-label={`${diet.title} 메뉴로 이동`}
					>
						{diet.title}
					</CardList>
				</li>
			))}
			<li aria-hidden="true">
				<div ref={bottomRef} className={hasNextPage ? "h-px" : "h-0"} />
			</li>
		</ul>
	);
};

const EmptyRecommendation = () => {
	return (
		<div className="w-full">
			<p className="head03-sb-16 text-gray-900">
				사용자님의 건강상태에 맞는 요리
			</p>

			<div className="mt-[1.6rem] mb-[2rem] flex items-start gap-[1.2rem]">
				<Ai className="shrink-0" aria-hidden />
				<p className="body04-r-14 whitespace-pre-line text-gray-900">
					{"검진 결과를 추가하고\n맞춤 식단을 추천받아보세요!"}
				</p>
			</div>
		</div>
	);
};

export const HealthMenuPage = () => {
	const { data: mealData } = useRecommendedMeal({ enabled: true });

	const hasRecommendation =
		Boolean(mealData?.meal) && Boolean(mealData?.description);

	return (
		<main className="overflow-y-auto" aria-label="건강 식단 메뉴">
			{/* 상단 영역 */}
			<section
				className="flex w-full justify-center bg-center bg-cover px-[2rem] pt-[2.4rem] pb-[2rem]"
				style={{ backgroundImage: `url(${MenuBg})` }}
				aria-label="AI 추천 식단"
			>
				{hasRecommendation ? (
					<CardAiDietRecommendation
						dietName={mealData?.meal ?? "-"}
						description={mealData?.description ?? "-"}
					/>
				) : (
					<EmptyRecommendation />
				)}
			</section>

			{/* 메뉴 리스트 */}
			<section className="px-[2rem] pb-[2rem]" aria-label="건강 식단 메뉴 목록">
				<Suspense fallback={<div />}>
					<DietListContent />
				</Suspense>
			</section>
		</main>
	);
};

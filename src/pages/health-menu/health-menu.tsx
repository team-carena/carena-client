import MenuBg from "@shared/assets/img/menu-bg.png";
import CardList from "@shared/ui/cards/card-list";
import { Suspense } from "react";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import CardAiDietRecommendation from "@/pages/health-menu/ui/card-ai-diet-recommendation";
import { useDietList } from "./apis/queries/use-diet-list";

// 임시 AI 추천 메뉴 데이터
const MOCK_AI_RECOMMENDATION = {
	// AI 추천 요리명
	dietName: "요리명",
	// 추천 요리 설명 텍스트
	description:
		"케어나님의 건강 정보를 참고해,\n염분 섭취를 조금 더 신경 쓰고 싶을 때 선택하기 좋은 메뉴로 이 요리를 추천드려요.",
};

const DietListContent = () => {
	const navigate = useNavigate();
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useDietList();

	const allDiets = data.pages.flatMap((page) => page.diets ?? []);

	const handleMenuClick = (dietId: string) => {
		void navigate(
			ROUTE_PATH.HEALTH_DIET_DETAIL.replace(":healthDietId", dietId),
		);
	};

	return (
		<>
			<ul className="flex flex-col gap-[1.2rem]">
				{allDiets.map((diet) => (
					<li key={diet.id}>
						<CardList
							more
							onClick={() => handleMenuClick(diet.id ?? "")}
							aria-label={`${diet.title} 메뉴로 이동`}
						>
							{diet.title}
						</CardList>
					</li>
				))}
			</ul>
			{hasNextPage && (
				<button
					type="button"
					onClick={() => fetchNextPage()}
					disabled={isFetchingNextPage}
					className="body04-r-14 mt-[1.2rem] w-full py-[1.2rem] text-center text-gray-600"
				>
					{isFetchingNextPage ? "로딩 중..." : "더 보기"}
				</button>
			)}
		</>
	);
};

export const HealthMenuPage = () => {
	return (
		<main className="overflow-y-auto" aria-label="건강 식단 메뉴">
			{/* AI 추천 카드 */}
			<section
				className="flex w-full justify-center bg-center bg-cover px-[2rem] pt-[2.4rem] pb-[2rem]"
				style={{ backgroundImage: `url(${MenuBg})` }}
				aria-label="AI 추천 식단"
			>
				<CardAiDietRecommendation
					dietName={MOCK_AI_RECOMMENDATION.dietName}
					description={MOCK_AI_RECOMMENDATION.description}
				/>
			</section>

			{/* 메뉴 리스트 */}
			<section className="px-[2rem] pb-[2rem]" aria-label="건강 식단 메뉴 목록">
				<Suspense fallback={<div></div>}>
					<DietListContent />
				</Suspense>
			</section>
		</main>
	);
};

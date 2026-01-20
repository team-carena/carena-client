import MenuBg from "@shared/assets/img/menu-bg.png";
import CardList from "@shared/ui/cards/card-list";
import CardAiDietRecommendation from "@/pages/health-menu/ui/card-ai-diet-recommendation";

// 임시 AI 추천 메뉴 데이터
const MOCK_AI_RECOMMENDATION = {
	// AI 추천 요리명
	dietName: "요리명",
	// 추천 요리 설명 텍스트
	description:
		"케어나님의 건강 정보를 참고해,\n염분 섭취를 조금 더 신경 쓰고 싶을 때 선택하기 좋은 메뉴로 이 요리를 추천드려요.",
};

// 임시 메뉴 리스트 데이터
const MOCK_MENU_LIST = [
	{ id: "low-purine", label: "저퓨린식" },
	{ id: "diabetes", label: "당뇨식" },
	{ id: "hypertension", label: "고혈압식" },
	{ id: "digestion", label: "소화불량식" },
	{ id: "osteoporosis", label: "골다공증식" },
	{ id: "hyperlipidemia", label: "고지혈증식" },
	{ id: "low-purine", label: "저퓨린식" },
	{ id: "diabetes", label: "당뇨식" },
	{ id: "hypertension", label: "고혈압식" },
	{ id: "digestion", label: "소화불량식" },
	{ id: "osteoporosis", label: "골다공증식" },
	{ id: "hyperlipidemia", label: "고지혈증식" },
] as const;

type MenuItem = (typeof MOCK_MENU_LIST)[number];

export const HealthMenuPage = () => {
	const handleMenuClick = (_menu: MenuItem) => {
		// TODO: 라우팅 연결
	};

	return (
		<main className="overflow-y-auto" aria-label="건강 식단 메뉴">
			{/* AI 추천 카드 */}
			<section
				className="flex w-full justify-center bg-center bg-cover px-[2rem] pt-[1.6rem] pb-[2rem]"
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
				<ul className="flex flex-col gap-[1.2rem]">
					{MOCK_MENU_LIST.map((menu, index) => (
						<li key={`${menu.id}-${index}`}>
							<CardList
								more
								onClick={() => handleMenuClick(menu)}
								aria-label={`${menu.label} 메뉴로 이동`}
							>
								{menu.label}
							</CardList>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
};

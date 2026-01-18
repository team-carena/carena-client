import MenuBg from "@shared/assets/img/menu-bg.png";
import CardList from "@shared/ui/cards/card-list";
import CardAiDietRecommendation from "@/pages/health-menu/ui/card-ai-diet-recommendation";

// 임시 AI 추천 메뉴 데이터
const MOCK_AI_RECOMMENDATION = {
	// AI 추천 요리명
	dietName: "두부전",
	// 추천 요리 설명 텍스트
	description:
		"단백질이 풍부하고 소화가 잘 되는 두부를 활용한 요리로, 기름 사용을 최소화해 부담 없이 즐길 수 있어요. 만성질환 관리에도 도움이 되는 메뉴예요.",
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
				className="w-full bg-cover bg-center px-[2rem] pt-[1.6rem] pb-[2rem] flex justify-center"
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

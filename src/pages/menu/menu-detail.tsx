import { ContentCard } from "@shared/ui/cards/card-content";
import { CardTable } from "@shared/ui/cards/card-table";
import { Outlet } from "react-router";

// 임시 데이터
const MOCK_RECOMMENDED_ROWS = [
	{ id: "row-1", label: "두부", value: "두부전, 두부조림" },
	{ id: "row-2", label: "계란", value: "계란말이, 계란찜" },
	{ id: "row-3", label: "생선", value: "고등어조림" },
] as const;

const MOCK_CAUTION_FOODS = ["두쫀쿠", "불닭", "등등"] as const;

const BASE_SECTION = "flex flex-col items-start self-stretch";

export const MenuDetailPage = () => {
	return (
		<div className="h-dvh flex flex-col overflow-hidden bg-gray-50">
			<Outlet />

			<main
				className="
          flex-1
          overflow-y-auto
          px-[2rem]
          pt-[2.4rem]
          pb-[2rem]
          space-y-[2rem]
        "
			>
				{/* 메뉴 타이틀 및 설명 */}
				<section
					aria-labelledby="menu-detail-title"
					className={`${BASE_SECTION} py-[1.2rem] gap-[2rem]`}
				>
					<h1 id="menu-detail-title" className="head01-b-18 text-gray-900">
						저퓨린식
					</h1>

					<p className="body04-r-14 text-gray-900">
						요산 수치를 낮추는 데 도움이 되는 식단으로, 퓨린 함량이 낮은 식품을
						중심으로 구성됩니다.
					</p>
				</section>

				{/* 권장식품과 요리 */}
				<section
					aria-labelledby="recommended-title"
					className={`${BASE_SECTION} gap-[1.2rem]`}
				>
					<span
						id="recommended-title"
						className="
              inline-block
              rounded-[4px]
              bg-primary-50
              px-[0.8rem]
              py-[0.4rem]
              head05-r-14
              text-black
            "
					>
						권장식품과 요리
					</span>

					<div className=" w-full rounded-[12px] border border-gray-300 px-[2rem] py-[2.4rem]">
						<CardTable
							headerLeft="권장 식품"
							headerRight="요리"
							rows={MOCK_RECOMMENDED_ROWS}
						/>
					</div>
				</section>

				{/* 주의 식품 */}
				<section
					aria-labelledby="caution-title"
					className={`${BASE_SECTION} gap-[1.2rem]`}
				>
					<span
						id="caution-title"
						className="
              inline-block
              rounded-[4px]
              bg-primary-50
              px-[0.8rem]
              py-[0.4rem]
              head05-r-14
              text-black
            "
					>
						주의 식품
					</span>

					<ContentCard variant="muted">
						<ContentCard.Content>
							<ul className="space-y-[0.6rem]">
								{MOCK_CAUTION_FOODS.map((food) => (
									<li key={food} className="body04-r-14 text-gray-900">
										{food}
									</li>
								))}
							</ul>
						</ContentCard.Content>
					</ContentCard>

					<footer className="self-end body05-r-12 text-gray-700">
						출처: 여기저기
					</footer>
				</section>
			</main>
		</div>
	);
};

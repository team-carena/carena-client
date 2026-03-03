import { ContentCard } from "@shared/ui/cards/card-content";
import { CardTable } from "@shared/ui/cards/card-table";
import { useParams } from "react-router";
import { useDietDetail } from "../apis/queries/use-diet-detail";

const SECTION_LAYOUT = "flex flex-col items-start";

const Bullet = () => (
	<span className="mt-[0.8rem] h-[0.25rem] w-[0.25rem] shrink-0 rounded-full bg-gray-900" />
);

export const MenuDetailPage = () => {
	const { healthDietId } = useParams();
	const { data, isPending } = useDietDetail(healthDietId ?? "");

	const recommendedRows = Object.entries(data?.recommends ?? {}).map(
		([label, values], index) => ({
			id: `row-${index}`,
			label,
			value: values.join(", "),
		}),
	);

	if (isPending) return null;

	return (
		<div className="flex h-dvh flex-col overflow-hidden bg-gray-50">
			<main className="flex-1 overflow-y-auto px-[2rem] pt-[2.8rem] pb-[2rem]">
				{/* 메뉴 타이틀 및 설명 */}
				<section
					aria-labelledby="menu-detail-title"
					className={`${SECTION_LAYOUT} gap-[2rem]`}
				>
					<h1 id="menu-detail-title" className="head01-b-18 text-gray-900">
						{data?.title ?? "-"}
					</h1>

					<p className="body04-r-14 text-gray-900">{data?.content ?? "-"}</p>
				</section>

				{/* 권장식품과 요리 */}
				<section
					aria-labelledby="recommended-title"
					className={`${SECTION_LAYOUT} gap-[1.2rem] pt-[4rem]`}
				>
					<div className="w-full">
						<CardTable
							headerLeft="권장 식품"
							headerRight="요리"
							rows={recommendedRows}
						/>
					</div>
				</section>

				{/* 주의 식품 */}
				<section
					aria-labelledby="caution-title"
					className={`${SECTION_LAYOUT} gap-[1.2rem] pt-[4rem]`}
				>
					<p id="caution-title" className="head03-sb-16 text-gray-900">
						주의 식품
					</p>

					<ContentCard variant="muted">
						<ContentCard.Content>
							<ul className="flex flex-col gap-[0.4rem]">
								{(data?.cautionary ?? []).map((food) => (
									<li key={food} className="flex items-start gap-[0.8rem]">
										<Bullet />
										<span className="body04-r-14 text-gray-900">{food}</span>
									</li>
								))}
							</ul>
						</ContentCard.Content>
					</ContentCard>

					<p className="body06-r-10 h-[1.5rem] self-end text-gray-700">
						출처: 국내 의료기관 영양지침
					</p>
				</section>
			</main>
		</div>
	);
};

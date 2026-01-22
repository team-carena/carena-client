import { ContentCard } from "@shared/ui/cards/card-content";
import { CardTable } from "@shared/ui/cards/card-table";
import { useParams } from "react-router";
import { useDietDetail } from "./apis/queries/use-diet-detail";

const SECTION_LAYOUT = "flex flex-col items-start";

export const MenuDetailPage = () => {
	const { healthDietId } = useParams();
	const { data, isPending } = useDietDetail(healthDietId ?? "");

	const recommendedRows = Object.entries(data?.recommends ?? {}).map(
		([label, values], index) => ({
			id: `row-${index}`,
			label: label,
			value: values.join(", "),
		}),
	);

	if (isPending) {
		return null;
	}

	return (
		<div className="flex h-dvh flex-col overflow-hidden bg-gray-50">
			<main className="flex-1 space-y-[2rem] overflow-y-auto px-[2rem] pt-[2.4rem] pb-[2rem]">
				{/* 메뉴 타이틀 및 설명 */}
				<section
					aria-labelledby="menu-detail-title"
					className={`${SECTION_LAYOUT} gap-[2rem] py-[1.2rem]`}
				>
					<h1 id="menu-detail-title" className="head01-b-18 text-gray-900">
						{data?.title ?? "-"}
					</h1>

					<p className="body04-r-14 text-gray-900">{data?.content ?? "-"}</p>
				</section>

				{/* 권장식품과 요리 */}
				<section
					aria-labelledby="recommended-title"
					className={`${SECTION_LAYOUT} gap-[1.2rem]`}
				>
					<span
						id="recommended-title"
						className="head05-r-14 inline-block rounded-[4px] bg-primary-50 px-[0.8rem] py-[0.4rem] text-black"
					>
						권장식품과 요리
					</span>

					<div className="w-full rounded-[12px] border border-gray-300 px-[2rem] py-[2.4rem]">
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
					className={`${SECTION_LAYOUT} gap-[1.2rem]`}
				>
					<span
						id="caution-title"
						className="head05-r-14 inline-block rounded-[4px] bg-primary-50 px-[0.8rem] py-[0.4rem] text-black"
					>
						주의 식품
					</span>

					<ContentCard variant="muted">
						<ContentCard.Content>
							<ul>
								{(data?.cautionary ?? []).map((food) => (
									<li key={food} className="body04-r-14 text-gray-900">
										{food}
									</li>
								))}
							</ul>
						</ContentCard.Content>
					</ContentCard>

					<p className="body05-r-12 self-end text-gray-700">
						출처: {data?.reference ?? "-"}
					</p>
				</section>
			</main>
		</div>
	);
};

import { ContentCard } from "@/shared/ui/cards/card-content";
import CardTip from "@/shared/ui/cards/card-tip";

export const TipDetailPage = () => {
	return (
		<div className="w-[37.5rem] h-[81.2rem] bg-white border-gray-200 border flex flex-col">
			<header className="h-[5.6rem] w-[37.5rem] border-b border-gray-200" />
			<main className="flex-1 px-[2rem] py-[2.4rem] bg-gray-50">
				<section>
					<CardTip>팁 상세 내용이 들어갑니다.</CardTip>
				</section>

				<section className="mt-[1.2rem]">
					<ContentCard variant="default">
						<ContentCard.Title>건강 팁</ContentCard.Title>
						<ContentCard.Content>
							하루 20분만 걷더라도 혈당 조절에 도움이 될 수 있어요.
						</ContentCard.Content>
						<ContentCard.Tags
							tags={["#만성질환", "#운동", "#러닝", "#홈트", "#운동"]}
						/>
					</ContentCard>

					<p className="mt-[1.3rem] pr-[0.8rem] text-right body05-r-12 text-gray-700">
						출처: <cite className="not-italic">어쩌구</cite>
					</p>
				</section>
			</main>
		</div>
	);
};

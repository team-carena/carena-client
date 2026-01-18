import { Ai } from "@shared/assets/svg";

export interface CardAiDietRecommendationProps {
	// AI 추천 요리명 (ex. "두부전")
	dietName: string;
	// 추천 요리 설명 텍스트 (길이 무제한)
	description: string;
}

const CardAiDietRecommendation = ({
	dietName,
	description,
}: CardAiDietRecommendationProps) => {
	return (
		<article
			className="
        w-full
        px-[2rem]
        py-[1.2rem]
      "
			aria-labelledby="diet-recommendation-title"
		>
			{/* 제목 */}
			<h2
				id="diet-recommendation-title"
				className="flex flex-wrap items-baseline gap-[0.4rem]"
			>
				<span className="head03-sb-16 text-gray-900">“{dietName}”</span>
				<span className="body03-r-16 text-gray-900">요리는 어떠세요?</span>
			</h2>

			{/* AI 아이콘 + 설명 */}
			<div
				className="
          mt-[1.6rem]
          flex
          items-start
          gap-[1.2rem]
        "
			>
				<Ai className="shrink-0" aria-hidden />

				<p className="body04-r-14 text-gray-900">{description}</p>
			</div>
		</article>
	);
};

export default CardAiDietRecommendation;

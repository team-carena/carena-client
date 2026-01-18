import { CardResultMeaning } from "@/pages/health-report/ui/card-result-meaning";
import { ContentCard } from "@/shared/ui/cards/card-content";
import Label from "@/shared/ui/labels/label";

interface HealthReportRange {
	normalMax: number;
	warningMin: number;
	warningMax: number;
	dangerMin: number;
}

interface HealthReportSectionProps {
	title: string;
	description: string;
	range: HealthReportRange;
	increaseText: string;
	decreaseText: string;
	habitText: string;
}

export const HealthReportSection = ({
	title,
	description,
	range,
	increaseText,
	decreaseText,
	habitText,
}: HealthReportSectionProps) => {
	const rangeText = `정상 ${range.normalMax}미만 | 경계 ${range.warningMin} ~ ${range.warningMax} | 의심 ${range.dangerMin} 이상`;

	return (
		<section className="px-[2rem] pb-[4rem]">
			{/* 타이틀 */}
			<h2 className="head01-b-18 text-black">{title}</h2>

			{/* 설명 / 범위 / 그래프 */}
			<div className="mt-[1.2rem] flex flex-col gap-[0.8rem]">
				<p className="body05-r-12 text-gray-700">{description}</p>

				<p className="body05-r-12 text-gray-900">{rangeText}</p>

				{/* 그래프 영역 */}
				<div className="h-[120px] rounded-[12px] border border-gray-200" />
			</div>

			{/* 결과값 의미 */}
			<div className="mt-[2rem] flex flex-col gap-[1.9rem]">
				<Label>결과값 의미</Label>

				<CardResultMeaning type="increase" description={increaseText} />
				<CardResultMeaning type="decrease" description={decreaseText} />
			</div>

			{/* 이런 습관이 도움돼요 */}
			<div className="mt-[2rem] flex flex-col gap-[1.2rem]">
				<Label>이런 습관이 도움돼요!</Label>

				<ContentCard variant="muted">
					<ContentCard.Content>{habitText}</ContentCard.Content>
				</ContentCard>

				<p className="text-right body05-r-12 text-gray-700">출처: 여기저기</p>
			</div>
		</section>
	);
};

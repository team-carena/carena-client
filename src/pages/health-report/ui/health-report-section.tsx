import type {
	Gender,
	HabitGuide,
	HealthReportRange,
} from "@/pages/health-report/model/health-report-types";
import { CardResultMeaning } from "@/pages/health-report/ui/card-result-meaning";
import { ContentCard } from "@/shared/ui/cards/card-content";
import type { LineChartData } from "@/shared/ui/graphs/line-chart/line-chart";
import { LineChart } from "@/shared/ui/graphs/line-chart/line-chart";
import Label from "@/shared/ui/labels/label";

interface HealthReportSectionProps {
	title: string;
	description: string;

	/** 정상 / 경계 / 의심 수치 범위 */
	range?: HealthReportRange;

	/** 사용자 성별 */
	gender: Gender;

	/** 그래프 데이터 */
	chartData: LineChartData[];

	/** 결과값 의미 */
	increaseText?: string;
	decreaseText?: string;

	/** 이런 습관이 도움돼요! */
	habitGuide?: HabitGuide;

	/** 출처 */
	source?: string;

	/** 섹션 하단 구분선 표시 여부 */
	showDivider?: boolean;
}

export const HealthReportSection = ({
	title,
	description,
	range,
	gender,
	increaseText,
	decreaseText,
	habitGuide,
	source,
	showDivider = false,
	chartData,
}: HealthReportSectionProps) => {
	/**
	 * 범위 텍스트 생성
	 */
	const rangeText = (() => {
		if (!range) return null;

		const value = range.type === "common" ? range.value : range[gender];

		return (
			<>
				<span>정상 {value.normal}</span>
				<span className="mx-[0.4rem]">|</span>
				<span>경계 {value.warning}</span>
				{value.danger && (
					<>
						<span className="mx-[0.4rem]">|</span>
						<span>의심 {value.danger}</span>
					</>
				)}
			</>
		);
	})();

	return (
		<section className="px-[2rem] pb-[4rem]">
			{/* 항목 타이틀 */}
			<h2 className="head01-b-18 text-black">{title}</h2>

			{/* 설명 / 범위 / 그래프 */}
			<div className="mt-[1.2rem] flex flex-col gap-[0.8rem]">
				<p className="body05-r-12 text-gray-700">{description}</p>

				{rangeText && <p className="body05-r-12 text-gray-900">{rangeText}</p>}

				{chartData && <LineChart data={chartData} />}
			</div>

			{/* 결과값 의미 */}
			{increaseText && decreaseText && (
				<div className="mt-[2rem] flex flex-col gap-[1.9rem]">
					<Label>결과값 의미</Label>
					<CardResultMeaning type="increase" description={increaseText} />
					<CardResultMeaning type="decrease" description={decreaseText} />
				</div>
			)}

			{/* 이런 습관이 도움돼요 */}
			{habitGuide && (
				<div className="mt-[2rem] flex flex-col gap-[1.2rem]">
					<Label>이런 습관이 도움돼요!</Label>

					<ContentCard variant="muted">
						<ContentCard.Content className="flex flex-col gap-[1.2rem]">
							{/* 일반 리스트 */}
							{habitGuide.type === "list" && (
								<ul className="list-disc space-y-[0.4rem] pl-[1.6rem]">
									{habitGuide.items.map((item) => (
										<li key={item} className="body05-r-12 text-gray-900">
											{item}
										</li>
									))}
								</ul>
							)}

							{/* 소제목 + 리스트 */}
							{habitGuide.type === "group" &&
								habitGuide.groups.map((group) => (
									<div key={group.title} className="flex flex-col gap-[0.4rem]">
										<p className="body05-b-12 text-gray-900">{group.title}</p>
										<ul className="list-disc space-y-[0.4rem] pl-[1.6rem]">
											{group.items.map((item) => (
												<li key={item} className="body05-r-12 text-gray-900">
													{item}
												</li>
											))}
										</ul>
									</div>
								))}
						</ContentCard.Content>
					</ContentCard>

					{source && (
						<p className="body05-r-12 text-right text-gray-700">
							출처: {source}
						</p>
					)}
				</div>
			)}

			{/* 섹션 구분선 */}
			{showDivider && (
				<div className="mt-[2rem] flex justify-center">
					<div className="h-[1px] w-[calc(100%-2.3rem)] bg-gray-200" />
				</div>
			)}
		</section>
	);
};

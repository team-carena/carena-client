import { useGetHealthReportHistory } from "@/pages/health-report-detail/api/queries/use-get-health-report-history";
import type {
	HabitGuide,
	HealthReportRange,
	Sex,
} from "@/pages/health-report-detail/config/health-report-types";
import { HEALTH_REPORT_HISTORY_MAP } from "@/pages/health-report-detail/model/health-report-history-map";
import { mapHistoryToLineChartData } from "@/pages/health-report-detail/model/health-report-mappers";
import { CardResultMeaning } from "@/pages/health-report-detail/ui/card-result-meaning";
import { ContentCard } from "@/shared/ui/cards/card-content";
import type { LineChartData } from "@/shared/ui/graphs/line-chart/line-chart";
import { LineChart } from "@/shared/ui/graphs/line-chart/line-chart";
import Label from "@/shared/ui/labels/label";

// 프리젠터: UI만 담당
interface HealthReportSectionProps {
	title: string;
	description: string;

	/** 정상 / 경계 / 의심 수치 범위 */
	range?: HealthReportRange;

	/** 사용자 성별 */
	sex: Sex;

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
	sex,
	increaseText,
	decreaseText,
	habitGuide,
	source,
	showDivider = false,
	chartData,
}: HealthReportSectionProps) => {
	const rangeText = (() => {
		if (!range) return null;

		const value = range.type === "common" ? range.value : range[sex];

		const texts = [
			`정상 ${value.normal}`,
			value.borderline ? `경계 ${value.borderline}` : null,
			`의심 ${value.suspicious}`,
		].filter(Boolean) as string[];

		return (
			<>
				{texts.map((text, idx) => (
					<span key={text}>
						{text}
						{idx < texts.length - 1 && <span className="mx-[0.4rem]">|</span>}
					</span>
				))}
			</>
		);
	})();

	return (
		<section className="px-[2rem] pb-[4rem]">
			<h2 className="head01-b-18 text-black">{title}</h2>

			<div className="mt-[1.2rem] flex flex-col gap-[0.8rem]">
				<p className="body05-r-12 text-gray-700">{description}</p>

				{rangeText && <p className="body05-r-12 text-gray-900">{rangeText}</p>}

				{chartData.length > 0 && <LineChart data={chartData} />}
			</div>

			{increaseText && decreaseText && (
				<div className="mt-[2rem] flex flex-col gap-[1.9rem]">
					<Label role="heading" aria-level={3}>
						결과값 의미
					</Label>
					<CardResultMeaning type="increase" description={increaseText} />
					<CardResultMeaning type="decrease" description={decreaseText} />
				</div>
			)}

			{habitGuide && (
				<div className="mt-[2rem] flex flex-col gap-[1.2rem]">
					<Label>이런 습관이 도움돼요!</Label>

					<ContentCard variant="muted">
						<ContentCard.Content className="flex flex-col gap-[0.8rem]">
							{habitGuide.type === "list" && (
								<ul className="list-disc space-y-[0.4rem] pl-[1.6rem]">
									{habitGuide.items.map((item) => (
										<li key={item} className="body05-r-12 text-gray-900">
											{item}
										</li>
									))}
								</ul>
							)}

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
						<p className="body05-r-12 px-[0.8rem] text-right text-gray-700">
							출처: {source}
						</p>
					)}
				</div>
			)}

			{showDivider && (
				<div className="mt-[2rem] flex justify-center">
					<div className="h-[1px] w-[calc(100%-2.3rem)] bg-gray-200" />
				</div>
			)}
		</section>
	);
};

// 컨테이너: API 연동 + chartData 주입
type HistoryMapKey = keyof typeof HEALTH_REPORT_HISTORY_MAP;

interface HealthReportSectionWithHistoryProps
	extends Omit<HealthReportSectionProps, "chartData"> {
	sectionKey: HistoryMapKey;
	healthCheckDate: string;
}

export const HealthReportSectionWithHistory = ({
	sectionKey,
	healthCheckDate,
	...rest
}: HealthReportSectionWithHistoryProps) => {
	const apiInfo = HEALTH_REPORT_HISTORY_MAP[sectionKey];

	// 데이터 조회
	const { data, isPending, isError } = useGetHealthReportHistory({
		endpoint: apiInfo.endpoint,
		queryKey: apiInfo.queryKey(),
		healthCheckDate,
	});

	const chartData = mapHistoryToLineChartData(data?.history ?? []);

	// 로딩/에러 시 빈 차트로 표시
	return (
		<HealthReportSection
			{...rest}
			chartData={isPending || isError ? [] : chartData}
		/>
	);
};

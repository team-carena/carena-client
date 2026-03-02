import { useGetHealthReportHistory } from "@/pages/health-report-detail/api/queries/use-get-health-report-history";
import type {
	HabitGuide,
	HealthReportRange,
	Sex,
} from "@/pages/health-report-detail/config/health-report-types";
import { HEALTH_REPORT_HISTORY_MAP } from "@/pages/health-report-detail/model/health-report-history-map";
import { mapHistoryToLineChartData } from "@/pages/health-report-detail/model/health-report-mappers";
import { ContentCard } from "@/shared/ui/cards/card-content";
import type { LineChartData } from "@/shared/ui/graphs/line-chart/line-chart";
import { LineChart } from "@/shared/ui/graphs/line-chart/line-chart";

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

	/** 도움되는 습관 */
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

	const interpretationItems = (
		[
			{ key: "increase", label: "수치가 증가할 땐?", text: increaseText },
			{ key: "decrease", label: "수치가 감소할 땐?", text: decreaseText },
		] as const
	).filter(({ text }) => Boolean(text));

	// 불릿 커스텀
	const Bullet = () => (
		<span className="mt-[0.65rem] h-[0.25rem] w-[0.25rem] shrink-0 rounded-full bg-gray-900" />
	);

	return (
		<section className="pb-[4rem]">
			<div className="px-[2rem]">
				<h2 className="head01-b-18 text-black">{title}</h2>

				<div className="mt-[1.2rem] flex flex-col gap-[0.8rem]">
					<p className="body05-r-12 text-gray-700">{description}</p>
					{rangeText && (
						<p className="body05-r-12 text-gray-900">{rangeText}</p>
					)}
				</div>
			</div>

			{chartData.length > 0 && (
				<div className="mt-[0.8rem] px-[1.6rem]">
					<LineChart data={chartData} />
				</div>
			)}

			{interpretationItems.length > 0 && (
				<div className="px-[2rem]">
					<section className="mt-[4rem] flex flex-col gap-[1.2rem]">
						<p className="head03-sb-16 text-gray-900">결과 해석</p>

						<div className="flex flex-col gap-[2rem]">
							{interpretationItems.map(({ key, label, text }) => (
								<div key={key} className="flex flex-col gap-[1.2rem]">
									<p className="body05-r-12 text-primary-300">{label}</p>
									<p className="body05-r-12 text-gray-900">{text}</p>
								</div>
							))}
						</div>
					</section>
				</div>
			)}

			{habitGuide && (
				<div className="mt-[4rem]">
					<div className="px-[2rem]">
						<p className="head03-sb-16 text-gray-900">이런 습관이 도움돼요!</p>
					</div>

					<div className="mt-[1.2rem] px-[1.6rem]">
						<ContentCard variant="muted">
							<ContentCard.Content className="flex flex-col gap-[0.8rem]">
								{habitGuide.type === "list" && (
									<ul className="flex flex-col gap-[0.4rem]">
										{habitGuide.items.map((item) => (
											<li key={item} className="flex items-start gap-[0.6rem]">
												<Bullet />
												<p className="body05-r-12 text-gray-900">{item}</p>
											</li>
										))}
									</ul>
								)}

								{habitGuide.type === "group" && (
									<div className="flex flex-col gap-[1.8rem]">
										{habitGuide.groups.map((group) => (
											<div
												key={group.title}
												className="flex flex-col gap-[0.4rem]"
											>
												<p className="body05-b-12 text-gray-900">
													{group.title}
												</p>

												<ul className="flex flex-col gap-[0.4rem]">
													{group.items.map((item) => (
														<li
															key={item}
															className="flex items-start gap-[0.6rem]"
														>
															<Bullet />
															<p className="body05-r-12 text-gray-900">
																{item}
															</p>
														</li>
													))}
												</ul>
											</div>
										))}
									</div>
								)}
							</ContentCard.Content>
						</ContentCard>
					</div>

					{source && (
						<div className="px-[2rem]">
							<p className="body05-r-12 mt-[1.2rem] px-[0.8rem] text-right text-gray-700">
								출처: {source}
							</p>
						</div>
					)}
				</div>
			)}

			{showDivider && (
				<div className="px-[2rem]">
					<div className="mt-[2rem] flex justify-center">
						<div className="h-[1px] w-[calc(100%-2.3rem)] bg-gray-200" />
					</div>
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

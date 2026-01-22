import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type { HealthReportType } from "@/pages/health-report-detail/config/health-report-types";
import { useEntireHealthReport } from "@/pages/home/apis/queries/use-entire-health-report";
import { useHealthReportDateList } from "@/pages/home/apis/queries/use-health-report-date-list";
import CheckupSummaryCard from "@/pages/home/checkup-summary-card/checkup-summary-card";
import {
	getElementBadgeCode,
	getSummaryBadgeState,
} from "@/pages/home/ui/health-analysis/health-analysis.badge";
import { buildRadarData } from "@/pages/home/ui/health-analysis/health-analysis.radar";
import type {
	DisplayElement,
	EntireHealthReportView,
} from "@/shared/configs/health-report/health-report.types";
import type { CheckupBadgeCode } from "@/shared/constants/checkup-badge";
import { LargeBadge } from "@/shared/ui/badges/large-badge";
import { DropDown } from "@/shared/ui/drop-down/drop-down";
import { RadarChart } from "@/shared/ui/graphs/radar-chart/radar-chart";
import type {
	HealthMetricType,
	Sex,
} from "@/shared/ui/graphs/range-bar/health-metric-config";
import { Tooltip } from "@/shared/ui/overlays/tooltip/tooltip";

type SummaryRow =
	| {
			type: "simple";
			left: string;
			right: ReactNode;
	  }
	| {
			type: "badge";
			label: string;
			value: number;
			badgeCode: CheckupBadgeCode;
			metricKey: HealthMetricType;
			metricSex?: Sex;
	  };

interface SummarySection {
	title: string;
	description: string;
	reportType: HealthReportType;
	rows: SummaryRow[];
}

// 추후에 사용자 성별 정보를 받아올 수 있도록 수정 필요
const DEFAULT_METRIC_SEX: Sex = "FEMALE";
const SUMMARY_TOOLTIP_TEXT =
	"본 서비스의 검진결과 해석 및 종합판단은 보건복지부가 고시한 국가건강검진 판정 기준을 참고하여 제공됩니다. 단, 병원 및 검사기관에 따라 적용 기준이나 참고 범위가 일부 다를 수 있습니다.\n\n<구분 기준>\n정상 A: 모든 검진 항목이 정상 범위에 해당하는 경우\n정상 B(경계): 하나 이상의 검진 항목이 경계 범위에 해당하는 경우\n의심: 하나 이상의 검진 항목에서 질환이 의심되는 소견이 확인된 경우";

const formatHealthCheckDate = (value?: string) => {
	if (!value) return "";
	const [year, month, day] = value.split("-");
	if (!year || !month || !day) return value;
	return `${year}년 ${month}월 ${day}일`;
};

const buildHealthReportDetailUrl = (
	type: HealthReportType,
	healthCheckDate: string,
) => {
	const params = new URLSearchParams();
	if (healthCheckDate) params.set("healthCheckDate", healthCheckDate);
	const qs = params.toString();
	return qs ? `/health-report/${type}?${qs}` : `/health-report/${type}`;
};

const buildSummarySections = (
	report?: EntireHealthReportView,
): SummarySection[] => {
	const basic = report?.basic ?? [];
	const bloodPressure = report?.bloodPressure ?? [];
	const diabetes = report?.diabetes ?? [];
	const liver = report?.liver ?? [];
	const kidney = report?.kidney ?? [];
	const anemia = report?.anemia ?? [];

	const findElement = (items: DisplayElement[], name: string) =>
		items.find((item) => item.name === name);

	const toSimpleRow = (
		label: string,
		element: DisplayElement | undefined,
		unit: string,
	): SummaryRow | null => {
		if (element?.value == null) return null;
		return {
			type: "simple",
			left: label,
			right: (
				<span>
					{element.value} {unit}
				</span>
			),
		};
	};

	const toBadgeRow = (
		label: string,
		metricKey: HealthMetricType,
		element: DisplayElement | undefined,
		metricSex?: Sex,
	): SummaryRow | null => {
		if (typeof element?.value !== "number") return null;
		return {
			type: "badge",
			label,
			value: element.value,
			badgeCode: getElementBadgeCode(element),
			metricKey,
			metricSex,
		};
	};

	const rows = (items: Array<SummaryRow | null>) =>
		items.filter(Boolean) as SummaryRow[];

	return [
		{
			title: "기본 검사",
			description: "기본검사에 대한 설명입니다.",
			reportType: "basic",
			rows: rows([
				toSimpleRow("신장", findElement(basic, "height"), "cm"),
				toSimpleRow("체중", findElement(basic, "weight"), "kg"),
				toBadgeRow(
					"허리둘레",
					"waist",
					findElement(basic, "waistCircumference"),
					DEFAULT_METRIC_SEX,
				),
				toBadgeRow("BMI 수치", "bmi", findElement(basic, "bmi")),
			]),
		},
		{
			title: "혈압 검사",
			description: "혈압 검사에 대한 설명입니다.",
			reportType: "blood-pressure",
			rows: rows([
				toBadgeRow(
					"수축기 혈압",
					"systolic",
					findElement(bloodPressure, "systolicBloodPressure"),
				),
				toBadgeRow(
					"이완기 혈압",
					"diastolic",
					findElement(bloodPressure, "diastolicBloodPressure"),
				),
			]),
		},
		{
			title: "당뇨 검사",
			description: "당뇨 검사에 대한 설명입니다.",
			reportType: "diabetes",
			rows: rows([
				toBadgeRow(
					"공복 혈당",
					"fastingGlucose",
					findElement(diabetes, "fastingGlucose"),
				),
			]),
		},
		{
			title: "간장질환 검사",
			description: "간장질환 검사에 대한 설명입니다.",
			reportType: "liver",
			rows: rows([
				toBadgeRow("에이에스티(AST)", "ast", findElement(liver, "ast")),
				toBadgeRow("에이엘티(ALT)", "alt", findElement(liver, "alt")),
				toBadgeRow(
					"감마지티피(γ-GTP)",
					"ggtp",
					findElement(liver, "gammaGtp"),
					DEFAULT_METRIC_SEX,
				),
			]),
		},
		{
			title: "신장질환 검사",
			description: "신장질환 검사에 대한 설명입니다.",
			reportType: "kidney",
			rows: rows([
				toBadgeRow(
					"혈청 크레아티닌",
					"creatinine",
					findElement(kidney, "serumCreatinine"),
				),
				toBadgeRow("신사구체여과율", "egfr", findElement(kidney, "egfr")),
			]),
		},
		{
			title: "빈혈 검사",
			description: "빈혈 검사에 대한 설명입니다.",
			reportType: "anemia",
			rows: rows([
				toBadgeRow(
					"혈색소",
					"hb",
					findElement(anemia, "hemoglobin"),
					DEFAULT_METRIC_SEX,
				),
			]),
		},
	];
};

const HealthAnalysisContent = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	// URL에 저장된 reportId (뒤로가기/새로고침 시 선택값 유지)
	const reportIdFromQuery = searchParams.get("reportId") ?? "";

	// 검진 날짜 목록 조회
	const { data, isPending, isError } = useHealthReportDateList({ index: 1 });

	const options = useMemo(
		() =>
			(data?.reportDates ?? []).map((dateInfo) => ({
				value: dateInfo.healthReportId ? String(dateInfo.healthReportId) : "",
				label: formatHealthCheckDate(dateInfo.healthCheckDate),
				subLabel: dateInfo.institutionName ?? "",
			})),
		[data?.reportDates],
	);

	// 초기값을 query 우선으로 설정 (options가 준비되면 effect에서 유효성 검증)
	const [selectedReportId, setSelectedReportId] = useState(reportIdFromQuery);

	// 선택된 reportId로 healthCheckDate 찾기 (상세페이지로 넘길 값)
	const selectedHealthCheckDate = useMemo(() => {
		const found = (data?.reportDates ?? []).find(
			(d) => String(d.healthReportId) === selectedReportId,
		);
		return found?.healthCheckDate ?? "";
	}, [data?.reportDates, selectedReportId]);

	// 유효한 ID가 있을 때에 조회 API 호출
	const hasValidReportId = selectedReportId !== "";
	const {
		data: report,
		isPending: isReportPending,
		isError: isReportError,
	} = useEntireHealthReport({
		healthReportId: selectedReportId,
		enabled: hasValidReportId,
	});

	const hasNoReports = !isPending && !isError && options.length === 0;

	// 첫 진입/뒤로가기 시: query(reportId)가 유효하면 그 값 유지, 없거나 유효하지 않으면 첫 번째로 세팅 + query 정리
	useEffect(() => {
		if (options.length === 0) return;

		const isValidQuery = reportIdFromQuery
			? options.some((o) => o.value === reportIdFromQuery)
			: false;

		const nextReportId = isValidQuery ? reportIdFromQuery : options[0].value;

		setSelectedReportId(nextReportId);

		// query가 비어있거나 유효하지 않으면 URL도 정리 (기존 tab 등 다른 query는 유지)
		if (!reportIdFromQuery || !isValidQuery) {
			const next = new URLSearchParams(searchParams);
			next.set("reportId", nextReportId);
			setSearchParams(next, { replace: true });
		}
	}, [options, reportIdFromQuery, searchParams, setSearchParams]);

	// 드롭다운 선택 변경 시 query(reportId) 동기화
	const handleReportChange = (nextReportId: string) => {
		setSelectedReportId(nextReportId);

		const next = new URLSearchParams(searchParams);
		next.set("reportId", nextReportId);
		setSearchParams(next);
	};

	// 전체 리포트 기준 종합 배지 상태 계산
	const { variant: summaryBadgeVariant, text: summaryBadgeText } = useMemo(
		() => getSummaryBadgeState(report),
		[report],
	);

	const summarySections = useMemo(() => buildSummarySections(report), [report]);
	const radarData = useMemo(() => buildRadarData(report), [report]);

	if (isPending || isError || isReportPending || isReportError) return null;

	if (hasNoReports) {
		return (
			<div className="mb-[3rem] flex w-full flex-col px-[2rem] pt-[2.4rem]">
				<p className="head03-sb-16 mt-[6rem] text-center text-gray-900">
					검진 결과를 추가해주세요.
				</p>
			</div>
		);
	}

	return (
		<div className="mb-[3rem] flex w-full flex-col px-[2rem] pt-[2.4rem]">
			<div className="mb-[2rem]">
				<DropDown
					value={selectedReportId}
					onValueChange={handleReportChange}
					options={options}
				/>
			</div>

			{/* RadarChart 위에 배지/툴팁 레이어 고정 */}
			<div className="relative z-[5] flex items-center gap-[0.3rem]">
				<LargeBadge variant={summaryBadgeVariant}>
					{summaryBadgeText}
				</LargeBadge>
				<Tooltip side="bottom" align="start" iconTone="black">
					<div className="whitespace-pre-line">{SUMMARY_TOOLTIP_TEXT}</div>
				</Tooltip>
			</div>

			<div className="mt-[-4.8rem]">
				<RadarChart data={radarData} />
			</div>

			<div className="mt-[0.5rem] flex flex-col gap-[2rem]">
				{summarySections.map((section) => {
					const to = buildHealthReportDetailUrl(
						section.reportType,
						selectedHealthCheckDate,
					);

					return (
						<CheckupSummaryCard key={section.reportType}>
							<CheckupSummaryCard.Title label={section.title} to={to} />

							<CheckupSummaryCard.Section>
								<CheckupSummaryCard.Description>
									{section.description}
								</CheckupSummaryCard.Description>

								<CheckupSummaryCard.Rows>
									{section.rows.map((row) => {
										if (row.type === "simple") {
											return (
												<CheckupSummaryCard.Row
													key={row.left}
													left={row.left}
													right={row.right}
												/>
											);
										}

										return (
											<CheckupSummaryCard.RowWithBadgeAndGraph
												key={row.label}
												label={row.label}
												value={row.value}
												badgeCode={row.badgeCode}
												metricKey={row.metricKey}
												metricSex={row.metricSex}
											/>
										);
									})}
								</CheckupSummaryCard.Rows>
							</CheckupSummaryCard.Section>
						</CheckupSummaryCard>
					);
				})}
			</div>
		</div>
	);
};

const HealthAnalysisPage = () => {
	return <HealthAnalysisContent />;
};

export default HealthAnalysisPage;

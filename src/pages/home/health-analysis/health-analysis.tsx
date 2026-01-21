import { type ReactNode, Suspense, useEffect, useMemo, useState } from "react";
import CheckupSummaryCard from "@/pages/home/checkup-summary-card/checkup-summary-card";
import { useHealthReportDateList } from "@/shared/apis/queries/use-get-health-report-date-list";
import {
	CHECKUP_BADGE_LABEL,
	type CheckupBadgeCode,
} from "@/shared/constants/checkup-badge";
import { LargeBadge } from "@/shared/ui/badges/large-badge";
import { DropDown } from "@/shared/ui/drop-down/drop-down";
import {
	RADAR_CHART_MAP,
	RadarChart,
} from "@/shared/ui/graphs/radar-chart/radar-chart";
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
	rows: SummaryRow[];
}

const formatHealthCheckDate = (value?: string) => {
	if (!value) return "";
	const [year, month, day] = value.split("-");
	if (!year || !month || !day) return value;
	return `${year}년 ${month}월 ${day}일`;
};

const HealthAnalysisContent = () => {
	const { data } = useHealthReportDateList(1);
	const options = useMemo(
		() =>
			(data.reportDates ?? []).map((dateInfo) => ({
				value: dateInfo.healthCheckDate ?? "",
				label: formatHealthCheckDate(dateInfo.healthCheckDate),
				subLabel: dateInfo.institutionName ?? "",
			})),
		[data.reportDates],
	);
	const [selectedDate, setSelectedDate] = useState(options[0]?.value ?? "");
	const hasNoReports = options.length === 0;

	useEffect(() => {
		if (options.length > 0) {
			setSelectedDate((prev) => prev || options[0].value);
		}
	}, [options]);

	// API 연결 전 임시 값: 서버에서 variant가 내려온다고 가정
	const summaryBadgeCode: CheckupBadgeCode = "normal";
	const summaryBadgeText = CHECKUP_BADGE_LABEL[summaryBadgeCode];
	const summaryBadgeVariant = summaryBadgeCode;
	const summarySections: SummarySection[] = [
		{
			title: "기본 검사",
			description: "기본검사에 대한 설명입니다.",
			rows: [
				{
					type: "simple",
					left: "신장",
					right: <span>170.0 cm</span>,
				},
				{
					type: "simple",
					left: "체중",
					right: <span>60.0 kg</span>,
				},
				{
					type: "badge",
					label: "허리둘레",
					value: 84,
					badgeCode: "normal",
					metricKey: "waist",
					metricSex: "FEMALE",
				},
				{
					type: "badge",
					label: "BMI 수치",
					value: 24,
					badgeCode: "normal",
					metricKey: "bmi",
				},
			],
		},
		{
			title: "혈압 검사",
			description: "혈압 검사에 대한 설명입니다.",
			rows: [
				{
					type: "badge",
					label: "수축기 혈압",
					value: 122,
					badgeCode: "normal",
					metricKey: "systolic",
					metricSex: "FEMALE",
				},
				{
					type: "badge",
					label: "이완기 혈압",
					value: 96,
					badgeCode: "suspicious",
					metricKey: "diastolic",
				},
			],
		},
		{
			title: "당뇨 검사",
			description: "당뇨 검사에 대한 설명입니다.",
			rows: [
				{
					type: "badge",
					label: "공복 혈당",
					value: 110,
					badgeCode: "borderline",
					metricKey: "fastingGlucose",
				},
			],
		},
		{
			title: "간장질환 검사",
			description: "간장질환 검사에 대한 설명입니다.",
			rows: [
				{
					type: "badge",
					label: "에이에스티(AST)",
					value: 35,
					badgeCode: "normal",
					metricKey: "ast",
					metricSex: "FEMALE",
				},
				{
					type: "badge",
					label: "에이엘티(ALT)",
					value: 20,
					badgeCode: "normal",
					metricKey: "alt",
				},
				{
					type: "badge",
					label: "감마지티피(γ-GTP)",
					value: 24,
					badgeCode: "normal",
					metricKey: "ggtp",
					metricSex: "FEMALE",
				},
			],
		},
		{
			title: "신장질환 검사",
			description: "신장질환 검사에 대한 설명입니다.",
			rows: [
				{
					type: "badge",
					label: "혈청 크레아티닌",
					value: 1.8,
					badgeCode: "normal",
					metricKey: "creatinine",
				},
				{
					type: "badge",
					label: "신사구체여과율",
					value: 57,
					badgeCode: "suspicious",
					metricKey: "egfr",
				},
			],
		},
		{
			title: "빈혈 검사",
			description: "빈혈 검사에 대한 설명입니다.",
			rows: [
				{
					type: "badge",
					label: "혈색소",
					value: 11,
					badgeCode: "borderline",
					metricKey: "hb",
					metricSex: "FEMALE",
				},
			],
		},
	];
	const radarData = [
		{ label: "당뇨", riskLevel: RADAR_CHART_MAP.의심 },
		{ label: "빈혈", riskLevel: RADAR_CHART_MAP.경계 },
		{ label: "신장질환", riskLevel: RADAR_CHART_MAP.정상 },
		{ label: "간장질환", riskLevel: RADAR_CHART_MAP.정상 },
		{ label: "비만", riskLevel: RADAR_CHART_MAP.경계 },
		{ label: "혈압", riskLevel: RADAR_CHART_MAP.경계 },
	];

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
					value={selectedDate}
					onValueChange={setSelectedDate}
					options={options}
				/>
			</div>
			{/* RadarChart 위에 배지/툴팁 레이어 고정 */}
			<div className="relative z-[5] flex items-center gap-[0.3rem]">
				<LargeBadge variant={summaryBadgeVariant}>
					{summaryBadgeText}
				</LargeBadge>
				<Tooltip side="bottom" align="start" iconTone="black">
					검진 결과의 종합 등급을 요약해서 보여줍니다.
				</Tooltip>
			</div>
			<div className="mt-[-4.8rem]">
				<RadarChart data={radarData} />
			</div>
			<div className="mt-[0.5rem] flex flex-col gap-[2rem]">
				{summarySections.map((section) => (
					<CheckupSummaryCard key={section.title}>
						<CheckupSummaryCard.Title label={section.title} to="/" />
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
				))}
			</div>
		</div>
	);
};

const HealthAnalysisPage = () => {
	return (
		<Suspense fallback={null}>
			<HealthAnalysisContent />
		</Suspense>
	);
};

export default HealthAnalysisPage;

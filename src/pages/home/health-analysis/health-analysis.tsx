import { useState } from "react";
import CheckupSummaryCard from "@/pages/home/checkup-summary-card/checkup-summary-card";
import { getBadgeVariantByLabel } from "@/shared/domain/checkup-status";
import { LargeBadge } from "@/shared/ui/badges/large-badge";
import { DropDown } from "@/shared/ui/drop-down/drop-down";
import {
	RADAR_CHART_MAP,
	RadarChart,
} from "@/shared/ui/graphs/radar-chart/radar-chart";
import { Tooltip } from "@/shared/ui/overlays/tooltip/tooltip";

const HealthAnalysisPage = () => {
	const [selectedDate, setSelectedDate] = useState("2025-02-18");
	// API 연결 전 임시 값: 라벨 -> variant 매핑 확인용
	const summaryBadgeText = "정상";
	const summaryBadgeVariant = getBadgeVariantByLabel(summaryBadgeText);
	const options = [
		{
			value: "2025-02-18",
			label: "2025년 02월 18일",
			subLabel: "서울의료원",
		},
		{
			value: "2024-02-18",
			label: "2024년 02월 18일",
			subLabel: "강남세브란스",
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
			<div className="relative z-10 flex items-center gap-[0.3rem]">
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
				<CheckupSummaryCard>
					<CheckupSummaryCard.Title label="기본 검사" to="/" />
					<CheckupSummaryCard.Section variant="header">
						<CheckupSummaryCard.Description>
							기본검사에 대한 설명입니다.
						</CheckupSummaryCard.Description>
						<CheckupSummaryCard.Rows>
							<CheckupSummaryCard.Row
								left="신장"
								right={<span>170.0 cm</span>}
							/>
							<CheckupSummaryCard.Row
								left="체중"
								right={<span>60.0 kg</span>}
							/>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="허리둘레"
								value={84}
								badgeText="정상"
								metricKey="waist"
								metricSex="female"
							/>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="BMI 수치"
								value={24}
								badgeText="정상"
								metricKey="bmi"
							/>
						</CheckupSummaryCard.Rows>
					</CheckupSummaryCard.Section>
				</CheckupSummaryCard>
				<CheckupSummaryCard>
					<CheckupSummaryCard.Title label="혈압 검사" to="/" />
					<CheckupSummaryCard.Section>
						<CheckupSummaryCard.Description>
							혈압 검사에 대한 설명입니다.
						</CheckupSummaryCard.Description>
						<CheckupSummaryCard.Rows>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="수축기 혈압"
								value={122}
								badgeText="정상"
								metricKey="systolic"
								metricSex="female"
							/>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="이완기 혈압"
								value={96}
								badgeText="의심"
								metricKey="diastolic"
							/>
						</CheckupSummaryCard.Rows>
					</CheckupSummaryCard.Section>
				</CheckupSummaryCard>
				<CheckupSummaryCard>
					<CheckupSummaryCard.Title label="당뇨 검사" to="/" />
					<CheckupSummaryCard.Section>
						<CheckupSummaryCard.Description>
							당뇨 검사에 대한 설명입니다.
						</CheckupSummaryCard.Description>
						<CheckupSummaryCard.Rows>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="공복 혈당"
								value={110}
								badgeText="경계"
								metricKey="fastingGlucose"
							/>
						</CheckupSummaryCard.Rows>
					</CheckupSummaryCard.Section>
				</CheckupSummaryCard>
				<CheckupSummaryCard>
					<CheckupSummaryCard.Title label="간장질환 검사" to="/" />
					<CheckupSummaryCard.Section>
						<CheckupSummaryCard.Description>
							간장질환 검사에 대한 설명입니다.
						</CheckupSummaryCard.Description>
						<CheckupSummaryCard.Rows>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="에이에스티(AST)"
								value={35}
								badgeText="정상"
								metricKey="ast"
								metricSex="female"
							/>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="에이엘티(ALT)"
								value={20}
								badgeText="정상"
								metricKey="alt"
							/>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="감마지티피(γ-GTP)"
								value={24}
								badgeText="정상"
								metricKey="ggtp"
								metricSex="female"
							/>
						</CheckupSummaryCard.Rows>
					</CheckupSummaryCard.Section>
				</CheckupSummaryCard>
				<CheckupSummaryCard>
					<CheckupSummaryCard.Title label="신장질환 검사" to="/" />
					<CheckupSummaryCard.Section>
						<CheckupSummaryCard.Description>
							신장질환 검사에 대한 설명입니다.
						</CheckupSummaryCard.Description>
						<CheckupSummaryCard.Rows>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="혈청 크레아티닌"
								value={1.8}
								badgeText="정상"
								metricKey="creatinine"
							/>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="신사구체여과율"
								value={24}
								badgeText="정상"
								metricKey="bmi"
							/>
						</CheckupSummaryCard.Rows>
					</CheckupSummaryCard.Section>
				</CheckupSummaryCard>
				<CheckupSummaryCard>
					<CheckupSummaryCard.Title label="빈혈 검사" to="/" />
					<CheckupSummaryCard.Section>
						<CheckupSummaryCard.Description>
							빈혈 검사에 대한 설명입니다.
						</CheckupSummaryCard.Description>
						<CheckupSummaryCard.Rows>
							<CheckupSummaryCard.RowWithBadgeAndGraph
								label="혈색소"
								value={11}
								badgeText="경계"
								metricKey="hb"
								metricSex="female"
							/>
						</CheckupSummaryCard.Rows>
					</CheckupSummaryCard.Section>
				</CheckupSummaryCard>
			</div>
		</div>
	);
};

export default HealthAnalysisPage;

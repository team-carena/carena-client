import { useParams } from "react-router";
import { HEALTH_REPORT_CONFIG } from "./model/health-report-config";
import type { HealthReportType } from "./model/health-report-types";
import { HealthReportSection } from "./ui/health-report-section";

const DOUBLE_NOTICE_TYPES: HealthReportType[] = ["basic", "liver", "anemia"];

export const HealthReportDetailPage = () => {
	const { type } = useParams<{ type: HealthReportType }>();

	if (!type) return null;

	const reportConfig = HEALTH_REPORT_CONFIG[type];

	if (!reportConfig) return null;

	return (
		<>
			{/* 상단 안내 문구 */}
			<div className="pt-[2rem] pb-[2.4rem] px-[2rem] flex flex-col gap-[0.4rem] body06-r-10 text-gray-700">
				<p>
					※ 본 정보는 건강 관리에 참고하기 위한 자료이며, 진단이나 치료 목적이
					아닙니다.
				</p>

				{DOUBLE_NOTICE_TYPES.includes(type) && (
					<p>※ 일부 항목은 성별에 따라 수치 범위가 다르게 표기됩니다.</p>
				)}
			</div>

			{reportConfig.sections.map((section) => (
				<HealthReportSection
					key={section.key}
					title={section.title}
					description={section.description}
					range={section.range}
					increaseText={section.increaseText}
					decreaseText={section.decreaseText}
					habitText={section.habitText}
				/>
			))}
		</>
	);
};

import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import { useMyInfo } from "@/shared/apis/member/use-my-info";

import type { HealthReportType, Sex } from "../config/health-report-types";
import { HEALTH_REPORT_CONFIG } from "../model/health-report-config";
import type { HEALTH_REPORT_HISTORY_MAP } from "../model/health-report-history-map";
import { HealthReportSectionWithHistory } from "./health-report-section";

const DOUBLE_NOTICE_TYPES: HealthReportType[] = ["basic", "liver", "anemia"];
const DEFAULT_SEX: Sex = "FEMALE";

export const HealthReportDetailPage = () => {
	// 페이지 진입 시 스크롤을 맨 위로 이동 (중간부터 보이는 현상 방지)
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);

	const { type } = useParams<{ type: HealthReportType }>();
	const [searchParams] = useSearchParams();
	const healthCheckDate = searchParams.get("healthCheckDate") ?? "";
	const { data: userInfo, isPending } = useMyInfo();

	if (!type) return null;

	const sex: Sex = isPending ? DEFAULT_SEX : (userInfo?.gender ?? DEFAULT_SEX);

	const reportConfig = HEALTH_REPORT_CONFIG[type];
	if (!reportConfig) return null;

	return (
		<>
			{/* 상단 안내 문구 */}
			<div className="body06-r-10 flex flex-col gap-[0.4rem] px-[2rem] pt-[2rem] pb-[2.4rem] text-gray-700">
				<p>
					※ 본 정보는 건강 관리에 참고하기 위한 자료이며, 진단이나 치료 목적이
					아닙니다.
				</p>
				{DOUBLE_NOTICE_TYPES.includes(type) && (
					<p>※ 일부 항목은 성별에 따라 수치 범위가 다르게 표기됩니다.</p>
				)}
			</div>

			{/* 섹션 */}
			{reportConfig.sections.map(({ key, ...section }) => (
				<HealthReportSectionWithHistory
					key={key}
					sectionKey={key as keyof typeof HEALTH_REPORT_HISTORY_MAP}
					sex={sex}
					healthCheckDate={healthCheckDate}
					{...section}
				/>
			))}
		</>
	);
};

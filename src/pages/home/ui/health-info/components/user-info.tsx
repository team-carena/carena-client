import imgMaintop from "@img/img-maintop.png";
import imgMaintopBlur from "@img/img-maintop-blur.png";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { useHealthReportDateList } from "@/pages/home/apis/queries/use-health-report-date-list";
import type { MemberInfoResponse } from "@/shared/apis/generated/data-contracts";
import { ChevronSRight } from "@/shared/assets/svg";
import { RadialChart } from "@/shared/ui/graphs/radial-chart/radial-chart";
import { Tooltip } from "@/shared/ui/overlays/tooltip/tooltip";

interface UserInfoProps {
	userInfo: MemberInfoResponse | undefined;
	isPending: boolean;
}

const formatDate = (value?: string) => {
	if (!value) return "";
	const [year, month, day] = value.split("-");
	if (!year || !month || !day) return value;
	return `${year}.${month}.${day}`;
};

const UserInfo = ({ userInfo, isPending }: UserInfoProps) => {
	const navigate = useNavigate();

	const hasHealthReport = !isPending && userInfo?.score !== 0;
	const displayScore = isPending ? 0 : (userInfo?.score ?? 0);

	const { data: dateListData } = useHealthReportDateList({ index: 1 });
	const latestReport = dateListData?.reportDates?.[0];

	const ctaLabel = hasHealthReport
		? "결과 분석 보러가기"
		: "검진 결과 등록하기";

	const handleCtaClick = () => {
		if (hasHealthReport) {
			void navigate(ROUTE_PATH.HEALTH_ANALYSIS);
		} else {
			void navigate(ROUTE_PATH.CHECKUP_RESULT);
		}
	};

	return (
		<section className="flex w-full flex-col items-center px-[1.6rem]">
			{/* Top 카드 */}
			<div className="relative h-[17.1rem] w-full overflow-hidden rounded-[1.6rem]">
				<img
					src={hasHealthReport ? imgMaintop : imgMaintopBlur}
					alt=""
					className="absolute inset-0 h-full w-full object-cover"
				/>

				{hasHealthReport ? (
					<>
						{/* 최근 검진 결과 */}
						<p className="display03-sb-20 absolute top-[2.4rem] left-[2rem] text-gray-800">
							최근 검진 결과
						</p>
						{/* 날짜 + 병원명 */}
						<div className="absolute top-[10.2rem] left-[2rem]">
							<p className="head03-sb-16 text-gray-900">
								{formatDate(latestReport?.healthCheckDate)}
							</p>
							<p className="head03-sb-16 text-gray-900">
								{latestReport?.institutionName ?? ""}
							</p>
						</div>
						{/* 우측 차트 + 툴팁 */}
						<div className="absolute top-[2.4rem] right-[3.4rem]">
							<div className="relative">
								<RadialChart score={displayScore} />
								<div className="absolute right-[-0.5rem] bottom-[-0.7rem]">
									<Tooltip side="bottom" align="end" className="z-[30]">
										건강점수는 체형, 혈압, 혈당, 간·신장 관련 최근 검진 항목을
										점수로 변환해 종합한 지표로, 현재 건강 상태를 이해하기 쉽게
										보여줍니다. 자세한 산출 기준은{" "}
										<a
											href="https://petalite-biplane-c36.notion.site/2eb5365471d18031bef8cf286084a362?source=copy_link"
											target="_blank"
											rel="noopener noreferrer"
											className="body01-sb-12 text-gray-900 underline"
										>
											보기
										</a>
										를 통해 확인할 수 있습니다.
									</Tooltip>
								</div>
							</div>
						</div>
					</>
				) : (
					<>
						{/* 등록된 검진 결과가 없습니다 */}
						<p className="head03-sb-16 absolute top-[2.4rem] left-[2rem] text-gray-800">
							등록된 검진 결과가 없습니다
						</p>
						{/* 안내 문구 */}
						<p className="head04-m-16 absolute top-[10.1rem] left-[2rem] text-gray-900">
							첫 검진 결과를 등록하고
							<br />
							건강 점수를 알아보세요!
						</p>
					</>
				)}
			</div>

			{/* CTA 버튼 */}
			<button
				type="button"
				onClick={handleCtaClick}
				className="mt-[0.4rem] flex w-full items-center justify-between rounded-[1.2rem] bg-primary-400 px-[1.2rem] py-[0.8rem] transition-opacity duration-200 active:opacity-80"
			>
				<span className="head03-sb-16 text-white">{ctaLabel}</span>
				<ChevronSRight className="h-[2.4rem] w-[2.4rem] [&_path]:fill-white" />
			</button>
		</section>
	);
};

export default UserInfo;

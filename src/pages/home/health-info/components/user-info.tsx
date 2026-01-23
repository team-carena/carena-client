import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import type { MemberInfoResponse } from "@/shared/apis/generated/data-contracts";
import { BlurNoise, InfoBackground } from "@/shared/assets/svg";
import { AddButton } from "@/shared/ui/buttons/add-button";
import { RadialChart } from "@/shared/ui/graphs/radial-chart/radial-chart";
import { Tooltip } from "@/shared/ui/overlays/tooltip/tooltip";

const GENDER_LABEL = {
	MALE: "남",
	FEMALE: "여",
} as const;

interface UserInfoProps {
	userInfo: MemberInfoResponse | undefined;
	isPending: boolean;
}

const UserInfo = ({ userInfo, isPending }: UserInfoProps) => {
	const navigate = useNavigate();

	// isPending 상태에서는 userInfo가 'undefined'
	const hasHealthReport = !isPending && userInfo?.score !== 0;
	const displayName = isPending ? "-" : (userInfo?.name ?? "-");
	const displayAge = isPending ? "-" : (userInfo?.age ?? "-");
	const displayScore = isPending ? 0 : (userInfo?.score ?? 0);
	const displayGender = isPending
		? "-"
		: userInfo?.gender
			? GENDER_LABEL[userInfo.gender]
			: "-";

	return (
		<section className="relative flex w-full">
			<InfoBackground className="absolute inset-0 z-0 h-full w-full" />
			{/* 좌측 사용자 정보 */}
			<div className="relative z-10 my-[4rem] ml-[3.6rem] flex flex-1 flex-col gap-[3.2rem]">
				<hgroup className="space-y-[1.2rem] text-white">
					<h2 className="display02-b-24">{displayName}님</h2>
					<p className="body05-r-12">
						만 {displayAge}세 ({displayGender})
					</p>
				</hgroup>

				<AddButton onClick={() => navigate(ROUTE_PATH.CHECKUP_RESULT)} />
			</div>

			{/* 우측 */}
			<div className="relative z-10 mr-[1.2rem] flex flex-1 items-center justify-center">
				{hasHealthReport ? (
					<>
						{/* 우측 그래프 */}
						<div className="relative">
							<figure>
								<RadialChart
									score={displayScore}
									className="h-[15rem] w-[15rem]"
								/>
							</figure>
							<div className="absolute right-[-5px] bottom-[-7px]">
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
					</>
				) : (
					<>
						{/* blur 영역 */}
						<BlurNoise className="absolute" />
					</>
				)}
			</div>
		</section>
	);
};

export default UserInfo;

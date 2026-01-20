import { useState } from "react";
import { BlurNoise, InfoBackground } from "@/shared/assets/svg";
import { AddButton } from "@/shared/ui/buttons/add-button";
import { RadialChart } from "@/shared/ui/graphs/radial-chart/radial-chart";
import { Tooltip } from "@/shared/ui/overlays/tooltip/tooltip";

const UserInfo = () => {
	// TODO: API 연동 시 검진기록에 따라 그래프 분기처리
	const [showAlarmMessage, _setShowAlarmMessage] = useState(true);

	return (
		<section className="relative flex w-full">
			<InfoBackground className="absolute inset-0 z-0 h-full w-full" />
			{/* 좌측 사용자 정보 */}
			<div className="relative z-10 my-[4rem] ml-[3.6rem] flex flex-1 flex-col gap-[3.2rem]">
				<hgroup className="space-y-[1.2rem] text-white">
					<h2 className="display02-b-24">임지성님</h2>
					<p className="body05-r-12">만 25세 (남)</p>
				</hgroup>

				<AddButton />
			</div>

			{/* 우측 */}
			<div className="relative z-10 flex flex-1 items-center justify-center">
				{showAlarmMessage ? (
					<>
						{/* 우측 그래프 */}
						<div className="relative">
							<figure>
								{/* TODO: 점수 없으면 기본값 70점 반영 */}
								<RadialChart score={70} className="h-[15rem] w-[15rem]" />
							</figure>
							<div className="absolute right-[-5px] bottom-[-7px]">
								<Tooltip side="bottom" align="end">
									건강점수는 체형, 혈압, 혈당, 간·신장 관련 최근 검진 항목을
									점수로 변환해 종합한 지표로, 현재 건강 상태를 이해하기 쉽게
									보여줍니다. 자세한 산출 기준은 보기를 통해 확인할 수 있습니다.
								</Tooltip>
							</div>
						</div>
					</>
				) : (
					<>
						{/* blur 영역 */}
						<BlurNoise className="absolute" />
						<div className="absolute flex items-center justify-center">
							<div className="whitespace-pre-line text-center font-bold text-[1.5rem] text-white leading-[1.8rem]">
								<p>좌측 버튼을 눌러</p>
								<p className="mt-[1rem]">검진결과를 추가해주세요</p>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default UserInfo;

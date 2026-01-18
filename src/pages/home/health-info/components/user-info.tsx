import { useState } from "react";
import { BlurNoise } from "@/shared/assets/svg";
import { AddButton } from "@/shared/ui/buttons/add-button";
import { RadialChart } from "@/shared/ui/graphs/radial-chart/radial-chart";
import { Tooltip } from "@/shared/ui/overlays/tooltip/tooltip";

const UserInfo = () => {
	// TODO: API 연동 시 검진기록에 따라 그래프 분기처리
	const [showAlarmMessage, _setShowAlarmMessage] = useState(true);

	return (
		<section className="flex w-full bg-primary-300">
			{/* 좌측 사용자 정보 */}
			<div className="flex flex-1 flex-col gap-[2.4rem] mt-[3.6rem] ml-[3.4rem] mb-[2.8rem]">
				<hgroup className="text-white">
					<h2 className="display01-b-24 mb-[1.2rem]">임지성님</h2>
					<p className="text-[1.2rem] font-normal leading-[2.2rem]">
						만 25세 (남)
					</p>
				</hgroup>

				<AddButton />
			</div>

			{/* 우측 */}
			<div className="relative flex flex-1 items-center justify-center">
				{showAlarmMessage ? (
					<>
						{/* 우측 그래프 */}
						<div className="relative">
							<figure>
								{/* TODO: 점수 없으면 기본값 70점 반영 */}
								<RadialChart score={70} className="w-[15rem] h-[15rem]" />
							</figure>
							<div className="absolute bottom-[-7px] right-[-5px]">
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
						<div className="absolute flex justify-center items-center">
							<div className="text-white text-center whitespace-pre-line text-[1.5rem] font-bold leading-[1.8rem]">
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

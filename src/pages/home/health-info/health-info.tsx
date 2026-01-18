import cardDietBg from "@img/card-diet-bg.png";
import { HealthTipBackground } from "@/shared/assets/svg";
import { NaviRow } from "@/shared/ui/navigations/navi-row";
import { NaviRowSmall } from "@/shared/ui/navigations/navi-row-small";
import { Ticker } from "@/shared/ui/ticker/ticker";

const HealthInfoPage = () => {
	return (
		<div className="flex flex-col w-full pt-[2.4rem] px-[2rem] gap-[2rem]">
			{/* 생활 속 건강 팁 */}
			<article className="bg-white rounded-[12px] overflow-hidden">
				<div className="p-[1.2rem_1.2rem_0.4rem_1.2rem]">
					{/* TODO: 건강팁 라우팅 적용 */}
					<NaviRow label="생활 속 건강 팁" to="" />
				</div>
				<div className="relative p-[1.2rem_0.8rem_4.2rem_0.8rem]">
					<HealthTipBackground className="absolute inset-0 w-full h-full z-0" />
					<div className="relative z-10">
						<Ticker
							tips={[
								{ id: 1, title: "건강팁 한 줄 쪼로록" },
								{ id: 2, title: "건강팁 두 줄 쪼로록" },
								{ id: 3, title: "건강팁 세 줄 쪼로록" },
							]}
						/>
					</div>
				</div>
			</article>

			{/* 건강 식단 */}
			<article className="bg-white rounded-[12px]">
				<div className="p-[1.2rem_1.2rem_0.4rem_1.2rem]">
					{/* TODO: 건강 식단 라우팅 적용 */}
					<NaviRow label="건강 식단" to="" />
				</div>

				<div className="relative">
					<img
						src={cardDietBg}
						alt="식단 이미지"
						className="absolute inset-0 w-full h-full z-0"
					/>
					<div className="relative z-10 p-[2rem]">
						<p className="body01-sb-12 text-gray-700">김경아님 맞춤 식단</p>
						<p className="head04-m-16 mt-[0.8rem] text-gray-900">
							건오징어채 볶음
						</p>
					</div>
				</div>

				<div className="p-[1rem]">
					<NaviRowSmall label="고혈압식" to="" />
				</div>
			</article>
		</div>
	);
};

export default HealthInfoPage;

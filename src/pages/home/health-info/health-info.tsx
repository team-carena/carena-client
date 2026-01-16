import { NaviRow } from "@/shared/ui/navigations/navi-row";
import { Ticker } from "@/shared/ui/ticker/ticker";

const HealthInfoPage = () => {
	return (
		<div className="flex flex-col w-full pt-[2.4rem] px-[2rem]">
			<article className="bg-white rounded-[12px]">
				<div className="p-[1.2rem_1.2rem_0.4rem_1.2rem]">
					{/* TODO: 건강팁 라우팅 추가 */}
					<NaviRow label="생활 속 건강 팁" to="" />
				</div>
				<div className="px-[0.8rem] py-[1.2rem]">
					<Ticker
						tips={[
							{ id: 1, title: "건강팁 한 줄 쪼로록" },
							{ id: 2, title: "건강팁 두 줄 쪼로록" },
							{ id: 3, title: "건강팁 세 줄 쪼로록" },
						]}
					/>
				</div>
			</article>
			<article></article>
		</div>
	);
};

export default HealthInfoPage;

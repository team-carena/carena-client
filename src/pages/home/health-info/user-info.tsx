import { AddButton } from "@/shared/ui/buttons/add-button";
import { Tooltip } from "@/shared/ui/overlays/tooltip/tooltip";

const UserInfo = () => {
	return (
		<section className="flex w-full bg-primary-300 px-[3.2rem] py-[2.4rem]">
			<div className="flex flex-col gap-[2.4rem]">
				<hgroup>
					<h2>임지성님</h2>
					<p>만 25세 (남)</p>
				</hgroup>

				<AddButton />
			</div>

			<div>
				<figure>
					{/* 차트 컴포넌트 */}
					<figcaption>건강점수 90점</figcaption>
				</figure>
				<Tooltip side="bottom" align="start">
					`건강점수는 체형, 혈압, 혈당, 간·신장 관련 최근 검진 항목을 점수로
					변환해 종합한 지표로, 현재 건강 상태를 이해하기 쉽게 보여줍니다.
					자세한 산출 기준은 보기를 통해 확인할 수 있습니다.`
				</Tooltip>
			</div>
		</section>
	);
};

export default UserInfo;

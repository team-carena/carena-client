import { InfoTooltip } from "@/shared/ui/overlays/popover";

export const HomePage = () => {
	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex items-center gap-2">
				<span>위쪽 툴팁</span>
				<InfoTooltip side="top">
					본 서비스의 검진결과 해석 및 종합판단은 보건복지부가 고시한
					국가건강검진 판정 기준을 참고하여 제공됩니다.
				</InfoTooltip>
			</div>

			<div className="flex items-center gap-2">
				<span>아래쪽 툴팁</span>
				<InfoTooltip side="bottom">아래쪽에 표시되는 툴팁입니다.</InfoTooltip>
			</div>

			<div className="flex items-center gap-2">
				<span>왼쪽 툴팁</span>
				<InfoTooltip side="left">왼쪽에 표시되는 툴팁입니다.</InfoTooltip>
			</div>

			<div className="flex items-center gap-2">
				<span>오른쪽 툴팁</span>
				<InfoTooltip side="right">오른쪽에 표시되는 툴팁입니다.</InfoTooltip>
			</div>
		</div>
	);
};

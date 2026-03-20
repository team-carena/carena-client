import type {
	SidoCodeInfo,
	SigunguCodeInfo,
} from "@/shared/apis/generated/data-contracts";
import { ChevronMRightGray } from "@/shared/assets/svg";

type BottomSheetContentProps = {
	tempSido: string | null;
	sidoList: SidoCodeInfo[];
	sigunguList: SigunguCodeInfo[];
	onSelectSigungu: (sigungu: SigunguCodeInfo) => void;
	onSelectTempSido: (sido: SidoCodeInfo) => void;
};

export const BottomSheetContent = ({
	tempSido,
	sidoList,
	sigunguList,
	onSelectSigungu,
	onSelectTempSido,
}: BottomSheetContentProps) => {
	const isSidoStep = !tempSido;

	return (
		<div className="mt-[0.9rem] flex flex-col gap-[2rem]">
			<h2 className="head01-b-18">
				{isSidoStep ? (
					<span className="text-gray-300">시/도</span>
				) : (
					<span className="flex items-center gap-[1.2rem]">
						<span className="text-black">{tempSido}</span>
						<ChevronMRightGray color="text-gray-300" />
						<span className="text-gray-300">시/군/구</span>
					</span>
				)}
			</h2>

			{isSidoStep && (
				<div className="grid grid-cols-2 gap-x-[0.7rem] gap-y-[1.2rem]">
					{sidoList
						.filter((sido) => sido.sidoName !== "황해도")
						.map((sido) => (
							<button
								type="button"
								key={sido.sidoCode}
								onClick={() => onSelectTempSido(sido)}
								className="body03-r-16 flex w-full items-center justify-center rounded-[1.2rem] border border-gray-300 bg-white px-[2rem] py-[1.2rem]"
							>
								{sido.sidoName}
							</button>
						))}
				</div>
			)}

			{!isSidoStep && (
				<div className="grid grid-cols-2 gap-x-[0.7rem] gap-y-[1.2rem]">
					{sigunguList.map((sigungu) => (
						<button
							type="button"
							key={sigungu.sigunguCode}
							onClick={() => onSelectSigungu(sigungu)}
							className="body03-r-16 flex w-full items-center justify-center rounded-[1.2rem] border border-gray-300 bg-white px-[2rem] py-[1.2rem]"
						>
							{sigungu.sigunguName}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

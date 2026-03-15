import { ChevronMRightGray } from "@/shared/assets/svg";

const sidoList = [
	"서울",
	"부산",
	"대구",
	"인천",
	"광주",
	"대전",
	"울산",
	"세종",
	"경기",
	"강원",
	"충북",
	"충남",
	"전북",
	"전남",
	"경북",
	"경남",
	"제주",
];

const sigunguMap: Record<string, string[]> = {
	서울: ["종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구"],
	부산: ["해운대구", "수영구", "동래구", "남구", "부산진구"],
	대구: ["중구", "동구", "서구", "남구", "북구"],
};

type BottomSheetContentProps = {
	tempSido: string | null;
	onSelectSigungu: (sido: string, sigungu: string) => void;
	onSelectTempSido: (sido: string) => void;
};

export const BottomSheetContent = ({
	tempSido,
	onSelectSigungu,
	onSelectTempSido,
}: BottomSheetContentProps) => {
	const sigunguList = tempSido ? (sigunguMap[tempSido] ?? []) : [];

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
					{sidoList.map((sido) => (
						<button
							type="button"
							key={sido}
							onClick={() => {
								onSelectTempSido(sido);
							}}
							className="body03-r-16 flex w-full items-center justify-center rounded-[1.2rem] border border-gray-300 bg-white px-[2rem] py-[1.2rem]"
						>
							{sido}
						</button>
					))}
				</div>
			)}

			{!isSidoStep && (
				<div className="grid grid-cols-2 gap-x-[0.7rem] gap-y-[1.2rem]">
					{sigunguList.map((sigungu) => (
						<button
							type="button"
							key={sigungu}
							onClick={() => {
								onSelectSigungu(tempSido, sigungu);
							}}
							className="body03-r-16 flex w-full items-center justify-center rounded-[1.2rem] border border-gray-300 bg-white px-[2rem] py-[1.2rem]"
						>
							{sigungu}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/shared/ui/buttons/button";
import Chip from "@/shared/ui/chips/chip";
import { BottomSheet } from "@/shared/ui/overlays/bottom-sheet/bottom-sheet";
import { BottomSheetContent } from "./bottom-sheet-content";
import { BottomSheetFooter } from "./bottom-sheets-footer";
import { InputField } from "./input-field";
import { SectionHeader } from "./section-header";

// TODO: 시도, 시군구 조회는 조회 페이지에서 받아와 url 파라미터로 조회 결과 페이지에 시도, 시군구, 칩, 타입 넘기기
const screeningTypeChips = [
	"전체",
	"일반",
	"암검진",
	"일반+암검진",
	"구강",
	"출장검진",
	"영유아",
] as const;

type Region = {
	sido: string | null;
	sigungu: string | null;
};

export const HospitalSearchPage = () => {
	const navigate = useNavigate();

	const [sidoCode] = useState("11"); // TODO: 서울 하드코딩 -> 주소 검색 클릭 시 코드 불러오기
	const [sigunguCode] = useState("11010");

	const [selectedRegion, setSelectedRegion] = useState<Region>({
		sido: null,
		sigungu: null,
	});

	const [tempRegion, setTempRegion] = useState<Region>({
		sido: null,
		sigungu: null,
	});
	const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);

	const [hospitalName, setHospitalName] = useState("");
	const [selectedScreeningTypeChip, setSelectedScreeningTypeChip] =
		useState<string>("전체");

	const addressValue = selectedRegion.sigungu
		? `${selectedRegion.sido} ${selectedRegion.sigungu}`
		: selectedRegion.sido
			? `${selectedRegion.sido} 전체`
			: "";

	const handleSearchBtnClick = () => {
		const params = new URLSearchParams();

		// 시도 / 시군구
		params.set("sidoCode", sidoCode);
		params.set("sigunguCode", sigunguCode);

		// 병원 이름 -> 파라미터만 공백 제거, input은 ux 위해 띄어쓰기 유지
		const normalizedName = hospitalName.replace(/\s+/g, "");
		if (normalizedName) {
			params.set("name", normalizedName);
		}

		// 검진 타입
		params.set("type", selectedScreeningTypeChip);

		void navigate(`/hospital-search-result?${params.toString()}`);
	};

	const handleResetBtnClick = () => {
		setHospitalName("");
		setSelectedScreeningTypeChip("전체");
		setSelectedRegion({ sido: null, sigungu: null });
		setTempRegion({ sido: null, sigungu: null });
	};

	return (
		<div className="mt-[2.45rem] flex flex-col gap-[4rem] px-[2rem]">
			<InputField
				title="주소 검색"
				icon
				readOnly
				value={addressValue}
				placeholder="주소를 선택해주세요"
				className="cursor-default bg-gray-100"
				onHeaderClick={() => setIsAddressSheetOpen(true)}
			/>

			<InputField
				title="검진기관명 검색"
				value={hospitalName}
				onChange={(e) => setHospitalName(e.target.value)}
				placeholder="원하는 검진기관이 있다면 입력해주세요"
			/>

			<section className="flex flex-col gap-[0.8rem]">
				<SectionHeader as="h2" title="검진항목 구분" />

				<div className="flex flex-wrap gap-[0.8rem]">
					{screeningTypeChips.map((label) => (
						<Chip
							key={label}
							status={selectedScreeningTypeChip === label ? "on" : "off"}
							onClick={() => setSelectedScreeningTypeChip(label)}
						>
							{label}
						</Chip>
					))}
				</div>
			</section>

			<div className="fixed right-0 bottom-[40px] left-0 z-50 mx-auto w-full max-w-[var(--app-max-width)] px-[2rem]">
				<div className="flex gap-[0.8rem]">
					<button
						type="button"
						onClick={handleResetBtnClick}
						className="label04-r-16 whitespace-nowrap rounded-[1.2rem] bg-gray-100 px-[2rem] text-gray-700"
					>
						초기화
					</button>

					<Button
						onClick={handleSearchBtnClick}
						className="flex-1 rounded-[1.2rem]"
					>
						조회
					</Button>
				</div>
			</div>

			<BottomSheet
				height="525px"
				open={isAddressSheetOpen}
				onClose={() => {
					setIsAddressSheetOpen(false);
					setTempRegion({ sido: null, sigungu: null });
				}}
				footer={
					<BottomSheetFooter
						tempSido={tempRegion.sido}
						onConfirm={(sido) => {
							setSelectedRegion({
								sido,
								sigungu: null,
							});
						}}
						onClose={() => {
							setIsAddressSheetOpen(false);
							setTempRegion({ sido: null, sigungu: null });
						}}
					/>
				}
			>
				<BottomSheetContent
					tempSido={tempRegion.sido}
					onSelectTempSido={(sido) => {
						setTempRegion({
							sido,
							sigungu: null,
						});
					}}
					onSelectSigungu={(sido, sigungu) => {
						setSelectedRegion({
							sido,
							sigungu,
						});

						setTempRegion({
							sido: null,
							sigungu: null,
						});

						setIsAddressSheetOpen(false);
					}}
				/>
			</BottomSheet>
		</div>
	);
};

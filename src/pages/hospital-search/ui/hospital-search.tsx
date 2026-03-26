import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useGetSidoCodeQuery } from "@/pages/hospital-search/apis/queries/use-get-sido-code-query";
import { useGetSigunguCodeQuery } from "@/pages/hospital-search/apis/queries/use-get-sigungu-code-query";
import { BottomSheetContent } from "@/pages/hospital-search/ui/bottom-sheet-content";
import { BottomSheetFooter } from "@/pages/hospital-search/ui/bottom-sheets-footer";
import { InputField } from "@/pages/hospital-search/ui/input-field";
import { SectionHeader } from "@/pages/hospital-search/ui/section-header";
import type {
	SidoCodeInfo,
	SigunguCodeInfo,
} from "@/shared/apis/generated/data-contracts";
import { Button } from "@/shared/ui/buttons/button";
import Chip from "@/shared/ui/chips/chip";
import { BottomSheet } from "@/shared/ui/overlays/bottom-sheet/bottom-sheet";

const screeningTypes = [
	{ label: "전체", code: "0" },
	{ label: "일반", code: "1" },
	{ label: "암검진", code: "3" },
	{ label: "일반+암검진", code: "4" },
	{ label: "구강", code: "2" },
	{ label: "출장검진", code: "5" },
	{ label: "영유아", code: "6" },
] as const;

type ScreeningTypeChip = (typeof screeningTypes)[number]["label"];

type Region = {
	sidoName: string | null;
	sidoCode: number | null;
	sigunguName: string | null;
	sigunguCode: number | null;
};

const INITIAL_REGION: Region = {
	sidoName: null,
	sidoCode: null,
	sigunguName: null,
	sigunguCode: null,
};

const getScreeningTypeCode = (label: ScreeningTypeChip) => {
	return screeningTypes.find((type) => type.label === label)?.code ?? null;
};

export const HospitalSearchPage = () => {
	const navigate = useNavigate();

	const [selectedRegion, setSelectedRegion] = useState<Region>(INITIAL_REGION);
	const [tempRegion, setTempRegion] = useState<Region>(INITIAL_REGION);
	const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
	const [hospitalName, setHospitalName] = useState("");
	const [selectedScreeningTypeChip, setSelectedScreeningTypeChip] =
		useState<ScreeningTypeChip>("전체");

	const tempSidoCode = tempRegion.sidoCode ?? 0;

	const { data: sidoList = [] } = useGetSidoCodeQuery();
	const { data: sigunguList = [] } = useGetSigunguCodeQuery({
		sidoCode: tempSidoCode,
	});

	const addressValue = useMemo(() => {
		if (selectedRegion.sigunguName) {
			return `${selectedRegion.sidoName} ${selectedRegion.sigunguName}`;
		}

		if (selectedRegion.sidoName) {
			return `${selectedRegion.sidoName} 전체`;
		}

		return "";
	}, [selectedRegion]);

	const resetRegionState = () => {
		setSelectedRegion(INITIAL_REGION);
		setTempRegion(INITIAL_REGION);
	};

	const closeAddressSheet = () => {
		setIsAddressSheetOpen(false);
		setTempRegion(INITIAL_REGION);
	};

	const handleSearchBtnClick = () => {
		const params = new URLSearchParams();
		const normalizedName = hospitalName.replace(/\s+/g, "");
		const screeningTypeCode = getScreeningTypeCode(selectedScreeningTypeChip);

		params.set("page", "1");

		if (selectedRegion.sidoCode !== null) {
			params.set("sidoCode", String(selectedRegion.sidoCode));
		}

		if (selectedRegion.sigunguCode !== null) {
			params.set("sigunguCode", String(selectedRegion.sigunguCode));
		}

		if (normalizedName) {
			params.set("name", normalizedName);
		}

		if (screeningTypeCode) {
			params.set("type", screeningTypeCode);
		}

		if (selectedRegion.sidoName) {
			params.set("sidoName", selectedRegion.sidoName);
		}

		if (selectedRegion.sigunguName) {
			params.set("sigunguName", selectedRegion.sigunguName);
		}

		params.set("chip", selectedScreeningTypeChip);

		void navigate(`/hospital-search-result?${params.toString()}`);
	};

	const handleResetBtnClick = () => {
		setHospitalName("");
		setSelectedScreeningTypeChip("전체");
		resetRegionState();
	};

	const handleSelectTempSido = (sido: SidoCodeInfo) => {
		if (sido.sidoName === "세종특별자치시") {
			setSelectedRegion({
				sidoName: sido.sidoName ?? null,
				sidoCode: sido.sidoCode ?? null,
				sigunguName: null,
				sigunguCode: null,
			});
			closeAddressSheet();
			return;
		}

		setTempRegion({
			sidoName: sido.sidoName ?? null,
			sidoCode: sido.sidoCode ?? null,
			sigunguName: null,
			sigunguCode: null,
		});
	};

	const handleSelectSigungu = (sigungu: SigunguCodeInfo) => {
		setSelectedRegion({
			sidoName: tempRegion.sidoName,
			sidoCode: tempRegion.sidoCode,
			sigunguName: sigungu.sigunguName ?? null,
			sigunguCode: sigungu.sigunguCode ?? null,
		});

		closeAddressSheet();
	};

	const handleConfirmSido = () => {
		if (!tempRegion.sidoName || tempRegion.sidoCode === null) {
			return;
		}

		setSelectedRegion({
			sidoName: tempRegion.sidoName,
			sidoCode: tempRegion.sidoCode,
			sigunguName: null,
			sigunguCode: null,
		});

		closeAddressSheet();
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
					{screeningTypes.map(({ label }) => (
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
						type="button"
						onClick={handleSearchBtnClick}
						className="flex-1 rounded-[1.2rem]"
					>
						조회
					</Button>
				</div>
			</div>

			<BottomSheet
				snapPoints={{ collapsed: "500px", expanded: "calc(100dvh - 40px)" }}
				open={isAddressSheetOpen}
				onClose={closeAddressSheet}
				footer={
					<BottomSheetFooter
						tempSido={tempRegion.sidoName}
						onConfirm={handleConfirmSido}
						onClose={closeAddressSheet}
					/>
				}
			>
				<BottomSheetContent
					tempSido={tempRegion.sidoName}
					sidoList={sidoList}
					sigunguList={sigunguList}
					onSelectTempSido={handleSelectTempSido}
					onSelectSigungu={handleSelectSigungu}
				/>
			</BottomSheet>
		</div>
	);
};

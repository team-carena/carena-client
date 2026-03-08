import { useState } from "react";
import { Button } from "@/shared/ui/buttons/button";
import Chip from "@/shared/ui/chips/chip";
import { InputField } from "./input-field";
import { SectionHeader } from "./section-header";

const screeningTypeChips = [
	"전체",
	"일반",
	"암검진",
	"일반+암검진",
	"구강",
	"출장검진",
	"영유아",
] as const;

export const HospitalSearchPage = () => {
	const [hospitalName, setHospitalName] = useState("");
	const [selectedScreeningTypeChip, setSelectedScreeningTypeChip] =
		useState<string>("전체");

	const handleScreeningTypeChipClick = (value: string) => {
		setSelectedScreeningTypeChip(value);
	};
	const handleResetBtnClick = () => {
		setHospitalName("");
		setSelectedScreeningTypeChip("전체");
	};
	return (
		<div className="mt-[2.45rem] flex flex-col gap-[4rem] px-[2rem]">
			<InputField
				title="주소 검색"
				icon
				readOnly
				value=""
				placeholder="주소를 선택해주세요"
				className="cursor-default"
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
							onClick={() => handleScreeningTypeChipClick(label)}
						>
							{label}
						</Chip>
					))}
				</div>
			</section>

			<div className="fixed right-0 bottom-[40px] left-0 z-50 mx-auto w-full max-w-[var(--app-max-width)] px-[2rem]">
				<div className="flex gap-[0.8rem]">
					<button
						onClick={handleResetBtnClick}
						className="label04-r-16 whitespace-nowrap rounded-[1.2rem] bg-gray-100 px-[2rem] text-gray-700"
					>
						초기화
					</button>

					<Button className="flex-1 rounded-[1.2rem]">조회</Button>
				</div>
			</div>
		</div>
	);
};

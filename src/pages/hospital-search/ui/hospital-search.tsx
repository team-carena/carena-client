import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/shared/ui/buttons/button";
import Chip from "@/shared/ui/chips/chip";
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

export const HospitalSearchPage = () => {
	const navigate = useNavigate();
	const [hospitalName, setHospitalName] = useState("");
	const [selectedScreeningTypeChip, setSelectedScreeningTypeChip] =
		useState<string>("전체");

	const [sidoCode] = useState("11"); // 서울
	const [sigunguCode] = useState("11010"); // 종로구

	const handleScreeningTypeChipClick = (value: string) => {
		setSelectedScreeningTypeChip(value);
	};

	const handleSearchBtnClick = () => {
		const params = new URLSearchParams();

		// 시도 / 시군구
		params.set("sidoCode", sidoCode);
		params.set("sigunguCode", sigunguCode);

		// 병원 이름
		if (hospitalName) {
			params.set("name", hospitalName);
		}

		// 검진 타입
		params.set("type", selectedScreeningTypeChip);

		void navigate(`/hospital-search-result?${params.toString()}`);
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
				value="서울 종로구" // TODO: 바텀시트 붙이면 변경
				placeholder="주소를 선택해주세요"
				className="cursor-default bg-gray-100"
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
		</div>
	);
};

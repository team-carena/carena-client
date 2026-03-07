import { useMemo, useState } from "react";
import {
	type HospitalItem,
	MOCK_HOSPITALS,
} from "@/pages/hospital-search-result/api/mock-hospitals";
import CardHospital from "@/pages/hospital-search-result/ui/card-hospital";
import { Pagination } from "@/pages/hospital-search-result/ui/pagination/pagination";
import { usePagination } from "@/pages/hospital-search-result/ui/pagination/use-pagination";

const ITEMS_PER_PAGE = 10;
const PAGINATION_STORAGE_KEY = "hospital-search-result-page";

export const HospitalSearchResultPage = () => {
	// TODO: API 연동 후 mock 데이터 제거
	const [hospitalList] = useState<HospitalItem[]>(MOCK_HOSPITALS);

	const totalCount = hospitalList.length;

	const {
		currentPage,
		pages,
		showFirst,
		showLast,
		isFirstDisabled,
		isPrevDisabled,
		isNextDisabled,
		isLastDisabled,
		goToPage,
		goToFirstPage,
		goToPrevPage,
		goToNextPage,
		goToLastPage,
	} = usePagination({
		totalCount,
		itemsPerPage: ITEMS_PER_PAGE,
		storageKey: PAGINATION_STORAGE_KEY,
	});

	const currentPageHospitals = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;

		return hospitalList.slice(startIndex, endIndex);
	}, [currentPage, hospitalList]);

	const handleCopyAddress = (address: string) => {
		navigator.clipboard.writeText(address);
	};

	// 조회 결과가 없는 경우
	if (totalCount === 0) {
		return (
			<main className="flex items-center justify-center pt-[19.6rem]">
				<p className="body04-r-14 text-gray-900">조회된 검진기관이 없습니다</p>
			</main>
		);
	}

	return (
		<main className="flex min-h-full flex-col">
			<section className="px-[2rem] pt-[2.4rem] pb-[1.2rem]">
				<p className="body05-r-12 text-gray-700">조회 결과 {totalCount}개</p>
			</section>

			<section className="flex-1">
				<ul className="flex flex-col gap-[0.8rem]">
					{currentPageHospitals.map((hospital) => (
						<li key={hospital.id}>
							<CardHospital
								hospitalName={hospital.hospitalName}
								address={hospital.address}
								checkupItems={hospital.checkupItems}
								onCopyAddress={() => handleCopyAddress(hospital.address)}
							/>
						</li>
					))}
				</ul>
			</section>

			<section className="flex items-center justify-center pt-[4rem] pb-[7.3rem]">
				<Pagination
					pages={pages}
					currentPage={currentPage}
					showFirst={showFirst}
					showLast={showLast}
					isFirstDisabled={isFirstDisabled}
					isPrevDisabled={isPrevDisabled}
					isNextDisabled={isNextDisabled}
					isLastDisabled={isLastDisabled}
					onFirstClick={goToFirstPage}
					onPrevClick={goToPrevPage}
					onPageClick={goToPage}
					onNextClick={goToNextPage}
					onLastClick={goToLastPage}
				/>
			</section>
		</main>
	);
};

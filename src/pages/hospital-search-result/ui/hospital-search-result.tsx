import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { useGetInstitutionListQuery } from "@/pages/hospital-search/apis/queries/use-get-institution-list-query";
import { CardHospital } from "@/pages/hospital-search-result/ui/card-hospital";
import { Pagination } from "@/pages/hospital-search-result/ui/pagination/pagination";
import { usePagination } from "@/pages/hospital-search-result/ui/pagination/use-pagination";
import { notify } from "@/shared/ui/overlays/toast/toast";

const UI_ITEMS_PER_PAGE = 10;
const SERVER_ITEMS_PER_PAGE = 20;
const PAGES_PER_SERVER_PAGE = SERVER_ITEMS_PER_PAGE / UI_ITEMS_PER_PAGE;

const parsePage = (value: string | null) => {
	const page = Math.floor(Number(value));

	if (Number.isNaN(page) || page < 1) {
		return 1;
	}

	return page;
};

const clampPage = (page: number, totalPages: number) => {
	return Math.min(Math.max(Math.floor(page), 1), Math.max(totalPages, 1));
};

export const HospitalSearchResultPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const rawPage = searchParams.get("page");
	const requestedPage = parsePage(rawPage);
	const sidoCode = searchParams.get("sidoCode") ?? undefined;
	const sigunguCode = searchParams.get("sigunguCode") ?? undefined;
	const name = searchParams.get("name") ?? undefined;
	const type = searchParams.get("type") ?? undefined;

	const requestedServerPage = Math.ceil(requestedPage / PAGES_PER_SERVER_PAGE);

	const { data, isPending } = useGetInstitutionListQuery({
		page: requestedServerPage,
		size: SERVER_ITEMS_PER_PAGE,
		sidoCode,
		sigunguCode,
		name,
		type,
	});

	const totalCount = data?.totalCount ?? 0;
	const totalPages = Math.max(1, Math.ceil(totalCount / UI_ITEMS_PER_PAGE));
	const currentPage = data
		? clampPage(requestedPage, totalPages)
		: requestedPage;

	useEffect(() => {
		if (!data) {
			return;
		}

		if (rawPage === String(currentPage)) {
			return;
		}

		const nextParams = new URLSearchParams(searchParams);
		nextParams.set("page", String(currentPage));
		setSearchParams(nextParams, { replace: true });
	}, [currentPage, data, rawPage, searchParams, setSearchParams]);

	const pagination = usePagination({
		totalCount,
		itemsPerPage: UI_ITEMS_PER_PAGE,
		controlledPage: currentPage,
	});

	const hospitalList = useMemo(() => {
		const result = data?.result ?? [];
		const pageIndexInServerPage = (currentPage - 1) % PAGES_PER_SERVER_PAGE;
		const startIndex = pageIndexInServerPage * UI_ITEMS_PER_PAGE;
		const endIndex = startIndex + UI_ITEMS_PER_PAGE;

		return result.slice(startIndex, endIndex);
	}, [currentPage, data?.result]);

	const updatePage = (page: number) => {
		const nextParams = new URLSearchParams(searchParams);
		// 잘못된 페이지로 이동하지 않도록 보정 후 url 반영
		nextParams.set("page", String(clampPage(page, totalPages)));
		setSearchParams(nextParams);
	};

	const handleCopyAddress = (address: string) => {
		navigator.clipboard.writeText(address);
		notify("주소가 복사되었어요");
	};

	if (isPending) {
		return null;
	}

	if (totalCount === 0) {
		return (
			<main className="flex items-center justify-center pt-[19.6rem]">
				<p className="body04-r-14 text-gray-900">조회된 검진 기관이 없습니다</p>
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
					{hospitalList.map((hospital, index) => (
						<li
							key={`${hospital.institutionName ?? "hospital"}-${currentPage}-${index}`}
						>
							<CardHospital
								hospitalName={hospital.institutionName ?? ""}
								address={hospital.institutionAddress ?? ""}
								checkupItems={hospital.types ?? []}
								onCopyAddress={() =>
									handleCopyAddress(hospital.institutionAddress ?? "")
								}
							/>
						</li>
					))}
				</ul>
			</section>

			{totalCount > 0 && (
				<section className="flex items-center justify-center pt-[4rem] pb-[7.3rem]">
					<Pagination
						pages={pagination.pages}
						currentPage={pagination.currentPage}
						showFirst={pagination.showFirst}
						showLast={pagination.showLast}
						isFirstDisabled={pagination.isFirstDisabled}
						isPrevDisabled={pagination.isPrevDisabled}
						isNextDisabled={pagination.isNextDisabled}
						isLastDisabled={pagination.isLastDisabled}
						onFirstClick={() => updatePage(1)}
						onPrevClick={() => updatePage(pagination.currentPage - 1)}
						onPageClick={(page) => updatePage(page)}
						onNextClick={() => updatePage(pagination.currentPage + 1)}
						onLastClick={() => updatePage(totalPages)}
					/>
				</section>
			)}
		</main>
	);
};

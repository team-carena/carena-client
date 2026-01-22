import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { DietListResponse } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useDietList = () => {
	return useSuspenseInfiniteQuery({
		queryKey: queryKeys.diet.lists(),
		queryFn: ({ pageParam }) => getDietList(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _allPages, lastPageParam) => {
			return lastPage.hasNext ? lastPageParam + 1 : undefined;
		},
	});
};

export const getDietList = (page: number) => {
	return request<DietListResponse>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.diet.list,
		query: { page }, // URL의 쿼리 파라미터 (/diet?page=1)
	});
};

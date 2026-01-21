import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type {
	GetHealthTipListParams,
	ReadHealthTipListView,
} from "@/shared/apis/health-tip/types";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useHealthTipList = ({
	hashtagName,
}: Omit<GetHealthTipListParams, "page">) => {
	return useSuspenseInfiniteQuery({
		queryKey: queryKeys.healthTip.list({ hashtagName }),
		queryFn: ({ pageParam }) =>
			getHealthTipList({ page: pageParam, hashtagName }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) =>
			lastPage.hasNext ? allPages.length + 1 : undefined,
	});
};

export const getHealthTipList = ({
	page,
	hashtagName,
}: GetHealthTipListParams) => {
	return request<ReadHealthTipListView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.healthTip.list,
		query: {
			page,
			...(hashtagName ? { hashtagName } : {}),
		},
	});
};

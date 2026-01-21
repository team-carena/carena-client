import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getHealthTipList } from "@/shared/apis/health-tip/get-health-tip-list";
import type { GetHealthTipListParams } from "@/shared/apis/health-tip/types";
import { queryKeys } from "@/shared/apis/query-keys";

export const useInfiniteHealthTipList = ({
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

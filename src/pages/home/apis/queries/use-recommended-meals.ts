import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { RecommendedMealView } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export type PollingStatus = "loading" | "timeout" | "success" | "idle";

interface UseRecommendedMealOptions {
	enabled?: boolean;
}

const POLLING_TIMEOUT_MS = 60_000; // 최대 1분

const hasMealData = (data: RecommendedMealView | undefined) =>
	data?.meal != null && data.meal !== "";

export const useRecommendedMeal = (options?: UseRecommendedMealOptions) => {
	const pollingStartRef = useRef<number | null>(null);
	const enabled = options?.enabled ?? true;

	const query = useQuery({
		queryKey: queryKeys.recommendedMeal.latest(),
		queryFn: getRecommendedMeal,
		enabled,
		throwOnError: false,
		retry: false,
		placeholderData: keepPreviousData,
		refetchInterval: () => {
			if (pollingStartRef.current === null) {
				pollingStartRef.current = Date.now();
			}

			if (Date.now() - pollingStartRef.current >= POLLING_TIMEOUT_MS) {
				return false;
			}

			return 15000;
		},
		refetchIntervalInBackground: false,
	});

	const isTimedOut =
		pollingStartRef.current !== null &&
		Date.now() - pollingStartRef.current >= POLLING_TIMEOUT_MS;

	let pollingStatus: PollingStatus;
	if (!enabled) {
		pollingStatus = "idle";
	} else if (hasMealData(query.data)) {
		pollingStatus = "success";
	} else if (isTimedOut && !query.isFetching) {
		pollingStatus = "timeout";
	} else {
		pollingStatus = "loading";
	}

	// biome-ignore lint/suspicious/noConsole: 디버깅용 임시 로그
	console.log("[useRecommendedMeal]", {
		pollingStatus,
		pollingStart: pollingStartRef.current,
		data: query.data,
		isError: query.isError,
		isPending: query.isPending,
	});

	return {
		...query,
		pollingStatus,
	};
};

export const getRecommendedMeal = () => {
	return request<RecommendedMealView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.recommendedMeal.recommended,
	});
};

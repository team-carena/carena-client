import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { RecommendedMealView } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export type PollingStatus = "loading" | "timeout" | "success" | "idle";

interface UseRecommendedMealOptions {
	enabled?: boolean;
	polling?: boolean;
	pollingInterval?: number;
}

const POLLING_TIMEOUT_MS = 60_000; // 최대 1분

const hasMealData = (data: RecommendedMealView | undefined) =>
	data?.meal != null && data.meal !== "";

export const useRecommendedMeal = (options?: UseRecommendedMealOptions) => {
	const pollingStartRef = useRef<number | null>(null);
	const enabled = options?.enabled ?? true;
	const polling = options?.polling ?? false;
	const pollingInterval = options?.pollingInterval ?? 20000;

	const query = useQuery({
		queryKey: queryKeys.recommendedMeal.latest(),
		queryFn: getRecommendedMeal,
		enabled,
		throwOnError: false,
		retry: false,
		placeholderData: keepPreviousData,
		// polling이 true일 때만(검진결과생성 후 /home 으로 이동했을 때만) polling
		refetchInterval: polling
			? () => {
					if (pollingStartRef.current === null) {
						pollingStartRef.current = Date.now();
					}

					if (Date.now() - pollingStartRef.current >= POLLING_TIMEOUT_MS) {
						return false;
					}

					return pollingInterval;
				}
			: false,
		refetchIntervalInBackground: false,
	});

	const isTimedOut =
		polling &&
		pollingStartRef.current !== null &&
		Date.now() - pollingStartRef.current >= POLLING_TIMEOUT_MS;

	let pollingStatus: PollingStatus;
	if (!enabled) {
		pollingStatus = "idle";
	} else if (hasMealData(query.data)) {
		pollingStatus = "success";
	} else if (isTimedOut && !query.isFetching) {
		pollingStatus = "timeout";
	} else if (polling) {
		pollingStatus = "loading";
	} else {
		pollingStatus = "idle";
	}

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

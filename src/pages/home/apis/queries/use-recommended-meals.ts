import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { RecommendedMealView } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

interface UseRecommendedMealOptions {
	enabled?: boolean;
}

export const useRecommendedMeal = (options?: UseRecommendedMealOptions) => {
	return useQuery({
		queryKey: queryKeys.recommendedMeal.latest(),
		queryFn: getRecommendedMeal,
		enabled: options?.enabled ?? true,
	});
};

export const getRecommendedMeal = () => {
	return request<RecommendedMealView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.recommendedMeal.recommended,
	});
};

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
		throwOnError: false, // 404 등 에러 시 앱 크래시 방지, fallback UI로 처리
	});
};

export const getRecommendedMeal = () => {
	return request<RecommendedMealView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.recommendedMeal.recommended,
	});
};

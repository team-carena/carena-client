import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { DietDetailResponse } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useDietDetail = (dietId: string) => {
	return useQuery({
		queryKey: queryKeys.diet.detail(dietId),
		queryFn: () => getDietDetail(dietId),
		enabled: !!dietId,
	});
};

export const getDietDetail = (dietId: string) => {
	return request<DietDetailResponse>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.diet.detail(dietId),
	});
};

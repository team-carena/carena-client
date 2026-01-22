import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { ReadHealthTipDetailView } from "@/shared/apis/health-tip/types";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useHealthTipDetail = (healthTipId: string) => {
	return useQuery({
		queryKey: queryKeys.healthTip.detail(healthTipId),
		queryFn: () => getHealthTipDetail(healthTipId),
		enabled: Boolean(healthTipId),
	});
};

export const getHealthTipDetail = (healthTipId: string) => {
	return request<ReadHealthTipDetailView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.healthTip.detail(healthTipId),
	});
};

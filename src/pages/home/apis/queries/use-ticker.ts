import { useSuspenseQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { ReadHealthTipTickerView } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const useTicker = () => {
	return useSuspenseQuery({
		queryKey: queryKeys.healthTip.ticker(),
		queryFn: getTicker,
	});
};

export const getTicker = () => {
	return request<ReadHealthTipTickerView>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.healthTip.ticker,
	});
};

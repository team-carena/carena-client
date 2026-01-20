import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type {
	GetHealthTipListParams,
	HealthTipListData,
} from "@/shared/apis/health-tip/types";
import { HTTP_METHOD, request } from "@/shared/apis/request";

export const getHealthTipList = ({
	page,
	hashtagName,
}: GetHealthTipListParams) => {
	return request<HealthTipListData>({
		method: HTTP_METHOD.GET,
		url: API_ENDPOINTS.HEALTH_TIP.LIST,
		query: {
			page,
			...(hashtagName ? { hashtagName } : {}),
		},
	});
};

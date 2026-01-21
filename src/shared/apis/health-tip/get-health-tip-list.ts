import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type {
	GetHealthTipListParams,
	ReadHealthTipListView,
} from "@/shared/apis/health-tip/types";
import { HTTP_METHOD, request } from "@/shared/apis/request";

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

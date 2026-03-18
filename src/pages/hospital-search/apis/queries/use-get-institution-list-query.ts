import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { InstitutionListView } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { request } from "@/shared/apis/request";

interface UseGetInstitutionListQueryParams {
	sidoCode?: number | string;
	sigunguCode?: number | string;
	name?: string;
	type?: string;
	page?: number;
	size?: number;
}

export const useGetInstitutionListQuery = (
	params: UseGetInstitutionListQueryParams,
) => {
	return useQuery({
		queryKey: queryKeys.institution.list(params),
		queryFn: () =>
			request<InstitutionListView>({
				method: "GET",
				url: API_ENDPOINTS.institution.list,
				query: params,
			}),
	});
};

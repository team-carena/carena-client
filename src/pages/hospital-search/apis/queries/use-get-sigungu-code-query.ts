import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { SigunguCodeView } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { request } from "@/shared/apis/request";

interface UseGetSigunguCodeQueryParams {
	sidoCode: number;
}

export const useGetSigunguCodeQuery = ({
	sidoCode,
}: UseGetSigunguCodeQueryParams) => {
	return useQuery({
		queryKey: queryKeys.institution.sigunguCodes(sidoCode),
		queryFn: () =>
			request<SigunguCodeView>({
				method: "GET",
				url: API_ENDPOINTS.institution.sigunguCode,
				query: {
					sidoCode,
				},
			}),
		enabled: !!sidoCode,
		select: (data) => data.result ?? [],
	});
};

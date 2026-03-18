import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/shared/apis/api-endpoints";
import type { SidoCodeView } from "@/shared/apis/generated/data-contracts";
import { queryKeys } from "@/shared/apis/query-keys";
import { request } from "@/shared/apis/request";

export const useGetSidoCodeQuery = () => {
	return useQuery({
		queryKey: queryKeys.institution.sidoCodes(),
		queryFn: () =>
			request<SidoCodeView>({
				method: "GET",
				url: API_ENDPOINTS.institution.sidoCode,
			}),
		select: (data) => data.result ?? [],
	});
};

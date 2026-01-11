import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const createQueryClient = () => {
	return new QueryClient({
		queryCache: new QueryCache({
			onError: () => {
				// TODO: 추후 query 요청 실패 시 공통 에러 처리 로직 추가 예정
				// ex) 에러 코드별 메시지 매핑, 전역 토스트 노출 등
			},
		}),
		mutationCache: new MutationCache({
			onError: () => {
				// TODO: mutation 실패 시 공통 에러 처리 로직 추가 예정
			},
		}),
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				retry: 1,
				refetchOnWindowFocus: false,
			},
			mutations: {
				retry: 0,
			},
		},
	});
};

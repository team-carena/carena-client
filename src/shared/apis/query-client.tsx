import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode, useState } from "react";

const createQueryClient = () => {
	return new QueryClient({
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

export function QueryProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => createQueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{import.meta.env.DEV ? (
				<ReactQueryDevtools initialIsOpen={false} />
			) : null}
		</QueryClientProvider>
	);
}

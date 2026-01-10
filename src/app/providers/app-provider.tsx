import type { ReactNode } from "react";

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
	// TODO: QueryProvider, RouterProvider 머지 후 추가
	// <QueryProvider>
	//   <RouterProvider router={router} />
	// </QueryProvider>

	return <>{children}</>;
};

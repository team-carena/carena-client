import { AppProvider } from "@app/providers/app-provider";
import { HomePage } from "@/pages/home/ui/home-page";
import "@app/styles/global.css";

export const App = () => {
	return (
		// TODO: QueryProvider, RouterProvider 머지 후 수정
		<AppProvider>
			<HomePage />
		</AppProvider>
	);
};

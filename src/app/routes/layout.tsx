import { Outlet, useMatches } from "react-router";
import { Header } from "@/shared/ui/navigations/header";
import type { RouteHandle } from "./router";

export const Layout = () => {
	/**
	 * useMatches(): 현재 URL과 매칭된 모든 라우트 정보를 배열로 반환
	 * 예: /home 접속 시 → [{ path: "/" }, { path: "home", handle: { header: "main" } }]
	 *
	 * matches[matches.length - 1]: 가장 마지막(가장 깊은) 라우트 = 현재 페이지
	 */
	const matches = useMatches();
	const currentMatch = matches[matches.length - 1];
	const headerConfig = currentMatch?.handle as RouteHandle | undefined;
	const showHeader = headerConfig?.header !== "none";

	return (
		<>
			<Header variant={headerConfig?.header} title={headerConfig?.title} />
			<main className={showHeader ? "pt-[var(--header-height)]" : ""}>
				<Outlet />
			</main>
		</>
	);
};

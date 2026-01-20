import { Outlet, useMatches } from "react-router";
import { HEALTH_REPORT_TITLE_MAP } from "@/pages/health-report/model/health-report-config";
import type { HealthReportType } from "@/pages/health-report/model/health-report-types";
import { cn } from "@/shared/libs/cn";
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

	/**
	 * health-report 상세 페이지 전용 타이틀 처리
	 *
	 * - health-report-detail 라우트에는 handle.title을 지정하지 않음
	 * - URL params의 type을 기반으로 검사 유형별 타이틀을 동적으로 결정
	 * - 기존 페이지들은 handle.title을 그대로 사용
	 */
	const type = currentMatch?.params?.type as HealthReportType | undefined;

	/**
	 * 헤더 타이틀 결정 우선순위
	 * 1. 라우트에 명시된 handle.title (기존 페이지)
	 * 2. health-report 상세 페이지의 type 기반 타이틀 매핑
	 */
	const title =
		headerConfig?.title ?? (type ? HEALTH_REPORT_TITLE_MAP[type] : undefined);

	return (
		<>
			<Header variant={headerConfig?.header} title={headerConfig?.title} />
			<main
				className={cn("min-h-dvh", showHeader && "pt-[var(--header-height)]")}
			>
				<Outlet />
			</main>
		</>
	);
};

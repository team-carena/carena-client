import { useSearchParams } from "react-router";

import { Tabs } from "@/shared/ui/tabs/tabs";
import UserInfo from "../health-info/components/user-info";
import HealthInfoPage from "../health-info/health-info";
import HealthAnalysisPage from "./health-analysis/health-analysis";

type HomeTab = "health-info" | "health-analysis";

const getTabFromQuery = (value: string | null): HomeTab => {
	if (value === "health-analysis") return "health-analysis";
	return "health-info";
};

export const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const tabFromQuery = getTabFromQuery(searchParams.get("tab"));

	// query(tab)가 바뀔 때 Tabs를 remount해서 defaultTab이 다시 반영되도록 key 사용
	const tabsKey = tabFromQuery;

	// 탭 클릭 시 query 업데이트
	const setTabQuery = (tab: HomeTab) => {
		const next = new URLSearchParams(searchParams);
		next.set("tab", tab);
		setSearchParams(next);
	};

	return (
		<div className="flex w-full flex-col">
			<UserInfo />

			<Tabs key={tabsKey} defaultTab={tabFromQuery}>
				<Tabs.List>
					<Tabs.Trigger
						value="health-info"
						onClick={() => setTabQuery("health-info")}
						type="button"
					>
						건강정보
					</Tabs.Trigger>

					<Tabs.Trigger
						value="health-analysis"
						onClick={() => setTabQuery("health-analysis")}
						type="button"
					>
						검진결과분석
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="health-info">
					<HealthInfoPage />
				</Tabs.Content>

				<Tabs.Content value="health-analysis">
					<HealthAnalysisPage />
				</Tabs.Content>
			</Tabs>
		</div>
	);
};

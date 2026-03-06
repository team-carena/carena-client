import HealthAnalysisContent from "@/pages/home/ui/health-analysis/health-analysis";
import { useMyInfo } from "@/shared/apis/member/use-my-info";

export const HealthAnalysisPage = () => {
	const { data: userInfo, isPending } = useMyInfo();

	return <HealthAnalysisContent userInfo={userInfo} isPending={isPending} />;
};

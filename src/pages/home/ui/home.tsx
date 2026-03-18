import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { useMyInfo } from "@/shared/apis/member/use-my-info";
import { IcHospital, IcPaper } from "@/shared/assets/svg";
import UserInfo from "./health-info/components/user-info";
import HealthInfoPage from "./health-info/health-info";

interface ActionButtonProps {
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
}

const ActionButton = ({ icon, label, onClick }: ActionButtonProps) => (
	<button
		type="button"
		onClick={onClick}
		className="flex flex-1 items-center gap-[0.8rem] rounded-[1.2rem] bg-white px-[2rem] py-[1.6rem] shadow-[0_0_8px_rgba(0,0,0,0.10)]"
	>
		{icon}
		<span className="head03-sb-16 text-gray-900">{label}</span>
	</button>
);

export const HomePage = () => {
	const { data: userInfo, isPending } = useMyInfo();
	const navigate = useNavigate();

	return (
		<div className="flex h-full w-full flex-col">
			<UserInfo userInfo={userInfo} isPending={isPending} />

			<div className="flex w-full flex-col gap-[2rem] px-[2rem] pt-[2rem]">
				{/* 버튼 영역 */}
				<div className="flex gap-[0.9rem]">
					<ActionButton
						icon={
							<IcHospital
								className="h-[2.4rem] w-[2.4rem] shrink-0"
								aria-hidden
							/>
						}
						label="검진 기관 조회"
						onClick={() => void navigate(ROUTE_PATH.HOSPITAL_SEARCH)}
					/>
					<ActionButton
						icon={
							<IcPaper className="h-[2.4rem] w-[2.4rem] shrink-0" aria-hidden />
						}
						label="검진 결과 추가"
						onClick={() => void navigate(ROUTE_PATH.CHECKUP_RESULT)}
					/>
				</div>
			</div>

			<HealthInfoPage userInfo={userInfo} isPending={isPending} />
		</div>
	);
};

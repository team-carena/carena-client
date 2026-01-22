import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/app/routes/paths";
import { DefaultProfile } from "@/shared/assets/svg";
import { useAuthStore } from "@/shared/store/auth-store";
import { openModal } from "@/shared/ui/overlays/modal/open-modal";
import { notifyError } from "@/shared/ui/overlays/toast/toast";
import { useLogout } from "../apis/mutations/use-logout";
import { useMyPageInfo } from "../apis/queries/use-my-page-info";
import { ActionSection } from "./action-section";

const formatBirthdate = (date: string) => {
	const [year, month, day] = date.split("-");
	return `${year}년 ${month}월 ${day}일`;
};

export const MyPage = () => {
	const navigate = useNavigate();
	const logoutStore = useAuthStore((state) => state.logout);
	const { mutate: logout } = useLogout();
	// TODO: useSuspenseQuery 사용 or 스켈레톤 추가
	const { data: userInfo } = useMyPageInfo();

	const handleLogout = () => {
		logout(undefined, {
			onSuccess: () => {
				logoutStore();
				void navigate(ROUTE_PATH.LOGIN, { replace: true });
			},
			onError: () => {
				notifyError("로그아웃에 실패했습니다");
			},
		});
	};

	const ACTION_LIST = [
		{
			id: "terms",
			title: "약관",
			label: "약관 바로보기",
			onClick: () => {
				window.open(
					"https://petalite-biplane-c36.notion.site/2eb5365471d180fcb539d7caf1ca2310",
					"_blank",
					"noopener, noreferrer",
				);
			},
		},
		{
			id: "logout",
			title: "설정",
			label: "로그아웃",
			onClick: () =>
				openModal({
					size: "sm",
					description: "로그아웃 하시겠습니까?",
					primaryAction: {
						label: "확인",
						onClick: handleLogout,
					},
					secondaryAction: { label: "취소", onClick: () => {} },
				}),
		},
	];

	return (
		<div className="min-h-dvh bg-white px-[2rem]">
			<section className="flex items-center gap-[2rem] pt-[2.4rem] pb-[4rem]">
				<DefaultProfile className="rounded-[12px]" />
				<div className="flex flex-col gap-[2rem]">
					<h3 className="head03-sb-16">{userInfo?.name ?? "-"}</h3>
					<p className="head05-r-14">
						{userInfo?.birthdate ? formatBirthdate(userInfo.birthdate) : "-"}
					</p>
				</div>
			</section>
			<div className="flex flex-col gap-[2rem]">
				{ACTION_LIST.map(({ id, title, label, onClick }) => (
					<ActionSection
						key={id}
						title={title}
						label={label}
						onClick={onClick}
					/>
				))}
			</div>
		</div>
	);
};

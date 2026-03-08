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
			title: "약관 및 정책",
			items: [
				{
					label: "서비스 이용 약관",
					onClick: () => {
						window.open(
							"https://petalite-biplane-c36.notion.site/3185365471d1809ea43aebb2ea407608?pvs=74",
							"_blank",
							"noopener,noreferrer",
						);
					},
				},
				{
					label: "개인정보 처리방침",
					onClick: () => {
						window.open(
							"https://petalite-biplane-c36.notion.site/2eb5365471d180fcb539d7caf1ca2310?pvs=74",
							"_blank",
							"noopener,noreferrer",
						);
					},
				},
				{
					label: "개인정보 및 민감정보 수집·이용 동의",
					onClick: () => {
						window.open(
							"https://petalite-biplane-c36.notion.site/3185365471d180a6804adee3f1ffe1c8?pvs=74",
							"_blank",
							"noopener,noreferrer",
						);
					},
				},
			],
		},
		{
			id: "settings",
			title: "설정",
			items: [
				{
					label: "회원탈퇴",
					onClick: () =>
						openModal({
							size: "lg",
							title: "정말 탈퇴하시겠어요?",
							description: `회원 탈퇴 시 계정이 삭제되며, 
회원 정보가 소멸되어 복구가 불가능합니다.`,
							primaryAction: {
								label: "탈퇴하기",
								onClick: () => {}, // TODO: 탈퇴 핸들러 연결, 토스트 추가
							},
							secondaryAction: { label: "취소", onClick: () => {} },
						}),
				},
				{
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
			],
		},
	];

	return (
		<div className="min-h-dvh bg-white px-[2rem]">
			<section className="flex items-center gap-[2rem] pt-[2.4rem] pb-[4rem]">
				<DefaultProfile className="rounded-[12px]" />
				<div className="flex flex-col gap-[2rem]">
					<h3 className="head03-sb-16">{userInfo?.name ?? "-"} (여)</h3>{" "}
					{/* TODO: api 연동 시, {userInfo?.sex ?? ''} 추가 */}
					<p className="label02-m-14">
						{userInfo?.birthdate ? formatBirthdate(userInfo.birthdate) : "-"}
					</p>
				</div>
			</section>
			<div className="flex flex-col gap-[2rem]">
				{ACTION_LIST.map(({ id, title, items }) => (
					<ActionSection key={id} title={title} items={items} />
				))}
			</div>
		</div>
	);
};

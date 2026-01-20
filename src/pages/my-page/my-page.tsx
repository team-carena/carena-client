import { useEffect, useState } from "react";
import type { MyPageResponse } from "@/shared/apis/generated/data-contracts";
import { getMyPageInfo } from "@/shared/apis/my-page/get-my-page-info";
import { DefaultProfile } from "@/shared/assets/svg";
import { openModal } from "@/shared/ui/overlays/modal/open-modal";
import { ActionSection } from "./action-section";

const ACTION_LIST = [
	{
		id: "terms",
		title: "약관",
		label: "약관 바로보기",
		onClick: () => {
			window.open(
				"https://www.notion.so/약관페이지주소",
				"_blank",
				"noopener, noreferrer",
			); // TODO: 실제 노션 약관 페이지 링크로 대체
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
				primaryAction: { label: "확인", onClick: () => {} }, // TODO: 로그아웃 api 연동 시 핸들러 등록 -> 로그아웃 하면 랜딩 페이지로
				secondaryAction: { label: "취소", onClick: () => {} },
			}),
	},
];

const formatBirthdate = (date: string) => {
	const [year, month, day] = date.split("-");
	return `${year}년 ${month}월 ${day}일`;
};

export const MyPage = () => {
	const [userInfo, setUserInfo] = useState<MyPageResponse | null>(null);

	useEffect(() => {
		const fetchMyPageInfo = async () => {
			try {
				const response = await getMyPageInfo();
				setUserInfo(response);
			} catch (error) {
				console.error("마이페이지 정보 조회 실패", error);
			}
		};

		void fetchMyPageInfo();
	}, []);

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

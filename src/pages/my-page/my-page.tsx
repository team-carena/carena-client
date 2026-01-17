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

export const MyPage = () => {
	// TODO: 하드코딩된 이름, 생일 -> 로그인 후 저장되어 있는 내 정보 사용

	return (
		<main className="h-screen px-[2rem] bg-white">
			<section className="flex gap-[2rem] items-center pt-[2.4rem] pb-[4rem]">
				<DefaultProfile className="rounded-[12px]" />
				<div className="flex flex-col gap-[2rem]">
					<h3 className="head03-sb-16">김경아</h3>
					<p className="head05-r-14">2003년 08월 21일</p>
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
		</main>
	);
};

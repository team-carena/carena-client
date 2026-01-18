import { requestKakaoAuthorize } from "@/shared/libs/request-kakao-authorize";
import { postSignUp } from "./api/post-sign-up";

const data = {
	name: "지민재",
	birthdate: "2003-05-09",
	gender: "FEMALE",
} as const;

export const TempPage = () => {
	const handleSignUp = async () => {
		try {
			// 회원가입 api 호출
			await postSignUp(data);

			// 성공하면 바로 카카오 인가 호출
			requestKakaoAuthorize();
		} catch (e) {
			console.error(e); // 추가 에러 처리
		}
	};

	return (
		<div>
			<p>회원가입 임시 페이지입니다!</p>
			<button
				onClick={handleSignUp}
				className="border border-primary-50 text-[3rem]"
			>
				저장
			</button>
		</div>
	);
};

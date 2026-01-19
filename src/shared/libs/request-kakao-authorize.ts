const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

// 카카오 인가 코드 요청 유틸함수
export const requestKakaoAuthorize = () => {
	if (!KAKAO_REST_API_KEY || !KAKAO_REDIRECT_URI) {
		throw new Error("Kakao OAuth 환경변수가 설정되지 않았습니다.");
	}

	const state = crypto.randomUUID();
	sessionStorage.setItem("kakao_oauth_state", state);

	const url =
		`https://kauth.kakao.com/oauth/authorize?response_type=code` +
		`&client_id=${encodeURIComponent(KAKAO_REST_API_KEY)}` +
		`&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
		`&state=${encodeURIComponent(state)}`;

	window.location.assign(url);
};
